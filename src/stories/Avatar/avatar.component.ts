import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

export type AvatarSize = 'XS' | 'S' | 'M' | 'L' | 'XL';
export type AvatarType = 'image' | 'initials' | 'icon' | 'placeholder';
export type AvatarStatus = 'none' | 'online' | 'offline' | 'away' | 'busy';
export type AvatarColor =
  | 'blue'
  | 'green'
  | 'orange'
  | 'pink'
  | 'purple'
  | 'turquoise'
  | 'yellow'
  | 'default';

@Component({
  selector: 'AppCore-avatar',
  standalone: true,
  imports: [CommonModule, IconComponent],
  styleUrls: ['./avatar.scss'],
  template: `
    <div
      class="AppCore-avatar"
      [ngClass]="[
        'AppCore-avatar--size-' + size,
        'AppCore-avatar--type-' + type,
        type === 'initials' ? 'AppCore-avatar--color-' + color : ''
      ]"
    >
      <!-- Image -->
      <img
        *ngIf="type === 'image' && src"
        class="AppCore-avatar__image"
        [src]="src"
        [alt]="alt"
      />

      <!-- Initials -->
      <span *ngIf="type === 'initials'" class="AppCore-avatar__initials">
        {{ computedInitials }}
      </span>

      <!-- Icon -->
      <app-icon
        *ngIf="type === 'icon'"
        class="AppCore-avatar__icon"
        [icon]="icon"
        iconSet="material"
        size="sm"
      ></app-icon>

      <!-- Placeholder -->
      <app-icon
        *ngIf="type === 'placeholder'"
        class="AppCore-avatar__icon AppCore-avatar__icon--placeholder"
        icon="person"
        iconSet="material"
        size="sm"
      ></app-icon>

      <!-- Status dot -->
      <span
        *ngIf="status !== 'none'"
        class="AppCore-avatar__status"
        [ngClass]="'AppCore-avatar__status--' + status"
      ></span>
    </div>
  `,
})
export class AvatarComponent implements OnChanges {
  @Input() type: AvatarType = 'placeholder';
  @Input() size: AvatarSize = 'M';
  @Input() src?: string;
  @Input() alt = '';
  @Input() name = '';
  @Input() initials = '';
  @Input() icon = 'person';
  @Input() color: AvatarColor = 'blue';
  @Input() status: AvatarStatus = 'none';

  computedInitials = '';

  ngOnChanges(): void {
    if (this.initials) {
      this.computedInitials = this.initials.slice(0, 2).toUpperCase();
    } else if (this.name) {
      const parts = this.name.trim().split(/\s+/);
      this.computedInitials = parts
        .slice(0, 2)
        .map((p) => p[0])
        .join('')
        .toUpperCase();
    } else {
      this.computedInitials = '';
    }
  }
}
