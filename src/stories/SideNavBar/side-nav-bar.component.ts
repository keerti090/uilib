import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export type SideNavBarStyle = 'with-back-button' | 'with-header';

export interface TreeNavItem {
  label: string;
  level?: 1 | 2;
  hasChildren?: boolean;
  isExpanded?: boolean;
  children?: TreeNavItem[];
}

const DEFAULT_BACK_BUTTON_NAV_ITEMS: TreeNavItem[] = [
  { label: 'Overview', level: 1 },
  { label: 'Customer Reports', level: 1 },
  { label: 'Customer Invoices', level: 1 },
  { label: 'General', level: 1, hasChildren: true },
  {
    label: 'Cloud Billing',
    level: 1,
    hasChildren: true,
    isExpanded: true,
    children: [
      { label: 'Cloud Providers', level: 2 },
      { label: 'Cloud Accounts', level: 2 },
      { label: 'Tax Profile', level: 2 },
      { label: 'Credits', level: 2 },
      { label: 'Charges & Discounts', level: 2 },
      { label: 'Detailed Billing Exports', level: 2 },
    ]
  },
];

const DEFAULT_HEADER_NAV_ITEMS: TreeNavItem[] = [
  { label: 'All Products', level: 1 },
  { label: 'My Products', level: 1 },
  { label: 'Product Settings', level: 1, hasChildren: true },
];

@Component({
  selector: 'app-side-nav-bar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  styleUrls: ['./side-nav-bar.scss'],
  template: `
    <aside class="side-nav" [ngClass]="'side-nav--' + navStyle">

      <!-- ===== WITH BACK BUTTON STYLE ===== -->
      <ng-container *ngIf="navStyle === 'with-back-button'">
        <button class="side-nav__back-btn" (click)="onBackClick()">
          <span class="material-symbols-rounded side-nav__back-icon">chevron_left</span>
          <span class="side-nav__back-label">{{ backButtonLabel }}</span>
        </button>

        <div class="side-nav__tree">
          <ng-container *ngFor="let item of navItems">
            <ng-container *ngTemplateOutlet="treeItem; context: { $implicit: item }"></ng-container>
          </ng-container>
        </div>
      </ng-container>

      <!-- ===== WITH HEADER STYLE ===== -->
      <ng-container *ngIf="navStyle === 'with-header'">
        <div class="side-nav__header">
          <div class="side-nav__header-icon-wrap">
            <span class="material-symbols-rounded side-nav__header-icon">{{ headerIcon }}</span>
          </div>
          <div class="side-nav__header-text">
            <span class="side-nav__header-title">{{ headerTitle }}</span>
          </div>
        </div>

        <div class="side-nav__tree">
          <ng-container *ngFor="let item of navItems">
            <ng-container *ngTemplateOutlet="treeItem; context: { $implicit: item }"></ng-container>
          </ng-container>
        </div>
      </ng-container>

    </aside>

    <!-- Tree item template -->
    <ng-template #treeItem let-item>
      <div
        class="side-nav__item"
        [class.side-nav__item--level-2]="item.level === 2"
        [class.side-nav__item--active]="item.label === activeItem"
        (click)="onItemClick(item)"
      >
        <span class="side-nav__item-label">{{ item.label }}</span>
        <span
          *ngIf="item.hasChildren"
          class="material-symbols-rounded side-nav__item-chevron"
        >{{ item.isExpanded ? 'expand_less' : 'expand_more' }}</span>
      </div>

      <!-- Children (shown when expanded) -->
      <ng-container *ngIf="item.isExpanded && item.children">
        <ng-container *ngFor="let child of item.children">
          <ng-container *ngTemplateOutlet="treeItem; context: { $implicit: child }"></ng-container>
        </ng-container>
      </ng-container>
    </ng-template>
  `
})
export class SideNavBarComponent {
  @Input() navStyle: SideNavBarStyle = 'with-back-button';
  @Input() backButtonLabel = 'All Customers';
  @Input() headerTitle = 'Products';
  @Input() headerIcon = 'category';
  @Input() activeItem = '';
  @Input() navItems: TreeNavItem[] = [];

  @Output() backClick = new EventEmitter<void>();
  @Output() itemClick = new EventEmitter<TreeNavItem>();

  ngOnInit(): void {
    if (this.navItems.length === 0) {
      this.navItems = this.navStyle === 'with-back-button'
        ? [...DEFAULT_BACK_BUTTON_NAV_ITEMS]
        : [...DEFAULT_HEADER_NAV_ITEMS];
    }
  }

  onBackClick(): void {
    this.backClick.emit();
  }

  onItemClick(item: TreeNavItem): void {
    if (item.hasChildren) {
      item.isExpanded = !item.isExpanded;
    }
    this.activeItem = item.label;
    this.itemClick.emit(item);
  }
}
