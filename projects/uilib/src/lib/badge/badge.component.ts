import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

export type BadgeType = 'Default' | 'Error' | 'Success' | 'Warning' | 'Information';
export type BadgeStyle = 'Outlined' | 'Toned' | 'Highlighted';
export type BadgeSize = 'S' | 'M' | 'L';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule, IconComponent],
  styleUrls: ['./badge.scss'],
  template: `
    <span
      class="appcore-badge"
      [ngClass]="[
        'appcore-badge--type-' + type,
        'appcore-badge--style-' + badgeStyle,
        'appcore-badge--size-' + size
      ]"
    >
      <app-icon
        *ngIf="showPrefixIcon"
        class="appcore-badge__icon"
        [icon]="prefixIcon"
        [iconSet]="prefixIconSet"
        [src]="prefixIconSrc"
        size="sm"
      ></app-icon>

      <span class="appcore-badge__label">{{ label }}</span>

      <app-icon
        *ngIf="showSuffixIcon"
        class="appcore-badge__icon"
        [icon]="suffixIcon"
        [iconSet]="suffixIconSet"
        [src]="suffixIconSrc"
        size="sm"
      ></app-icon>
    </span>
  `
})
export class BadgeComponent {
  @Input() label = 'Label';
  @Input() type: BadgeType = 'Default';
  @Input() badgeStyle: BadgeStyle = 'Outlined';
  @Input() size: BadgeSize = 'S';
  @Input() showPrefixIcon = false;
  @Input() showSuffixIcon = false;
  @Input() prefixIcon = 'add';
  @Input() prefixIconSet: 'material' | 'asset' = 'material';
  @Input() prefixIconSrc?: string;
  @Input() suffixIcon = 'add';
  @Input() suffixIconSet: 'material' | 'asset' = 'material';
  @Input() suffixIconSrc?: string;
}
