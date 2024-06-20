import { NextRequest, NextResponse } from 'next/server';
import { getTokenData } from '@/helpers/getToken';

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value || '';

        if (token) {
            const tokenData = await getTokenData(request);
            return NextResponse.json({ isAuthenticated: true, userId: tokenData.id }, { status: 200 });
        } else {
            return NextResponse.json({ isAuthenticated: false }, { status: 200 }); 
        }
    } catch (error) {
        console.error('Error checking authentication:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
