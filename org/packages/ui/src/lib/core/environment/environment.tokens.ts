// eslint-disable-next-line @nx/enforce-module-boundaries
import { InjectionToken } from '@angular/core';
import { Environment } from './environment.types';

export const ENV = new InjectionToken<Environment>('ENVIRONMENT_TOKEN');
