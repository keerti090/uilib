import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescriptionItemComponent, DescriptionItemSize, DescriptionItemType } from './description-item.component';

export type DescriptionListLayout = 'horizontal' | 'vertical';

export interface DescriptionListItem {
  label: string;
  value: string;

  // Item-level overrides (falls back to list-level defaults when omitted)
  size?: DescriptionItemSize;
  type?: DescriptionItemType;

  // Label icon
  showLabelIcon?: boolean;
  labelIcon?: string;

  // Content icons
  showContentIcon1?: boolean;
  contentIcon1?: string;
  showContentIcon2?: boolean;
  contentIcon2?: string;

  // Badge
  showBadge?: boolean;
  badgeLabel?: string;

  // Prefix avatar (left side — primarily for 2Column / Display types)
  showPrefixAvatar?: boolean;
  prefixAvatarLabel?: string;

  // Content avatar (inside the content row before value text)
  showContentAvatar?: boolean;
  contentAvatarLabel?: string;

  // Suffix avatar (after the body)
  showSuffixAvatar?: boolean;
  suffixAvatarLabel?: string;
}

@Component({
  selector: 'AppCore-description-list',
  standalone: true,
  imports: [CommonModule, DescriptionItemComponent],
  styleUrls: ['./description-list.scss'],
  template: `
    <div
      class="AppCore-description-list"
      [ngClass]="[
        'AppCore-description-list--layout-' + layout,
        'AppCore-description-list--size-' + size,
        divider ? 'AppCore-description-list--divider' : ''
      ]"
    >
      <span *ngIf="title" class="AppCore-description-list__title">{{ title }}</span>

      <div class="AppCore-description-list__items">
        <div *ngFor="let item of items" class="AppCore-description-list__item">
          <AppCore-description-item
            [label]="item.label"
            [value]="item.value"
            [size]="item.size || size"
            [type]="item.type || itemType"
            [showLabelIcon]="item.showLabelIcon || false"
            [labelIcon]="item.labelIcon || 'info'"
            [showContentIcon1]="item.showContentIcon1 || false"
            [contentIcon1]="item.contentIcon1 || 'open_in_new'"
            [showContentIcon2]="item.showContentIcon2 || false"
            [contentIcon2]="item.contentIcon2 || 'content_copy'"
            [showBadge]="item.showBadge || false"
            [badgeLabel]="item.badgeLabel || ''"
            [showPrefixAvatar]="item.showPrefixAvatar || false"
            [prefixAvatarLabel]="item.prefixAvatarLabel || 'KS'"
            [showContentAvatar]="item.showContentAvatar || false"
            [contentAvatarLabel]="item.contentAvatarLabel || 'KS'"
            [showSuffixAvatar]="item.showSuffixAvatar || false"
            [suffixAvatarLabel]="item.suffixAvatarLabel || 'KS'"
          ></AppCore-description-item>
        </div>
      </div>
    </div>
  `,
})
export class DescriptionListComponent {
  @Input() items: DescriptionListItem[] = [];

  /** How items are arranged: 'vertical' stacks them, 'horizontal' places them in a row */
  @Input() layout: DescriptionListLayout = 'vertical';

  /** Default item layout type — can be overridden per-item via item.type */
  @Input() itemType: DescriptionItemType = 'Horizontal';

  /** Default size for all items — can be overridden per-item via item.size */
  @Input() size: DescriptionItemSize = 'M';

  @Input() title = '';
  @Input() divider = false;
}
