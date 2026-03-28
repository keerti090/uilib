import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ToggleSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'AppCore-toggle',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./toggle.scss'],
  template: `
    <label
      class="AppCore-toggle"
      [ngClass]="[
        'AppCore-toggle--size-' + size,
        disabled ? 'AppCore-toggle--disabled' : '',
        checked ? 'AppCore-toggle--on' : ''
      ]"
    >
      <span *ngIf="label" class="AppCore-toggle__label">{{ label }}</span>
      <span class="AppCore-toggle__track" aria-hidden="true">
        <span class="AppCore-toggle__knob"></span>
      </span>
      <input
        type="checkbox"
        class="AppCore-toggle__input"
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
