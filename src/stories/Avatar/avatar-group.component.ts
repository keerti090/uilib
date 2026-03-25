import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent, AvatarColor, AvatarSize, AvatarType } from './avatar.component';

export type AvatarGroupVariant = 'stack' | 'block';

export interface AvatarGroupItem {
  type?: AvatarType;
  src?: string;
  alt?: string;
  name?: string;
  initials?: string;
  icon?: string;
  color?: AvatarColor;
}

@Component({
  selector: 'AppCore-avatar-group',
  standalone: true,
  imports: [CommonModule, AvatarComponent],
  styleUrls: ['./avatar-group.scss'],
  template: `
    <div
      class="AppCore-avatar-group"
      [ngClass]="[
        'AppCore-avatar-group--' + variant,
        'AppCore-avatar-group--size-' + size
      ]"
    >
      <AppCore-avatar
        *ngFor="let item of visibleItems; let i = index"
        class="AppCore-avatar-group__item"
        [style.zIndex]="variant === 'stack' ? visibleItems.length - i : null"
        [type]="item.type || 'placeholder'"
        [size]="size"
        [src]="item.src || ''"
        [alt]="item.alt || ''"
        [name]="item.name || ''"
        [initials]="item.initials || ''"
        [icon]="item.icon || 'person'"
        [color]="item.color || 'blue'"
      ></AppCore-avatar>

      <!-- Overflow count -->
      <div
        *ngIf="overflowCount > 0"
        class="AppCore-avatar-group__overflow"
        [ngClass]="'AppCore-avatar-group__overflow--size-' + size"
        [style.zIndex]="variant === 'stack' ? 0 : null"
      >
        +{{ overflowCount }}
      </div>
    </div>
  `,
})
export class AvatarGroupComponent implements OnChanges {
  @Input() items: AvatarGroupItem[] = [];
  @Input() variant: AvatarGroupVariant = 'stack';
  @Input() size: AvatarSize = 'M';
  @Input() max = 5;

  visibleItems: AvatarGroupItem[] = [];
  overflowCount = 0;

  ngOnChanges(): void {
    if (this.items.length > this.max) {
      this.visibleItems = this.items.slice(0, this.max);
      this.overflowCount = this.items.length - this.max;
    } else {
      this.visibleItems = this.items;
      this.overflowCount = 0;
    }
  }
}
