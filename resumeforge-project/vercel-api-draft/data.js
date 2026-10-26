// ResumeForge storage API (Vercel Function).
//
// One private JSON document per "sync key", stored in Vercel Blob:
//   GET    /api/data   -> the stored snapshot (404 if none yet)
//   PUT    /api/data   -> replace the snapshot
//   DELETE /api/data   -> delete the snapshot
// The key arrives in the `x-rf-id` header. There are no accounts: whoever
// holds the key can read and change that one document, and nothing else.
// The blob store is PRIVATE, so no document is ever reachable by URL - every
// read and write goes through this function.
import { put, get, del } from "@vercel/blob";

const ID_RE = /^[A-Za-z0-9-]{20,64}$/; // also blocks path tricks like "../"
const MAX_BYTES = 900 * 1024;

function send(res, status, obj) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-RF-API", "1"); // lets the app tell "our API answered" from "some 404 page"
  res.status(status).send(JSON.stringify(obj));
}

function validSnapshot(b) {
  if (!b || typeof b !== "object" || Array.isArray(b)) return false;
  const lib = b.library;
  if (!lib || typeof lib !== "object" || !Array.isArray(lib.resumes)) return false;
  if (lib.resumes.length < 1 || lib.resumes.length > 100) return false;
  return lib.resumes.every(
    (r) => r && typeof r === "object" && typeof r.id === "string" &&
           r.data && typeof r.data === "object" && Array.isArray(r.data.sections)
  );
}

export function createHandler(blob) {
  return async function handler(req, res) {
    const id = req.headers["x-rf-id"];
    if (typeof id !== "string" || !ID_RE.test(id)) return send(res, 400, { error: "bad_id" });
    const pathname = `users/${id}.json`;

    try {
      if (req.method === "GET") {
        const result = await blob.get(pathname, { access: "private", useCache: false });
        if (!result || result.statusCode !== 200) return send(res, 404, { error: "not_found" });
        const text = await new Response(result.stream).text();
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.setHeader("Cache-Control", "no-store");
        res.setHeader("X-RF-API", "1");
        return res.status(200).send(text);
      }

      if (req.method === "PUT") {
        if (Number(req.headers["content-length"] || 0) > MAX_BYTES) return send(res, 413, { error: "too_large" });
        const body = req.body;
        if (!validSnapshot(body)) return send(res, 400, { error: "bad_snapshot" });
        const text = JSON.stringify(body);
        if (Buffer.byteLength(text) > MAX_BYTES) return send(res, 413, { error: "too_large" });
        await blob.put(pathname, text, {
          access: "private",
          addRandomSuffix: false,
          allowOverwrite: true,
          contentType: "application/json",
        });
        return send(res, 200, { ok: true });
      }

      if (req.method === "DELETE") {
        await blob.del(pathname);
        return send(res, 200, { ok: true });
      }

      res.setHeader("Allow", "GET, PUT, DELETE");
      return send(res, 405, { error: "method_not_allowed" });
    } catch (e) {
      console.error("api/data error:", e && e.message);
      return send(res, 500, { error: "server_error" });
    }
  };
}

export default createHandler({ put, get, del });
