import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[tbHighlight]' })
export class HighlightDirective {
  constructor(private readonly el: ElementRef<HTMLElement>) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.el.nativeElement.classList.add('highlighted');
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.el.nativeElement.classList.remove('highlighted');
  }

  @HostListener('focus')
  onFocus(): void {
    this.el.nativeElement.classList.add('highlighted');
  }

  @HostListener('blur')
  onBlur(): void {
    this.el.nativeElement.classList.remove('highlighted');
  }
}
