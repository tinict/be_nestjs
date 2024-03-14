import * as _ from 'lodash';
import moment from 'moment';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Repository } from 'typeorm';

import { ResponseHelper, QueryHelper } from '../../../../helpers';

import * as MSG from '../../../../constants/msg';

import { CustomFieldEntity } from '../entities';
import {
  CustomFieldCreateModel,
  CustomFieldQueryModel,
  CustomFieldUpdateModel,
} from '../models';
import { CustomFieldFields } from '../fields';

@Injectable()
export class CustomFieldService {
  constructor(
    @InjectRepository(CustomFieldEntity)
    private categoryRepository: Repository<CustomFieldEntity>, // private organizationService: OrganizationService,
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

  create = async (body: CustomFieldCreateModel, credentials: any) => {
    await this.validateReference(body, credentials);

    const entity = new CustomFieldEntity();
    entity.Name = body.name;
    entity.Description = body.description;
    entity.DisplayOrder = body.display_order;
    entity.ParentId = body.parent_id;
    entity.CustomFieldTypeId = body.custom_field_type_id;
    entity.CreatedBy = _.get(credentials, 'UserId');
    entity.OrganizationId = _.get(credentials, 'OrganizationId');

    return this.categoryRepository.save(entity);
  };

  all = async (query: CustomFieldQueryModel, credentials: any) => {
    const { limit = 10, offset = 0 } = query;

    const where = {
      OrganizationId: _.get(credentials, 'OrganizationId'),
      DeleteDate: IsNull(),
    };

    QueryHelper.assignQuery(where, CustomFieldFields.allowQueryField, query);

    const [rows, count] = await this.categoryRepository.findAndCount({
      where,
      relations: QueryHelper.GetRelations(
        _.get(query, 'include', ''),
        CustomFieldFields.allowRelationKey,
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
        MSG.MSG_OBJ_NOT_FOUND(CustomFieldEntity.name),
      );
    }

    return category;
  };

  update = async (
    id: string,
    body: CustomFieldUpdateModel,
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
        MSG.MSG_ARR_NOT_FOUND(CustomFieldEntity.name),
      );
    }

    return categorys;
  }

  bulk = async (models: CustomFieldCreateModel[], credentials: any) => {
    await Promise.all(
      _.map(models, async (item) => {
        let entity = await this.categoryRepository.findOne({
          where: {
            Name: item.name,
            OrganizationId: _.get(credentials, 'OrganizationId'),
          },
        });

        if (entity === null) {
          entity = new CustomFieldEntity();
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
