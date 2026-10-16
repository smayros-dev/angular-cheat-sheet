import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { SessionService } from '../../services/session.service';
import { TaskBoardComponent } from './task-board.component';

describe('TaskBoardComponent', () => {
  let fixture: ComponentFixture<TaskBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskBoardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskBoardComponent);
    fixture.detectChanges();
  });

  it('renders the 3 seeded tasks', () => {
    const element: HTMLElement = fixture.nativeElement;
    const items = element.querySelectorAll('li');

    expect(items.length).toBe(3);
    expect(items[0].textContent).toContain('Set up the workspace');
    expect(items[0].textContent).toContain('Done');
    expect(items[1].textContent).toContain('Build the task list');
    expect(items[1].textContent).toContain('In progress');
    expect(items[2].textContent).toContain('Write the docs');
    expect(items[2].textContent).toContain('Ready');
  });

  it('does not render the empty state when tasks are seeded', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('p.empty')).toBeNull();
  });

  it('shows the @defer placeholder before the admin nav loads', () => {
    TestBed.inject(SessionService).login();

    const fresh = TestBed.createComponent(TaskBoardComponent);
    fresh.detectChanges();
    const element: HTMLElement = fresh.nativeElement;

    expect(element.querySelector('.admin-nav-placeholder')).toBeTruthy();
    expect(element.querySelector('nav.admin-nav')).toBeNull();
  });

  it('replaces the placeholder with the admin nav once the defer trigger fires', async () => {
    TestBed.inject(SessionService).login();

    const fresh = TestBed.createComponent(TaskBoardComponent);
    fresh.detectChanges();
    const element: HTMLElement = fresh.nativeElement;

    await new Promise<void>(resolve => setTimeout(resolve, 150));
    fresh.detectChanges();

    expect(element.querySelector('.admin-nav-placeholder')).toBeNull();
    const nav = element.querySelector('nav.admin-nav a');
    expect(nav?.textContent).toContain('Admin');
  });
});
