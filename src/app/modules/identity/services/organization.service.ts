import { credential } from 'firebase-admin';
import * as _ from 'lodash';
import moment from 'moment';

import { Delete, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as MSG from '../../../../constants/msg';

import { In, IsNull, Repository } from 'typeorm';
import { QueryHelper, ResponseHelper } from '../../../../helpers';

import {
  OrganizationEntity,
  IdeUserEntity,
  WorkspaceEntity,
} from '../entities';
import {
  OrganizationCreateModel,
  OrganizationUpdateModel,
  OrganizationVerifyModel,
} from '../models';
import { OrganizationQueryModel } from '../models';
import {
  IAM_GROUP,
  IAM_GROUP_LEVEL,
  IAM_GROUP_PERMISSION,
} from 'src/constants/iam';
import { RESOURCE_TYPE } from 'src/constants';
import { SendMailModel } from '../../mailer/models/send-email.model';
import { MailerService } from '../../mailer/mailer.service';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(OrganizationEntity)
    private organizationRepository: Repository<OrganizationEntity>,

    @InjectRepository(IdeUserEntity)
    private userRepository: Repository<IdeUserEntity>,

    @InjectRepository(WorkspaceEntity)
    private workspaceRepository: Repository<WorkspaceEntity>,
 
    private mailerService: MailerService,
  ) {}

  findById = async (id) => {
    return this.organizationRepository.findOne({
      where: [{ Id: id }, { Code: id }],
    });
  };

  findOrCreateWorkspace = async (name: any, parentId: string) => {
    if (parentId) {
      const org = await this.findById(parentId);
      return this.workspaceRepository.findOneBy({
        Id: org.WorkspaceId,
      });
    } else {
      const workspace = new WorkspaceEntity();
      workspace.Name = name;

      return this.workspaceRepository.save(workspace);
    }
  };

  async validCode() {
    const organization = await this.organizationRepository.find({
      where: {
        DeleteDate: IsNull(),
      },
    });

    return _.map(organization, 'Code');
  }

  async validCodeUpdate(code: string) {
    const organization = await this.organizationRepository.find({
      where: {
        DeleteDate: IsNull(),
      },
    });

    return _.map(
      _.filter(organization, (org) => org.Code !== code),
      'Code',
    );
  }

  async create(body: OrganizationCreateModel, credentials: any) {
    const [user  ] = await Promise.all([
      this.userRepository.findOneBy({
        Id: _.get(credentials, 'UserId'),
      }),
   
    ]);

    const organization = await this.validCode();

    if (organization.includes(body.code)) {
      throw ResponseHelper.BadRequest('Code already exists!');
    }

    const workspace = await this.findOrCreateWorkspace(
      body.name,
      body.parent_id,
    );
    const entity = new OrganizationEntity();

    entity.Name = body.name;
    entity.Description = body.description;
    entity.Phone = body.phone;
    entity.Address = body.address;
    entity.Thumbnail = body.thumbnail;
    entity.DisplayOrder = body.display_order;

    entity.WorkingTimeStart = body.working_time_start;
    entity.WorkingTimeEnd = body.working_time_end;

    entity.Status = body.status;
    entity.Images = body.images;
    entity.Websites = body.websites;
    entity.Socials = body.socials;
    entity.Grade = body.grade;
    entity.Rate = body.rate;
    entity.Cover = body.cover;
    entity.Avatar = body.avatar;

    entity.Code = body.code;
    entity.CountryId = body.country_id;
    entity.Vision = body.vision;
    entity.Mission = body.mission;
    entity.CoreValues = body.core_values;

    entity.ParentId = body.parent_id;

    entity.CreatedBy = _.get(credentials, 'UserId');

    entity.Workspace = workspace;

    const org = await this.organizationRepository.save(entity);

    // return organization
    return org;
  }

  getGroupAdminId = (iamGroups) => {
    const group = _.find(
      iamGroups,
      (gr) => gr.Name === IAM_GROUP.ORGANIZATION_OWNER,
    );

    return group.Id;
  };

  // createOrganizationUser(orgId, userId, groupId) {
  //   const orgUser = new OrganizationUserEntity();
  //   orgUser.IAMGroupId = groupId;
  //   orgUser.OrganizationId = orgId;
  //   orgUser.UserId = userId;

  //   return this.organizationUserRepository.save(orgUser);
  // }

  findByIdOrFail = async (id, credentials, options = undefined) => {
    const organization = await this.organizationRepository.findOne({
      where: [{ Id: id }, { Code: id }],
    
    });

    _.forEach(_.get(organization, 'Users'), (user) => {
      const userOrganization = _.find(
        _.get(organization, 'OrganizationUsers'),
        (ou) => ou.UserId === user.Id,
      );
      user.OrganizationUser = userOrganization;
    });

    _.forEach(_.get(organization, 'Children'), (child) => {
      const organizationUser = _.find(
        _.get(child, 'OrganizationUsers'),
        (ou) => ou.UserId === _.get(credentials, 'UserId'),
      );

      child.OrganizationUser = organizationUser;
    });

    if (_.isNil(organization)) {
      throw ResponseHelper.NotFound(
        MSG.MSG_OBJ_NOT_FOUND(OrganizationEntity.name),
      );
    }

    return organization;
  };

  findAll = async (query: OrganizationQueryModel, credentials: any) => {
    const { limit = 10, offset = 0 } = query;

    //     users: 'Users', n-n
    // industries: 'Industries', n-n
    // services: 'Services',  n-n
    // country: 'Country', n-1
    // city: 'City', n-1
    // organization_users: 'OrganizationUsers', 1-n
    // organization_users_position: 'OrganizationUsers.Position',
    // organization_users_user_invited: 'OrganizationUsers.UserInvited',
    // organization_users_iam_group: 'OrganizationUsers.IAMGroup',
    // children: 'Children', 1-n
    // childen_organization_users: 'Children.OrganizationUsers',
    // children_organization_users_position: 'Children.OrganizationUsers.Position',
    // children_organization_users_iam_group:
    //   'Children.OrganizationUsers.IAMGroup',
    // iam_groups: 'IAMGroups', 1-n
    // chapters: 'Chapters', n-n
    // summary: 'Summary', 1-1
    // has_follow

    const queryBuilder = await this.organizationRepository
      .createQueryBuilder('organization')
      .groupBy('organization.id')
      .select([
        'organization.*',
        `JSON_ARRAYAGG(JSON_OBJECT('id', industry.id, 'name', industry.name, 'description', industry.description)) AS industries`,
        `JSON_ARRAYAGG(JSON_OBJECT('id', service.id, 'name', service.name, 'description', service.description)) AS services`,
      ])
      // industries
      .leftJoin(
        'cmm_organization_industries',
        'organizationIndustries',
        'organizationIndustries.organization_id = organization.id',
      )
      .leftJoin(
        'cmm_industries',
        'industry',
        'organizationIndustries.industry_id = industry.id AND industry.deleted_date IS NULL',
      )
      // services
      .leftJoin(
        'cmm_organization_services',
        'organizationServices',
        'organizationServices.organization_id = organization.id',
      )
      .leftJoin(
        'cmm_services',
        'service',
        'organizationServices.service_id = service.id AND service.deleted_date IS NULL',
      )
      // country
      .leftJoinAndSelect(
        'mas_countries',
        'country',
        'country.Id = organization.country_id AND country.deleted_date IS NULL',
      )
      // city
      .leftJoinAndSelect(
        'mas_cities',
        'city',
        'city.Id = organization.city_id AND city.deleted_date IS NULL',
      )
      // summary
      .leftJoinAndSelect(
        'cmm_organization_summaries',
        'summary',
        'summary.organization_id = organization.id',
      )
      // has follow
      .leftJoinAndSelect(
        'cmm_follows',
        'follow',
        'follow.user_id = :userFollow and follow.deleted_date is null AND follow.resource_id = organization.id',
        {
          userFollow: _.get(credentials, 'UserId'),
        },
      )
      .where('organization.deleted_date IS NULL');

    if (!_.isEmpty(query.user_id)) {
      queryBuilder
        .addSelect(
          `JSON_ARRAYAGG(JSON_OBJECT('status', organizationUsers.status,'position_id', organizationUsers.position_id, 'organization_id', organizationUsers.organization_id, 'user_id', organizationUsers.user_id)) AS organizationUser`,
        )
        .leftJoin(
          'cmm_organization_users',
          'organizationUsers',
          'organizationUsers.organization_id = organization.id',
        )
        .where('organizationUsers.status = 0')
        .andWhere('organization.deleted_date IS NULL')
        .andWhere(`organizationUsers.user_id = :userId`, {
          userId: query.user_id,
        });
    }

    if (!_.isEmpty(query.chapter_id)) {
      queryBuilder
        .leftJoin(
          'cmm_organization_chapters',
          'organizationChapter',
          'organizationChapter.organization_id = organization.id',
        )
        .where('organization.deleted_date IS NULL')
        .andWhere(`organizationChapter.chapter_id = :chapterId`, {
          chapterId: query.chapter_id,
        });
    }

    if (!_.isEmpty(query.parent_id)) {
      queryBuilder.andWhere(`organization.parent_id = :parent_id`, {
        parent_id: query.parent_id,
      });
    }

    if (!_.isEmpty(query.q)) {
      queryBuilder.andWhere(`organization.Name Like :name`, {
        name: query.q,
      });
    }

    const [rows, count] = await Promise.all([
      queryBuilder.offset(offset).limit(limit).getRawMany(),
      queryBuilder.getCount(),
    ]);

    return { rows, paging: { limit, offset, count } };
  };


  async update(id: string, body: OrganizationUpdateModel, credentials: any) {
    // await this.validateReference(body, credentials);
    const entity = await this.findByIdOrFail(id, credentials);
    const [user ] = await Promise.all([
      this.userRepository.findOneBy({
        Id: _.get(credentials, 'UserId'),
      }),
    
    ]);

    const organization = await this.validCodeUpdate(entity.Code);

    if (organization.includes(body.code)) {
      throw ResponseHelper.BadRequest('Code already exists!');
    }

    entity.Name = body.name;
    entity.Description = body.description;
    entity.Phone = body.phone;
    entity.Address = body.address;
    entity.Thumbnail = body.thumbnail;
    entity.DisplayOrder = body.display_order;

    entity.WorkingTimeStart = body.working_time_start;
    entity.WorkingTimeEnd = body.working_time_end;

    entity.Status = body.status;
    entity.Images = body.images;
    entity.Websites = body.websites;
    entity.Socials = body.socials;
    entity.Grade = body.grade;
    entity.Rate = body.rate;
    entity.Cover = body.cover;
    entity.Avatar = body.avatar;

    entity.Code = body.code;
    entity.CountryId = body.country_id;
    entity.Vision = body.vision;
    entity.Mission = body.mission;
    entity.CoreValues = body.core_values;

    entity.CreatedBy = _.get(credentials, 'UserId');

    await this.organizationRepository.save(entity);

    return entity;
  }

  async verify(body: OrganizationVerifyModel, credentials) {
    // TODO: check credentials user request has permission
    const entity = await this.findByIdOrFail(body.organization_id, credentials);

    entity.VerifiedFlag = body.verified_flag;

    await this.organizationRepository.save(entity);

    return entity;
  }

  delete = async (id, credentials) => {
    const entity = await this.findByIdOrFail(id, credentials);

    entity.DeleteDate = moment().toISOString();
    entity.DeletedBy = _.get(credentials, 'UserId');

    await this.organizationRepository.save(entity);
  };

  async findByIds(ids: string[]) {
    return this.organizationRepository.find({
      where: {
        Id: In(ids),
      },
    });
  }

  async findByIdsOrFail(ids: string[]) {
    const organizations = await this.findByIds(ids);

    if (_.isEmpty(organizations) || _.size(organizations) !== _.size(ids)) {
      throw ResponseHelper.NotFound(
        MSG.MSG_ARR_NOT_FOUND(OrganizationEntity.name),
      );
    }

    return organizations;
  }

  async findUsersByIds(ids: string[]) {
    return this.userRepository.find({
      where: {
        Id: In(ids),
      },
    });
  }

  async findUsersByIdsOrFail(ids: string[]) {
    const users = await this.findUsersByIds(ids);

    if (_.isEmpty(users) || _.size(users) !== _.size(ids)) {
      throw ResponseHelper.NotFound(MSG.MSG_ARR_NOT_FOUND(IdeUserEntity.name));
    }

    return users;
  }

}
