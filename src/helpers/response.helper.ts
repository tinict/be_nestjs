import { HttpStatus, HttpException } from '@nestjs/common';
import * as MSG from '../constants/msg';

export class ResponseHelper {
  public status: HttpStatus = HttpStatus.OK;
  public message: string;
  public code: string;

  /**
   * @param json {  status: HttpStatus, message: string }
   */
  constructor(json?: any) {
    if (json) {
      Object.assign(this, json);
    }
  }

  /**
   * 500
   */
  public static InternalServerError = () => {
    return new ResponseHelper({
      message: MSG.MSG_INTERNAL_SERVER_ERROR,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: 'TL-0500',
    });
  };

  /**
   * 401
   */
  public static UnAuthorized = (message?: any, code?: string) => {
    return new ResponseHelper({
      message,
      code,
      status: HttpStatus.UNAUTHORIZED,
    });
  };

  /**
   * 404
   */
  public static NotFound = (message?: any, code?: string) => {
    return new ResponseHelper({ message, code, status: HttpStatus.NOT_FOUND });
  };

  /**
   * 400
   */
  public static BadRequest = (message?: any, code?: string) => {
    return new ResponseHelper({
      message,
      code,
      status: HttpStatus.BAD_REQUEST,
    });
  };

  /**
   * 403
   */
  public static Forbidden = (message?: any, code?: string) => {
    return new ResponseHelper({ message, code, status: HttpStatus.FORBIDDEN });
  };

  /**
   * 200
   */
  public static Ok = (message?: any, code?: string) => {
    return new ResponseHelper({ message, code });
  };

  public static noContent = (message?: any, code?: string) => {
    return new ResponseHelper({ message, code, status: HttpStatus.NO_CONTENT });
  };

  public static HttpException = (problem: ResponseHelper) => {
    console.log(problem);
    throw new HttpException(
      { message: problem.message, code: problem.code },
      problem.status,
    );
  };
}
