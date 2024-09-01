import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { APP_SECRET } from '../config/config';

export const GenerateSalt = async () => {
    return await bcrypt.genSalt();
}

export const createHashedPassword = async(password: string, salt: string) => {
    return bcrypt.hash(password, salt);
}

export const passwordMatch = async(instancePassword: string, instanceSalt: string, password: string) => {
    return await createHashedPassword(password,instanceSalt) === instancePassword;
}

export const generateToken = async(instanceUsername: string, instanceRole: string) => {
    return jwt.sign({username: instanceUsername, role: instanceRole}, APP_SECRET, {expiresIn: '1h'});
}