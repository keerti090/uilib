import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type OverlayType = 'Light' | 'Dark';

@Component({
  selector: 'appcore-overlay',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./overlay.scss'],
  template: `
    <div
      class="appcore-overlay"
      [class.appcore-overlay--visible]="visible"
      [ngClass]="'appcore-overlay--' + type"
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
