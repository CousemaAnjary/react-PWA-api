/// <reference lib="webworker" />
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { NetworkOnly } from 'workbox-strategies';

declare let self: ServiceWorkerGlobalScope;

// self.__WB_MANIFEST est le point d'injection par défaut
precacheAndRoute(self.__WB_MANIFEST);

// Nettoyage des anciens caches
cleanupOutdatedCaches();

let allowlist: RegExp[] | undefined;
if (import.meta.env.DEV) {
  allowlist = [/^\/$/]; // Désactiver le précaching en mode dev pour éviter les problèmes de cache
}

// Servir index.html pour les requêtes de navigation
registerRoute(
  new NavigationRoute(createHandlerBoundToURL('index.html'), { allowlist })
);

// Activer le Background Sync pour les requêtes POST vers l'API pour ajouter une tâche
const bgSyncPlugin = new BackgroundSyncPlugin('todoQueue', {
  maxRetentionTime: 24 * 60, // Réessayer pendant un maximum de 24 heures
});

registerRoute(
  ({ url, request }) => url.pathname.startsWith('/api/todo-card') && request.method === 'POST',
  new NetworkOnly({
    plugins: [bgSyncPlugin], // Utiliser Background Sync pour gérer les requêtes hors ligne
  }),
  'POST'
);

// Activer le Background Sync pour les requêtes PUT (mise à jour des tâches)
registerRoute(
  ({ url, request }) => url.pathname.startsWith('/api/todo-card') && request.method === 'PUT',
  new NetworkOnly({
    plugins: [bgSyncPlugin], // Synchroniser les requêtes PUT lorsqu'on est à nouveau en ligne
  }),
  'PUT'
);

// Activer le Background Sync pour les requêtes DELETE (suppression des tâches)
registerRoute(
  ({ url, request }) => url.pathname.startsWith('/api/todo-card') && request.method === 'DELETE',
  new NetworkOnly({
    plugins: [bgSyncPlugin], // Synchroniser les requêtes DELETE lorsqu'on est à nouveau en ligne
  }),
  'DELETE'
);

self.skipWaiting();
clientsClaim();
