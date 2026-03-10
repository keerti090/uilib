import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeIndicatorType = 'Default' | 'Error' | 'Success' | 'Warning' | 'Inactive';
export type BadgeIndicatorStyle =
  | 'Dot - Inline'
  | 'Dot - Overlapping'
  | 'With Text'
  | 'With Text - Overlapping';

@Component({
  selector: 'app-badge-indicator',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./badge-indicator.scss'],
  template: `
    <div
      class="AppCore-badge-indicator"
      [ngClass]="[
        'AppCore-badge-indicator--type-' + type,
        'AppCore-badge-indicator--style-' + styleKey
      ]"
    >
      <!-- Dot (Dot - Inline and Dot - Overlapping) -->
      <div
        *ngIf="indicatorStyle === 'Dot - Inline' || indicatorStyle === 'Dot - Overlapping'"
        class="AppCore-badge-indicator__dot"
      ></div>

      <!-- Avatar (overlapping styles) -->
      <span
        *ngIf="indicatorStyle === 'Dot - Overlapping' || indicatorStyle === 'With Text - Overlapping'"
        class="AppCore-badge-indicator__avatar"
      >
        <span class="material-symbols-rounded AppCore-badge-indicator__avatar-icon">person</span>
      </span>

      <!-- Label (Dot - Inline only) -->
      <span
        *ngIf="indicatorStyle === 'Dot - Inline'"
        class="AppCore-badge-indicator__label"
      >{{ label }}</span>

      <!-- Count pill (With Text and With Text - Overlapping) -->
      <div
        *ngIf="indicatorStyle === 'With Text' || indicatorStyle === 'With Text - Overlapping'"
        class="AppCore-badge-indicator__pill"
      >
        <span class="AppCore-badge-indicator__count">{{ count }}</span>
      </div>
    </div>
  `,
})
export class BadgeIndicatorComponent {
  @Input() type: BadgeIndicatorType = 'Default';
  @Input() indicatorStyle: BadgeIndicatorStyle = 'Dot - Inline';
  @Input() label = 'Label';
  @Input() count = '+99';

  get styleKey(): string {
    const map: Record<BadgeIndicatorStyle, string> = {
      'Dot - Inline': 'dot-inline',
      'Dot - Overlapping': 'dot-overlapping',
      'With Text': 'text',
      'With Text - Overlapping': 'text-overlapping',
    };
    return map[this.indicatorStyle];
  }
}
