import { ApiProperty } from '@nestjs/swagger';
export class OrganizationVerifyModel {
  @ApiProperty({ name: 'organization_id', required: true })
  organization_id: string;

  @ApiProperty({ name: 'verified_flag', required: true })
  verified_flag: number;
}
