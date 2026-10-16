import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
  });

  it('renders a Login paragraph', () => {
    const paragraph = fixture.nativeElement.querySelector('p');
    expect(paragraph).toBeTruthy();
    expect(paragraph?.textContent).toContain('Login');
  });
});
