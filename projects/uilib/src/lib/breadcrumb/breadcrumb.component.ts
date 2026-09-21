import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export type BreadcrumbSize = 'S' | 'M' | 'L';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, IconComponent],
  styleUrls: ['./breadcrumb.scss'],
  template: `
    <nav class="appcore-breadcrumb" [ngClass]="'appcore-breadcrumb--size-' + size" aria-label="Breadcrumb">
      <ol class="appcore-breadcrumb__list">
        <ng-container *ngFor="let item of items; let i = index; let last = last">
          <li class="appcore-breadcrumb__item" [class.appcore-breadcrumb__item--current]="last">
            <ng-container *ngIf="last; else linkItem">
              <span class="appcore-breadcrumb__label appcore-breadcrumb__label--current" aria-current="page">
                {{ item.label }}
              </span>
            </ng-container>
            <ng-template #linkItem>
              <a
                class="appcore-breadcrumb__link"
                [href]="item.href || '#'"
                (click)="onItemClick($event, item, i)"
              >
                {{ item.label }}
              </a>
            </ng-template>
          </li>

          <li *ngIf="!last" class="appcore-breadcrumb__separator" aria-hidden="true">
            <app-icon icon="chevron_right" iconSet="material" size="sm"></app-icon>
          </li>
        </ng-container>
      </ol>
    </nav>
  `
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Section', href: '/section' },
    { label: 'Current Page' }
  ];
  @Input() size: BreadcrumbSize = 'M';

  @Output() itemClick = new EventEmitter<{ item: BreadcrumbItem; index: number }>();

  onItemClick(event: Event, item: BreadcrumbItem, index: number) {
    if (!item.href || item.href === '#') {
      event.preventDefault();
    }
    this.itemClick.emit({ item, index });
  }
}
