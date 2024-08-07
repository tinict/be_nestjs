import * as _ from 'lodash';

export class GoogleProfileMapper {
    static toGoogleProfile = (entity: any) => {
        return {
            google_id: _.get(entity, 'google_id'),
            firstName: _.get(entity, 'firstName'),
            lastName: _.get(entity, 'lastName'),
            picture: _.get(entity, 'picture'),
            accessToken: _.get(entity, 'accessToken'),
            refreshToken: _.get(entity, 'refreshToken'),
            email: _.get(entity, 'email'),
        };
    }
};
