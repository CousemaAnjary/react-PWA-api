/// <reference lib="webworker" />
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { NetworkOnly } from 'workbox-strategies';

declare let self: ServiceWorkerGlobalScope;

// self.__WB_MANIFEST is le point d'injection par défaut
precacheAndRoute(self.__WB_MANIFEST);

// Nettoyage des anciens caches
cleanupOutdatedCaches();

let allowlist: RegExp[] | undefined;
// Désactivation du precaching en mode dev pour éviter les problèmes de mise en cache
if (import.meta.env.DEV) allowlist = [/^\/$/];

// Servir index.html pour les requêtes de navigation
registerRoute(
  new NavigationRoute(createHandlerBoundToURL('index.html'), { allowlist })
);

// Configuration de Background Sync pour les requêtes POST (ex. ajout de tâches)
const bgSyncPlugin = new BackgroundSyncPlugin('todoQueue', {
  maxRetentionTime: 24 * 60, // Rétenter pendant un maximum de 24 heures
});

registerRoute(
  // Capturer les requêtes POST vers l'API
  ({ url, request }) =>
    url.pathname.startsWith('/api/todo-card') && request.method === 'POST',
  new NetworkOnly({
    plugins: [bgSyncPlugin], // Utilisation de Background Sync pour gérer les requêtes échouées
  }),
  'POST'
);

self.skipWaiting();
clientsClaim();
