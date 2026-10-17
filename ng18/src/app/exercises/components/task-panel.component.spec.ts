import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPanelComponent } from './task-panel.component';

@Component({
  standalone: true,
  imports: [TaskPanelComponent],
  template: `
    <tb-task-panel>
      <span header>Panel header text</span>
      <p>Panel body text</p>
      <span footer>Panel footer text</span>
    </tb-task-panel>
  `,
})
class PanelHostComponent {}

describe('TaskPanelComponent', () => {
  let fixture: ComponentFixture<PanelHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelHostComponent);
    fixture.detectChanges();
  });

  it('projects the [header] content', () => {
    expect(fixture.nativeElement.textContent).toContain('Panel header text');
  });

  it('projects the [footer] content', () => {
    expect(fixture.nativeElement.textContent).toContain('Panel footer text');
  });

  it('projects the default body content', () => {
    expect(fixture.nativeElement.textContent).toContain('Panel body text');
  });
});
