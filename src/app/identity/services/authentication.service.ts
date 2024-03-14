import * as _ from 'lodash';
import * as CRYPTO from 'crypto';
import * as JWT from 'jsonwebtoken';
import { Request } from 'express';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as MSG from '../../../constants/msg';
import AuthenticationCrypto from '../../recruiting/middlewares/authentication-crypto';

import { ResponseHelper } from '../../../helpers/response.helper';
import { IsNull, Repository } from 'typeorm';
import {
  IdeUserEntity,
} from '../entities';
import { LoginModel } from '../models';
import { RegisterModel } from '../models';
import { StringHelper } from '../../../helpers/string.helper';
import { OrganizationService } from './organization.service';
import { ChangePasswordModel, MemberRegisterModel } from '../models';
import DeviceDetector from 'device-detector-js';

import { MailerService } from '../../mailer/mailer.service';
import { SendMailModel } from '../../mailer/models/send-email.model';
import { ResetPasswordModel } from '../models/reset-password.model';
import { VerifyRegisterModel } from '../models/verify-register.model';
import { ForgotPasswordModel } from '../models/forgot-password.model';

@Injectable()
export class AuthenticationService {
  readonly deviceDetector = new DeviceDetector();

  constructor(
    @InjectRepository(IdeUserEntity)
    private userRepository: Repository<IdeUserEntity>,
    private organizationService: OrganizationService,

    private mailerService: MailerService,
  ) {}

  async findUserByPhone(phone: string) {
    return this.userRepository.findOne({
      where: {
        DeleteDate: IsNull(),
        Phone: phone,
      },
    });
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        DeleteDate: IsNull(),
        Email: email,
      },
    });
  }

  validUser(user: RegisterModel): ResponseHelper | true {
    const props = Object.getOwnPropertyNames(new RegisterModel());
    for (const prop of props) {
      if (_.isNil(user[prop]) || user[prop] === '') {
        return ResponseHelper.BadRequest(MSG.MSG_FIELD_REQUIRED(prop));
      }
    }
    return true;
  }

  generateAccessToken(user: any) {
    const expired = new Date(
      new Date().getTime() + +process.env.TOKEN_PERIOD || 300,
    ).getTime();

    const payload = {
      user_id: user.Id,
      organization_id: user.OrganizationId,
      exp: expired,
    };

    let accessToken: string;

    try {
      accessToken = JWT.sign(
        AuthenticationCrypto.encrypt(JSON.stringify(payload)),
        process.env.AUTH_SECRET_KEY || 'gce_secrect',
      );
    } catch (error) {
      throw ResponseHelper.InternalServerError();
    }

    return accessToken;
  }

  async register(userRegister: RegisterModel) {
    const currentUser = await this.findUserByPhone(userRegister.phone);

    if (currentUser && currentUser.Phone) {
      return ResponseHelper.BadRequest(
        MSG.MSG_OBJ_ALREADY_EXIST(IdeUserEntity.name),
        'US0401',
      );
    }

    const verifyCode = StringHelper.makeVerifyCode(6);

    // const organization = await this.organizationService.create(
    //   {
    //     name: userRegister.company_name,
    //     phone: userRegister.phone,
    //     description: '',
    //     code: userRegister.key,
    //     company_size: userRegister.company_size,
    //   } as OrganizationCreateModel,
    //   {
    //     userId: userRegister.email,
    //   },
    // );

    let user = new IdeUserEntity();
    user.UserName = userRegister.username;
    user.Phone = userRegister.phone;
    user.Email = userRegister.email || '';
    user.Password = AuthenticationCrypto.encrypt(userRegister.password);
    user.VerifyCode = verifyCode;
    user.VerifiedFlag = 0;
    // user.OrganizationId = organization.Id;

    user = await this.userRepository.save(user);

    // Create user profile

    // Send email to verify account
    const sendEmailModel = new SendMailModel(
      user.Email,
      'Register successfully',
      'register.template.ejs',
      {
        code: verifyCode,
        username: userRegister.username,
      },
    );
    await this.mailerService.sendMail(sendEmailModel);

    return { message: `${MSG.MSG_OBJ_CREATE_SUCCESSFULLY(IdeUserEntity.name)}` };
  }

  async memberRegister(userRegister: MemberRegisterModel) {
    const currentUser = await this.findUserByPhone(userRegister.phone);

    if (currentUser && currentUser.Phone) {
      return ResponseHelper.BadRequest(
        MSG.MSG_OBJ_ALREADY_EXIST(IdeUserEntity.name),
      );
    }

    const verifyCode = StringHelper.makeVerifyCode(6);

    const organization = await this.organizationService.findByIdOrFail(
      userRegister.organization_id,
      null,
    );

    const user = new IdeUserEntity();
    user.UserName = userRegister.username;
    user.Phone = userRegister.phone;
    user.Email = userRegister.email || '';
    user.Password = AuthenticationCrypto.encrypt(userRegister.password);
    user.VerifyCode = verifyCode;
    user.VerifiedFlag = 0;
    user.OrganizationId = organization.Id;
    user.UserType = 1;

    await this.userRepository.save(user);
    // Create user profile

    // Send email to verify account
    // await this.mailerService.sendMail({
    //     to: userRegister.email,
    //     subject: 'Welcome the 3Smart',
    //     template: 'register.template.hbs',
    //     context: {
    //         code: verifyCode,
    //         username: userRegister.username,
    //     },
    // });

    return { message: `${MSG.MSG_OBJ_CREATE_SUCCESSFULLY(IdeUserEntity.name)}` };
  }

  async login(userLogin: LoginModel, req: any) {
    const user = await this.userRepository.findOne({
      where: [
        {
          DeleteDate: IsNull(),
          Phone: userLogin.phone,
        },
      ],
    });

    if (!user) {
      throw ResponseHelper.UnAuthorized(MSG.MSG_OBJ_NOT_FOUND(IdeUserEntity.name));
    }

    // check password
    if (user.Password !== AuthenticationCrypto.encrypt(userLogin.password)) {
      throw ResponseHelper.UnAuthorized(MSG.MSG_OBJ_NOT_FOUND(IdeUserEntity.name));
    }

    if (user.LockedFlag) {
      throw ResponseHelper.UnAuthorized(MSG.MSG_USER_WAS_LOCKED);
    }

    if (user.EnableFlag) {
      throw ResponseHelper.UnAuthorized(MSG.MSG_OBJ_DISABLED(IdeUserEntity.name));
    }

    // Generate refresh_token
    const refreshToken = CRYPTO.randomBytes(64).toString('hex');

    // let userLoginResult: UserLogin;
    // let userLoginHistoryResult: UserLoginHistory;
    // let activityResult: Activity;
    // let notificationResult: ResNotification;
    // Save login info
    // await Promise.all([
    //     // Save to login table
    //     await this.userLoginService.save({
    //         AccessToken,
    //         RefreshToken,
    //         Expired,
    //         User: user,
    //     }).catch(() => new ResponseHelper()),

    //     // Save to login_history_table
    //     await this.userLoginHistoryService.save({
    //         User: user, Location: '', IPAddress: '',
    //     }).catch(() => new ResponseHelper()),

    //     // Save activity
    //     await this.activityService.save({
    //         User: user,
    //     }).catch(() => new ResponseHelper()),

    //     // Send Notification
    //     await this.notificationService.send({
    //         User: user,
    //     }).catch(() => new ResponseHelper()),

    // ]).then(values => {
    //     userLoginResult = values[0] as UserLogin;
    //     userLoginHistoryResult = values[1] as UserLoginHistory;
    //     activityResult = values[2] as Activity;
    //     notificationResult = values[3] as ResNotification;
    // });

    // [userLoginResult, userLoginHistoryResult, activityResult, notificationResult].forEach(ResponseHelper => {
    //     if (ResponseHelper instanceof ResponseHelper) {
    //         return ResponseHelper.InternalServerError();
    //     }
    // });

    const accessToken = this.generateAccessToken(user);

  
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user,
    };
  }
  async validateRequest(req: Request) {
    if (!req?.headers?.authorization) {
      throw ResponseHelper.UnAuthorized(MSG.MSG_AUTH_FAILED);
    }
    const authorization = req.headers.authorization.replace('Bearer ', '');

    let payload;
    try {
      payload = JSON.parse(
        AuthenticationCrypto.decrypt(
          JWT.verify(
            authorization,
            process.env.AUTH_SECRET_KEY || 'gce_secrect',
          ),
        ),
      );
    } catch (error) {
      throw ResponseHelper.UnAuthorized(MSG.MSG_AUTH_FAILED);
    }
    if (!payload.user_id) {
      throw ResponseHelper.UnAuthorized(MSG.MSG_AUTH_FAILED);
    }

    if (payload.exp > new Date().getTime()) {
      throw ResponseHelper.UnAuthorized(MSG.MSG_AUTH_HAS_EXPIRED);
    }

    try {
      // const userLogin = await this.userLoginService.getByAccessToken(authorization);

      // if (!userLogin) {
      //     return ResponseHelper.UnAuthorized(MSG.MSG_AUTH_FAILED);
      // }
      // if (userLogin.UserId !== payload.user_id) {
      //     return ResponseHelper.UnAuthorized(MSG.MSG_AUTH_FAILED);
      // }

      // // Check User isLocked
      // let user: User;
      // user = await this.userRepository.findOne(
      //     {
      //         relations: [UserFields.UserGroups, UserFields.Organization],
      //         where: { Id: userLogin.UserId, DeleteFlag: DeleteFlag.None },
      //     });
      // if (user.LockedFlag) {
      //     return ResponseHelper.UnAuthorized(MSG.MSG_USER_WAS_LOCKED);
      // }

      // if (user.EnableFlag) {
      //     return ResponseHelper.UnAuthorized(MSG.MSG_OBJ_DISABLED(User.name));
      // }

      req.body.credentials = {
        UserId: payload.user_id,
        organizationId: payload.organization_id,
      };
    } catch (error) {
      throw ResponseHelper.InternalServerError();
    }

    return true;
  }

  me = async (credentials) => {
    const user = await this.userRepository.findOne({
      where: {
        Id: _.get(credentials, 'UserId'),
      },
      relations: [
        // 'Organizations',
        // 'Organizations.Industries',
        // 'UserOrganizations',
        // 'UserOrganizations.UserInvited',
        // 'UserOrganizations.Position',
        // 'UserOrganizations.IAMGroup',
        // 'UserOrganizations.IAMGroup.IAMPermissions',
        'Country',
        'City',
        // 'Chapters',
        // 'UserChapters',
        // 'UserChapters.IAMGroup',
        // 'UserChapters.IAMGroup.IAMPermissions',
      ],
    });

    //user.Chapters[0].UserChapters[0].IAMGroup.IAMPermissions
    //user.UserChapters

    // await Promise.all([
    // _.forEach(_.get(user, 'Organizations'), (org) => {
    //   const userOrganization = _.find(
    //     _.get(user, 'UserOrganizations'),
    //     (ou) => ou.OrganizationId === org.Id,
    //   );
    //   if (userOrganization) {
    //     org.OrganizationUser = userOrganization;
    //   }
    // }),
    // _.forEach(_.get(user, 'Chapters'), (chapter) => {
    //   const userChapter = _.find(
    //     _.get(user, 'UserChapters'),
    //     (ou) => ou.ChapterId === chapter.Id,
    //   );
    //   if (userChapter) {
    //     chapter.UserChapter = userChapter;
    //   }
    // }),
    // ]);

    return user;
  };

  async changePassword(model: ChangePasswordModel, credentials: any) {
    const user = await this.userRepository.findOne({
      where: {
        Id: _.get(credentials, 'UserId'),
      },
      relations: ['Organizations'],
    });

    if (user.Password !== AuthenticationCrypto.encrypt(model.old_password)) {
      throw ResponseHelper.BadRequest('password_not_match');
    }

    user.Password = AuthenticationCrypto.encrypt(model.new_password);

    return this.userRepository.save(user);
  }

  verifyRegister = async (body: VerifyRegisterModel) => {
    const user = await this.userRepository.findOne({
      where: {
        VerifyCode: body.verify_code,
      },
    });

    if (!user) {
      throw ResponseHelper.BadRequest();
    }

    user.VerifiedFlag = 1;
    user.VerifyCode = '';

    await this.userRepository.save(user);

    return ResponseHelper.Ok();
  };

  forgotPassword = async (body: ForgotPasswordModel) => {
    const user = await this.userRepository.findOne({
      where: {
        Email: body.email,
      },
    });

    if (!user) {
      throw ResponseHelper.BadRequest('email is invalid');
    }

    const sendEmailModel = new SendMailModel(
      user.Email,
      'Reset password',
      'reset-password.template.ejs',
      {
        code: user.VerifyCode,
        username: user.UserName,
      },
    );
    await this.mailerService.sendMail(sendEmailModel);

    return ResponseHelper.Ok();
  };

  resetPassword = async (model: ResetPasswordModel) => {
    let user = await this.userRepository.findOne({
      where: {
        VerifyCode: model.verify_code,
      },
    });

    if (!user) {
      throw ResponseHelper.BadRequest();
    }

    user.VerifyCode = '';
    user.VerifiedFlag = 1;
    user.Password = AuthenticationCrypto.encrypt(model.new_password);

    return await this.userRepository.save(user);
  };
}
