const CACHE_NAME = "souq-mubasher-v2";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./products.html",
    "./assistant.html",
    "./manifest.json"
];

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(FILES_TO_CACHE);

            })

    );

    self.skipWaiting();

});


self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(keys => {

            return Promise.all(

                keys.map(key => {

                    if (key !== CACHE_NAME) {

                        return caches.delete(key);

                    }

                })

            );

        })

    );

    self.clients.claim();

});


self.addEventListener("fetch", event => {

    const request = event.request;


    /*
       صفحات HTML:
       نحاول أخذ النسخة الجديدة من الإنترنت أولاً،
       وإذا لا يوجد إنترنت نستخدم النسخة المحفوظة.
    */

    if(
        request.method === "GET" &&
        request.headers.get("accept") &&
        request.headers.get("accept").includes("text/html")
    ){

        event.respondWith(

            fetch(request)

                .then(response => {

                    const copy =
                        response.clone();

                    caches.open(CACHE_NAME)
                        .then(cache => {

                            cache.put(
                                request,
                                copy
                            );

                        });

                    return response;

                })

                .catch(() => {

                    return caches.match(request);

                })

        );

        return;

    }


    /*
       الملفات الأخرى:
       الكاش أولاً ثم الإنترنت.
    */

    event.respondWith(

        caches.match(request)

            .then(cachedResponse => {

                if(cachedResponse){

                    return cachedResponse;

                }


                return fetch(request)

                    .then(response => {

                        const copy =
                            response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {

                                cache.put(
                                    request,
                                    copy
                                );

                            });

                        return response;

                    })

                    .catch(() => {

                        return caches.match(
                            "./index.html"
                        );

                    });

            })

    );

});
