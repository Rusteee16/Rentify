import { getTokenData } from '@/helpers/getToken';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/register' || path === '/login';
  const isHome = path === '/';
  const isSeller = path === '/propertyform';

  const token = request.cookies.get('token')?.value || '';
  let tokenData;
  let type;
  if(token){
    tokenData = await getTokenData(request);
    type = tokenData?.type;
  }
  

  if (isPublicPath && token) {
    if (type === 'seller') {
      return NextResponse.redirect(new URL('/propertyform', request.url));
    } else {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (isSeller && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isSeller && (type === '' || type === 'buyer')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/', '/register', '/login', '/propertyform'],
};
