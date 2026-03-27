import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type ComboboxSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'AppCore-combobox',
  standalone: true,
  imports: [CommonModule, IconComponent],
  styleUrls: ['./combobox.scss'],
  template: `
    <div
      class="AppCore-combobox"
      [ngClass]="[
        'AppCore-combobox--' + size,
        disabled ? 'AppCore-combobox--disabled' : '',
        error ? 'AppCore-combobox--error' : '',
        isOpen ? 'AppCore-combobox--open' : ''
      ]"
    >
      <!-- Label -->
      <label *ngIf="label" class="AppCore-combobox__label">{{ label }}</label>

      <!-- Control -->
      <div class="AppCore-combobox__control" (click)="onControlClick()">
        <input
          class="AppCore-combobox__input"
          type="text"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [readOnly]="!searchable"
          [value]="inputValue"
          (input)="onInput($event)"
          (focus)="onFocus()"
          (blur)="onBlur()"
          (keydown.escape)="close()"
          autocomplete="off"
          aria-autocomplete="list"
          [attr.aria-expanded]="isOpen"
          role="combobox"
        />

        <!-- Clear button -->
        <button
          *ngIf="value && !disabled"
          class="AppCore-combobox__clear"
          type="button"
          (click)="clear($event)"
          (mousedown)="$event.preventDefault()"
          aria-label="Clear selection"
        >
          <app-icon icon="close" size="sm"></app-icon>
        </button>

        <!-- Chevron -->
        <span
          class="AppCore-combobox__chevron"
          [class.AppCore-combobox__chevron--open]="isOpen"
          (click)="onChevronClick($event)"
          aria-hidden="true"
        >
          <app-icon icon="keyboard_arrow_down" size="sm"></app-icon>
        </span>
      </div>

      <!-- Dropdown -->
      <div *ngIf="isOpen" class="AppCore-combobox__dropdown" role="listbox">
        <ul class="AppCore-combobox__options">
          <li
            *ngFor="let option of filteredOptions"
            class="AppCore-combobox__option"
            [ngClass]="{
              'AppCore-combobox__option--selected': option.value === value,
              'AppCore-combobox__option--disabled': option.disabled
            }"
            role="option"
            [attr.aria-selected]="option.value === value"
            (click)="selectOption(option)"
            (mousedown)="$event.preventDefault()"
          >
            <span class="AppCore-combobox__option-label">{{ option.label }}</span>
            <app-icon
              *ngIf="option.value === value"
              icon="check"
              size="sm"
              class="AppCore-combobox__option-check"
            ></app-icon>
          </li>
          <li *ngIf="filteredOptions.length === 0" class="AppCore-combobox__option--empty">
            No options found
          </li>
        </ul>
      </div>

      <!-- Helper / Error text -->
      <span *ngIf="error && errorMessage" class="AppCore-combobox__error-text">
        {{ errorMessage }}
      </span>
      <span *ngIf="!error && helperText" class="AppCore-combobox__helper-text">
        {{ helperText }}
      </span>
    </div>
  `,
})
export class ComboboxComponent {
  /** List of selectable options. */
  @Input() options: ComboboxOption[] = [];
  /** Currently selected value. */
  @Input() value = '';
  /** Placeholder shown when nothing is selected. */
  @Input() placeholder = 'Select an option';
  /** Field label rendered above the control. */
  @Input() label = '';
  /** Helper text shown below the control in the default state. */
  @Input() helperText = '';
  /** Error message shown when error=true. */
  @Input() errorMessage = '';
  /** Visual size of the combobox. */
  @Input() size: ComboboxSize = 'md';
  /** Disables all interaction. */
  @Input() disabled = false;
  /** Shows error styling and errorMessage. */
  @Input() error = false;
  /** Allows typing to filter options. */
  @Input() searchable = false;

  /** Emits the new value string when selection changes. */
  @Output() valueChange = new EventEmitter<string>();
  /** Emits the full option object when selection changes. */
  @Output() selectionChange = new EventEmitter<ComboboxOption | null>();

  isOpen = false;
  searchText = '';

  constructor(private elementRef: ElementRef) {}

  get selectedOption(): ComboboxOption | undefined {
    return this.options.find((o) => o.value === this.value);
  }

  get filteredOptions(): ComboboxOption[] {
    if (!this.searchable || !this.searchText) return this.options;
    const query = this.searchText.toLowerCase();
    return this.options.filter((o) => o.label.toLowerCase().includes(query));
  }

  get inputValue(): string {
    if (this.isOpen && this.searchable) return this.searchText;
    return this.selectedOption?.label ?? '';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  open(): void {
    if (this.disabled) return;
    this.isOpen = true;
    if (this.searchable) this.searchText = '';
  }

  close(): void {
    this.isOpen = false;
    if (this.searchable) this.searchText = this.selectedOption?.label ?? '';
  }

  onControlClick(): void {
    if (!this.isOpen) this.open();
  }

  onChevronClick(event: Event): void {
    event.stopPropagation();
    this.isOpen ? this.close() : this.open();
  }

  onFocus(): void {
    if (!this.isOpen) this.open();
  }

  onBlur(): void {
    // mousedown preventDefault on options keeps focus in input, so blur only
    // fires when clicking truly outside – handled by document:click instead.
  }

  onInput(event: Event): void {
    this.searchText = (event.target as HTMLInputElement).value;
    if (!this.isOpen) this.open();
  }

  selectOption(option: ComboboxOption): void {
    if (option.disabled) return;
    this.value = option.value;
    this.searchText = option.label;
    this.valueChange.emit(option.value);
    this.selectionChange.emit(option);
    this.close();
  }

  clear(event: Event): void {
    event.stopPropagation();
    this.value = '';
    this.searchText = '';
    this.valueChange.emit('');
    this.selectionChange.emit(null);
    this.close();
  }
}
