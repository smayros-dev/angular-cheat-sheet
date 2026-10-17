import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SessionService } from '../services/session.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let session: SessionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    router = TestBed.inject(Router);
    session = TestBed.inject(SessionService);
    spyOn(router, 'navigateByUrl').and.resolveTo(true);

    fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
  });

  it('logs in and navigates to /admin', () => {
    fixture.nativeElement.querySelector('button').click();

    expect(session.isLoggedIn()).toBeTrue();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/admin');
  });
});
