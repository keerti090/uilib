import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

export type MonthPickerSize = 'sm' | 'md' | 'lg';

export interface MonthValue {
  /** Full four-digit year, e.g. 2025 */
  year: number;
  /** Zero-based month index (0 = January … 11 = December) */
  month: number;
}

interface MonthCell {
  /** Short month label shown in the grid (e.g. "Jan") */
  label: string;
  /** Zero-based month index */
  month: number;
  isSelected: boolean;
  isCurrentMonth: boolean;
  isDisabled: boolean;
}

@Component({
  selector: 'AppCore-monthpicker',
  standalone: true,
  imports: [CommonModule, IconComponent],
  styleUrls: ['./monthpicker.scss'],
  template: `
    <div
      class="AppCore-monthpicker"
      [ngClass]="[
        'AppCore-monthpicker--' + size,
        disabled ? 'AppCore-monthpicker--disabled' : '',
        error ? 'AppCore-monthpicker--error' : '',
        isOpen ? 'AppCore-monthpicker--open' : ''
      ]"
    >
      <!-- Label -->
      <label *ngIf="label" class="AppCore-monthpicker__label">{{ label }}</label>

      <!-- Trigger control -->
      <div class="AppCore-monthpicker__control" (click)="onControlClick()">
        <span
          class="AppCore-monthpicker__value"
          [class.AppCore-monthpicker__value--placeholder]="!value"
        >
          {{ value ? formatValue(value) : placeholder }}
        </span>

        <!-- Clear button -->
        <button
          *ngIf="value && !disabled"
          class="AppCore-monthpicker__clear"
          type="button"
          (click)="clear($event)"
          (mousedown)="$event.preventDefault()"
          aria-label="Clear month"
        >
          <app-icon icon="close" size="sm"></app-icon>
        </button>

        <!-- Calendar icon -->
        <span class="AppCore-monthpicker__icon" aria-hidden="true">
          <app-icon icon="calendar_today" size="sm"></app-icon>
        </span>
      </div>

      <!-- Month picker panel -->
      <div
        *ngIf="isOpen"
        class="AppCore-monthpicker__panel"
        role="dialog"
        aria-label="Month picker"
      >
        <!-- Year navigation header -->
        <div class="AppCore-monthpicker__header">
          <button
            class="AppCore-monthpicker__nav-btn"
            type="button"
            (click)="prevYear()"
            (mousedown)="$event.preventDefault()"
            aria-label="Previous year"
          >
            <app-icon icon="chevron_left" size="sm"></app-icon>
          </button>

          <span class="AppCore-monthpicker__year-label">{{ viewYear }}</span>

          <button
            class="AppCore-monthpicker__nav-btn"
            type="button"
            (click)="nextYear()"
            (mousedown)="$event.preventDefault()"
            aria-label="Next year"
          >
            <app-icon icon="chevron_right" size="sm"></app-icon>
          </button>
        </div>

        <!-- Month grid (4 × 3) -->
        <div class="AppCore-monthpicker__grid">
          <button
            *ngFor="let cell of monthCells"
            class="AppCore-monthpicker__month"
            type="button"
            [ngClass]="{
              'AppCore-monthpicker__month--current': cell.isCurrentMonth,
              'AppCore-monthpicker__month--selected': cell.isSelected,
              'AppCore-monthpicker__month--disabled': cell.isDisabled
            }"
            [disabled]="cell.isDisabled"
            (click)="selectMonth(cell)"
            (mousedown)="$event.preventDefault()"
            [attr.aria-label]="cell.label + ' ' + viewYear"
            [attr.aria-selected]="cell.isSelected"
            [attr.aria-current]="cell.isCurrentMonth ? 'date' : null"
          >
            {{ cell.label }}
          </button>
        </div>
      </div>

      <!-- Helper / Error text -->
      <span *ngIf="error && errorMessage" class="AppCore-monthpicker__error-text">
        {{ errorMessage }}
      </span>
      <span *ngIf="!error && helperText" class="AppCore-monthpicker__helper-text">
        {{ helperText }}
      </span>
    </div>
  `,
})
export class MonthPickerComponent implements OnChanges {
  /** Currently selected month/year. */
  @Input() value: MonthValue | null = null;
  /** Field label rendered above the control. */
  @Input() label = '';
  /** Placeholder shown when no month is selected. */
  @Input() placeholder = 'Select a month';
  /** Helper text shown below the control in the default state. */
  @Input() helperText = '';
  /** Error message shown when error=true. */
  @Input() errorMessage = '';
  /** Visual size of the picker. */
  @Input() size: MonthPickerSize = 'md';
  /** Disables all interaction. */
  @Input() disabled = false;
  /** Shows error styling and errorMessage. */
  @Input() error = false;
  /** Earliest selectable month (inclusive). */
  @Input() minValue: MonthValue | null = null;
  /** Latest selectable month (inclusive). */
  @Input() maxValue: MonthValue | null = null;

  /** Emits the selected MonthValue (or null when cleared). */
  @Output() valueChange = new EventEmitter<MonthValue | null>();

  readonly monthLabels = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  isOpen = false;
  viewYear = new Date().getFullYear();

  constructor(private elementRef: ElementRef) {}

  // ─── Lifecycle ──────────────────────────────────────────────────────────────

  ngOnChanges(): void {
    if (this.value) {
      this.viewYear = this.value.year;
    }
  }

  // ─── Outside-click close ────────────────────────────────────────────────────

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  // ─── Open / close ───────────────────────────────────────────────────────────

  open(): void {
    if (this.disabled) return;
    if (this.value) {
      this.viewYear = this.value.year;
    }
    this.isOpen = true;
  }

  close(): void {
    this.isOpen = false;
  }

  onControlClick(): void {
    this.isOpen ? this.close() : this.open();
  }

  // ─── Year navigation ────────────────────────────────────────────────────────

  prevYear(): void {
    this.viewYear--;
  }

  nextYear(): void {
    this.viewYear++;
  }

  // ─── Month selection ────────────────────────────────────────────────────────

  selectMonth(cell: MonthCell): void {
    if (cell.isDisabled) return;
    this.value = { year: this.viewYear, month: cell.month };
    this.valueChange.emit(this.value);
    this.close();
  }

  clear(event: Event): void {
    event.stopPropagation();
    this.value = null;
    this.valueChange.emit(null);
  }

  // ─── Computed properties ────────────────────────────────────────────────────

  get monthCells(): MonthCell[] {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    return this.monthLabels.map((label, index) => {
      const isSelected =
        this.value !== null &&
        this.value.year === this.viewYear &&
        this.value.month === index;

      const isCurrentMonth =
        this.viewYear === currentYear && index === currentMonth;

      let isDisabled = false;
      if (this.minValue) {
        const minTotal = this.minValue.year * 12 + this.minValue.month;
        const cellTotal = this.viewYear * 12 + index;
        if (cellTotal < minTotal) isDisabled = true;
      }
      if (this.maxValue) {
        const maxTotal = this.maxValue.year * 12 + this.maxValue.month;
        const cellTotal = this.viewYear * 12 + index;
        if (cellTotal > maxTotal) isDisabled = true;
      }

      return { label, month: index, isSelected, isCurrentMonth, isDisabled };
    });
  }

  formatValue(v: MonthValue): string {
    return new Date(v.year, v.month, 1).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  }
}
