import { PropertyData, User } from "@/models/dataSchema";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';

export async function POST(request: NextRequest){
    try{
        const {users, properties} = await request.json();
        const userCount = await User.countDocuments();
        const propertyCount = await PropertyData.countDocuments();

        if(userCount !== 0 || propertyCount !== 0){
            return NextResponse.json({ error: "Seed data already exists" }, { status: 400 });
        }

        if(userCount === 0){
            for(const user of users){
                const {email, password, fname, lname, mobile, type } = user;

                const curUser = await User.findOne({ email });

                if (curUser) {
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

                console.log(`User added successfully ${savedUser._id}`);
            }
        }

        if(propertyCount === 0){
            for(const property of properties){
                const newProperty = new PropertyData(property);
                const savedProperty = await newProperty.save();
                console.log(`Property added successfully ${savedProperty._id}`);
            }
        }
        return NextResponse.json({ message: "Seed data added successfully" }, { status: 200 });
    }catch(error: any){
        return NextResponse.json({error: error.message}, {status: 500});    
    }
}