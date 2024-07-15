import { ApiProperty } from '@nestjs/swagger';
import { UserCreateModel } from './user.create.model';
import { Gender } from '../constants';

export class UserUpdateModel extends UserCreateModel {
    @ApiProperty({ name: 'firstname' })
    firstname: string;

    @ApiProperty({ name: 'lastname' })
    lastname: string;

    @ApiProperty({ name: 'dob'})
    dob: Date;

    @ApiProperty({ name: 'gender'})
    gender: Gender;

    @ApiProperty({ name: 'phone'})
    phone: string;

    @ApiProperty({ name: 'email'})
    email: string;

    @ApiProperty({ name: 'bio'})
    bio: string;
};
