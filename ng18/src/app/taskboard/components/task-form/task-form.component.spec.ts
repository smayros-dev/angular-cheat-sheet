import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Task } from '../../models/task.model';
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

  function titleInput(): HTMLInputElement {
    return fixture.nativeElement.querySelector('input#title');
  }

  function submitButton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('button');
  }

  function setText(value: string): void {
    const input = titleInput();
    input.value = value;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  it('starts invalid with the submit button disabled', () => {
    expect(component.form.invalid).toBeTrue();
    expect(submitButton().disabled).toBeTrue();
  });

  it('defaults the status to ready', () => {
    expect(component.form.controls.status.value).toBe('ready');
  });

  it('shows no title errors before the field is touched', () => {
    expect(fixture.nativeElement.textContent).not.toContain('Title is required');
    expect(fixture.nativeElement.textContent).not.toContain('Title needs at least 3 characters');
  });

  it('shows "Title is required" after touching an empty title', () => {
    titleInput().dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Title is required');
    expect(submitButton().disabled).toBeTrue();
  });

  it('shows "Title needs at least 3 characters" for a too-short title', () => {
    setText('ab');
    titleInput().dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Title needs at least 3 characters');
    expect(submitButton().disabled).toBeTrue();
  });

  it('hides the required error once a valid title is typed', () => {
    titleInput().dispatchEvent(new Event('blur'));
    setText('Ship it');

    expect(fixture.nativeElement.textContent).not.toContain('Title is required');
    expect(fixture.nativeElement.textContent).not.toContain('Title needs at least 3 characters');
    expect(submitButton().disabled).toBeFalse();
  });

  it('emits a task without id on a valid submit and resets the form', () => {
    setText('Ship it');
    const emitted: Omit<Task, 'id'>[] = [];
    component.taskAdded.subscribe(task => emitted.push(task));

    submitButton().click();

    expect(emitted).toEqual([{ title: 'Ship it', status: 'ready' }]);
    expect(component.form.controls.title.value).toBe('');
    expect(component.form.controls.status.value).toBe('ready');
    expect(component.form.invalid).toBeTrue();
  });

  it('emits the selected status', () => {
    setText('Ship it');
    const select: HTMLSelectElement = fixture.nativeElement.querySelector('select');
    select.value = 'in-progress';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    const emitted: Omit<Task, 'id'>[] = [];
    component.taskAdded.subscribe(task => emitted.push(task));
    submitButton().click();

    expect(emitted).toEqual([{ title: 'Ship it', status: 'in-progress' }]);
  });
});
