import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '../services/session.service';

@Component({
  selector: 'tb-login',
  template: `
    <p>Login</p>
    <button type="button" (click)="logIn()">Log in</button>
  `,
})
export class LoginComponent {
  constructor(private readonly session: SessionService, private readonly router: Router) {}

  logIn(): void {
    this.session.login();
    this.router.navigateByUrl('/admin');
  }
}
