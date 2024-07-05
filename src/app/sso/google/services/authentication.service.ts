import { Injectable } from '@nestjs/common';
const bcrypt = require('bcryptjs');
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthenticationService {

    /**
     * 
     * @param account 
     * @returns 
     */
    generateAccessToken(account: any) {
        try {
            return jwt.sign({
                iss: 'Feature',
                sub: account.increment_id,
                ist: Math.floor(Date.now()),
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 3)
            }, process.env.JWT_SECRET);
        } catch (error: any) {
            console.error(error);
        }
    };

    /**
     * 
     * @param data 
     * @returns 
     */
    async encrypt(data: string) {
        try  {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(data, salt);
            return hash;
        } catch (error: any) {
            console.error(error);
        }
    };

    /**
     * 
     * @param accessToken 
     * @param hash 
     * @returns 
     */
    async dencrypt(accessToken: string, hash: string) {
        try {
            if (!accessToken || !hash) {
                throw new Error('accessToken and hash are required');
            }
            return await bcrypt.compare(accessToken, hash);
        } catch (error: any) {
            console.error(error);
        }
    };

    /**
     * 
     * @param data 
     * @returns 
     */
    async generateToken(data: any) {
        return jwt.sign({
            iss: 'Feature',
            sub: data,
            ist: Math.floor(Date.now()),
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 3)
        }, process.env.JWT_SECRET);
    };

    /**
     * 
     * @param token 
     * @returns 
     */
    async verifyToken(token: string) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded;
        } catch (error) {
            console.error('Error verifying access token:', error);
            return null;
        }
    };
};
