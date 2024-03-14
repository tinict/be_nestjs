import { BaseMapper } from '../../../../mappers/base.mapper';
import * as _ from 'lodash';

import { OrganizationMapper } from './organization.mapper';

export class UserMapper {
  static markPhoneNumber = (sdt: string) => {
    if (_.isEmpty(sdt)) return sdt;
    const maDau: string = sdt.substring(0, sdt.length - 6);
    const soGiua: string = '*'.repeat(3);
    const maCuoi: string = sdt.substring(sdt.length - 3);
    return `${maDau}${soGiua}${maCuoi}`;
  };

  static toUser = (entity: any) => {
    return {
      ...BaseMapper.toBaseMapper(entity),
      super_admin: _.get(entity, 'SuperAdmin'),
      email: _.get(entity, 'Email'),
      phone: entity?.Phone
        ? _.get(entity, 'IsPublicPhone')
          ? _.get(entity, 'Phone')
          : UserMapper.markPhoneNumber(_.get(entity, 'Phone'))
        : undefined,
      is_public_phone: _.get(entity, 'IsPublicPhone'),
      address: _.get(entity, 'Address'),
      thumbnail: _.get(entity, 'Thumbnail'),
      user_type: _.get(entity, 'UserType'),
      language: _.get(entity, 'Language'),
      timezone: _.get(entity, 'Timezone'),
      city_id: entity?.CityId,
      country_id: entity?.CountryId,
      organization_id: _.get(entity, 'OrganizationId'),
      username: _.get(entity, 'UserName'),
      has_followed: _.get(entity, 'HasFollowed'),
      has_friended: _.get(entity, 'HasFriended'),
      receiver_request_from_me: _.get(entity, 'HasReceiverRequestFromMe'),
      send_request_to_me: _.get(entity, 'HasSendRequestToMe'),
    
      organizations: !_.isEmpty(_.get(entity, 'Organizations'))
        ? OrganizationMapper.toOrganizations(entity?.Organizations)
        : undefined,
      verified_flag: _.get(entity, 'VerifiedFlag'),
      friends: !_.isEmpty(_.get(entity, 'Friends'))
        ? UserMapper.toUsers(entity?.Friends)
        : undefined,
      birthday: _.get(entity, 'Birthday'),
      gender: _.get(entity, 'Gender'),
    };
  };

  static toUsers = (entities: any[]) => _.map(entities, UserMapper.toUser);

  static toRawUser = (entity: any) => ({
    id: _.get(entity, 'id'),
    username: _.get(entity, 'username'),
    is_public_phone: _.get(entity, 'is_public_phone'),
    phone: _.get(entity, 'is_public_phone')
      ? _.get(entity, 'phone')
      : UserMapper.markPhoneNumber(_.get(entity, 'phone')),
    email: _.get(entity, 'email'),
    thumbnail: _.get(entity, 'thumbnail'),
    description: _.get(entity, 'description'),
    display_order: _.get(entity, 'display_order'),
    color: _.get(entity, 'color'),
    code: _.get(entity, 'code'),
    created_date: _.get(entity, 'created_date'),
    created_by: _.get(entity, 'created_by'),
    updated_date: _.get(entity, 'updated_date'),
    deleted_date: _.get(entity, 'deleted_date'),
    address: _.get(entity, 'address'),
    user_type: _.get(entity, 'user_type'),
    language: _.get(entity, 'language'),
    timezone: _.get(entity, 'timezone'),
    city_id: _.get(entity, 'city_id'),
    country_id: _.get(entity, 'country_id'),
    organization_id: _.get(entity, 'organization_id'),
    verified_flag: _.get(entity, 'verified_flag'),
    gender: _.get(entity, 'gender'),
    birthday: _.get(entity, 'birthday'),
    super_admin: _.get(entity, 'super_admin'),
    // organization: [
    //   _.get(entity, 'organization_id')
    //     ? {
    //         id: _.get(entity, 'organization_id'),
    //         name: _.get(entity, 'organization_name'),
    //         thumbnail: _.get(entity, 'organization_thumbnail'),
    //       }
    //     : undefined,
    // ],
    chapter: [
      _.get(entity, 'chapter_id')
        ? {
            id: _.get(entity, 'chapter_id'),
            name: _.get(entity, 'chapter_name'),
            thumbnail: _.get(entity, 'chapter_thumbnail'),
          }
        : undefined,
    ],
    summary: {
      summary_number_of_followers: _.get(entity, 'summary_number_of_followers'),
      summary_number_of_followings: _.get(
        entity,
        'summary_number_of_followings',
      ),
    },
    has_followed: !!_.get(entity, 'follow_id'),
    has_requested: !!_.get(entity, 'friend_request_sender_id'),

    has_friend: !!_.get(entity, 'friend_user_id'),
    memberships: _.get(entity, 'memberships')
      ? _.uniqBy(
          _.filter(
            _.get(entity, 'memberships'),
            (membership) => !_.isNil(membership.id),
          ),
          'id',
        )
      : undefined,
    organizations: _.get(entity, 'organizations')
      ? !_.isEmpty(
          _.filter(_.get(entity, 'organizations'), (org) => !_.isNil(org.id)),
        )
        ? _.uniqBy(
            _.filter(_.get(entity, 'organizations'), (org) => !_.isNil(org.id)),
            'id',
          )
        : undefined
      : undefined,
    positions: {
      id: _.get(entity, 'position_id'),
      name: _.get(entity, 'position_name'),
      description: _.get(entity, 'position_description'),
    },

    iam_group: {
      id: _.get(entity, 'iamGroup_id'),
      name: _.get(entity, 'iamGroup_name'),
      level: _.get(entity, 'iamGroup_level'),
    },
    chapters: _.get(entity, 'chapters')
      ? !_.isEmpty(
          _.filter(
            _.get(entity, 'chapters'),
            (chapter) => !_.isNil(chapter.id),
          ),
        )
        ? _.uniqBy(
            _.filter(
              _.get(entity, 'chapters'),
              (chapter) => !_.isNil(chapter.id),
            ),
            'id',
          )
        : undefined
      : undefined,
  });

  static toRawUsers = (entities: any[]) =>
    _.map(
      _.filter(entities, (entity) => entity.DeleteDate == null),
      UserMapper.toRawUser,
    );
}
