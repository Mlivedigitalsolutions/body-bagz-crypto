// Body Bagz Service Worker - Offline Support
const CACHE_NAME = 'body-bagz-v1';
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/index.css',
];

const DYNAMIC_CACHE_NAME = 'body-bagz-dynamic-v1';
const API_CACHE_NAME = 'body-bagz-api-v1';

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .catch(error => {
        console.error('Service Worker install failed:', error);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && 
              cacheName !== DYNAMIC_CACHE_NAME && 
              cacheName !== API_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request));
    return;
  }

  // Handle static assets
  if (request.destination === 'image' || 
      request.destination === 'script' || 
      request.destination === 'style') {
    event.respondWith(handleStaticAsset(request));
    return;
  }

  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(handleNavigation(request));
    return;
  }

  // Default handling
  event.respondWith(
    caches.match(request)
      .then(response => response || fetch(request))
  );
});

async function handleApiRequest(request) {
  const url = new URL(request.url);
  
  // Cache leaderboard and user data for offline access
  if (url.pathname.includes('/api/leaderboard') || url.pathname.includes('/api/users/')) {
    try {
      const networkResponse = await fetch(request);
      if (networkResponse.ok) {
        const cache = await caches.open(API_CACHE_NAME);
        cache.put(request, networkResponse.clone());
        return networkResponse;
      }
      throw new Error('Network response not ok');
    } catch (error) {
      const cachedResponse = await caches.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }
      // Return offline fallback for leaderboard
      if (url.pathname.includes('/api/leaderboard')) {
        return new Response(JSON.stringify({
          leaderboard: [],
          monthYear: new Date().toISOString().slice(0, 7),
          offline: true
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
  }

  // For other API requests, try network first
  try {
    return await fetch(request);
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Offline - please try again when connected',
      offline: true
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function handleStaticAsset(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    throw new Error('Network response not ok');
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Asset not available offline', { status: 404 });
  }
}

async function handleNavigation(request) {
  try {
    const networkResponse = await fetch(request);
    return networkResponse;
  } catch (error) {
    // Return cached index.html for offline navigation
    const cachedResponse = await caches.match('/index.html');
    return cachedResponse || new Response('Offline - please check your connection', { 
      status: 503,
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync-actions') {
    event.waitUntil(syncOfflineActions());
  }
});

async function syncOfflineActions() {
  // Get offline actions from IndexedDB and sync when online
  try {
    const db = await openOfflineDB();
    const transaction = db.transaction(['offline_actions'], 'readonly');
    const store = transaction.objectStore('offline_actions');
    const actions = await store.getAll();
    
    for (const action of actions) {
      try {
        await fetch('/api/actions/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(action.data)
        });
        // Remove from offline storage after successful sync
        const deleteTransaction = db.transaction(['offline_actions'], 'readwrite');
        const deleteStore = deleteTransaction.objectStore('offline_actions');
        await deleteStore.delete(action.id);
      } catch (error) {
        console.error('Failed to sync action:', error);
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

function openOfflineDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('BodyBagzOffline', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = event => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('offline_actions')) {
        const store = db.createObjectStore('offline_actions', { keyPath: 'id', autoIncrement: true });
        store.createIndex('timestamp', 'timestamp');
      }
    };
  });
}