import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type NumericStepperVariant = 'left-input' | 'center-input';
export type NumericStepperLabelPosition = 'vertical' | 'horizontal';

@Component({
  selector: 'AppCore-numeric-stepper',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./numeric-stepper.scss'],
  template: `
    <!-- Left-Input Numeric Stepper -->
    <div
      *ngIf="variant === 'left-input'"
      class="AppCore-numeric-stepper AppCore-numeric-stepper--left-input"
      [class.AppCore-numeric-stepper--disabled]="disabled"
      [class.AppCore-numeric-stepper--error]="error"
    >
      <div class="AppCore-numeric-stepper__label">
        <span class="AppCore-numeric-stepper__label-text">{{ label }}</span>
        <span *ngIf="required" class="AppCore-numeric-stepper__required">*</span>
      </div>

      <div
        class="AppCore-numeric-stepper__container"
        [class.AppCore-numeric-stepper__container--focused]="isFocused"
      >
        <input
          class="AppCore-numeric-stepper__input"
          type="text"
          inputmode="numeric"
          [value]="displayValue"
          [disabled]="disabled"
          (focus)="onFocus()"
          (blur)="onBlur($event)"
          (input)="onInputChange($event)"
          (keydown.arrowup)="increment()"
          (keydown.arrowdown)="decrement()"
          aria-label="{{ label }} value"
        />

        <div class="AppCore-numeric-stepper__actions">
          <button
            class="AppCore-numeric-stepper__action-btn"
            type="button"
            [disabled]="disabled || (min !== undefined && value <= min)"
            (click)="decrement()"
            aria-label="Decrement"
          >
            <!-- Minus icon -->
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M4.57143 8.57143H11.4286C11.5905 8.57143 11.7262 8.51667 11.8357 8.40714C11.9452 8.29762 12 8.1619 12 8C12 7.8381 11.9452 7.70238 11.8357 7.59286C11.7262 7.48333 11.5905 7.42857 11.4286 7.42857H4.57143C4.40952 7.42857 4.27381 7.48333 4.16429 7.59286C4.05476 7.70238 4 7.8381 4 8C4 8.1619 4.05476 8.29762 4.16429 8.40714C4.27381 8.51667 4.40952 8.57143 4.57143 8.57143Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <button
            class="AppCore-numeric-stepper__action-btn"
            type="button"
            [disabled]="disabled || (max !== undefined && value >= max)"
            (click)="increment()"
            aria-label="Increment"
          >
            <!-- Plus icon -->
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M7.42857 8.57143H4.57143C4.40952 8.57143 4.27381 8.51667 4.16429 8.40714C4.05476 8.29762 4 8.1619 4 8C4 7.8381 4.05476 7.70238 4.16429 7.59286C4.27381 7.48333 4.40952 7.42857 4.57143 7.42857H7.42857V4.57143C7.42857 4.40952 7.48333 4.27381 7.59286 4.16429C7.70238 4.05476 7.8381 4 8 4C8.1619 4 8.29762 4.05476 8.40714 4.16429C8.51667 4.27381 8.57143 4.40952 8.57143 4.57143V7.42857H11.4286C11.5905 7.42857 11.7262 7.48333 11.8357 7.59286C11.9452 7.70238 12 7.8381 12 8C12 8.1619 11.9452 8.29762 11.8357 8.40714C11.7262 8.51667 11.5905 8.57143 11.4286 8.57143H8.57143V11.4286C8.57143 11.5905 8.51667 11.7262 8.40714 11.8357C8.29762 11.9452 8.1619 12 8 12C7.8381 12 7.70238 11.9452 7.59286 11.8357C7.48333 11.7262 7.42857 11.5905 7.42857 11.4286V8.57143Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Center-Input Numeric Stepper -->
    <div
      *ngIf="variant === 'center-input'"
      class="AppCore-numeric-stepper AppCore-numeric-stepper--center-input"
      [class.AppCore-numeric-stepper--center-horizontal]="labelPosition === 'horizontal'"
      [class.AppCore-numeric-stepper--disabled]="disabled"
      [class.AppCore-numeric-stepper--error]="error"
    >
      <!-- Label wrapper (for horizontal: provides column layout for label) -->
      <div
        class="AppCore-numeric-stepper__label-wrapper"
        [class.AppCore-numeric-stepper__label-wrapper--horizontal]="labelPosition === 'horizontal'"
      >
        <div class="AppCore-numeric-stepper__label">
          <span class="AppCore-numeric-stepper__label-text">{{ label }}</span>
          <span *ngIf="required" class="AppCore-numeric-stepper__required">*</span>
        </div>
      </div>

      <div
        class="AppCore-numeric-stepper__container AppCore-numeric-stepper__container--center"
        [class.AppCore-numeric-stepper__container--focused]="isFocused"
      >
        <!-- Decrement -->
        <button
          class="AppCore-numeric-stepper__action-btn AppCore-numeric-stepper__action-btn--decrement"
          type="button"
          [disabled]="disabled || (min !== undefined && value <= min)"
          (click)="decrement()"
          aria-label="Decrement"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M4.57143 8.57143H11.4286C11.5905 8.57143 11.7262 8.51667 11.8357 8.40714C11.9452 8.29762 12 8.1619 12 8C12 7.8381 11.9452 7.70238 11.8357 7.59286C11.7262 7.48333 11.5905 7.42857 11.4286 7.42857H4.57143C4.40952 7.42857 4.27381 7.48333 4.16429 7.59286C4.05476 7.70238 4 7.8381 4 8C4 8.1619 4.05476 8.29762 4.16429 8.40714C4.27381 8.51667 4.40952 8.57143 4.57143 8.57143Z"
              fill="currentColor"
            />
          </svg>
        </button>

        <!-- Value input -->
        <input
          class="AppCore-numeric-stepper__input AppCore-numeric-stepper__input--centered"
          type="text"
          inputmode="numeric"
          [value]="displayValue"
          [disabled]="disabled"
          (focus)="onFocus()"
          (blur)="onBlur($event)"
          (input)="onInputChange($event)"
          (keydown.arrowup)="increment()"
          (keydown.arrowdown)="decrement()"
          aria-label="{{ label }} value"
        />

        <!-- Increment -->
        <button
          class="AppCore-numeric-stepper__action-btn AppCore-numeric-stepper__action-btn--increment"
          type="button"
          [disabled]="disabled || (max !== undefined && value >= max)"
          (click)="increment()"
          aria-label="Increment"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M7.42857 8.57143H4.57143C4.40952 8.57143 4.27381 8.51667 4.16429 8.40714C4.05476 8.29762 4 8.1619 4 8C4 7.8381 4.05476 7.70238 4.16429 7.59286C4.27381 7.48333 4.40952 7.42857 4.57143 7.42857H7.42857V4.57143C7.42857 4.40952 7.48333 4.27381 7.59286 4.16429C7.70238 4.05476 7.8381 4 8 4C8.1619 4 8.29762 4.05476 8.40714 4.16429C8.51667 4.27381 8.57143 4.40952 8.57143 4.57143V7.42857H11.4286C11.5905 7.42857 11.7262 7.48333 11.8357 7.59286C11.9452 7.70238 12 7.8381 12 8C12 8.1619 11.9452 8.29762 11.8357 8.40714C11.7262 8.51667 11.5905 8.57143 11.4286 8.57143H8.57143V11.4286C8.57143 11.5905 8.51667 11.7262 8.40714 11.8357C8.29762 11.9452 8.1619 12 8 12C7.8381 12 7.70238 11.9452 7.59286 11.8357C7.48333 11.7262 7.42857 11.5905 7.42857 11.4286V8.57143Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  `,
})
export class NumericStepperComponent {
  /** Which stepper layout to render. */
  @Input() variant: NumericStepperVariant = 'left-input';
  /** For center-input: whether the label sits above (vertical) or beside (horizontal) the control. */
  @Input() labelPosition: NumericStepperLabelPosition = 'vertical';
  /** Visible label text. */
  @Input() label = 'Label';
  /** Shows the required asterisk (*) next to the label. */
  @Input() required = true;
  /** Current numeric value. */
  @Input() value = 0;
  /** Minimum allowed value. */
  @Input() min?: number;
  /** Maximum allowed value. */
  @Input() max?: number;
  /** Amount to increment/decrement per step. */
  @Input() step = 1;
  /** Disables all interaction. */
  @Input() disabled = false;
  /** Applies error border styling. */
  @Input() error = false;

  /** Emits the updated value after increment, decrement, or manual input. */
  @Output() valueChange = new EventEmitter<number>();

  isFocused = false;

  get displayValue(): string {
    return String(this.value).padStart(2, '0');
  }

  increment(): void {
    if (this.disabled) return;
    const next = this.value + this.step;
    if (this.max !== undefined && next > this.max) return;
    this.value = next;
    this.valueChange.emit(this.value);
  }

  decrement(): void {
    if (this.disabled) return;
    const next = this.value - this.step;
    if (this.min !== undefined && next < this.min) return;
    this.value = next;
    this.valueChange.emit(this.value);
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(event: FocusEvent): void {
    this.isFocused = false;
    const input = event.target as HTMLInputElement;
    const parsed = parseInt(input.value, 10);
    if (!isNaN(parsed)) {
      this.value = parsed;
      this.valueChange.emit(this.value);
    }
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const parsed = parseInt(input.value, 10);
    if (!isNaN(parsed)) {
      this.value = parsed;
      this.valueChange.emit(this.value);
    }
  }
}
