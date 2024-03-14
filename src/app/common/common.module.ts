import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  CommonUserEntity,
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
import { AuthenticationMiddleware } from './middlewares';
import { UserEntity } from '../recruiting/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity, 
      CustomFieldEntity,
      CustomFieldTypeEntity,
      CustomFieldValueEntity,
      ResourceCustomFieldEntity,
      ResourceCustomFieldValueEntity,
      CommonUserEntity,
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
