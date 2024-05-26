import { connect } from "@/dbConfig/dbConfig";
import {PropertyData} from "@/models/dataSchema";
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest){
        try {
            const propertyData = request.body;
            const newProperty = new PropertyData(propertyData);
            const savedProperty = await newProperty.save();
            return NextResponse.json({ success: true, property: savedProperty },{status: 201});
        } catch (error: any) {
            return NextResponse.json({ success: false, error: error.message }, {status: 500});
        }
}
