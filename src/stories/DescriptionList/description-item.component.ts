import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { BadgeComponent } from '../Badge/badge.component';

export type DescriptionItemSize = 'S' | 'M' | 'L';
export type DescriptionItemType = 'Horizontal' | 'Vertical' | '2Column' | 'Display';

@Component({
  selector: 'AppCore-description-item',
  standalone: true,
  imports: [CommonModule, IconComponent, BadgeComponent],
  styleUrls: ['./description-item.scss'],
  template: `
    <div
      class="AppCore-description-item"
      [ngClass]="[
        'AppCore-description-item--type-' + type,
        'AppCore-description-item--size-' + size
      ]"
    >
      <!-- Prefix Avatar (left side, used in 2Column and Display types) -->
      <div *ngIf="showPrefixAvatar" class="AppCore-description-item__avatar AppCore-description-item__avatar--prefix">
        <span>{{ prefixAvatarLabel }}</span>
      </div>

      <!-- Main body -->
      <div class="AppCore-description-item__body">

        <!-- Label row -->
        <div class="AppCore-description-item__label-wrapper">
          <app-icon
            *ngIf="showLabelIcon"
            [icon]="labelIcon"
            iconSet="material"
            [size]="iconSize"
            class="AppCore-description-item__icon"
          ></app-icon>
          <span class="AppCore-description-item__label">{{ label }}</span>
        </div>

        <!-- Content row -->
        <div class="AppCore-description-item__content">
          <!-- Content avatar (appears before value text) -->
          <div
            *ngIf="showContentAvatar"
            class="AppCore-description-item__avatar AppCore-description-item__avatar--content"
          >
            <span>{{ contentAvatarLabel }}</span>
          </div>

          <span class="AppCore-description-item__value">{{ value }}</span>

          <app-icon
            *ngIf="showContentIcon1"
            [icon]="contentIcon1"
            iconSet="material"
            [size]="iconSize"
            class="AppCore-description-item__icon"
          ></app-icon>

          <app-icon
            *ngIf="showContentIcon2"
            [icon]="contentIcon2"
            iconSet="material"
            [size]="iconSize"
            class="AppCore-description-item__icon"
          ></app-icon>

          <app-badge
            *ngIf="showBadge"
            [label]="badgeLabel"
            badgeStyle="Toned"
            size="S"
          ></app-badge>
        </div>
      </div>

      <!-- Suffix Avatar (after content, all types) -->
      <div *ngIf="showSuffixAvatar" class="AppCore-description-item__avatar AppCore-description-item__avatar--suffix">
        <span>{{ suffixAvatarLabel }}</span>
      </div>
    </div>
  `,
})
export class DescriptionItemComponent {
  @Input() label = 'Label:';
  @Input() value = 'Text';
  @Input() size: DescriptionItemSize = 'M';
  @Input() type: DescriptionItemType = 'Horizontal';

  // Label icon
  @Input() showLabelIcon = false;
  @Input() labelIcon = 'info';

  // Content icons
  @Input() showContentIcon1 = false;
  @Input() contentIcon1 = 'open_in_new';
  @Input() showContentIcon2 = false;
  @Input() contentIcon2 = 'content_copy';

  // Badge
  @Input() showBadge = false;
  @Input() badgeLabel = 'Badge';

  // Prefix avatar (left side for 2Column / Display)
  @Input() showPrefixAvatar = false;
  @Input() prefixAvatarLabel = 'KS';

  // Content avatar (inside content row before value)
  @Input() showContentAvatar = false;
  @Input() contentAvatarLabel = 'KS';

  // Suffix avatar (after the body)
  @Input() showSuffixAvatar = false;
  @Input() suffixAvatarLabel = 'KS';

  get iconSize(): 'sm' | 'md' {
    return this.size === 'L' ? 'md' : 'sm';
  }
}
