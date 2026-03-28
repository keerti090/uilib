import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type OverlayType = 'Light' | 'Dark';

@Component({
  selector: 'AppCore-overlay',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./overlay.scss'],
  template: `
    <div
      class="AppCore-overlay"
      [class.AppCore-overlay--visible]="visible"
      [ngClass]="'AppCore-overlay--' + type"
      role="presentation"
      (click)="overlayClick.emit()"
    ></div>
  `,
})
export class OverlayComponent {
  @Input() visible = true;
  @Input() type: OverlayType = 'Light';
  @Output() overlayClick = new EventEmitter<void>();
}
