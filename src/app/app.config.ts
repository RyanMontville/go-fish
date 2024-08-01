import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { GameService } from './game.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    GameService]
};
