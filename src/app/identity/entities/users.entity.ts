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
    })
    username: string;

    /**
     * family_name
     */
    @Column({
        name: 'family_name',
        type: 'nvarchar',
        length: 35,
    })
    family_name: string;

    /**
     * name
     */
    // @Column({
    //     name: 'name',
    //     type: 'nvarchar',
    //     length: 50,
    // })
    // name: string;

    /**
     * email
     */
    @Column({
        name: 'email',
        type: 'varchar',
        length: 320,
    })
    email: string;

    /**
     * phone
     */
    @Column({
        name: 'phone',
        type: 'varchar',
        length: 15,
    })
    phone: string;

    /**
     * url_picture
     */
    @Column({
        name: 'url_picture',
        type: 'varchar',
        length: 320,
    })
    url_picture: string;

    /**
     * gender
     */
    @Column({
        name: 'gender',
        type: 'enum',
        enum: Gender,
    })
    gender: Gender;

    /**
     * Date Of Birth
     */
    @Column({
        name: 'dob',
        type: 'datetime',
    })
    dob: Date;

};