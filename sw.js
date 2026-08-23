const CACHE_NAME = "souq-mubasher-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./products.html",
    "./assistant.html",
    "./manifest.json"
];


// تثبيت Service Worker
self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(FILES_TO_CACHE);

            })

    );

    self.skipWaiting();

});


// تفعيل Service Worker
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


// التعامل مع طلبات الصفحات
self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(cachedResponse => {

                // إذا الصفحة موجودة في الهاتف
                if (cachedResponse) {

                    return cachedResponse;

                }

                // إذا الإنترنت موجود
                return fetch(event.request)

                    .then(response => {

                        // حفظ نسخة للاستخدام لاحقاً
                        const responseClone = response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {

                                cache.put(
                                    event.request,
                                    responseClone
                                );

                            });

                        return response;

                    })

                    .catch(() => {

                        // إذا لا يوجد إنترنت
                        return caches.match("./index.html");

                    });

            })

    );

});
