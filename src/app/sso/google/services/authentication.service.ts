import { Injectable } from '@nestjs/common';
const bcrypt = require('bcryptjs');
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthenticationService {

    // googleLogin(req) {
    //     if (!req.user) {
    //         return 'No user from google';
    //     }

    //     return {
    //         message: 'User information from google',
    //         user: req.user,
    //     };
    // }

    generateAccessToken(account: any) {
        return jwt.sign({
            iss: 'Feature',
            sub: account.increment_id,
            ist: Math.floor(Date.now()),
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 3)
        }, process.env.JWT_SECRET);
    };

    async encrypt(data: string) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data, salt);
        return hash;
    };

    async dencrypt(accessToken: string, hash: string) {
        if (!accessToken || !hash) {
            throw new Error('accessToken and hash are required');
        }
        return await bcrypt.compare(accessToken, hash);
    };

    async generateToken(data: any) {
        return jwt.sign({
            iss: 'Feature',
            sub: data,
            ist: Math.floor(Date.now()),
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 3)
        }, process.env.JWT_SECRET);
    };

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
