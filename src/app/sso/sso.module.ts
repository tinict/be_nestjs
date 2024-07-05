import { Module } from '@nestjs/common';
import { GoogleModule } from './google/google.module';
import { IdentityModule } from '../identity/identity.module';

@Module({
  imports: [
    GoogleModule,
    IdentityModule
  ]
})
export class SsoModule {};
