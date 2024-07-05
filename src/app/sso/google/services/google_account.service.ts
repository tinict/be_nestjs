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
     * 
     * @param profile 
     * @returns 
     */
    async create(profile: any) {
        try {
            let existingCustomer = await this.userRepository.findOne({ where: { Id: profile.google_id } });

            if (!existingCustomer) {
                const userEntity = new UserEntity();

                userEntity.Id = profile.google_id;
                userEntity.Email = profile.email;
                userEntity.Firstname = profile.firstName;
                userEntity.Lastname = profile.lastName;
                userEntity.Picture = profile.picture;
                userEntity.Phone = profile.phone;

                const newUserEntity = await this.userRepository.save(userEntity);

                return newUserEntity;
            }

            // if (existingCustomer) {
            //     const enCryptToken = await this.authService.encrypt(googleAccountModel.access_token);
            //     this.updateAccessToken(googleAccountModel.google_id, enCryptToken);
            //     return existingCustomer;
            // } else {
            //     let googleAccountEntity = new GoogleAccountEntity();

            //     googleAccountEntity.google_id = googleAccountModel.google_id;
            //     googleAccountEntity.email = googleAccountModel.email;
            //     googleAccountEntity.name = googleAccountModel.name;
            //     googleAccountEntity.family_name = googleAccountModel.family_name;
            //     googleAccountEntity.url_picture = googleAccountModel.url_picture;
            //     googleAccountEntity.access_token = await this.auth.encrypt(googleAccountModel.access_token);

            //     const newAccountGoogle = await GoogleAccountRepository.save(googleAccountModel);

            //     return newAccountGoogle;
            // }
        } catch (error: any) {
            console.error(error);
        }
    };

    /**
     * 
     * @param Id 
     * @returns 
     */
    async me(Id: string) {
        try {
            const profile = await this.userRepository.findOne({ where: { Id } });
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
