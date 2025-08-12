//import { ApplicationConfig,provideErrorHandler } from '@angular/core';
import { ApplicationConfig} from '@angular/core';
//import { provideErrorHandler } from '@angular/core';
import { ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';


import { routes } from './app.routes';
import {GlobalErrorHandlerService} from '../app/services/global-error-handler.service'

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
  ],
};
