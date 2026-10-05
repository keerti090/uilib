import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { IconComponent } from '../icon/icon.component';

export type InputState = 'default' | 'hover' | 'active' | 'entered' | 'disabled' | 'error' | 'error-active';
export type InputType = 'default' | 'prefix-suffix' | 'with-separator';
export type InputLayout = 'vertical' | 'horizontal';
export type InputSize = 'small' | 'large';

let nextId = 0;

@Component({
  selector: 'appcore-input',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, IconComponent],
  styleUrls: ['./input.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  template: `
    <div
      class="appcore-input"
      [ngClass]="['appcore-input--' + size, 'appcore-input--' + layout, 'appcore-input--' + currentState]"
      (mouseenter)="hovered = true"
      (mouseleave)="hovered = false"
    >
      <div class="appcore-input__label-row" *ngIf="showLabel">
        <label class="appcore-input__label" [attr.for]="id">{{ label }}</label>
        <span *ngIf="required" class="appcore-input__required" aria-hidden="true">*</span>
        <span class="appcore-input__label-suffix"><ng-content select="[appcoreLabelSuffix]"></ng-content></span>
      </div>

      <div class="appcore-input__control">
        <mat-form-field
          class="appcore-input__field-wrap"
          appearance="outline"
          [hideRequiredMarker]="true"
          subscriptSizing="dynamic"
        >
          <span matPrefix class="appcore-input__affix appcore-input__affix--prefix" *ngIf="type !== 'default'">
            <app-icon *ngIf="prefixIconName" [icon]="prefixIconName" size="sm"></app-icon>
            <span *ngIf="prefixText" class="appcore-input__affix-text">{{ prefixText }}</span>
            <ng-content select="[appcorePrefix]"></ng-content>
            <span *ngIf="type === 'with-separator'" class="appcore-input__divider"></span>
          </span>

          <input
            matInput
            class="appcore-input__field"
            [type]="nativeType"
            [attr.id]="id"
            [attr.aria-label]="showLabel ? null : label"
            [placeholder]="placeholder"
            [required]="required"
            [disabled]="isDisabled"
            [errorStateMatcher]="errorMatcher"
            [ngModel]="value"
            (ngModelChange)="onModelChange($event)"
            (focus)="onFocus($event)"
            (blur)="onBlur($event)"
            (keydown)="keydown.emit($event)"
            (keyup)="keyup.emit($event)"
            (keydown.enter)="enter.emit($event)"
            (paste)="paste.emit($event)"
          />

          <span matSuffix class="appcore-input__affix appcore-input__affix--suffix">
            <button
              type="button"
              class="appcore-input__clear"
              *ngIf="showClear"
              aria-label="Clear"
              (mousedown)="$event.preventDefault()"
              (click)="clear()"
            >
              <app-icon icon="cancel" size="sm"></app-icon>
            </button>
            <ng-container *ngIf="type !== 'default'">
              <span *ngIf="type === 'with-separator'" class="appcore-input__divider"></span>
              <span *ngIf="suffixText" class="appcore-input__affix-text appcore-input__affix-text--suffix">{{ suffixText }}</span>
              <app-icon *ngIf="suffixIconName" [icon]="suffixIconName" size="sm"></app-icon>
              <ng-content select="[appcoreSuffix]"></ng-content>
            </ng-container>
          </span>
        </mat-form-field>

        <button type="button" class="appcore-input__info" *ngIf="showInfoIcon" aria-label="More information" (click)="infoClick.emit($event)">
          <app-icon icon="info" size="md"></app-icon>
        </button>
      </div>

      <div class="appcore-input__help" *ngIf="showHelpText && helpText">{{ helpText }}</div>
    </div>
  `,
})
export class InputComponent implements ControlValueAccessor {
  @Input() label = 'Label';
  @Input() placeholder = 'Placeholder';
  @Input() helpText = 'Help Text';
  @Input() value: string | number | null = '';
  @Input() required = false;
  /**
   * Visual state. `default` and `error` are interactive — hover, focus and a typed
   * value move them through hover / active / entered (error / error-active) on their own.
   * Every other value pins the field to that state, which is handy for docs and tests.
   */
  @Input() state: InputState = 'default';
  @Input() type: InputType = 'default';
  @Input() layout: InputLayout = 'vertical';
  @Input() size: InputSize = 'large';
  /** Native <input> type attribute. */
  @Input() nativeType: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url' = 'text';
  @Input() showLabel = true;
  @Input() showHelpText = true;
  @Input() showInfoIcon = false;
  /** type = 'prefix-suffix' | 'with-separator' */
  @Input() prefixIconName?: string;
  @Input() suffixIconName?: string;
  @Input() prefixText?: string;
  @Input() suffixText?: string;

  @Output() valueChange = new EventEmitter<string | number | null>();
  @Output() inputFocus = new EventEmitter<FocusEvent>();
  @Output() inputBlur = new EventEmitter<FocusEvent>();
  @Output() keydown = new EventEmitter<KeyboardEvent>();
  @Output() keyup = new EventEmitter<KeyboardEvent>();
  @Output() enter = new EventEmitter<Event>();
  @Output() paste = new EventEmitter<ClipboardEvent>();
  @Output() cleared = new EventEmitter<void>();
  @Output() infoClick = new EventEmitter<MouseEvent>();

  /** Underlying MatInput directive — full Material API (errorState, focused, ...). */
  @ViewChild(MatInput) matInput?: MatInput;
  /** Underlying native <input>. */
  @ViewChild(MatInput, { read: ElementRef }) inputEl?: ElementRef<HTMLInputElement>;

  readonly id = `appcore-input-${nextId++}`;
  hovered = false;
  focused = false;
  private formDisabled = false;
  private onChange: (v: string | number | null) => void = () => {};
  private onTouched: () => void = () => {};

  readonly errorMatcher = { isErrorState: () => this.currentState === 'error' || this.currentState === 'error-active' };

  get hasValue(): boolean {
    return this.value !== null && this.value !== undefined && this.value !== '';
  }
  get isDisabled(): boolean {
    return this.formDisabled || this.state === 'disabled';
  }

  /** The state actually rendered: `state` input, refined by interaction when it is default / error. */
  get currentState(): InputState {
    if (this.isDisabled) return 'disabled';
    if (this.state === 'error') return this.focused ? 'error-active' : 'error';
    if (this.state === 'default') {
      if (this.focused) return 'active';
      if (this.hasValue) return 'entered';
      if (this.hovered) return 'hover';
    }
    return this.state;
  }
  get showClear(): boolean {
    return this.hasValue && ['active', 'entered', 'error', 'error-active'].includes(this.currentState);
  }

  focus(options?: FocusOptions) {
    this.inputEl?.nativeElement.focus(options);
  }
  blur() {
    this.inputEl?.nativeElement.blur();
  }
  select() {
    this.inputEl?.nativeElement.select();
  }

  onModelChange(v: string | number | null) {
    this.value = v;
    this.onChange(v);
    this.valueChange.emit(v);
  }
  onFocus(e: FocusEvent) {
    this.focused = true;
    this.inputFocus.emit(e);
  }
  onBlur(e: FocusEvent) {
    this.focused = false;
    this.onTouched();
    this.inputBlur.emit(e);
  }
  clear() {
    this.onModelChange('');
    this.cleared.emit();
    this.focus();
  }

  writeValue(v: string | number | null): void {
    this.value = v ?? '';
  }
  registerOnChange(fn: (v: string | number | null) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.formDisabled = isDisabled;
  }
}
