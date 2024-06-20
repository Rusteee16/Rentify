import { connect } from "@/db/dbConfig";
import { User } from "@/models/dataSchema";
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email });
        
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Password does not match" }, { status: 400 });
        }

        const tokenData = {
            id: user._id.toString(),
            email: user.email,
            type: user.type
        };

        const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);

        const token = await new SignJWT(tokenData)
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("1d")
            .sign(secret);

        const response = NextResponse.json({ message: "Login Successful!", success: true, user: user.type });
        response.cookies.set("token", token, { httpOnly: true });

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
