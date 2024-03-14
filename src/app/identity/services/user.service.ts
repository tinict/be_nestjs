import * as _ from 'lodash';
import moment from 'moment';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Repository } from 'typeorm';
import { ResponseHelper, QueryHelper } from '../../../helpers';
import * as MSG from '../../../constants/msg';

import {
  IdeUserEntity,
} from '../entities';
import {
  UserVerifyModel,
  UserCreateModel,
  UserQueryModel,
  UserUpdateModel,
  UserUpdatePasswordModel,
  UserUpdatePhoneModel,
} from '../models';
import { OrganizationService } from './organization.service';
import AuthenticationCrypto from 'src/app/recruiting/middlewares/authentication-crypto';
import { RESOURCE_TYPE } from 'src/constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(IdeUserEntity)
    private userRepository: Repository<IdeUserEntity>,
  
    private organizationService: OrganizationService,
  ) {}

  validateReference = async (queryFields, credentials: any) => {
    return Promise.all(
      _.map(_.keys(queryFields), (key) => {
        switch (key) {
          case 'organization_id':
            return this.organizationService.findByIdOrFail(
              queryFields[key],
              credentials,
            );

          default:
            break;
        }
      }),
    );
  };

  async create(body: UserCreateModel, credentials: any) {
    await this.validateReference(body, credentials);

    const entity = new IdeUserEntity();
    entity.Phone = body.phone;
    entity.UserName = body.username;
    entity.Password = AuthenticationCrypto.encrypt(body.password);
    entity.Description = body.description;
    entity.DisplayOrder = body.display_order;
    entity.CreatedBy = _.get(credentials, 'UserId');
    entity.OrganizationId = _.get(credentials, 'OrganizationId');
    entity.WorkspaceId = _.get(credentials, 'WorkspaceId');

    return this.userRepository.save(entity);
  }

  async getAll(query: UserQueryModel, credentials: any) {
    await this.validateReference(query, credentials);

    const { limit = 10, offset = 0 } = query;

    const queryBuilder = await this.userRepository
      .createQueryBuilder('user')
      .groupBy('user.Id')
      .select([
        `JSON_ARRAYAGG(JSON_OBJECT('id', organization.id, 'name', organization.name, 'thumbnail', organization.thumbnail)) AS organizations`,
        `JSON_ARRAYAGG(JSON_OBJECT('id', chapter.id, 'name', chapter.name, 'thumbnail', chapter.thumbnail)) AS chapters`,
        'user.*',
        `JSON_ARRAYAGG(JSON_OBJECT(
          'id', organization.id,
          'name', organization.name,
          'description', organization.description,
          'display_order', organization.display_order,
          'color', organization.color,
          'code', organization.code,
          'created_date', organization.created_date,
          'created_by', organization.created_by,
          'updated_date', organization.last_update_date,
          'deleted_date', organization.deleted_date,
          'parent_id', organization.parent_id,
          'thumbnail', organization.thumbnail,
          'phone', organization.phone,
          'address', organization.address,
          'activation_date', organization.activation_date,
          'status', organization.status,
          'images', organization.images,
          'websites', organization.websites,
          'socials', organization.socials,
          'grade', organization.grade,
          'rate', organization.rate,
          'cover', organization.cover,
          'avatar', organization.avatar,
          'vision', organization.vision,
          'mission', organization.mission,
          'core_values', organization.core_values,
          'city_id', organization.city_id,
          'country_id', organization.country_id,
          'working_time_start', organization.working_time_start,
          'working_time_end', organization.working_time_end,
          'verified_flag', organization.verified_flag )) AS organizations`,
        `JSON_ARRAYAGG(JSON_OBJECT(
          'id', chapter.id,
          'name', chapter.name,
          'description', chapter.description,
          'display_order', chapter.display_order,
          'color', chapter.color,
          'code', chapter.code,
          'created_date', chapter.created_date,
          'created_by', chapter.created_by,
          'last_update_by', chapter.last_updated_by,
          'updated_date', chapter.last_update_date,
          'deleted_date', chapter.deleted_date,
          'parent_id', chapter.parent_id)) AS chapters`,
        `JSON_ARRAYAGG(JSON_OBJECT(
            'id', membership.id,
            'name', membership.name,
            'from_date', membership.from_date,
            'to_date', membership.to_date,
            'member_type', membership.member_type
          )) AS memberships`,
      ])
      .leftJoinAndSelect(
        'cmm_organization_users',
        'userOrganization',
        'userOrganization.user_id = user.id',
      )
      .leftJoin(
        'cmm_organizations',
        'organization',
        'organization.id = userOrganization.organization_id',
      )
      .leftJoinAndSelect(
        'cmm_user_chapters',
        'userChapter',
        'userChapter.user_id = user.id',
      )
      .leftJoin(
        'cmm_chapters',
        'chapter',
        'chapter.id = userChapter.chapter_id',
      )
      .leftJoin(
        'cmm_member_verify_histories',
        'membership',
        'membership.user_id = user.id',
      )
      .leftJoinAndSelect(
        'cmm_friends',
        'friend',
        'friend.user_id = :friendUserId AND friend.friend_id = user.Id AND friend.deleted_date IS NULL',
        {
          friendUserId: _.get(credentials, 'UserId'),
        },
      )
      .leftJoinAndSelect(
        'cmm_friend_requests',
        'friend_request',
        'friend_request.sender_id = :userFriendRequest AND friend_request.DeleteDate IS NULL AND friend_request.Status = 0 AND friend_request.receiver_id = user.Id',
        {
          userFriendRequest: _.get(credentials, 'UserId'),
        },
      )
      .leftJoinAndSelect(
        'cmm_follows',
        'follow',
        'follow.user_id = :userFollow AND follow.DeleteDate IS NULL AND follow.ResourceId = user.Id',
        {
          userFollow: _.get(credentials, 'UserId'),
        },
      )
      .leftJoin(
        'cmm_blocks',
        'block',
        '(block.ResourceId = user.Id OR block.UserId = user.Id) AND block.DeleteDate IS NULL AND (block.user_id = :userBlockId OR block.resource_id = :userBlockId)',
        {
          userBlockId: _.get(credentials, 'UserId'),
        },
      )
      .leftJoinAndSelect(
        'mas_countries',
        'country',
        'country.Id = user.CountryId AND country.DeleteDate IS NULL',
      )
      .leftJoinAndSelect(
        'mas_cities',
        'city',
        'city.Id = user.CityId AND city.DeleteDate IS NULL',
      )
      .leftJoinAndSelect(
        'cmm_user_summaries',
        'summary',
        'summary.UserId = :userSummary',
        {
          userSummary: _.get(credentials, 'UserId'),
        },
      )
      .where('user.DeleteDate IS NULL')
      .andWhere('block.Id IS NULL');

    if (!_.isEmpty(query.organization_id)) {
      queryBuilder
        .leftJoinAndSelect(
          'cmm_positions',
          'position',
          'position.Id = userOrganization.position_id AND position.DeleteDate IS NULL',
        )
        .andWhere(`userOrganization.organization_id = :organizationId`, {
          organizationId: query.organization_id,
        });
    }

    if (!_.isEmpty(query.status)) {
      queryBuilder.andWhere(`userOrganization.Status = :status`, {
        status: query.status,
      });
    }

    if (!_.isEmpty(query.chapter_id)) {
      queryBuilder
        .leftJoinAndSelect(
          'cmm_iam_groups',
          'iamGroup',
          'iamGroup.Id = userChapter.iam_group_id',
        )
        .andWhere(
          `userChapter.chapter_id = :chapterId AND iamGroup.chapter_id = :chapterId`,
          {
            chapterId: query.chapter_id,
          },
        );
    }

    if (!_.isEmpty(query.q)) {
      queryBuilder.andWhere(
        `user.DeleteDate IS NULL AND (LOWER(user.UserName) LIKE LOWER('${query.q}') 
        or LOWER(user.Email) LIKE LOWER('${query.q}') 
        or LOWER(user.Phone) LIKE LOWER('${query.q}'))`,
      );
    }

    // console.log(queryBuilder.getQuery());

    const [rows, count] = await Promise.all([
      queryBuilder.offset(offset).limit(limit).getRawMany(),
      queryBuilder.getCount(),
    ]);
    // console.log(rows);

    return { rows, paging: { limit, offset, count } };
  }

  findById = async (id, credentials, options = undefined) => {
    const user = await this.userRepository.findOne(
      _.omit(
        {
          where: {
            Id: id,
            DeleteDate: IsNull(),
          },
        },
        undefined,
      ),
    );
    return user;
  };

  findByIdOrFail = async (id, credentials, options = null) => {
    const user = await this.findById(id, credentials, options);

    if (_.isNil(user)) {
      throw ResponseHelper.NotFound(MSG.MSG_OBJ_NOT_FOUND(IdeUserEntity.name));
    }

    return user;
  };

  async findByIds(ids: string[]) {
    return this.userRepository.find({
      where: {
        Id: In(ids),
      },
    });
  }

  async findByIdsOrFail(ids: string[]) {
    const users = await this.findByIds(ids);

    if (_.isEmpty(users) || _.size(users) !== _.size(ids)) {
      throw ResponseHelper.NotFound(MSG.MSG_ARR_NOT_FOUND(IdeUserEntity.name));
    }

    return users;
  }

  async update(id: string, body: UserUpdateModel, credentials: any) {
    const entity = await this.findByIdOrFail(id, credentials);

    entity.UserName = body.username;
    entity.Address = body.address;
    entity.Thumbnail = body.thumbnail;
    entity.Description = body.description;
    entity.DisplayOrder = body.display_order;
    entity.Birthday = body.birthday;
    entity.Gender = body.gender;
    entity.Language = body.language;
    entity.Timezone = body.timezone;
    entity.SuperAdmin = body.super_admin;
    entity.IsPublicPhone = body.is_public_phone;
    await this.userRepository.save(entity);
    return entity;
  }

  async changePassword(
    id: string,
    body: UserUpdatePasswordModel,
    credentials: any,
  ) {
    const user = await this.userRepository.findOne({
      where: {
        Id: _.get(credentials, 'UserId'),
      },
      relations: ['Organizations'],
    });

    if (user.Password !== AuthenticationCrypto.encrypt(body.password)) {
      throw ResponseHelper.BadRequest('password_not_match');
    }
    const entity = await this.findByIdOrFail(id, credentials);
    return entity;
  }

  async verify(body: UserVerifyModel, credentials) {
    // TODO: check user request has permission
    const entity = await this.findByIdOrFail(body.user_id, credentials);

    entity.VerifiedFlag = body.verified_flag;

    await this.userRepository.save(entity);

    return entity;
  }

  delete = async (id, credentials) => {
    await this.hasPermission(id, credentials);
    const entity = await this.findByIdOrFail(id, credentials);

    entity.DeleteDate = moment().toISOString();
    entity.DeletedBy = _.get(credentials, 'UserId');

    await this.userRepository.save(entity);
  };

  hasPermission = async (userId: string, credentials: any) => {
    const hasPermission = await this.userRepository.exist({
      where: {
        Id: _.get(credentials, 'UserId'),
        SuperAdmin: 1,
      },
    });

    if (!hasPermission && userId != _.get(credentials, 'UserId')) {
      throw ResponseHelper.Forbidden(MSG.MSG_DO_NOT_PERMISSION);
    }
  };

  async changePhone(id: string, body: UserUpdatePhoneModel, credentials: any) {
    const entity = await this.findByIdOrFail(id, credentials);

    const users = await this.userRepository.find({
      where: {
        DeleteDate: IsNull(),
      },
    });

    const phones = _.map(users, 'Phone');

    if (phones.includes(body.phone)) {
      throw ResponseHelper.BadRequest('Phone number already exists!');
    }
    entity.Phone = body.phone;

    await this.userRepository.save(entity);
    return entity;
  }
}
