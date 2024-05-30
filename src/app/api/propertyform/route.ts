import { connect } from "@/dbConfig/dbConfig";
import { getTokenData } from "@/helpers/getToken";
import {PropertyData} from "@/models/dataSchema";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest){
        try {
            const token = request.cookies.get("token")?.value || '';
            const propertyData = await request.json();
            const tokenData = getTokenData(request);
            propertyData.user.email = tokenData.email;
            // console.log(getTokenData(request));
            // console.log(propertyData);
            
            
            const newProperty = new PropertyData(propertyData);
            console.log(newProperty);
            
            
            const savedProperty = await newProperty.save();
            console.log(savedProperty);
            
            return NextResponse.json({ success: true, property: savedProperty },{status: 200});
        } catch (error: any) {
            return NextResponse.json({ success: false, error: error.message }, {status: 500});
        }
}

export async function GET(request: NextRequest){

    try {
        const page = request.nextUrl.searchParams.get("page") || 1;
        const limit = request.nextUrl.searchParams.get("limit") || 8;

        const pageNumber = parseInt(page.toString());
        const limitNumber = parseInt(limit.toString());

        const skip = (pageNumber - 1) * limitNumber;
        const email = getTokenData(request).email;

        const properties = await PropertyData.find({ 'user.email': email }).skip(skip).limit(limitNumber);
        const totalProperties = properties.length;
        // console.log(properties);
        

        return NextResponse.json({ totalProperties, properties },{status: 200});
    } catch (error) {
        console.error('Error fetching properties:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, {status: 500});
    }
}

export async function PUT(request: NextRequest) {
    try{
        const id = request.nextUrl.searchParams.get("id");
        if (!id) {
            return NextResponse.json({ message: 'Property ID is required' }, { status: 400 });
            }
        const data = await request.json();

        const property = await PropertyData.findByIdAndUpdate(id, data, { new: true });
        if (!property) {
            return NextResponse.json({ message: 'Property not found' }, { status: 404 });
        }
        return NextResponse.json({ property }, { status: 200 });

    } catch(error){
        return NextResponse.json({ error: 'Error updating property' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        if (!id) {
            return NextResponse.json({ message: 'Property ID is required' }, { status: 400 });
            }
        const data = await request.json();
        const property = await PropertyData.findByIdAndDelete(id);
        if (!property) {
            return NextResponse.json({ message: 'Property not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Property deleted' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting property' }, { status: 500 });
    }
  }