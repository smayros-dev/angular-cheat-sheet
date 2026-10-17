import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPanelComponent } from './task-panel.component';

@Component({
  standalone: true,
  imports: [TaskPanelComponent],
  // Slots are given out of order on purpose: only [header]/[footer]
  // selectors can put them back in header → body → footer order.
  template: `
    <tb-task-panel>
      <span footer>Panel footer text</span>
      <p>Panel body text</p>
      <span header>Panel header text</span>
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

  it('renders the header before the body and the body before the footer', () => {
    const text: string = fixture.nativeElement.textContent;
    const header = text.indexOf('Panel header text');
    const body = text.indexOf('Panel body text');
    const footer = text.indexOf('Panel footer text');

    expect(header).toBeGreaterThan(-1);
    expect(header).toBeLessThan(body);
    expect(body).toBeLessThan(footer);
  });
});
