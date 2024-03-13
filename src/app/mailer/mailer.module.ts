import { DynamicModule, Module } from '@nestjs/common';

import { MailerService } from './mailer.service';

@Module({})
export class MailerModule {
  static forRoot(options: any): DynamicModule {
    return {
      global: true,
      module: MailerModule,
      controllers: [],
      providers: [
        {
          provide: 'MAILER_MODULE_OPTION',
          useValue: options,
        },
        MailerService,
      ],
      exports: [MailerService],
    };
  }
}
