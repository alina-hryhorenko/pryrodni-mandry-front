import { NextRequest, NextResponse } from 'next/server';
import { parseSetCookie } from 'cookie';
import { checkSession } from './services/auth';

const privateRoutes = ['/profile', '/stories/new'];
const publicRoutes = ['/auth/login', '/auth/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!accessToken) {
    if (refreshToken) {
      const { headers } = await checkSession(
        request.headers.get('cookie') ?? '',
        request.nextUrl.origin,
      );
      const setCookie = headers['set-cookie'];

      if (setCookie) {
        const response = isPublicRoute
          ? NextResponse.redirect(new URL('/', request.url))
          : NextResponse.next();

        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        for (const cookieStr of cookieArray) {
          const parsed = parseSetCookie(cookieStr);
          if (parsed.value) response.cookies.set(parsed.name, parsed.value, parsed);
        }

        if (isPublicRoute || isPrivateRoute) return response;
      }
    }

    if (isPublicRoute) return NextResponse.next();
    if (isPrivateRoute)
      return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (isPublicRoute) return NextResponse.redirect(new URL('/', request.url));
  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/stories/new', '/auth/login', '/auth/register'],
};
