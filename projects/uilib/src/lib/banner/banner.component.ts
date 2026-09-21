import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

export type BannerType = 'Information' | 'Success' | 'Warning' | 'Error';

@Component({
  selector: 'appcore-banner',
  standalone: true,
  imports: [CommonModule, IconComponent],
  styleUrls: ['./banner.scss'],
  template: `
    <div
      class="appcore-banner"
      [ngClass]="'appcore-banner--type-' + type"
      role="alert"
    >
      <app-icon
        *ngIf="showIcon"
        class="appcore-banner__icon"
        [icon]="iconName"
        iconSet="material"
        size="md"
      ></app-icon>

      <div class="appcore-banner__content">
        <span *ngIf="title" class="appcore-banner__title">{{ title }}</span>
        <span *ngIf="description" class="appcore-banner__description">{{ description }}</span>
      </div>

      <div class="appcore-banner__actions" *ngIf="actionLabel">
        <button
          type="button"
          class="appcore-banner__action-btn"
          (click)="action.emit()"
        >
          {{ actionLabel }}
        </button>
      </div>

      <button
        *ngIf="dismissible"
        type="button"
        class="appcore-banner__close"
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
