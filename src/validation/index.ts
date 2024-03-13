import * as _ from 'lodash';
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'param') {
      return value;
    }
    const { error } = this.schema.validate(value, { allowUnknown: true });
    let errors = [];
    const errorCodes = [];
    if (error) {
      errors = _.concat(
        errors,
        _.map(error.details, (item) => ({
          field: _.get(item, 'context.label'),
          code: _.get(errorCodes, item.type),
          ..._.pick(item, ['message']),
        })),
      );

      if (!_.isEmpty(errors)) {
        throw new BadRequestException(errors);
      }
    }
    return value;
  }
}
