import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { taskRoutes } from './taskboard/task.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(taskRoutes)]
};
