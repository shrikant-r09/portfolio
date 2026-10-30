// Would a browser let `origin` show this response inside an <iframe>?
// CSP frame-ancestors, when present, overrides X-Frame-Options in modern browsers.
export function allowsFraming(headers, origin) {
  const csp = headers.get('content-security-policy') || '';
  const fa = csp.match(/frame-ancestors([^;]*)/i);
  if (fa) {
    const sources = fa[1].trim().split(/\s+/);
    return sources.includes('*') || sources.includes(origin);
  }
  return !headers.get('x-frame-options');
}
