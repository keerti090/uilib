import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ToggleSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'appcore-toggle',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./toggle.scss'],
  template: `
    <label
      class="appcore-toggle"
      [ngClass]="[
        'appcore-toggle--size-' + size,
        disabled ? 'appcore-toggle--disabled' : '',
        checked ? 'appcore-toggle--on' : ''
      ]"
    >
      <span *ngIf="label" class="appcore-toggle__label">{{ label }}</span>
      <span class="appcore-toggle__track" aria-hidden="true">
        <span class="appcore-toggle__knob"></span>
      </span>
      <input
        type="checkbox"
        class="appcore-toggle__input"
        [checked]="checked"
        [disabled]="disabled"
        (change)="onNativeChange($event)"
      />
    </label>
  `,
})
export class ToggleComponent {
  /** Visible text label next to the toggle. */
  @Input() label = '';
  /** Whether the toggle is on. */
  @Input() checked = false;
  /** Disables interaction. */
  @Input() disabled = false;
  /** Visual size of the toggle. */
  @Input() size: ToggleSize = 'md';

  /** Emits the new checked value when the user toggles. */
  @Output() checkedChange = new EventEmitter<boolean>();

  onNativeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.checked = input.checked;
    this.checkedChange.emit(input.checked);
  }
}
