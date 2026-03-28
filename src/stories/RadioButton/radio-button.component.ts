import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type RadioButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'AppCore-radio-button',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./radio-button.scss'],
  template: `
    <label
      class="AppCore-radio"
      [ngClass]="[
        'AppCore-radio--size-' + size,
        disabled ? 'AppCore-radio--disabled' : ''
      ]"
    >
      <span class="AppCore-radio__control">
        <input
          type="radio"
          class="AppCore-radio__input"
          [name]="name"
          [value]="value"
          [checked]="checked"
          [disabled]="disabled"
          [attr.id]="inputId || null"
          [attr.aria-label]="!label ? ariaLabel || null : null"
          (change)="onNativeChange()"
        />
        <span class="AppCore-radio__circle" aria-hidden="true"></span>
      </span>
      <span *ngIf="label" class="AppCore-radio__label">{{ label }}</span>
    </label>
  `,
})
export class RadioButtonComponent {
  /** Visible text label next to the radio button. */
  @Input() label = '';
  /** aria-label applied when no visible label is provided. */
  @Input() ariaLabel = '';
  /** Whether this radio button is selected. */
  @Input() checked = false;
  /** Groups radio buttons together — only one per name can be selected. */
  @Input() name = '';
  /** Value emitted when this option is selected. */
  @Input() value = '';
  /** Disables interaction. */
  @Input() disabled = false;
  /** Visual size of the radio button. */
  @Input() size: RadioButtonSize = 'md';
  /** HTML id forwarded to the native input. */
  @Input() inputId = '';

  /** Emits this radio button's value when selected. */
  @Output() valueChange = new EventEmitter<string>();

  onNativeChange(): void {
    if (!this.disabled) {
      this.checked = true;
      this.valueChange.emit(this.value);
    }
  }
}
