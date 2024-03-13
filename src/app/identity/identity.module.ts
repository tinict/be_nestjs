import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthenticationMiddleware } from "src/middlewares";
import { MailerService } from "../mailer/mailer.service";
import { AuthenticationController, AuthorizeController, OrganizationController, UserController } from "./controllers";
import { IdeUserEntity, OrganizationEntity, WorkspaceEntity } from "./entities";
import { AuthenticationService, OrganizationService, UserService } from "./services";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      IdeUserEntity,
      OrganizationEntity,
      WorkspaceEntity
    ]),
  ],
  controllers: [
    AuthenticationController,
    AuthorizeController,
    OrganizationController,
    UserController
  ],
  providers: [
    AuthenticationService,
    OrganizationService,
    UserService,
    MailerService
  ],
})
export class IdentityModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes();
  }
}
