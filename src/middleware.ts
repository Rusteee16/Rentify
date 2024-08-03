import { getTokenData } from '@/helpers/getToken';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname: path } = request.nextUrl;

  const isPublicPath = ['/register', '/login'].includes(path);
  const sellerPath = path === '/propertyform';

  const token = request.cookies.get('token')?.value || '';
  let tokenData;
  let type;

  if (token) {
    tokenData = await getTokenData(request);
    type = tokenData?.type;
  }

  if (isPublicPath && token) {
    const redirectUrl = type === 'seller' ? '/propertyform' : '/';
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  if (sellerPath && (!token || !type || type === 'buyer')) {
    const redirectUrl = !token ? '/login' : '/';
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }
}

export const config = {
  matcher: ['/', '/register', '/login', '/propertyform'],
};
