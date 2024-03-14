import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MailerService } from "../mailer/mailer.service";
import { UserEntity } from "../recruiting/entities";
import { AuthenticationController, AuthorizeController, OrganizationController, UserController } from "./controllers";
import { IdeUserEntity, OrganizationEntity, WorkspaceEntity } from "./entities";
import { AuthenticationMiddleware } from "./middlewares/auth.middleware";
import { AuthenticationService, OrganizationService, UserService } from "./services";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
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
    MailerService,
    AuthenticationMiddleware
  ],
})
export class IdentityModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes();
  }
}
