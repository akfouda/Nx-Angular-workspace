/* eslint-disable @nx/enforce-module-boundaries */
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideEnvironment } from './../../../../packages/ui/src/lib/core/environment/environment.provider';
import { provideDataAccess } from './../../../../packages/ui/src/lib/core/data-access/data-access.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideEnvironment({
      contexts: {
        api: { name: 'api/v1', port: 8000 },
      },
      host: 'http://localhost',  
      production: false,
    }),
    provideDataAccess()

  ],
};
