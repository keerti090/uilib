import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

export type HeaderType = 'H1' | 'H2' | 'H3' | 'H4' | 'H5';

@Component({
  selector: 'appcore-header',
  standalone: true,
  imports: [CommonModule, IconComponent],
  styleUrls: ['./header.scss'],
  template: `
    <div class="appcore-header" [ngClass]="'appcore-header--' + type.toLowerCase()">

      <!-- Back Icon -->
      <button *ngIf="showBackIcon" class="appcore-header__back-btn" aria-label="Back">
        <app-icon icon="chevron_left" iconSet="material" size="sm"></app-icon>
      </button>

      <!-- Logo slot -->
      <div *ngIf="showLogo" class="appcore-header__logo">
        <ng-content select="[logo]"></ng-content>
      </div>

      <!-- Image slot -->
      <div *ngIf="showImage" class="appcore-header__image">
        <ng-content select="[image]"></ng-content>
      </div>

      <!-- Main: Breadcrumb OR Title+Subtitle -->
      <div class="appcore-header__main">
        <div *ngIf="showBreadcrumb" class="appcore-header__breadcrumb">
          <ng-content select="[breadcrumb]"></ng-content>
        </div>
        <div *ngIf="showText" class="appcore-header__text">
          <div class="appcore-header__title-wrap">
            <span class="appcore-header__title">{{ title }}</span>
          </div>
          <span *ngIf="subtitle" class="appcore-header__subtitle">{{ subtitle }}</span>
        </div>
      </div>

      <!-- Right-side actions -->
      <div class="appcore-header__actions">
        <div *ngIf="showBadge1" class="appcore-header__slot">
          <ng-content select="[badge1]"></ng-content>
        </div>
        <div *ngIf="showBadge2" class="appcore-header__slot">
          <ng-content select="[badge2]"></ng-content>
        </div>
        <div *ngIf="showBadge3" class="appcore-header__slot">
          <ng-content select="[badge3]"></ng-content>
        </div>
        <div *ngIf="showBadge4" class="appcore-header__slot">
          <ng-content select="[badge4]"></ng-content>
        </div>
        <div *ngIf="showSearch" class="appcore-header__slot">
          <ng-content select="[search]"></ng-content>
        </div>
        <div *ngIf="showButtonSet" class="appcore-header__slot">
          <ng-content select="[buttonSet]"></ng-content>
        </div>
        <div *ngIf="showComboButton" class="appcore-header__slot">
          <ng-content select="[comboButton]"></ng-content>
        </div>
        <div *ngIf="showActionBar" class="appcore-header__slot">
          <ng-content select="[actionBar]"></ng-content>
        </div>
        <div *ngIf="showIconButton1" class="appcore-header__slot">
          <ng-content select="[iconButton1]"></ng-content>
        </div>
        <div *ngIf="showIconButton2" class="appcore-header__slot">
          <ng-content select="[iconButton2]"></ng-content>
        </div>
        <div *ngIf="showIconButton3" class="appcore-header__slot">
          <ng-content select="[iconButton3]"></ng-content>
        </div>
        <div *ngIf="showAvatar" class="appcore-header__slot">
          <ng-content select="[avatar]"></ng-content>
        </div>
      </div>

    </div>
  `,
})
export class HeaderComponent {
  @Input() type: HeaderType = 'H1';
  @Input() title = 'Header Label';
  @Input() subtitle = 'Text';

  @Input() showBreadcrumb = false;
  @Input() showImage = false;
  @Input() showBackIcon = true;
  @Input() showLogo = false;
  @Input() showText = true;
  @Input() showBadge1 = false;
  @Input() showBadge2 = false;
  @Input() showBadge3 = false;
  @Input() showBadge4 = false;
  @Input() showSearch = false;
  @Input() showButtonSet = false;
  @Input() showComboButton = false;
  @Input() showActionBar = false;
  @Input() showIconButton1 = false;
  @Input() showIconButton2 = false;
  @Input() showIconButton3 = false;
  @Input() showAvatar = false;
}
