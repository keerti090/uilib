import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SegmentedControlItemComponent, SegmentSize } from './segmented-control-item.component';

export interface SegmentItem {
  label: string;
  icon?: string;
  iconSet?: 'material' | 'asset';
  iconSrc?: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-segmented-control',
  standalone: true,
  imports: [CommonModule, SegmentedControlItemComponent],
  styleUrls: ['./segmented-control.scss'],
  template: `
    <div class="AppCore-segmented-control" [ngClass]="'AppCore-segmented-control--size-' + size">
      <app-segmented-control-item
        *ngFor="let item of items; let i = index"
        [label]="item.label"
        [size]="size"
        [state]="getState(i)"
        [showIcon]="!!item.icon || !!item.iconSrc"
        [iconName]="item.icon || 'add'"
        [iconSet]="item.iconSet || 'material'"
        [iconSrc]="item.iconSrc"
        (itemClick)="onItemClick(i)"
      ></app-segmented-control-item>
    </div>
  `
})
export class SegmentedControlComponent implements OnChanges {
  @Input() items: SegmentItem[] = [
    { label: 'Label' },
    { label: 'Label' },
    { label: 'Label' }
  ];
  @Input() size: SegmentSize = 'M';
  @Input() selectedIndex = 0;
  @Input() disabled = false;

  @Output() selectedIndexChange = new EventEmitter<number>();

  private _selectedIndex = 0;

  ngOnChanges() {
    this._selectedIndex = this.selectedIndex;
  }

  getState(index: number): 'default' | 'selected' | 'disabled' | 'disabled-selected' {
    const isSelected = this._selectedIndex === index;
    const isDisabled = this.disabled || !!this.items[index]?.disabled;

    if (isDisabled && isSelected) return 'disabled-selected';
    if (isDisabled) return 'disabled';
    if (isSelected) return 'selected';
    return 'default';
  }

  onItemClick(index: number) {
    if (!this.disabled && !this.items[index]?.disabled) {
      this._selectedIndex = index;
      this.selectedIndexChange.emit(index);
    }
  }
}
