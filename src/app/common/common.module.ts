import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthenticationMiddleware } from '../../middlewares/auth.middleware';
import {
  CustomFieldEntity,
  CustomFieldTypeEntity,
  CustomFieldValueEntity,
  ResourceCustomFieldEntity,
  ResourceCustomFieldValueEntity,
} from './entities';
import {
  CustomFieldController,
  CustomFieldTypeController,
  CustomFieldValueController,
  ResourceCustomFieldController,
  ResourceCustomFieldValueController,
} from './controllers';
import {
  CustomFieldService,
  CustomFieldTypeService,
  CustomFieldValueService,
  ResourceCustomFieldService,
  ResourceCustomFieldValueService,
} from './services';
import { UserEntity } from '../recruiting/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomFieldEntity,
      CustomFieldTypeEntity,
      CustomFieldValueEntity,
      ResourceCustomFieldEntity,
      ResourceCustomFieldValueEntity,
      UserEntity,
    ]),
  ],
  controllers: [
    CustomFieldController,
    CustomFieldTypeController,
    CustomFieldValueController,
    ResourceCustomFieldController,
    ResourceCustomFieldValueController,
  ],
  providers: [
    CustomFieldService,
    CustomFieldTypeService,
    CustomFieldValueService,
    ResourceCustomFieldService,
    ResourceCustomFieldValueService,
  ],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(
        CustomFieldController,
        CustomFieldTypeController,
        CustomFieldValueController,
        ResourceCustomFieldController,
        ResourceCustomFieldValueController,
      );
  }
}
