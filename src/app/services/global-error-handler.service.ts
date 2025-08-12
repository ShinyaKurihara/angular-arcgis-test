import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class GlobalErrorHandlerService implements ErrorHandler {

  handleError(error: unknown): void {
    if (
      error instanceof Error &&
      error.message.includes('signal is aborted without reason')
    ) {
      return;
    }
    console.error(error);
  }
}
