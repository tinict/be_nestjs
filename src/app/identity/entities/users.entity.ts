import { BaseEntity } from "src/entities/base";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Gender } from "../constants"; // Assuming Gender is defined elsewhere

@Entity({ name: 'tbl_users' })
export class UserEntity extends BaseEntity {
    /**
     * Google ID (optional)
     */
    @Column({
        type: 'varchar',
        length: 32,
        name: 'google_id',
        unique: true,
        nullable: true
    })
    GoogleId: string;

    /**
     * Username (unique and not null)
     */
    @Column({
        type: 'varchar',
        length: 32,
        name: 'username',
        nullable: true,
        unique: true,
    })
    Username: string;

    /**
     * User's first name
     */
    @Column({
        name: 'firstname',
        type: 'nvarchar',
        length: 35,
    })
    Firstname: string;

    /**
     * User's last name
     */
    @Column({
        name: 'lastname',
        type: 'nvarchar',
        length: 35,
    })
    Lastname: string;

    /**
     * User's email address (unique and not null)
     */
    @Column({
        name: 'email',
        type: 'varchar',
        length: 320,
        unique: true,
        nullable: false
    })
    Email: string;

    /**
     * User's phone number (optional and unique)
     */
    @Column({
        name: 'phone',
        type: 'varchar',
        length: 15,
        unique: true,
        nullable: true
    })
    Phone?: string;

    /**
     * URL to the user's profile picture
     */
    @Column({
        name: 'picture',
        type: 'varchar',
        length: 320,
    })
    Picture: string;

    /**
     * User's gender (using Gender enum)
     */
    @Column({
        name: 'gender',
        type: 'enum',
        enum: Gender,
    })
    Gender: Gender;

    /**
     * User's date of birth (optional)
     */
    @Column({
        name: 'dob',
        type: 'datetime',
        nullable: true,
    })
    Dob?: Date;

    /**
     * User's bio (optional)
     */
    @Column({
        name: 'bio',
        type: 'text',
        nullable: true,
    })
    Bio?: string;
};
