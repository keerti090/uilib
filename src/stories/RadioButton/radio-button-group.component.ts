import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioButtonComponent, RadioButtonSize } from './radio-button.component';

export interface RadioButtonItem {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
}

export type RadioGroupOrientation = 'vertical' | 'horizontal' | 'horizontal-next-row';

@Component({
  selector: 'AppCore-radio-button-group',
  standalone: true,
  imports: [CommonModule, RadioButtonComponent],
  styleUrls: ['./radio-button.scss'],
  template: `
    <div
      class="AppCore-radio-group"
      [ngClass]="[
        'AppCore-radio-group--' + orientation,
        'AppCore-radio-group--size-' + size
      ]"
      role="radiogroup"
      [attr.aria-labelledby]="groupLabel ? _labelId : null"
    >
      <!-- Group header -->
      <div *ngIf="groupLabel || groupDescription" class="AppCore-radio-group__header">
        <span
          *ngIf="groupLabel"
          class="AppCore-radio-group__label"
          [id]="_labelId"
        >{{ groupLabel }}</span>
        <span *ngIf="groupDescription" class="AppCore-radio-group__description">
          {{ groupDescription }}
        </span>
      </div>

      <!-- Items -->
      <div class="AppCore-radio-group__items">
        <AppCore-radio-button
          *ngFor="let item of items; trackBy: trackById"
          [label]="item.label"
          [value]="item.value"
          [checked]="item.value === value"
          [disabled]="disabled || !!item.disabled"
          [name]="_groupName"
          [size]="size"
          [inputId]="item.id"
          (valueChange)="onItemChange($event)"
        ></AppCore-radio-button>
      </div>
    </div>
  `,
})
export class RadioButtonGroupComponent {
  /** Array of radio button options. */
  @Input() items: RadioButtonItem[] = [];
  /** Currently selected value. */
  @Input() value = '';
  /** Group label displayed above the options. */
  @Input() groupLabel = '';
  /** Optional helper text below the group label. */
  @Input() groupDescription = '';
  /** Layout orientation of the radio buttons. */
  @Input() orientation: RadioGroupOrientation = 'vertical';
  /** Size applied to all radio buttons in the group. */
  @Input() size: RadioButtonSize = 'md';
  /** Disables all radio buttons in the group. */
  @Input() disabled = false;

  /** Emits the selected value when the user picks an option. */
  @Output() valueChange = new EventEmitter<string>();

  readonly _labelId = `radio-group-label-${Math.random().toString(36).slice(2)}`;
  readonly _groupName = `radio-group-${Math.random().toString(36).slice(2)}`;

  onItemChange(selectedValue: string): void {
    this.value = selectedValue;
    this.valueChange.emit(selectedValue);
  }

  trackById(_index: number, item: RadioButtonItem): string {
    return item.id;
  }
}
