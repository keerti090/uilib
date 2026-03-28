import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export type NavBarPlatform = 'CCP' | 'WLMP' | 'CBOT';

const DEFAULT_NAV_ITEMS = [
  'Dashboard', 'Marketplace', 'Subscription', 'Orders', 'Quotes',
  'Support', 'Billing', 'Reports', 'Customers', 'Partners', 'Products'
];

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  styleUrls: ['./nav-bar.scss'],
  template: `
    <!-- ===== CCP PLATFORM ===== -->
    <nav *ngIf="platform === 'CCP'" class="nav-bar nav-bar--ccp">
      <div class="nav-bar__top nav-bar__top--blue">
        <div class="nav-bar__logo nav-bar__logo--white">
          <span class="nav-bar__logo-wordmark">StreamOne Ion</span>
        </div>
        <div class="nav-bar__actions">
          <div class="nav-bar__search nav-bar__search--filled">
            <span class="material-symbols-rounded nav-bar__search-icon">search</span>
            <span class="nav-bar__search-label">Global Search</span>
          </div>
          <button class="nav-bar__icon-btn" aria-label="Notifications">
            <span class="material-symbols-rounded">notifications</span>
          </button>
          <button class="nav-bar__icon-btn" aria-label="Apps">
            <span class="material-symbols-rounded">apps</span>
          </button>
          <button class="nav-bar__icon-btn nav-bar__flag-btn" aria-label="Region">
            <span class="nav-bar__flag-emoji">🇺🇸</span>
          </button>
          <button class="nav-bar__icon-btn" aria-label="Menu">
            <span class="material-symbols-rounded">menu</span>
          </button>
        </div>
      </div>
      <div class="nav-bar__bottom nav-bar__bottom--white">
        <ng-container *ngFor="let item of navItems">
          <button
            class="nav-bar__nav-item"
            [class.nav-bar__nav-item--active]="item === activeItem"
            (click)="onNavItemClick(item)"
          >{{ item }}</button>
        </ng-container>
      </div>
    </nav>

    <!-- ===== WLMP PLATFORM ===== -->
    <nav *ngIf="platform === 'WLMP'" class="nav-bar nav-bar--wlmp">
      <div class="nav-bar__top nav-bar__top--white">
        <div class="nav-bar__left">
          <div class="nav-bar__logo nav-bar__logo--color">
            <span class="nav-bar__logo-wordmark nav-bar__logo-wordmark--color">StreamOne Ion</span>
          </div>
          <div class="nav-bar__divider"></div>
          <span class="nav-bar__mp-name">{{ marketplaceName }}</span>
        </div>
        <div class="nav-bar__actions nav-bar__actions--wide">
          <div class="nav-bar__search nav-bar__search--outlined">
            <span class="material-symbols-rounded nav-bar__search-icon nav-bar__search-icon--dark">search</span>
            <span class="nav-bar__search-label nav-bar__search-label--dark">Global Search</span>
          </div>
          <button class="nav-bar__icon-btn nav-bar__icon-btn--dark" aria-label="Notifications">
            <span class="material-symbols-rounded">notifications</span>
          </button>
          <button class="nav-bar__dropdown-btn" aria-label="User menu">
            <span class="nav-bar__dropdown-label">{{ userName }}</span>
            <span class="material-symbols-rounded nav-bar__chevron">expand_more</span>
          </button>
          <div class="nav-bar__country">
            <span class="nav-bar__flag-emoji">🇺🇸</span>
            <button class="nav-bar__dropdown-btn nav-bar__dropdown-btn--compact">
              <span class="nav-bar__dropdown-label">EN</span>
              <span class="material-symbols-rounded nav-bar__chevron">expand_more</span>
            </button>
          </div>
        </div>
      </div>
      <div class="nav-bar__bottom nav-bar__bottom--dark">
        <div class="nav-bar__bottom-left">
          <ng-container *ngFor="let item of navItems">
            <button
              class="nav-bar__nav-item nav-bar__nav-item--light"
              [class.nav-bar__nav-item--active-light]="item === activeItem"
              (click)="onNavItemClick(item)"
            >{{ item }}</button>
          </ng-container>
        </div>
        <button class="nav-bar__cart-btn">
          <span class="material-symbols-rounded nav-bar__cart-icon">shopping_cart</span>
          <span class="nav-bar__cart-label">View Cart ({{ cartCount }})</span>
          <span class="material-symbols-rounded nav-bar__chevron">expand_more</span>
        </button>
      </div>
    </nav>

    <!-- ===== CBOT PLATFORM ===== -->
    <nav *ngIf="platform === 'CBOT'" class="nav-bar nav-bar--cbot">
      <div class="nav-bar__top nav-bar__top--blue nav-bar__top--compact">
        <div class="nav-bar__cbot-logo">
          <span class="material-symbols-rounded nav-bar__cbot-icon">smart_toy</span>
          <span class="nav-bar__cbot-wordmark">CBOT</span>
        </div>
        <div class="nav-bar__user">
          <span class="material-symbols-rounded nav-bar__user-icon">account_circle</span>
          <span class="nav-bar__user-name">{{ loggedInUser }}</span>
        </div>
      </div>
    </nav>
  `
})
export class NavBarComponent {
  @Input() platform: NavBarPlatform = 'CCP';
  @Input() navItems: string[] = [...DEFAULT_NAV_ITEMS];
  @Input() activeItem = 'Dashboard';
  @Input() cartCount = 0;
  @Input() userName = 'SMP RESELLER';
  @Input() marketplaceName = 'Marketplace';
  @Input() loggedInUser = 'John Doe';

  @Output() navItemClick = new EventEmitter<string>();

  onNavItemClick(item: string): void {
    this.activeItem = item;
    this.navItemClick.emit(item);
  }
}
