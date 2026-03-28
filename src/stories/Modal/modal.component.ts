import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { ButtonComponent } from '../Buttons/button.component';

export type ModalSize = 'S' | 'M' | 'L' | 'XL';

@Component({
  selector: 'AppCore-modal',
  standalone: true,
  imports: [CommonModule, IconComponent, ButtonComponent],
  styleUrls: ['./modal.scss'],
  template: `
    <div class="AppCore-modal" [class.AppCore-modal--visible]="visible">
      <!-- Overlay -->
      <div class="AppCore-modal__overlay" (click)="onOverlayClick()"></div>

      <!-- Modal panel -->
      <div
        class="AppCore-modal__panel"
        [ngClass]="'AppCore-modal__panel--' + size"
        role="dialog"
        aria-modal="true"
        [attr.aria-labelledby]="'modal-title'"
      >
        <!-- Content wrapper (header + body) -->
        <div class="AppCore-modal__content">
          <!-- Header -->
          <div class="AppCore-modal__header">
            <div class="AppCore-modal__title-group">
              <span class="AppCore-modal__title" id="modal-title">{{ title }}</span>
              <span *ngIf="subtitle" class="AppCore-modal__subtitle">{{ subtitle }}</span>
            </div>

            <button
              type="button"
              class="AppCore-modal__close"
              (click)="close.emit()"
              aria-label="Close modal"
            >
              <app-icon icon="close" iconSet="material" size="sm"></app-icon>
            </button>
          </div>

          <!-- Body slot -->
          <div class="AppCore-modal__body">
            <ng-content></ng-content>
          </div>
        </div>

        <!-- Footer CTAs -->
        <div class="AppCore-modal__footer">
          <div class="AppCore-modal__button-set">
            <AppCore-button
              type="secondary"
              size="small"
              [label]="cancelLabel"
              (click)="cancel.emit()"
            ></AppCore-button>
            <AppCore-button
              type="primary"
              size="small"
              [label]="confirmLabel"
              (click)="confirm.emit()"
            ></AppCore-button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ModalComponent {
  @Input() visible = true;
  @Input() size: ModalSize = 'S';
  @Input() title = 'Header Label';
  @Input() subtitle = 'Text';
  @Input() cancelLabel = 'Cancel';
  @Input() confirmLabel = 'Confirm';
  @Input() closeOnOverlayClick = false;

  @Output() close = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  onOverlayClick(): void {
    if (this.closeOnOverlayClick) {
      this.close.emit();
    }
  }
}
