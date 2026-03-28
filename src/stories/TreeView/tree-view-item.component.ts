import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

export type TreeViewItemState = 'default' | 'hover' | 'pressed' | 'selected' | 'disabled';
export type TreeViewType = 'global' | 'local';
export type TreeViewLevel = 1 | 2 | 3 | 4;

@Component({
  selector: 'app-tree-view-item',
  standalone: true,
  imports: [CommonModule, IconComponent],
  styleUrls: ['./tree-view-item.scss'],
  template: `
    <div
      class="AppCore-tree-view-item"
      [class]="itemClasses"
      [attr.aria-selected]="state === 'selected'"
      [attr.aria-disabled]="state === 'disabled'"
      [attr.aria-expanded]="hasChildren ? expanded : null"
      (click)="onItemClick()"
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
      (mousedown)="onMouseDown()"
      (mouseup)="onMouseUp()"
    >
      @if (showPrefixIcon) {
        <app-icon
          class="AppCore-tree-view-item__prefix-icon"
          [icon]="prefixIcon"
          iconSet="material"
          size="sm"
        ></app-icon>
      }
      <span class="AppCore-tree-view-item__label">{{ label }}</span>
      @if (hasChildren) {
        <app-icon
          class="AppCore-tree-view-item__chevron"
          [icon]="expanded ? 'expand_less' : 'expand_more'"
          iconSet="material"
          size="sm"
        ></app-icon>
      }
    </div>
  `,
})
export class TreeViewItemComponent {
  @Input() label: string = 'Label';
  @Input() level: TreeViewLevel = 1;
  @Input() type: TreeViewType = 'global';
  @Input() state: TreeViewItemState = 'default';
  @Input() expanded: boolean = false;
  @Input() hasChildren: boolean = false;
  @Input() showPrefixIcon: boolean = true;
  @Input() prefixIcon: string = 'add';

  @Output() itemClick = new EventEmitter<void>();
  @Output() expandToggle = new EventEmitter<void>();

  private _hovered = false;
  private _pressed = false;

  get itemClasses(): string {
    const base = 'AppCore-tree-view-item';
    const classes = [
      `${base}--level-${this.level}`,
      `${base}--type-${this.type}`,
      `${base}--state-${this.effectiveState}`,
    ];
    if (this.state === 'disabled') {
      classes.push(`${base}--disabled`);
    }
    return classes.join(' ');
  }

  get effectiveState(): TreeViewItemState {
    if (this.state === 'disabled') return 'disabled';
    if (this.state === 'selected') return 'selected';
    if (this._pressed) return 'pressed';
    if (this._hovered) return 'hover';
    return this.state;
  }

  onMouseEnter(): void {
    if (this.state !== 'disabled') this._hovered = true;
  }

  onMouseLeave(): void {
    this._hovered = false;
    this._pressed = false;
  }

  onMouseDown(): void {
    if (this.state !== 'disabled') this._pressed = true;
  }

  onMouseUp(): void {
    this._pressed = false;
  }

  onItemClick(): void {
    if (this.state === 'disabled') return;
    if (this.hasChildren) {
      this.expandToggle.emit();
    }
    this.itemClick.emit();
  }
}
