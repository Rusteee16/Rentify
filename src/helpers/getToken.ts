import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getTokenData = (request: NextRequest) => {
    try {
        const token: string = request.cookies.get("token")?.value || '';

        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

        return decodedToken;

    } catch (error: any) {
        throw new Error(error.message)
    }
}