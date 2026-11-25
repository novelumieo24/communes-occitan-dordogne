// Noms occitans des communes de Dordogne : fonctionnement hors connexion
const V="noms-20261125181337";
const BASE=["./","index.html","data.json","communes.geojson","dep.json","cle.json","manifest.json","img/icone-192.png","img/favicon-32.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(BASE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==V).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);
  if(e.request.method!=="GET"||u.origin!==location.origin) return;
  e.respondWith(fetch(e.request).then(r=>{if(r.ok){const c=r.clone(); caches.open(V).then(x=>x.put(e.request,c))} return r})
    .catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match("index.html"))))});
