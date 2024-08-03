import { NextRequest, NextResponse } from 'next/server';
import { getTokenData } from '@/helpers/getToken';
import { User } from '@/models/dataSchema';

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value || '';
        const tokenData = await getTokenData(request);
        

        if (token) {
            const tokenData = await getTokenData(request);
            const email = tokenData?.email;

        const user = await User.findOne({ email });
            if (user.isVerified) {
                return NextResponse.json({ isAuthenticated: true, userId: tokenData?.id, isVerified: true }, { status: 200 });
            } else {
                return NextResponse.json({ isAuthenticated: true, isVerified: false }, { status: 200 });
            }
        }
        return NextResponse.json({ isAuthenticated: false, isVerified: false }, { status: 200 });
    } catch (error) {
        console.error('Error checking authentication:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
