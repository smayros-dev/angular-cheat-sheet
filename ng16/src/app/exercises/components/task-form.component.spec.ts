import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Task } from '../models';
import { TaskFormComponent } from './task-form.component';

describe('TaskFormComponent', () => {
  let fixture: ComponentFixture<TaskFormComponent>;
  let component: TaskFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function titleInput(): HTMLInputElement | null {
    return fixture.nativeElement.querySelector('input#title');
  }

  function statusSelect(): HTMLSelectElement | null {
    return fixture.nativeElement.querySelector('select');
  }

  function submitButton(): HTMLButtonElement | null {
    return fixture.nativeElement.querySelector('button');
  }

  function setText(value: string): void {
    const input = titleInput();
    if (!input) {
      return;
    }
    input.value = value;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  function touchTitle(): void {
    const input = titleInput();
    if (!input) {
      return;
    }
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
  }

  it('starts with the submit button disabled and no errors shown', () => {
    expect(submitButton()).toBeTruthy();
    expect(submitButton()?.disabled).toBe(true);
    expect(fixture.nativeElement.textContent).not.toContain('Title is required');
    expect(fixture.nativeElement.textContent).not.toContain('Title needs at least 3 characters');
  });

  it('defaults the status select to ready', () => {
    expect(statusSelect()).toBeTruthy();
    expect(statusSelect()?.value).toBe('ready');
  });

  it('shows "Title is required" after touching an empty title', () => {
    touchTitle();

    expect(fixture.nativeElement.textContent).toContain('Title is required');
    expect(submitButton()?.disabled).toBe(true);
  });

  it('shows "Title needs at least 3 characters" for a too-short title', () => {
    setText('ab');
    touchTitle();

    expect(fixture.nativeElement.textContent).toContain('Title needs at least 3 characters');
    expect(submitButton()?.disabled).toBe(true);
  });

  it('keeps the length error hidden while typing before the field is touched', () => {
    expect(titleInput()).toBeTruthy();

    setText('ab');

    expect(fixture.nativeElement.textContent).not.toContain('Title needs at least 3 characters');
    expect(submitButton()?.disabled).toBe(true);
  });

  it('hides the errors and enables submit for a valid title', () => {
    touchTitle();
    setText('Ship it');

    expect(titleInput()).toBeTruthy();
    expect(titleInput()?.value).toBe('Ship it');
    expect(fixture.nativeElement.textContent).not.toContain('Title is required');
    expect(fixture.nativeElement.textContent).not.toContain('Title needs at least 3 characters');
    expect(submitButton()?.disabled).toBe(false);
  });

  it('emits the title and default status on a valid submit', () => {
    setText('Ship it');
    const emitted: Omit<Task, 'id'>[] = [];
    component.submitted.subscribe(task => emitted.push(task));

    submitButton()?.click();

    expect(emitted).toEqual([{ title: 'Ship it', status: 'ready' }]);
  });

  it('emits the selected status on submit', () => {
    setText('Ship it');
    const select = statusSelect();
    if (select) {
      select.value = 'in-progress';
      select.dispatchEvent(new Event('change'));
      fixture.detectChanges();
    }
    const emitted: Omit<Task, 'id'>[] = [];
    component.submitted.subscribe(task => emitted.push(task));

    submitButton()?.click();

    expect(emitted).toEqual([{ title: 'Ship it', status: 'in-progress' }]);
  });
});
