import { connect } from "@/dbConfig/dbConfig";
import {User} from "@/models/dataSchema";
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;

        console.log(reqBody);

        const user = await User.findOne({email})
        
        const validPassword = await bcryptjs.compare(password, user.password) 
        if (!validPassword){
            return NextResponse.json({error: "Password does not match"},{status: 400})
        }

        const response = NextResponse.json({message: "Login Successfull!", success: true});

        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}