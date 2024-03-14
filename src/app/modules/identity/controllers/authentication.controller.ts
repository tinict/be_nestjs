import * as _ from 'lodash';

import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseHelper } from '../../../../helpers/response.helper';
import { LoginModel, RegisterModel, MemberRegisterModel } from '../models';
import { LoginSchema, MemberRegisterSchema, RegisterSchema } from '../schemas';
import { AuthenticationService } from '../services/authentication.service';
import { JoiValidationPipe } from '../../../../validation';
import { LoginResponseMapper, UserMapper } from '../mappers';
import { Request } from 'express';
import { VerifyRegisterModel } from '../models/verify-register.model';
import { ForgotPasswordModel } from '../models/forgot-password.model';
import { ResetPasswordModel } from '../models/reset-password.model';

@ApiTags('Identity')
@Controller('v1/auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-in')
  @UsePipes(new JoiValidationPipe(LoginSchema))
  async login(@Body() body: LoginModel, @Req() req: Request) {
    try {
      const result = await this.authenticationService.login(body, req);

      return LoginResponseMapper.toLogin(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Post('register')
  @UsePipes(new JoiValidationPipe(RegisterSchema))
  async register(@Body() body: RegisterModel) {
    const result = await this.authenticationService.register(body);
    return result instanceof ResponseHelper
      ? ResponseHelper.HttpException(result)
      : result;
  }

  @Post('member-register')
  @UsePipes(new JoiValidationPipe(MemberRegisterSchema))
  async memberRegister(@Body() body: MemberRegisterModel) {
    const result = await this.authenticationService.memberRegister(body);
    return result instanceof ResponseHelper
      ? ResponseHelper.HttpException(result)
      : result;
  }

  @Post('verify-register')
  async verifyRegister(@Body() body: VerifyRegisterModel) {
    const result = await this.authenticationService.verifyRegister(body);
    return result instanceof ResponseHelper
      ? ResponseHelper.HttpException(result)
      : result;
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordModel) {
    const result = await this.authenticationService.forgotPassword(body);

    return result instanceof ResponseHelper
      ? ResponseHelper.HttpException(result)
      : result;
  }

  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordModel) {
    try {
      const result = await this.authenticationService.resetPassword(body);

      return UserMapper.toUser(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }
}
