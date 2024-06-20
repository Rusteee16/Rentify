import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/db/dbConfig';
import { User, PropertyData } from '@/models/dataSchema';
import { sendEmail } from '@/helpers/mailer';
import { getTokenData } from '@/helpers/getToken';

connect();

export async function POST(request: NextRequest) {
    try {
        const buyerToken = await getTokenData(request);
        if (!buyerToken) {
            return NextResponse.json({ message: "Please log in to express interest." }, { status: 401 });
        }

        const { propertyId } = await request.json();

        const property = await PropertyData.findById(propertyId);
        if (!property) {
            return NextResponse.json({ message: 'Property not found' }, { status: 404 });
        }

        const seller = await User.findOne({ email: property.userEmail });
        if (!seller) {
            return NextResponse.json({ message: 'Seller not found' }, { status: 404 });
        }

        const buyerID = buyerToken.id;
        const buyer = await User.findById(buyerID);
        if (!buyer) {
            return NextResponse.json({ message: 'Buyer not found' }, { status: 404 });
        }

        const emailResponse = await sendEmail({
            email: seller.email,
            emailType: "INTEREST",
            userId: seller._id,
            buyerDetails: { name: buyer.fname + " " + buyer.lname, email: buyer.email, phone: buyer.mobile },
            sellerDetails: { name: seller.fname + " " + seller.lname, email: seller.email, phone: seller.mobile },
        });

        return NextResponse.json({ message: 'Interest email sent successfully', emailResponse }, { status: 200 });
    } catch (error) {
        console.error('Error sending interest email:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
