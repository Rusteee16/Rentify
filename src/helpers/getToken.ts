import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, JWTPayload } from "jose";

export const getTokenData = async (request: NextRequest): Promise<JWTPayload | null> => {
    try {
        const token = request.cookies.get("token")?.value;
        
        if (!token) {
            throw new Error('Token is not provided or is invalid.');
        }

        const secretKey = process.env.TOKEN_SECRET;

        if (!secretKey) {
            throw new Error('TOKEN_SECRET environment variable is not defined.');
        }

        const secret = new TextEncoder().encode(secretKey);
        
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (error: unknown) {
        console.error('Error verifying token:', error);
        return null; 
    }
};
