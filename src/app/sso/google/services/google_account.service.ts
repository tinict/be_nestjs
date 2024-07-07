import { InjectRepository } from "@nestjs/typeorm";
import { AuthenticationService } from "./authentication.service";
import {
    UserEntity
} from "src/app/identity/entities";
import { Repository } from "typeorm";
// import { GoogleAccountMapper } from "../Mappers";

export class GoogleAccountService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private authService: AuthenticationService,
    ) { };

    /**
     * @description Create Account By Google
     * @param profile 
     * @returns 
     */
    async create(profile: any) {
        try {
            let existingCustomer = await this.userRepository.findOne({ where: { GoogleId: profile.google_id } });

            if (existingCustomer === null) {
                const userEntity = new UserEntity();

                userEntity.GoogleId = profile.google_id;
                userEntity.Email = profile.email;
                userEntity.Firstname = profile.firstName;
                userEntity.Lastname = profile.lastName;
                userEntity.Picture = profile.picture;
                userEntity.Phone = profile.phone;

                const newUserEntity = await this.userRepository.save(userEntity);

                return newUserEntity;
            }

            return existingCustomer;
        } catch (error: any) {
            console.error(error);
        }
    };

    /**
     * 
     * @param Id 
     * @returns 
     */
    async me(google_id: string) {
        try {
            const profile = await this.userRepository.findOne({ where: { GoogleId: google_id } });
            console.log(profile);
            return profile;
        } catch (error) {
            console.log(error);
        }
    };

    // async getAccessToken(google_id: string) {
    //     try {
    //         const token = await GoogleAccountRepository.findOne({ where: { google_id } });
    //         console.log("getAccessToken: ", token);
    //         if (!token) return null;
    //         return token.access_token;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // async updateAccessToken(google_id: string, access_token: string) {
    //     try {
    //         const googleAccountEntity = await GoogleAccountRepository.findOne({ where: { google_id } });
    //         if (!googleAccountEntity) return null;
    //         googleAccountEntity.access_token = access_token;
    //         return await GoogleAccountRepository.save(googleAccountEntity);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
};
