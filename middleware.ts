import { getTokenData } from '@/helpers/getToken';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/register' || path === '/login'

    const isSeller = path === '/properties'

    const isBuyer = path === '/propertyform'

    const token = request.cookies.get("token")?.value || '';
    const type = getTokenData(request).type;

    if(isPublicPath && token){
      if (type === "seller"){
        return NextResponse.redirect(new URL('/propertyform', request.url))
      } else {
        return NextResponse.redirect(new URL('/properties', request.url))
      }
    }

    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if(isSeller && (type === "buyer")){
      return NextResponse.redirect(new URL('/propertyform', request.url));
    }

    if(isBuyer && (type === 'seller')){
      return NextResponse.redirect(new URL('/properties', request.url));
    }
  
}
 

export const config = {
  matcher: [
    '/',
    '/register',
    '/login',
    '/properties',
    '/propertyform',
  ]
}