import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent, CheckboxSize } from './checkbox.component';

export interface CheckboxItem {
  id: string;
  label: string;
  checked: boolean;
  description?: string;
  disabled?: boolean;
}

@Component({
  selector: 'AppCore-checkbox-group',
  standalone: true,
  imports: [CommonModule, CheckboxComponent],
  styleUrls: ['./checkbox.scss'],
  template: `
    <div
      class="AppCore-checkbox-group"
      role="group"
      [attr.aria-labelledby]="groupLabel ? _labelId : null"
    >
      <!-- Group header -->
      <div *ngIf="groupLabel || groupDescription" class="AppCore-checkbox-group__header">
        <span
          *ngIf="groupLabel"
          class="AppCore-checkbox-group__label"
          [id]="_labelId"
        >{{ groupLabel }}</span>
        <span *ngIf="groupDescription" class="AppCore-checkbox-group__description">
          {{ groupDescription }}
        </span>
      </div>

      <!-- Select All row -->
      <ng-container *ngIf="showSelectAll">
        <AppCore-checkbox
          [label]="selectAllLabel"
          [checked]="allChecked"
          [indeterminate]="someChecked && !allChecked"
          [disabled]="disabled"
          [size]="size"
          (checkedChange)="onSelectAll($event)"
        ></AppCore-checkbox>
        <div class="AppCore-checkbox-group__divider"></div>
      </ng-container>

      <!-- Items -->
      <div
        class="AppCore-checkbox-group__items"
        [ngClass]="{ 'AppCore-checkbox-group__items--horizontal': orientation === 'horizontal' }"
      >
        <AppCore-checkbox
          *ngFor="let item of items; trackBy: trackById"
          [label]="item.label"
          [description]="item.description || ''"
          [checked]="item.checked"
          [disabled]="disabled || !!item.disabled"
          [error]="!!error"
          [size]="size"
          [inputId]="item.id"
          (checkedChange)="onItemChange(item, $event)"
        ></AppCore-checkbox>
      </div>

      <!-- Error message -->
      <span *ngIf="error" class="AppCore-checkbox-group__error" role="alert">
        {{ error }}
      </span>
    </div>
  `,
})
export class CheckboxGroupComponent {
  /** Array of checkbox items to render. */
  @Input() items: CheckboxItem[] = [];
  /** Group label displayed above the checkboxes. */
  @Input() groupLabel = '';
  /** Optional helper text below the group label. */
  @Input() groupDescription = '';
  /** Whether to show a "Select All" checkbox above the list. */
  @Input() showSelectAll = false;
  /** Label text for the select-all row. */
  @Input() selectAllLabel = 'Select All';
  /** Layout direction of the checkbox items. */
  @Input() orientation: 'vertical' | 'horizontal' = 'vertical';
  /** Size applied to all checkboxes in the group. */
  @Input() size: CheckboxSize = 'md';
  /** Disables all checkboxes in the group. */
  @Input() disabled = false;
  /** Error message displayed below the group; also applies error styling to each checkbox. */
  @Input() error = '';

  /** Emits the full updated items array on any selection change. */
  @Output() selectionChange = new EventEmitter<CheckboxItem[]>();

  readonly _labelId = `checkbox-group-label-${Math.random().toString(36).slice(2)}`;

  get allChecked(): boolean {
    return this.items.length > 0 && this.items.every(i => i.checked);
  }

  get someChecked(): boolean {
    return this.items.some(i => i.checked);
  }

  onSelectAll(checked: boolean): void {
    this.items = this.items.map(item =>
      item.disabled ? item : { ...item, checked }
    );
    this.selectionChange.emit([...this.items]);
  }

  onItemChange(item: CheckboxItem, checked: boolean): void {
    item.checked = checked;
    this.selectionChange.emit([...this.items]);
  }

  trackById(_index: number, item: CheckboxItem): string {
    return item.id;
  }
}
