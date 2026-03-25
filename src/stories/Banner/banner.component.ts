import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

export type BannerType = 'Information' | 'Success' | 'Warning' | 'Error';

@Component({
  selector: 'AppCore-banner',
  standalone: true,
  imports: [CommonModule, IconComponent],
  styleUrls: ['./banner.scss'],
  template: `
    <div
      class="AppCore-banner"
      [ngClass]="'AppCore-banner--type-' + type"
      role="alert"
    >
      <app-icon
        *ngIf="showIcon"
        class="AppCore-banner__icon"
        [icon]="iconName"
        iconSet="material"
        size="md"
      ></app-icon>

      <div class="AppCore-banner__content">
        <span *ngIf="title" class="AppCore-banner__title">{{ title }}</span>
        <span *ngIf="description" class="AppCore-banner__description">{{ description }}</span>
      </div>

      <div class="AppCore-banner__actions" *ngIf="actionLabel">
        <button
          type="button"
          class="AppCore-banner__action-btn"
          (click)="action.emit()"
        >
          {{ actionLabel }}
        </button>
      </div>

      <button
        *ngIf="dismissible"
        type="button"
        class="AppCore-banner__close"
        (click)="dismiss.emit()"
        aria-label="Close"
      >
        <app-icon icon="close" iconSet="material" size="sm"></app-icon>
      </button>
    </div>
  `,
})
export class BannerComponent {
  @Input() type: BannerType = 'Information';
  @Input() title = '';
  @Input() description = 'Banner message goes here.';
  @Input() showIcon = true;
  @Input() dismissible = false;
  @Input() actionLabel = '';
  @Output() dismiss = new EventEmitter<void>();
  @Output() action = new EventEmitter<void>();

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
