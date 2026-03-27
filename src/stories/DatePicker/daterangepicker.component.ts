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

export type DateRangePickerSize = 'sm' | 'md' | 'lg';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

@Component({
  selector: 'AppCore-daterangepicker',
  standalone: true,
  imports: [CommonModule, IconComponent],
  styleUrls: ['./daterangepicker.scss'],
  template: `
    <div
      class="AppCore-daterangepicker"
      [ngClass]="[
        'AppCore-daterangepicker--' + size,
        disabled ? 'AppCore-daterangepicker--disabled' : '',
        error ? 'AppCore-daterangepicker--error' : '',
        isOpen ? 'AppCore-daterangepicker--open' : ''
      ]"
    >
      <!-- Label -->
      <label *ngIf="label" class="AppCore-daterangepicker__label">{{ label }}</label>

      <!-- Trigger control -->
      <div class="AppCore-daterangepicker__control" (click)="onControlClick()">
        <span class="AppCore-daterangepicker__icon" aria-hidden="true">
          <app-icon icon="calendar_today" size="sm"></app-icon>
        </span>

        <span
          class="AppCore-daterangepicker__value"
          [class.AppCore-daterangepicker__value--placeholder]="!hasDisplayValue"
        >
          {{ displayValue }}
        </span>

        <!-- Clear button -->
        <button
          *ngIf="hasValue && !disabled"
          class="AppCore-daterangepicker__clear"
          type="button"
          (click)="clear($event)"
          (mousedown)="$event.preventDefault()"
          aria-label="Clear date range"
        >
          <app-icon icon="close" size="sm"></app-icon>
        </button>
      </div>

      <!-- Calendar panel -->
      <div
        *ngIf="isOpen"
        class="AppCore-daterangepicker__panel"
        role="dialog"
        aria-label="Date range picker"
      >
        <div class="AppCore-daterangepicker__calendars">

          <!-- Left calendar -->
          <div class="AppCore-daterangepicker__calendar">
            <div class="AppCore-daterangepicker__cal-header">
              <button
                class="AppCore-daterangepicker__nav-btn"
                type="button"
                (click)="prevMonth()"
                (mousedown)="$event.preventDefault()"
                aria-label="Previous month"
              >
                <app-icon icon="chevron_left" size="sm"></app-icon>
              </button>
              <span class="AppCore-daterangepicker__cal-title">{{ leftMonthYearLabel }}</span>
              <span class="AppCore-daterangepicker__nav-spacer"></span>
            </div>

            <div class="AppCore-daterangepicker__weekdays">
              <span *ngFor="let day of weekdays" class="AppCore-daterangepicker__weekday">{{ day }}</span>
            </div>

            <div class="AppCore-daterangepicker__days">
              <button
                *ngFor="let cell of leftCalendarCells"
                class="AppCore-daterangepicker__day"
                type="button"
                [ngClass]="{
                  'AppCore-daterangepicker__day--outside': !cell.inMonth,
                  'AppCore-daterangepicker__day--today': cell.isToday,
                  'AppCore-daterangepicker__day--disabled': cell.isDisabled,
                  'AppCore-daterangepicker__day--range-start': cell.isRangeStart,
                  'AppCore-daterangepicker__day--range-end': cell.isRangeEnd,
                  'AppCore-daterangepicker__day--in-range': cell.isInRange
                }"
                [disabled]="cell.isDisabled"
                (click)="selectDay(cell)"
                (mouseenter)="onDayHover(cell)"
                (mouseleave)="onDayLeave()"
                (mousedown)="$event.preventDefault()"
                [attr.aria-label]="cell.date | date:'longDate'"
                [attr.aria-selected]="cell.isRangeStart || cell.isRangeEnd"
                [attr.aria-current]="cell.isToday ? 'date' : null"
              >
                {{ cell.date.getDate() }}
              </button>
            </div>
          </div>

          <div class="AppCore-daterangepicker__divider"></div>

          <!-- Right calendar -->
          <div class="AppCore-daterangepicker__calendar">
            <div class="AppCore-daterangepicker__cal-header">
              <span class="AppCore-daterangepicker__nav-spacer"></span>
              <span class="AppCore-daterangepicker__cal-title">{{ rightMonthYearLabel }}</span>
              <button
                class="AppCore-daterangepicker__nav-btn"
                type="button"
                (click)="nextMonth()"
                (mousedown)="$event.preventDefault()"
                aria-label="Next month"
              >
                <app-icon icon="chevron_right" size="sm"></app-icon>
              </button>
            </div>

            <div class="AppCore-daterangepicker__weekdays">
              <span *ngFor="let day of weekdays" class="AppCore-daterangepicker__weekday">{{ day }}</span>
            </div>

            <div class="AppCore-daterangepicker__days">
              <button
                *ngFor="let cell of rightCalendarCells"
                class="AppCore-daterangepicker__day"
                type="button"
                [ngClass]="{
                  'AppCore-daterangepicker__day--outside': !cell.inMonth,
                  'AppCore-daterangepicker__day--today': cell.isToday,
                  'AppCore-daterangepicker__day--disabled': cell.isDisabled,
                  'AppCore-daterangepicker__day--range-start': cell.isRangeStart,
                  'AppCore-daterangepicker__day--range-end': cell.isRangeEnd,
                  'AppCore-daterangepicker__day--in-range': cell.isInRange
                }"
                [disabled]="cell.isDisabled"
                (click)="selectDay(cell)"
                (mouseenter)="onDayHover(cell)"
                (mouseleave)="onDayLeave()"
                (mousedown)="$event.preventDefault()"
                [attr.aria-label]="cell.date | date:'longDate'"
                [attr.aria-selected]="cell.isRangeStart || cell.isRangeEnd"
                [attr.aria-current]="cell.isToday ? 'date' : null"
              >
                {{ cell.date.getDate() }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Helper / Error text -->
      <span *ngIf="error && errorMessage" class="AppCore-daterangepicker__error-text">
        {{ errorMessage }}
      </span>
      <span *ngIf="!error && helperText" class="AppCore-daterangepicker__helper-text">
        {{ helperText }}
      </span>
    </div>
  `,
})
export class DateRangePickerComponent implements OnChanges {
  /** Currently selected date range. */
  @Input() value: DateRange | null = null;
  /** Field label rendered above the control. */
  @Input() label = '';
  /** Placeholder shown when no range is selected. */
  @Input() placeholder = 'Select date range';
  /** Helper text shown below the control in the default state. */
  @Input() helperText = '';
  /** Error message shown when error=true. */
  @Input() errorMessage = '';
  /** Visual size of the picker. */
  @Input() size: DateRangePickerSize = 'md';
  /** Disables all interaction. */
  @Input() disabled = false;
  /** Shows error styling and errorMessage. */
  @Input() error = false;
  /** Earliest selectable date (inclusive). */
  @Input() minDate: Date | null = null;
  /** Latest selectable date (inclusive). */
  @Input() maxDate: Date | null = null;

  /** Emits the completed DateRange (or null when cleared). */
  @Output() valueChange = new EventEmitter<DateRange | null>();

  readonly weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  isOpen = false;
  leftViewYear = new Date().getFullYear();
  leftViewMonth = new Date().getMonth();

  /** Pending start date — set on first click, waiting for the end click. */
  pendingStart: Date | null = null;
  /** Currently hovered date used for range preview during selection. */
  hoverDate: Date | null = null;

  constructor(private elementRef: ElementRef) {}

  // ─── Lifecycle ──────────────────────────────────────────────────────────────

  ngOnChanges(): void {
    if (this.value?.start) {
      this.leftViewYear = this.value.start.getFullYear();
      this.leftViewMonth = this.value.start.getMonth();
      // Ensure both months are not the same when value is set
      if (
        this.leftViewMonth === this.rightViewMonth &&
        this.leftViewYear === this.rightViewYear
      ) {
        // This won't happen as rightView is always leftView + 1 month
      }
    }
  }

  // ─── Outside-click close ────────────────────────────────────────────────────

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.cancelPending();
      this.close();
    }
  }

  // ─── Open / close ───────────────────────────────────────────────────────────

  open(): void {
    if (this.disabled) return;
    if (this.value?.start) {
      this.leftViewYear = this.value.start.getFullYear();
      this.leftViewMonth = this.value.start.getMonth();
    }
    this.isOpen = true;
  }

  close(): void {
    this.isOpen = false;
  }

  onControlClick(): void {
    this.isOpen ? this.close() : this.open();
  }

  cancelPending(): void {
    this.pendingStart = null;
    this.hoverDate = null;
  }

  // ─── Navigation ─────────────────────────────────────────────────────────────

  prevMonth(): void {
    if (this.leftViewMonth === 0) {
      this.leftViewMonth = 11;
      this.leftViewYear--;
    } else {
      this.leftViewMonth--;
    }
  }

  nextMonth(): void {
    if (this.leftViewMonth === 11) {
      this.leftViewMonth = 0;
      this.leftViewYear++;
    } else {
      this.leftViewMonth++;
    }
  }

  // ─── Right calendar derived month/year ──────────────────────────────────────

  get rightViewMonth(): number {
    return this.leftViewMonth === 11 ? 0 : this.leftViewMonth + 1;
  }

  get rightViewYear(): number {
    return this.leftViewMonth === 11 ? this.leftViewYear + 1 : this.leftViewYear;
  }

  // ─── Day selection ──────────────────────────────────────────────────────────

  selectDay(cell: CalendarCell): void {
    if (cell.isDisabled) return;
    const date = new Date(cell.date);
    date.setHours(0, 0, 0, 0);

    if (!this.pendingStart) {
      // First click — set start and wait for end
      this.pendingStart = date;
    } else {
      // Second click — commit the range
      let start = this.pendingStart;
      let end = date;
      if (start > end) {
        [start, end] = [end, start];
      }
      this.value = { start, end };
      this.pendingStart = null;
      this.hoverDate = null;
      this.valueChange.emit(this.value);
      this.close();
    }
  }

  onDayHover(cell: CalendarCell): void {
    if (this.pendingStart && !cell.isDisabled) {
      this.hoverDate = new Date(cell.date);
      this.hoverDate.setHours(0, 0, 0, 0);
    }
  }

  onDayLeave(): void {
    if (this.pendingStart) {
      this.hoverDate = null;
    }
  }

  clear(event: Event): void {
    event.stopPropagation();
    this.value = null;
    this.pendingStart = null;
    this.hoverDate = null;
    this.valueChange.emit(null);
  }

  // ─── Computed properties ────────────────────────────────────────────────────

  get hasValue(): boolean {
    return !!(this.value?.start && this.value?.end);
  }

  get hasDisplayValue(): boolean {
    return !!(this.value?.start || this.pendingStart);
  }

  get displayValue(): string {
    if (this.value?.start && this.value?.end) {
      return `${this.formatDate(this.value.start)} – ${this.formatDate(this.value.end)}`;
    }
    if (this.pendingStart) {
      return `${this.formatDate(this.pendingStart)} – ...`;
    }
    return this.placeholder;
  }

  get leftMonthYearLabel(): string {
    return new Date(this.leftViewYear, this.leftViewMonth, 1).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  }

  get rightMonthYearLabel(): string {
    return new Date(this.rightViewYear, this.rightViewMonth, 1).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  }

  get leftCalendarCells(): CalendarCell[] {
    return this.buildCalendarCells(this.leftViewYear, this.leftViewMonth);
  }

  get rightCalendarCells(): CalendarCell[] {
    return this.buildCalendarCells(this.rightViewYear, this.rightViewMonth);
  }

  private buildCalendarCells(year: number, month: number): CalendarCell[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstOfMonth = new Date(year, month, 1);
    const startOffset = firstOfMonth.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const cells: CalendarCell[] = [];

    for (let i = startOffset - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthDays - i);
      cells.push(this.buildCell(date, false, today));
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      cells.push(this.buildCell(date, true, today));
    }

    const remaining = 42 - cells.length;
    for (let d = 1; d <= remaining; d++) {
      const date = new Date(year, month + 1, d);
      cells.push(this.buildCell(date, false, today));
    }

    return cells;
  }

  private buildCell(date: Date, inMonth: boolean, today: Date): CalendarCell {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);

    const isToday = d.getTime() === today.getTime();

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

    // Determine range boundaries — either committed value or pending preview
    let rangeStart: Date | null = null;
    let rangeEnd: Date | null = null;

    if (this.pendingStart) {
      const anchor = this.pendingStart;
      const hover = this.hoverDate ?? anchor;
      rangeStart = anchor <= hover ? anchor : hover;
      rangeEnd = anchor <= hover ? hover : anchor;
    } else if (this.value?.start && this.value?.end) {
      rangeStart = new Date(this.value.start);
      rangeStart.setHours(0, 0, 0, 0);
      rangeEnd = new Date(this.value.end);
      rangeEnd.setHours(0, 0, 0, 0);
    }

    const isRangeStart = rangeStart !== null && d.getTime() === rangeStart.getTime();
    const isRangeEnd = rangeEnd !== null && d.getTime() === rangeEnd.getTime();
    const isInRange =
      rangeStart !== null &&
      rangeEnd !== null &&
      d > rangeStart &&
      d < rangeEnd;

    return { date, inMonth, isToday, isDisabled, isRangeStart, isRangeEnd, isInRange };
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
  isDisabled: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
}
