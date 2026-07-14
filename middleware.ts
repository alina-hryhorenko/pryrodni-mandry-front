import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parseSetCookie } from 'cookie';
import { checkServerSession } from './services/serverApi';

const privateRoutes = ['/profile', '/stories/new'];
const publicRoutes = ['/auth/login', '/auth/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!accessToken) {
    if (refreshToken) {
      const data = await checkServerSession();
      const setCookie = data.headers['set-cookie'];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        for (const cookieStr of cookieArray) {
          const parsed = parseSetCookie(cookieStr);
          if (parsed.value) cookieStore.set(parsed.name, parsed.value, parsed);
        }

        if (isPublicRoute) {
          return NextResponse.redirect(new URL('/', request.url), {
            headers: { Cookie: cookieStore.toString() },
          });
        }
        if (isPrivateRoute) {
          return NextResponse.next({
            headers: { Cookie: cookieStore.toString() },
          });
        }
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
