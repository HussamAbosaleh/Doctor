import { env } from '../config/env.js';

export const secret = env.jwtSecret;
export const expiresIn = '3h';
