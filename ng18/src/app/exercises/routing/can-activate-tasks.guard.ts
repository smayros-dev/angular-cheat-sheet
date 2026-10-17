// TODO Angular 18 — see lessons/06-routing.md
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const canActivateTasks: CanActivateFn = () => {
  return inject(Router).parseUrl('/login');
};
