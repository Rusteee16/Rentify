
import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/db/dbConfig';
import { PropertyData } from '@/models/dataSchema';
import { getTokenData } from '@/helpers/getToken';


connect()

export async function GET(request: NextRequest){

    try {
        const page = request.nextUrl.searchParams.get("page") || 1;
        const limit = request.nextUrl.searchParams.get("limit") || 8;
        // console.log(page, limit);
        

        const pageNumber = parseInt(page.toString());
        const limitNumber = parseInt(limit.toString());

        const skip = (pageNumber - 1) * limitNumber;

        const properties = await PropertyData.find().skip(skip).limit(limitNumber);
        const totalProperties = await PropertyData.countDocuments();
        // console.log(properties);
        

        return NextResponse.json({ totalProperties, properties },{status: 200});
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, {status: 500});
    }
}

export async function PATCH(request: NextRequest){
    try{
        const _id = request.nextUrl.searchParams.get("_id");
        if (!_id) {
            return NextResponse.json({ message: 'Property ID is required' }, { status: 400 });
          }
        // console.log(_id);
        

        const property = await PropertyData.findById(_id);
        if (!property) {
            return NextResponse.json({ message: 'Property not found' }, {status: 404});
        }

        property.userLikes += 1;
        const newProperty = await property.save();
        // console.log("Like updates", property);
        

        return NextResponse.json({ newProperty}, {status: 200});
    }
    catch(error){
        return NextResponse.json({error: "Like not updated"}, {status: 500});
    }
}
