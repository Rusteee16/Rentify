import { connect } from "@/db/dbConfig";
import { User } from "@/models/dataSchema"; 
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { send } from "process";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password, fname, lname, mobile, type } = reqBody;
        
        // console.log("Backend -->", reqBody);

        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            fname,
            lname,
            email,
            mobile,
            password: hashedPassword,
            type
        });

        const savedUser = await newUser.save();
        // console.log(savedUser);

        await sendEmail ({
            email: email,
            emailType: "VERIFY",
            userId: savedUser._id,
            buyerDetails: "",
            sellerDetails: "",
        });

        return NextResponse.json({ message: "User added successfully", success: true, savedUser });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
