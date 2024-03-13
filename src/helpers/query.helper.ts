import * as _ from 'lodash';
import { Like } from 'typeorm';

export class QueryHelper {
  static GetRelations = (include, allowRelationKey) => {
    const relations = [];

    if (!_.isNil(include)) {
      const keys = _.keys(allowRelationKey);

      _.forEach(keys, (key) => {
        if (include.split(',').includes(key)) {
          relations.push(allowRelationKey[key]);
        }
      });
    }

    return relations;
  };

  static assignQuery(where, allowQueryField, query) {
    for (const key of _.keys(allowQueryField)) {
      const value = query[key];
      if (!_.isEmpty(value)) {
        if (_.size(value.split(',')) > 1) {
          where = _.map(value.split(','), (item) => {
            if (item.includes('%')) {
              return { [allowQueryField[key]]: Like(item), ...where };
            }

            return { [allowQueryField[key]]: item, ...where };
          });
        }
        if (value.includes('%')) {
          if (_.isArray(allowQueryField[key])) {
            const orWhere = [];

            _.forEach(allowQueryField[key], (k) => {
              orWhere.push({ [k]: Like(query[key]) });
            });

            where = _.map(orWhere, (query) => ({
              ...where,
              ...query,
            }));

            return where;
          } else {
            _.set(where, allowQueryField[key], Like(query[key]));
          }
        } else {
          if (_.isArray(allowQueryField[key])) {
            const orWhere = [];

            _.forEach(allowQueryField[key], (k) => {
              orWhere.push({ [k]: query[key] });
            });

            where = _.map(orWhere, (query) => ({
              ...where,
              ...query,
            }));

            return where;
          } else {
            _.set(where, allowQueryField[key], query[key]);
          }
        }
      }
    }

    return where;
  }
}
