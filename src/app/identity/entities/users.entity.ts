import { BaseEntity } from "src/entities/base";
import { Column, Entity } from "typeorm";
import { Gender } from "../constants";

@Entity({ name: 'tbl_users' })
export class UserEntity extends BaseEntity {
    /**
     * username
     */
    @Column({
        type: 'varchar',
        length: 32,
        name: 'username',
        unique: true,
        nullable: true
    })
    Username: string;

    /**
     * firstname
     */
    @Column({
        name: 'firstname',
        type: 'nvarchar',
        length: 35,
    })
    Firstname: string;

    /**
     * lastname
     */
    @Column({
        name: 'lastname',
        type: 'nvarchar',
        length: 35,
    })
    Lastname: string;

    /**
     * email
     */
    @Column({
        name: 'email',
        type: 'varchar',
        length: 320,
        unique: true,
    })
    Email: string;

    /**
     * phone
     */
    @Column({
        name: 'phone',
        type: 'varchar',
        length: 15,
        unique: true,
        nullable: true,

    })
    Phone: string;

    /**
     * url_picture
     */
    @Column({
        name: 'picture',
        type: 'varchar',
        length: 320,
    })
    Picture: string;

    /**
     * gender
     */
    @Column({
        name: 'gender',
        type: 'enum',
        enum: Gender,
    })
    Gender: Gender;

    /**
     * Date Of Birth
     */
    @Column({
        name: 'dob',
        type: 'datetime',
        nullable: true,
    })
    Dob: Date;

    /**
     * bio
     */
    @Column({
        name: 'bio',
        type: 'text',
        nullable: true,
    })
    Bio: string;
};