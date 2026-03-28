import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

export type SegmentSize = 'S' | 'M' | 'L';
export type SegmentState = 'default' | 'hover' | 'selected' | 'disabled' | 'disabled-selected';

@Component({
  selector: 'app-segmented-control-item',
  standalone: true,
  imports: [CommonModule, IconComponent],
  styleUrls: ['./segmented-control-item.scss'],
  template: `
    <button
      class="AppCore-segment-item"
      [ngClass]="[
        'AppCore-segment-item--size-' + size,
        'AppCore-segment-item--state-' + state
      ]"
      [disabled]="state === 'disabled' || state === 'disabled-selected'"
      (click)="onClick()"
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
    >
      <app-icon
        *ngIf="showIcon"
        class="AppCore-segment-item__icon"
        [icon]="iconName"
        [iconSet]="iconSet"
        [src]="iconSrc"
        size="sm"
      ></app-icon>
      <span class="AppCore-segment-item__label">{{ label }}</span>
    </button>
  `
})
export class SegmentedControlItemComponent {
  @Input() label = 'Label';
  @Input() size: SegmentSize = 'M';
  @Input() state: SegmentState = 'default';
  @Input() showIcon = false;
  @Input() iconName = 'add';
  @Input() iconSet: 'material' | 'asset' = 'material';
  @Input() iconSrc?: string;

  @Output() itemClick = new EventEmitter<void>();

  onClick() {
    if (this.state !== 'disabled' && this.state !== 'disabled-selected') {
      this.itemClick.emit();
    }
  }

  onMouseEnter() {
    if (this.state === 'default') {
      this.state = 'hover';
    }
  }

  onMouseLeave() {
    if (this.state === 'hover') {
      this.state = 'default';
    }
  }
}
