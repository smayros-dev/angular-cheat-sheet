// TODO Angular 16 — see lessons/06-routing.md
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Session {
  isLoggedIn(): boolean {
    return false;
  }

  login(): void {}

  logout(): void {}
}
