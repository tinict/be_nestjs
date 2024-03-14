import * as _ from 'lodash';

import { BaseMapper } from '../../../../mappers/base.mapper';
import { UserMapper } from './user.mapper';

export class OrganizationMapper {
  static toOrganization = (entity: any) => ({
    ...BaseMapper.toBaseMapper(entity),
    phone: _.get(entity, 'Phone'),
    address: _.get(entity, 'Address'),
    thumbnail: _.get(entity, 'Thumbnail'),
    activation_date: _.get(entity, 'ActivationDate'),
    status: _.get(entity, 'Status'),
    images: _.get(entity, 'Images'),
    websites: _.get(entity, 'Websites'),
    socials: _.get(entity, 'Socials'),
    grade: _.get(entity, 'Grade'),
    rate: _.get(entity, 'Rate'),
    cover: _.get(entity, 'Cover'),
    avatar: _.get(entity, 'Avatar'),
    has_followed: _.get(entity, 'HasFollowed'),
    vision: entity?.Vision,
    mission: entity?.Mission,
    core_values: entity?.CoreValues,
    city_id: entity?.CityId,
    country_id: entity?.CountryId,
    working_time_start: entity?.WorkingTimeStart,
    working_time_end: entity?.WorkingTimeEnd,
    verified_flag: entity?.VerifiedFlag,
    users: !_.isEmpty(entity?.Users)
      ? UserMapper.toUsers(entity.Users)
      : undefined,
  });

  static toOrganizations = (entities: any[]) =>
    _.map(entities, OrganizationMapper.toOrganization);

  static toRawOrganization = (entity: any) => ({
    id: _.get(entity, 'id'),
    name: _.get(entity, 'name'),
    description: _.get(entity, 'description'),
    display_order: _.get(entity, 'display_order'),
    color: _.get(entity, 'color'),
    code: _.get(entity, 'code'),
    created_date: _.get(entity, 'created_date'),
    created_by: _.get(entity, 'created_by'),
    updated_date: _.get(entity, 'updated_date'),
    deleted_date: _.get(entity, 'deleted_date'),
    parent_id: _.get(entity, 'parent_id'),
    thumbnail: _.get(entity, 'thumbnail'),
    address: _.get(entity, 'address'),
    phone: UserMapper.markPhoneNumber(_.get(entity, 'phone')),
    activation_date: _.get(entity, 'activation_date'),
    status: _.get(entity, 'status'),
    images: _.get(entity, 'images'),
    websites: _.get(entity, 'websites'),
    socials: _.get(entity, 'socials'),
    grade: _.get(entity, 'grade'),
    rate: _.get(entity, 'rate'),
    cover: _.get(entity, 'cover'),
    avatar: _.get(entity, 'avatar'),
    vision: _.get(entity, 'vision'),
    mission: _.get(entity, 'mission'),
    core_values: _.get(entity, 'core_values'),
    country_id: _.get(entity, 'country_id'),
    working_time_start: _.get(entity, 'working_time_start'),
    working_time_end: _.get(entity, 'working_time_end'),
    verified_flag: _.get(entity, 'verified_flag'),
    services: _.get(entity, 'services')
      ? !_.isEmpty(_.filter(_.get(entity, 'services'), (e) => !_.isNil(e.id)))
        ? _.uniqBy(
            _.filter(_.get(entity, 'services'), (e) => !_.isNil(e.id)),
            'id',
          )
        : undefined
      : undefined,
    industries: _.get(entity, 'industries')
      ? !_.isEmpty(_.filter(_.get(entity, 'industries'), (e) => !_.isNil(e.id)))
        ? _.uniqBy(
            _.filter(_.get(entity, 'industries'), (e) => !_.isNil(e.id)),
            'id',
          )
        : undefined
      : undefined,
    organization_user: _.get(entity, 'organizationUser'),
    summary: {
      summary_number_of_followers: _.get(entity, 'summary_number_of_followers'),
    },
    has_followed: !!_.get(entity, 'follow_id'),
  });

  static toRawOrganizations = (entities: any[]) =>
    _.map(
      _.filter(entities, (entity) => entity.DeleteDate == null),
      OrganizationMapper.toRawOrganization,
    );
}
