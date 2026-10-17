import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({ selector: '[tbHighlight]', standalone: true })
export class HighlightDirective {
  private readonly el = inject(ElementRef) as ElementRef<HTMLElement>;

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
