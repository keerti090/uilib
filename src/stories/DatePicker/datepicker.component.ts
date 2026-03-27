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

export type DatePickerSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'AppCore-datepicker',
  standalone: true,
  imports: [CommonModule, IconComponent],
  styleUrls: ['./datepicker.scss'],
  template: `
    <div
      class="AppCore-datepicker"
      [ngClass]="[
        'AppCore-datepicker--' + size,
        disabled ? 'AppCore-datepicker--disabled' : '',
        error ? 'AppCore-datepicker--error' : '',
        isOpen ? 'AppCore-datepicker--open' : ''
      ]"
    >
      <!-- Label -->
      <label *ngIf="label" class="AppCore-datepicker__label">{{ label }}</label>

      <!-- Trigger control -->
      <div class="AppCore-datepicker__control" (click)="onControlClick()">
        <span
          class="AppCore-datepicker__value"
          [class.AppCore-datepicker__value--placeholder]="!value"
        >
          {{ value ? formatDate(value) : placeholder }}
        </span>

        <!-- Clear button -->
        <button
          *ngIf="value && !disabled"
          class="AppCore-datepicker__clear"
          type="button"
          (click)="clear($event)"
          (mousedown)="$event.preventDefault()"
          aria-label="Clear date"
        >
          <app-icon icon="close" size="sm"></app-icon>
        </button>

        <!-- Calendar icon -->
        <span class="AppCore-datepicker__icon" aria-hidden="true">
          <app-icon icon="calendar_today" size="sm"></app-icon>
        </span>
      </div>

      <!-- Calendar dropdown -->
      <div *ngIf="isOpen" class="AppCore-datepicker__calendar" role="dialog" aria-label="Date picker">

        <!-- Calendar header -->
        <div class="AppCore-datepicker__cal-header">
          <button
            class="AppCore-datepicker__nav-btn"
            type="button"
            (click)="prevMonth()"
            (mousedown)="$event.preventDefault()"
            aria-label="Previous month"
          >
            <app-icon icon="chevron_left" size="sm"></app-icon>
          </button>

          <span class="AppCore-datepicker__cal-title">
            {{ monthYearLabel }}
          </span>

          <button
            class="AppCore-datepicker__nav-btn"
            type="button"
            (click)="nextMonth()"
            (mousedown)="$event.preventDefault()"
            aria-label="Next month"
          >
            <app-icon icon="chevron_right" size="sm"></app-icon>
          </button>
        </div>

        <!-- Weekday headers -->
        <div class="AppCore-datepicker__weekdays">
          <span *ngFor="let day of weekdays" class="AppCore-datepicker__weekday">{{ day }}</span>
        </div>

        <!-- Day grid -->
        <div class="AppCore-datepicker__days">
          <button
            *ngFor="let cell of calendarCells"
            class="AppCore-datepicker__day"
            type="button"
            [ngClass]="{
              'AppCore-datepicker__day--outside': !cell.inMonth,
              'AppCore-datepicker__day--today': cell.isToday,
              'AppCore-datepicker__day--selected': cell.isSelected,
              'AppCore-datepicker__day--disabled': cell.isDisabled
            }"
            [disabled]="cell.isDisabled"
            (click)="selectDay(cell)"
            (mousedown)="$event.preventDefault()"
            [attr.aria-label]="cell.date | date:'longDate'"
            [attr.aria-selected]="cell.isSelected"
            [attr.aria-current]="cell.isToday ? 'date' : null"
          >
            {{ cell.date.getDate() }}
          </button>
        </div>
      </div>

      <!-- Helper / Error text -->
      <span *ngIf="error && errorMessage" class="AppCore-datepicker__error-text">
        {{ errorMessage }}
      </span>
      <span *ngIf="!error && helperText" class="AppCore-datepicker__helper-text">
        {{ helperText }}
      </span>
    </div>
  `,
})
export class DatePickerComponent implements OnChanges {
  /** Currently selected date. */
  @Input() value: Date | null = null;
  /** Field label rendered above the control. */
  @Input() label = '';
  /** Placeholder shown when no date is selected. */
  @Input() placeholder = 'Select a date';
  /** Helper text shown below the control in the default state. */
  @Input() helperText = '';
  /** Error message shown when error=true. */
  @Input() errorMessage = '';
  /** Visual size of the picker. */
  @Input() size: DatePickerSize = 'md';
  /** Disables all interaction. */
  @Input() disabled = false;
  /** Shows error styling and errorMessage. */
  @Input() error = false;
  /** Earliest selectable date (inclusive). */
  @Input() minDate: Date | null = null;
  /** Latest selectable date (inclusive). */
  @Input() maxDate: Date | null = null;

  /** Emits the selected Date (or null when cleared). */
  @Output() valueChange = new EventEmitter<Date | null>();

  readonly weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  isOpen = false;
  viewYear = new Date().getFullYear();
  viewMonth = new Date().getMonth(); // 0-based

  constructor(private elementRef: ElementRef) {}

  // ─── Lifecycle ──────────────────────────────────────────────────────────────

  ngOnChanges(): void {
    if (this.value) {
      this.viewYear = this.value.getFullYear();
      this.viewMonth = this.value.getMonth();
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
      this.viewYear = this.value.getFullYear();
      this.viewMonth = this.value.getMonth();
    }
    this.isOpen = true;
  }

  close(): void {
    this.isOpen = false;
  }

  onControlClick(): void {
    this.isOpen ? this.close() : this.open();
  }

  // ─── Navigation ─────────────────────────────────────────────────────────────

  prevMonth(): void {
    if (this.viewMonth === 0) {
      this.viewMonth = 11;
      this.viewYear--;
    } else {
      this.viewMonth--;
    }
  }

  nextMonth(): void {
    if (this.viewMonth === 11) {
      this.viewMonth = 0;
      this.viewYear++;
    } else {
      this.viewMonth++;
    }
  }

  // ─── Day selection ──────────────────────────────────────────────────────────

  selectDay(cell: CalendarCell): void {
    if (cell.isDisabled) return;
    this.value = cell.date;
    this.valueChange.emit(cell.date);
    this.close();
  }

  clear(event: Event): void {
    event.stopPropagation();
    this.value = null;
    this.valueChange.emit(null);
  }

  // ─── Computed properties ────────────────────────────────────────────────────

  get monthYearLabel(): string {
    return new Date(this.viewYear, this.viewMonth, 1).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  }

  get calendarCells(): CalendarCell[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstOfMonth = new Date(this.viewYear, this.viewMonth, 1);
    const startOffset = firstOfMonth.getDay(); // 0 = Sunday
    const daysInMonth = new Date(this.viewYear, this.viewMonth + 1, 0).getDate();

    const cells: CalendarCell[] = [];

    // Leading days from previous month
    const prevMonthDays = new Date(this.viewYear, this.viewMonth, 0).getDate();
    for (let i = startOffset - 1; i >= 0; i--) {
      const date = new Date(this.viewYear, this.viewMonth - 1, prevMonthDays - i);
      cells.push(this.buildCell(date, false, today));
    }

    // Days in current month
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(this.viewYear, this.viewMonth, d);
      cells.push(this.buildCell(date, true, today));
    }

    // Trailing days to fill last row (always show 6 rows = 42 cells)
    const remaining = 42 - cells.length;
    for (let d = 1; d <= remaining; d++) {
      const date = new Date(this.viewYear, this.viewMonth + 1, d);
      cells.push(this.buildCell(date, false, today));
    }

    return cells;
  }

  private buildCell(date: Date, inMonth: boolean, today: Date): CalendarCell {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);

    const isToday = d.getTime() === today.getTime();
    const isSelected =
      this.value !== null &&
      (() => {
        const v = new Date(this.value!);
        v.setHours(0, 0, 0, 0);
        return v.getTime() === d.getTime();
      })();

    let isDisabled = false;
    if (this.minDate) {
      const min = new Date(this.minDate);
      min.setHours(0, 0, 0, 0);
      if (d < min) isDisabled = true;
    }
    if (this.maxDate) {
      const max = new Date(this.maxDate);
      max.setHours(0, 0, 0, 0);
      if (d > max) isDisabled = true;
    }

    return { date, inMonth, isToday, isSelected, isDisabled };
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
}

interface CalendarCell {
  date: Date;
  inMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}
