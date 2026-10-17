import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '../services/session.service';

@Component({
  selector: 'tb-login',
  standalone: true,
  template: `
    <p>Login</p>
    <button type="button" (click)="logIn()">Log in</button>
  `,
})
export class LoginComponent {
  private readonly session = inject(SessionService);
  private readonly router = inject(Router);

  logIn(): void {
    this.session.login();
    this.router.navigateByUrl('/admin');
  }
}
