
import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import { PropertyData } from '@/models/dataSchema';


connect();

export async function GET(req: NextRequest){

    try {
        const page = req.nextUrl.searchParams.get("page") || 1;
        const limit = req.nextUrl.searchParams.get("limit") || 8;

        const pageNumber = parseInt(page.toString());
        const limitNumber = parseInt(limit.toString());

        const skip = (pageNumber - 1) * limitNumber;

        const properties = await PropertyData.find().skip(skip).limit(limitNumber);

        return NextResponse.json({ properties },{status: 200});
    } catch (error) {
        console.error('Error fetching properties:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, {status: 500});
    }
}
