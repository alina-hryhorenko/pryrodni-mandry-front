import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export function clearAuthCookies(cookieStore: ReadonlyRequestCookies): void {
  ['accessToken', 'refreshToken', 'sessionId'].forEach((name) => {
    cookieStore.delete(name);
  });
}

export function logErrorResponse(errorObj: unknown): void {
  const green = '\x1b[32m';
  const yellow = '\x1b[33m';
  const reset = '\x1b[0m';

  // Стрелка зелёная, текст жёлтый
  console.log(`${green}> ${yellow}Error Response Data:${reset}`);
  console.dir(errorObj, { depth: null, colors: true });
}
