export async function handler(event) {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
  };

  function ok(body) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(body),
    };
  }

  if (event.httpMethod !== 'POST') {
    return ok({
      ok: true,
      message: 'WK CRM bridge is active',
    });
  }

  const appsScriptUrl = process.env.WK_CRM_APPS_SCRIPT_URL;
  const token = process.env.WK_CRM_TOKEN;

  if (!appsScriptUrl || !token) {
    console.error('Missing WK_CRM_APPS_SCRIPT_URL or WK_CRM_TOKEN');

    return ok({
      ok: true,
      accepted: true,
      forwarded: false,
      warning: 'Missing server configuration',
    });
  }

  const separator = appsScriptUrl.includes('?') ? '&' : '?';
  const targetUrl = `${appsScriptUrl}${separator}token=${encodeURIComponent(token)}`;

  const contentType =
    event.headers?.['content-type'] ||
    event.headers?.['Content-Type'] ||
    'application/json';

  const body = event.isBase64Encoded
    ? Buffer.from(event.body || '', 'base64').toString('utf8')
    : event.body || '';

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': contentType,
      },
      body,
      redirect: 'follow',
      signal: controller.signal,
    });

    const responseText = await response.text();

    console.log('Apps Script response', {
      status: response.status,
      ok: response.ok,
      body: responseText.slice(0, 500),
    });

    return ok({
      ok: true,
      accepted: true,
      forwarded: response.ok,
      appsScriptStatus: response.status,
    });
  } catch (error) {
    console.error('Apps Script forwarding failed', {
      message: error && error.message ? error.message : String(error),
    });

    return ok({
      ok: true,
      accepted: true,
      forwarded: false,
      warning: 'Forwarding failed, but Netlify webhook acknowledged',
    });
  } finally {
    clearTimeout(timeout);
  }
}
