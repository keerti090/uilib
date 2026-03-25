import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { IconComponent } from '../icon/icon.component';

export interface ColumnManagerColumn {
  id: string;
  label: string;
  visible: boolean;
  locked?: boolean;
}

export interface ColumnManagerGroup {
  id: string;
  label: string;
  columns: ColumnManagerColumn[];
  collapsed?: boolean;
  locked?: boolean;
}

const DEFAULT_GROUPS: ColumnManagerGroup[] = [
  {
    id: 'group-personal',
    label: 'Personal Information',
    columns: [
      { id: 'col-first-name', label: 'First Name', visible: true, locked: true },
      { id: 'col-last-name', label: 'Last Name', visible: true },
      { id: 'col-email', label: 'Email', visible: true },
      { id: 'col-phone', label: 'Phone', visible: false },
      { id: 'col-dob', label: 'Date of Birth', visible: false },
    ],
  },
  {
    id: 'group-address',
    label: 'Address',
    columns: [
      { id: 'col-street', label: 'Street', visible: true },
      { id: 'col-city', label: 'City', visible: true },
      { id: 'col-state', label: 'State', visible: false },
      { id: 'col-zip', label: 'Zip Code', visible: false },
      { id: 'col-country', label: 'Country', visible: true },
    ],
  },
  {
    id: 'group-account',
    label: 'Account Details',
    collapsed: true,
    columns: [
      { id: 'col-account-id', label: 'Account ID', visible: true, locked: true },
      { id: 'col-created', label: 'Created Date', visible: true },
      { id: 'col-modified', label: 'Last Modified', visible: false },
      { id: 'col-status', label: 'Status', visible: true },
    ],
  },
];

@Component({
  selector: 'AppCore-column-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule, IconComponent],
  styleUrls: ['./column-manager.scss'],
  template: `
    <div class="AppCore-column-manager">

      <!-- Header -->
      <div class="AppCore-column-manager__header">
        <span class="AppCore-column-manager__title">{{ title }}</span>
        <button
          type="button"
          class="AppCore-column-manager__icon-btn"
          (click)="onCancel()"
          aria-label="Close"
        >
          <app-icon icon="close" iconSet="material" size="sm"></app-icon>
        </button>
      </div>

      <!-- Search -->
      @if (searchable) {
        <div class="AppCore-column-manager__search">
          <app-icon icon="search" iconSet="material" size="sm" class="AppCore-column-manager__search-icon"></app-icon>
          <input
            type="text"
            class="AppCore-column-manager__search-input"
            [(ngModel)]="searchQuery"
            placeholder="Search columns..."
            aria-label="Search columns"
          />
          @if (searchQuery) {
            <button
              type="button"
              class="AppCore-column-manager__icon-btn AppCore-column-manager__icon-btn--sm"
              (click)="searchQuery = ''"
              aria-label="Clear search"
            >
              <app-icon icon="close" iconSet="material" size="sm"></app-icon>
            </button>
          }
        </div>
      }

      <!-- Select All row -->
      @if (!searchQuery) {
        <div class="AppCore-column-manager__select-all">
          <div class="AppCore-column-manager__row-left">
            <span class="AppCore-column-manager__drag-handle-spacer"></span>
            <label class="AppCore-column-manager__check-label">
              <input
                type="checkbox"
                class="AppCore-column-manager__checkbox"
                [checked]="allVisible"
                [indeterminate]="someVisible && !allVisible"
                (change)="toggleAllColumns($any($event.target).checked)"
              />
              <span class="AppCore-column-manager__label AppCore-column-manager__label--bold">Select All</span>
            </label>
          </div>
          <span class="AppCore-column-manager__badge">{{ visibleCount }}/{{ totalCount }}</span>
        </div>
      }

      <!-- Groups drop list -->
      <div
        class="AppCore-column-manager__groups"
        cdkDropList
        [cdkDropListDisabled]="!!searchQuery"
        (cdkDropListDropped)="onGroupDrop($event)"
      >
        @for (group of internalGroups; track group.id; let gi = $index) {
          <!-- Only show group if it has columns matching search -->
          @if (!searchQuery || getFilteredColumns(group).length > 0) {
            <div
              class="AppCore-column-manager__group"
              cdkDrag
              [cdkDragDisabled]="group.locked || !!searchQuery"
            >
              <div *cdkDragPlaceholder class="AppCore-column-manager__drop-placeholder"></div>

              <!-- Group Header -->
              <div class="AppCore-column-manager__group-header">
                <div class="AppCore-column-manager__row-left">
                  <span
                    class="AppCore-column-manager__drag-handle"
                    [class.AppCore-column-manager__drag-handle--hidden]="group.locked || !!searchQuery"
                    cdkDragHandle
                    aria-label="Drag to reorder group"
                  >
                    <app-icon icon="drag_indicator" iconSet="material" size="sm"></app-icon>
                  </span>
                  <input
                    type="checkbox"
                    class="AppCore-column-manager__checkbox"
                    [checked]="isGroupAllVisible(group)"
                    [indeterminate]="isGroupSomeVisible(group) && !isGroupAllVisible(group)"
                    (change)="toggleGroup(group, $any($event.target).checked)"
                  />
                  <button
                    type="button"
                    class="AppCore-column-manager__group-toggle"
                    (click)="toggleGroupCollapse(group)"
                  >
                    <app-icon
                      [icon]="group.collapsed && !searchQuery ? 'chevron_right' : 'expand_more'"
                      iconSet="material"
                      size="sm"
                    ></app-icon>
                    <span class="AppCore-column-manager__group-label">{{ group.label }}</span>
                  </button>
                </div>
                <span class="AppCore-column-manager__badge">
                  {{ getGroupVisibleCount(group) }}/{{ group.columns.length }}
                </span>
              </div>

              <!-- Columns drop list -->
              @if (!group.collapsed || !!searchQuery) {
                <div
                  class="AppCore-column-manager__columns"
                  cdkDropList
                  [cdkDropListDisabled]="!!searchQuery"
                  (cdkDropListDropped)="onColumnDrop($event, gi)"
                >
                  @for (column of getFilteredColumns(group); track column.id) {
                    <div
                      class="AppCore-column-manager__column"
                      cdkDrag
                      [cdkDragDisabled]="column.locked || !!searchQuery"
                    >
                      <div *cdkDragPlaceholder class="AppCore-column-manager__drop-placeholder AppCore-column-manager__drop-placeholder--column"></div>

                      <div class="AppCore-column-manager__row-left">
                        <span
                          class="AppCore-column-manager__drag-handle"
                          [class.AppCore-column-manager__drag-handle--hidden]="column.locked || !!searchQuery"
                          cdkDragHandle
                          aria-label="Drag to reorder column"
                        >
                          <app-icon icon="drag_indicator" iconSet="material" size="sm"></app-icon>
                        </span>
                        <label class="AppCore-column-manager__check-label">
                          <input
                            type="checkbox"
                            class="AppCore-column-manager__checkbox"
                            [(ngModel)]="column.visible"
                            [disabled]="!!column.locked"
                            (ngModelChange)="onColumnVisibilityChange()"
                          />
                          <span class="AppCore-column-manager__label">{{ column.label }}</span>
                        </label>
                      </div>

                      @if (column.locked) {
                        <app-icon
                          icon="lock"
                          iconSet="material"
                          size="sm"
                          class="AppCore-column-manager__lock-icon"
                        ></app-icon>
                      }
                    </div>
                  }
                </div>
              }
            </div>
          }
        }
      </div>

      <!-- Footer -->
      <div class="AppCore-column-manager__footer">
        <button
          type="button"
          class="AppCore-column-manager__btn AppCore-column-manager__btn--secondary"
          (click)="onCancel()"
        >
          Cancel
        </button>
        <button
          type="button"
          class="AppCore-column-manager__btn AppCore-column-manager__btn--primary"
          (click)="onApply()"
        >
          Apply
        </button>
      </div>
    </div>
  `,
})
export class ColumnManagerComponent implements OnInit, OnChanges {
  /** List of column groups to manage. */
  @Input() groups: ColumnManagerGroup[] = DEFAULT_GROUPS;

  /** Panel title displayed in the header. */
  @Input() title: string = 'Manage Columns';

  /** Whether to show the search input. */
  @Input() searchable: boolean = true;

  /** Emits on every visibility/order change (live updates). */
  @Output() groupsChange = new EventEmitter<ColumnManagerGroup[]>();

  /** Emits when the user clicks Apply. */
  @Output() apply = new EventEmitter<ColumnManagerGroup[]>();

  /** Emits when the user clicks Cancel or the close button. */
  @Output() cancel = new EventEmitter<void>();

  searchQuery: string = '';
  internalGroups: ColumnManagerGroup[] = [];

  ngOnInit(): void {
    this.internalGroups = this.deepCopy(this.groups);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['groups'] && !changes['groups'].firstChange) {
      this.internalGroups = this.deepCopy(this.groups);
    }
  }

  get allVisible(): boolean {
    return this.internalGroups.every(g => g.columns.every(c => c.visible));
  }

  get someVisible(): boolean {
    return this.internalGroups.some(g => g.columns.some(c => c.visible));
  }

  get visibleCount(): number {
    return this.internalGroups.reduce(
      (sum, g) => sum + g.columns.filter(c => c.visible).length,
      0
    );
  }

  get totalCount(): number {
    return this.internalGroups.reduce((sum, g) => sum + g.columns.length, 0);
  }

  isGroupAllVisible(group: ColumnManagerGroup): boolean {
    return group.columns.every(c => c.visible);
  }

  isGroupSomeVisible(group: ColumnManagerGroup): boolean {
    return group.columns.some(c => c.visible);
  }

  getGroupVisibleCount(group: ColumnManagerGroup): number {
    return group.columns.filter(c => c.visible).length;
  }

  getFilteredColumns(group: ColumnManagerGroup): ColumnManagerColumn[] {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) return group.columns;
    return group.columns.filter(c => c.label.toLowerCase().includes(q));
  }

  toggleAllColumns(visible: boolean): void {
    this.internalGroups.forEach(g =>
      g.columns.forEach(c => {
        if (!c.locked) c.visible = visible;
      })
    );
    this.emitChange();
  }

  toggleGroup(group: ColumnManagerGroup, visible: boolean): void {
    group.columns.forEach(c => {
      if (!c.locked) c.visible = visible;
    });
    this.emitChange();
  }

  toggleGroupCollapse(group: ColumnManagerGroup): void {
    group.collapsed = !group.collapsed;
  }

  onColumnVisibilityChange(): void {
    this.emitChange();
  }

  onGroupDrop(event: CdkDragDrop<ColumnManagerGroup[]>): void {
    moveItemInArray(this.internalGroups, event.previousIndex, event.currentIndex);
    this.emitChange();
  }

  onColumnDrop(event: CdkDragDrop<ColumnManagerColumn[]>, groupIndex: number): void {
    moveItemInArray(
      this.internalGroups[groupIndex].columns,
      event.previousIndex,
      event.currentIndex
    );
    this.emitChange();
  }

  onApply(): void {
    this.apply.emit(this.deepCopy(this.internalGroups));
  }

  onCancel(): void {
    this.internalGroups = this.deepCopy(this.groups);
    this.searchQuery = '';
    this.cancel.emit();
  }

  private emitChange(): void {
    this.groupsChange.emit(this.deepCopy(this.internalGroups));
  }

  private deepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }
}
