/// <reference lib="webworker" />
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { BackgroundSyncPlugin } from 'workbox-background-sync'
import { NetworkOnly } from 'workbox-strategies'

declare let self: ServiceWorkerGlobalScope

// self.__WB_MANIFEST is the default injection point
precacheAndRoute(self.__WB_MANIFEST)

// clean old assets
cleanupOutdatedCaches()

let allowlist: RegExp[] | undefined
// in dev mode, we disable precaching to avoid caching issues
if (import.meta.env.DEV) allowlist = [/^\/$/]

// Serve index.html for navigation requests
registerRoute(
  new NavigationRoute(createHandlerBoundToURL('index.html'), { allowlist })
)

// Enable Background Sync for POST requests (e.g., adding a todo)
const bgSyncPlugin = new BackgroundSyncPlugin('todoQueue', {
  maxRetentionTime: 24 * 60, // Retry for max of 24 hours
})

registerRoute(
  // Capture requests to your API for adding a todo
  ({ url, request }) =>
    url.pathname.startsWith('/api/todo-card') && request.method === 'POST',
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'POST'
)

self.skipWaiting()
clientsClaim()