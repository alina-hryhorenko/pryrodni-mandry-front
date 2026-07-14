import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { parseSetCookie } from 'cookie';

export function clearAuthCookies(
  cookieStore: ReadonlyRequestCookies,
  setCookieHeader?: string | string[],
): void {
  if (setCookieHeader) {
    const cookieArray = Array.isArray(setCookieHeader)
      ? setCookieHeader
      : [setCookieHeader];

    cookieArray.forEach((cookieStr) => {
      const { name } = parseSetCookie(cookieStr);
      cookieStore.delete(name);
    });
    return;
  }

  // Бекенд не повернув set-cookie (напр. недоступний) — чистимо всі cookies,
  // що прийшли з запитом, щоб токени точно не залишились в браузері
  cookieStore.getAll().forEach(({ name }) => cookieStore.delete(name));
}

export function logErrorResponse(errorObj: unknown): void {
  const green = '\x1b[32m';
  const yellow = '\x1b[33m';
  const reset = '\x1b[0m';

  // Стрелка зелёная, текст жёлтый
  console.log(`${green}> ${yellow}Error Response Data:${reset}`);
  console.dir(errorObj, { depth: null, colors: true });
}
