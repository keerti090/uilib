import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export type FooterPlatform = 'TC' | 'WLMP';

const DEFAULT_TC_LINKS = [
  'Terms & Conditions',
  'Privacy Statements',
  'Data Processing',
  'Legal Entities',
  'Accessibility',
  'Do Not Share My Personal Data',
  'Cookie Settings',
];

const DEFAULT_WLMP_MENU_LINKS = [
  'About Us', 'Services', 'Solutions', 'Contact Us', 'Blog',
];

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  styleUrls: ['./footer.scss'],
  template: `
    <!-- ===== T&C PLATFORM ===== -->
    <footer *ngIf="platform === 'TC'" class="footer footer--tc">
      <span class="footer__tc-brand">TD SYNNEX</span>
      <ng-container *ngFor="let link of tcLinks; let last = last">
        <span class="footer__separator">|</span>
        <a class="footer__tc-link" href="#">{{ link }}</a>
      </ng-container>
    </footer>

    <!-- ===== WLMP PLATFORM ===== -->
    <footer *ngIf="platform === 'WLMP'" class="footer footer--wlmp">
      <div class="footer__wlmp-top">
        <div class="footer__wlmp-top-row">
          <div class="footer__wlmp-logo">
            <span class="footer__logo-wordmark">StreamOne Ion</span>
          </div>
          <p class="footer__tagline">{{ tagline }}</p>
          <div class="footer__contact">
            <span class="material-symbols-rounded footer__contact-icon">mail</span>
            <span class="footer__contact-email">{{ contactEmail }}</span>
          </div>
        </div>
        <nav class="footer__wlmp-menu">
          <a *ngFor="let link of wlmpMenuLinks" class="footer__wlmp-menu-link" href="#">{{ link }}</a>
        </nav>
      </div>
      <p class="footer__copyright">{{ copyrightText }}</p>
    </footer>
  `
})
export class FooterComponent {
  @Input() platform: FooterPlatform = 'TC';
  @Input() tcLinks: string[] = [...DEFAULT_TC_LINKS];
  @Input() wlmpMenuLinks: string[] = [...DEFAULT_WLMP_MENU_LINKS];
  @Input() tagline = 'We provide the tools, resources and people to simplify the delivery of cloud solutions.';
  @Input() contactEmail = 'sales@techdata.com';
  @Input() copyrightText = '⓪ Tech Data Corporation, 2021 Tech Data and Tech Data logo are registered trademarks of Tech Data Corporation in the United States and Other countries. All other trademarks are the property of their respective owners.';
}
