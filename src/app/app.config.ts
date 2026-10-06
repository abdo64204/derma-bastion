import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';

const scrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
  scrollOffset: () => [0, typeof window !== 'undefined' && window.innerWidth <= 900 ? 0 : 80]
} as Parameters<typeof withInMemoryScrolling>[0] & {
  scrollOffset: () => [number, number];
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withInMemoryScrolling(scrollingOptions))
  ]
};
