
import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/db/dbConfig';
import { PropertyData, User } from '@/models/dataSchema';
import { getTokenData } from '@/helpers/getToken';


connect()

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl;

        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "8", 10);
        const city = searchParams.get("city") || "";
        const propertyType = searchParams.get("propertyType") || "";
        const bedrooms = searchParams.get("bedrooms");
        const floors = searchParams.get("floors");

        const parsedBedrooms = !isNaN(parseInt(bedrooms || "", 10)) ? parseInt(bedrooms!, 10) : undefined;
        const parsedFloors = !isNaN(parseInt(floors || "", 10)) ? parseInt(floors!, 10) : undefined;

        const skip = (page - 1) * limit;

        const filters: any = {};
        if (city) filters.city = city;
        if (propertyType) filters.type = propertyType;
        if (parsedBedrooms !== undefined) filters.bedrooms = parsedBedrooms;
        if (parsedFloors !== undefined) filters.floors = parsedFloors;

        const properties = await PropertyData.find(filters).skip(skip).limit(limit).lean();
        const totalProperties = await PropertyData.countDocuments(filters);

        let liked;

        try{
            const tokenData =  await getTokenData(request);
            const id = tokenData?.id;
            const user = await User.findById(id);
            liked = user.liked;
        } catch{
            liked = []
        }
        

        return NextResponse.json({ totalProperties, properties, liked }, { status: 200 });
    } catch (error) {
        console.error('Error fetching properties:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const _id = request.nextUrl.searchParams.get('_id');

        if (!_id) {
            return NextResponse.json({ message: 'Property ID is required' }, { status: 400 });
        }

        const tokenData = await getTokenData(request);
        const bid = tokenData?.id;

        if (!bid) {
            return NextResponse.json({ message: 'Please log in to like a property' }, { status: 401 });
        }

        const property = await PropertyData.findById(_id);

        if (!property) {
            return NextResponse.json({ message: 'Property not found' }, { status: 404 });
        }

        const user = await User.findById(bid);

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        if (!user.liked.includes(_id)) {
            user.liked.push(_id);
            property.likes += 1;
        } else {
            const index = user.liked.indexOf(_id);
            user.liked.splice(index, 1);
            property.likes -= 1;
        }

        const updatedProperty = await property.save();
        const updatedUser = await user.save();

        return NextResponse.json({ updatedProperty, userLiked: updatedUser.liked }, { status: 200 });
    } catch (error) {
        console.error('Error updating property:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

