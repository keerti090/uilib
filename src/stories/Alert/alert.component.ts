import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

export type AlertType = 'Information' | 'Success' | 'Warning' | 'Error';

@Component({
  selector: 'AppCore-alert',
  standalone: true,
  imports: [CommonModule, IconComponent],
  styleUrls: ['./alert.scss'],
  template: `
    <div
      class="AppCore-alert"
      [ngClass]="'AppCore-alert--type-' + type"
      role="alert"
    >
      <app-icon
        *ngIf="showIcon"
        class="AppCore-alert__icon"
        [icon]="iconName"
        iconSet="material"
        size="md"
      ></app-icon>

      <div class="AppCore-alert__content">
        <span *ngIf="title" class="AppCore-alert__title">{{ title }}</span>
        <span *ngIf="description" class="AppCore-alert__description">{{ description }}</span>
      </div>

      <button
        *ngIf="dismissible"
        type="button"
        class="AppCore-alert__close"
        (click)="dismiss.emit()"
        aria-label="Close"
      >
        <app-icon icon="close" iconSet="material" size="sm"></app-icon>
      </button>
    </div>
  `,
})
export class AlertComponent {
  @Input() type: AlertType = 'Information';
  @Input() title = '';
  @Input() description = 'Alert description text goes here.';
  @Input() showIcon = true;
  @Input() dismissible = false;
  @Output() dismiss = new EventEmitter<void>();

  get iconName(): string {
    switch (this.type) {
      case 'Success': return 'check_circle';
      case 'Warning': return 'warning';
      case 'Error': return 'error';
      case 'Information':
      default: return 'info';
    }
  }
}
