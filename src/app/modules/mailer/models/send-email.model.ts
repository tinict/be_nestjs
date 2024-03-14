import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class SendMailModel {
  @IsString()
  @IsNotEmpty()
  /**
   * receiver of mail
   */
  to: string;

  @IsString()
  @IsNotEmpty()

  /**
   * mail subject
   */
  subject: string;

  @IsString()
  @IsNotEmpty()

  /**
   * mail content
   */
  body: string;

  template: string;

  context: object;
  @IsOptional({ each: true })
  attachments?: any[];

  constructor(
    to: string,
    subject: string,
    template: string,
    context: any = undefined,
  ) {
    this.to = to;
    this.subject = subject;
    this.template = template;
    this.context = context;
  }
}
