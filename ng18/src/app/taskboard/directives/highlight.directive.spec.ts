import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {
  @Component({
    template: '<button tbHighlight>Task</button>',
    standalone: true,
    imports: [HighlightDirective],
  })
  class HostComponent {}

  let fixture: ComponentFixture<HostComponent>;
  let item: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    item = fixture.nativeElement.querySelector('button');
  });

  it('adds the highlighted class on mouseenter and removes it on mouseleave', () => {
    item.dispatchEvent(new Event('mouseenter'));
    expect(item.classList).toContain('highlighted');

    item.dispatchEvent(new Event('mouseleave'));
    expect(item.classList).not.toContain('highlighted');
  });

  it('adds the highlighted class on focus and removes it on blur', () => {
    item.dispatchEvent(new Event('focus'));
    expect(item.classList).toContain('highlighted');

    item.dispatchEvent(new Event('blur'));
    expect(item.classList).not.toContain('highlighted');
  });
});
