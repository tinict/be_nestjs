import * as _ from 'lodash';
import moment from 'moment';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Repository } from 'typeorm';

import { ResponseHelper, QueryHelper } from '../../../helpers';

import * as MSG from '../../../constants/msg';

import { CampaignPlanEntity } from '../entities';
import {
  CampaignPlanCreateModel,
  CampaignPlanQueryModel,
  CampaignPlanUpdateModel,
} from '../models';
import { CampaignPlanFields } from '../fields';

@Injectable()
export class CampaignPlanService {
  constructor(
    @InjectRepository(CampaignPlanEntity)
    private categoryRepository: Repository<CampaignPlanEntity>, // private organizationService: OrganizationService,
  ) {}

  validateReference = async (queryFields, credentials: any) => {
    return Promise.all(
      _.map(_.keys(queryFields), (key) => {
        switch (key) {
          case 'parent_id':
            return this.findByIdOrFail(queryFields[key], credentials);

          case 'organization_id':
          // return this.organizationService.findByIdOrFail(
          //   queryFields[key],
          //   credentials,
          // );

          default:
            break;
        }
      }),
    );
  };

  create = async (body: CampaignPlanCreateModel, credentials: any) => {
    await this.validateReference(body, credentials);

    const entity = new CampaignPlanEntity();
    entity.Name = body.name;
    entity.Description = body.description;
    entity.DisplayOrder = body.display_order;
    entity.ParentId = body.parent_id;
    entity.CreatedBy = _.get(credentials, 'UserId');
    entity.OrganizationId = _.get(credentials, 'OrganizationId');

    return this.categoryRepository.save(entity);
  };

  all = async (query: CampaignPlanQueryModel, credentials: any) => {
    const { limit = 10, offset = 0 } = query;

    const where = {
      OrganizationId: _.get(credentials, 'OrganizationId'),
      DeleteDate: IsNull(),
    };

    QueryHelper.assignQuery(
      where,
      CampaignPlanFields.allowQueryField,
      query,
    );

    const [rows, count] = await this.categoryRepository.findAndCount({
      where,
      relations: QueryHelper.GetRelations(
        _.get(query, 'include', ''),
        CampaignPlanFields.allowRelationKey,
      ),
      order: {
        DisplayOrder: 'ASC',
      },
      skip: offset,
      take: limit,
    });

    return { rows, paging: { limit, offset, count } };
  };

  findById = (id: string, credentials: any, options = undefined) =>
    this.categoryRepository.findOne(
      _.omit(
        {
          where: {
            Id: id,
            OrganizationId: _.get(credentials, 'OrganizationId'),
            DeleteDate: IsNull(),
          },
          relations: !_.isNil(_.get(options, 'include'))
            ? _.get(options, 'include')
            : undefined,
        },
        undefined,
      ),
    );

  findByIdOrFail = async (
    id: string,
    credentials: any,
    options = undefined,
  ) => {
    const category = await this.findById(id, credentials, options);

    if (_.isNil(category)) {
      throw ResponseHelper.NotFound(
        MSG.MSG_OBJ_NOT_FOUND(CampaignPlanEntity.name),
      );
    }

    return category;
  };

  update = async (
    id: string,
    body: CampaignPlanUpdateModel,
    credentials: any,
  ) => {
    await this.validateReference(body, credentials);

    const entity = await this.findByIdOrFail(id, credentials);

    if (body.parent_id && entity.ParentId !== body.parent_id) {
      await this.findByIdOrFail(body.parent_id, credentials);
    }

    entity.Name = body.name;
    entity.Description = body.description;
    entity.DisplayOrder = body.display_order;
    entity.ParentId = body.parent_id;

    await this.categoryRepository.save(entity);

    return entity;
  };

  async findByIds(ids: string[]) {
    return this.categoryRepository.find({
      where: {
        Id: In(ids),
        // OrganizationId: _.get(credentials, 'OrganizationId'),
      },
    });
  }

  async findByIdsOrFail(ids: string[]) {
    const categorys = await this.findByIds(ids);

    if (_.isEmpty(categorys) || _.size(categorys) !== _.size(ids)) {
      throw ResponseHelper.NotFound(
        MSG.MSG_ARR_NOT_FOUND(CampaignPlanEntity.name),
      );
    }

    return categorys;
  }

  bulk = async (models: CampaignPlanCreateModel[], credentials: any) => {
    await Promise.all(
      _.map(models, async (item) => {
        let entity = await this.categoryRepository.findOne({
          where: {
            Id: item.id,
            OrganizationId: _.get(credentials, 'OrganizationId'),
          },
        });

        if (entity === null) {
          entity = new CampaignPlanEntity();
          entity.CreatedBy = _.get(credentials, 'UserId');
          entity.OrganizationId = _.get(credentials, 'OrganizationId');
        }
        entity.Name = item.name;
        entity.Description = item.description;
        entity.Code = item.code;
        entity.DisplayOrder = item.display_order;

        return this.categoryRepository.save(entity);
      }),
    );
  };

  delete = async (id, credentials) => {
    const entity = await this.findByIdOrFail(id, credentials);

    entity.DeleteDate = moment().toISOString();
    entity.DeletedBy = _.get(credentials, 'UserId');

    return this.categoryRepository.save(entity);
  };
}