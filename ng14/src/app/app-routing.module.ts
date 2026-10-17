import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { taskRoutes } from './taskboard/task.routes';

const routes: Routes = taskRoutes;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
