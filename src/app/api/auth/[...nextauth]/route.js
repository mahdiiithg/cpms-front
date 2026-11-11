import { handlers } from '@/auth';

/**
 * Auth.js can 500 when AUTH_SECRET / providers are misconfigured.
 * Public property pages must not white-screen — coerce session failures to empty.
 */
async function safeHandler(handler, request, context) {
  try {
    const response = await handler(request, context);
    const url = new URL(request.url);
    const isSession =
      request.method === 'GET' && url.pathname.endsWith('/api/auth/session');

    if (isSession && response && response.status >= 500) {
      console.error(
        '[auth] session endpoint returned',
        response.status,
        '— serving empty session',
      );
      return Response.json(null, { status: 200 });
    }
    return response;
  } catch (error) {
    console.error(
      '[auth] handler error (non-fatal for public pages):',
      error?.message || error,
    );
    const url = new URL(request.url);
    if (request.method === 'GET' && url.pathname.endsWith('/api/auth/session')) {
      return Response.json(null, { status: 200 });
    }
    return Response.json({ error: 'Auth temporarily unavailable' }, { status: 200 });
  }
}

export const GET = (request, context) =>
  safeHandler(handlers.GET, request, context);
export const POST = (request, context) =>
  safeHandler(handlers.POST, request, context);
