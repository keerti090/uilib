import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type CheckboxSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'AppCore-checkbox',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./checkbox.scss'],
  template: `
    <label
      class="AppCore-checkbox"
      [ngClass]="[
        'AppCore-checkbox--size-' + size,
        disabled ? 'AppCore-checkbox--disabled' : '',
        error ? 'AppCore-checkbox--error' : ''
      ]"
    >
      <span class="AppCore-checkbox__control">
        <input
          #checkboxEl
          type="checkbox"
          class="AppCore-checkbox__input"
          [checked]="checked"
          [disabled]="disabled"
          [attr.id]="inputId || null"
          [attr.aria-label]="!label ? ariaLabel || null : null"
          (change)="onNativeChange($event)"
        />
        <span class="AppCore-checkbox__box" aria-hidden="true"></span>
      </span>
      <span *ngIf="label || description" class="AppCore-checkbox__content">
        <span *ngIf="label" class="AppCore-checkbox__label">{{ label }}</span>
        <span *ngIf="description" class="AppCore-checkbox__description">{{ description }}</span>
      </span>
    </label>
  `,
})
export class CheckboxComponent implements AfterViewChecked {
  /** Visible text label next to the checkbox. */
  @Input() label = '';
  /** Optional helper text rendered below the label. */
  @Input() description = '';
  /** aria-label applied when no visible label is provided. */
  @Input() ariaLabel = '';
  /** Whether the checkbox is checked. */
  @Input() checked = false;
  /** Shows a dash/minus indicator — used for "select all" partial states. */
  @Input() indeterminate = false;
  /** Disables interaction. */
  @Input() disabled = false;
  /** Applies error styling (red border). */
  @Input() error = false;
  /** Visual size of the checkbox. */
  @Input() size: CheckboxSize = 'md';
  /** HTML id forwarded to the native input. */
  @Input() inputId = '';

  /** Emits the new checked value when the user toggles the checkbox. */
  @Output() checkedChange = new EventEmitter<boolean>();

  @ViewChild('checkboxEl') checkboxEl?: ElementRef<HTMLInputElement>;

  ngAfterViewChecked(): void {
    if (this.checkboxEl) {
      this.checkboxEl.nativeElement.indeterminate = this.indeterminate && !this.checked;
    }
  }

  onNativeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.checked = input.checked;
    this.checkedChange.emit(input.checked);
  }
}
