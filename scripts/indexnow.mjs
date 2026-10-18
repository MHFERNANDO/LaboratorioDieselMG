// Envía las URLs del sitemap a IndexNow (Bing, Yandex y otros buscadores adheridos).
// Uso (después de desplegar, con la clave ya publicada en producción):
//   node scripts/indexnow.mjs
// Requiere Node 18+ (fetch integrado). No se ejecuta automáticamente.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HOST = 'www.laboratoriodieselmg.com';
const KEY = '21d79bc025c055c78a8fd5e97cdc9bef';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map(m => m[1])
  .filter(u => !u.includes('/assets/'));

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
});
console.log(`IndexNow: HTTP ${res.status} (${urlList.length} URLs)`);
// 200 o 202 = aceptado. 403 = la clave no se encuentra en keyLocation. 422 = URLs fuera del host.
