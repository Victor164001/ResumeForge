const BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
const TOKEN_KEY = 'resumeforge:token';

export const tokenStore = {
  get() {
    try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
  },
  set(token) {
    try { localStorage.setItem(TOKEN_KEY, token); } catch { /* storage blocked */ }
  },
  clear() {
    try { localStorage.removeItem(TOKEN_KEY); } catch { /* storage blocked */ }
  },
};

/* fetch wrapper: JSON in/out, bearer token, readable errors.
   A 401 broadcasts `resumeforge:unauthorized` so the auth context can sign out. */
export async function api(path, { method = 'GET', body, keepalive = false } = {}) {
  const headers = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  const token = tokenStore.get();
  if (token) headers.Authorization = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${BASE}/api${path}`, {
      method,
      headers,
      keepalive,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error('Can’t reach the server. Check that the API is running.');
  }

  const data = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok) {
    const err = new Error(data?.message || `Request failed (${res.status}).`);
    err.status = res.status;
    if (res.status === 401 && token) window.dispatchEvent(new Event('resumeforge:unauthorized'));
    throw err;
  }
  return data;
}

/* Fire-and-forget helpers used after exports and template views. */
export function track(statKey, activityMessage) {
  const calls = [];
  if (statKey) calls.push(api(`/stats/${statKey}/increment`, { method: 'POST' }));
  if (activityMessage) calls.push(api('/activity', { method: 'POST', body: { message: activityMessage } }));
  return Promise.allSettled(calls).then(() => window.dispatchEvent(new Event('resumeforge:activity')));
}
