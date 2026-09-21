import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { ButtonComponent } from '../buttons/button.component';

export type ModalSize = 'S' | 'M' | 'L' | 'XL';

@Component({
  selector: 'appcore-modal',
  standalone: true,
  imports: [CommonModule, IconComponent, ButtonComponent],
  styleUrls: ['./modal.scss'],
  template: `
    <div class="appcore-modal" [class.appcore-modal--visible]="visible">
      <!-- Overlay -->
      <div class="appcore-modal__overlay" (click)="onOverlayClick()"></div>

      <!-- Modal panel -->
      <div
        class="appcore-modal__panel"
        [ngClass]="'appcore-modal__panel--' + size"
        role="dialog"
        aria-modal="true"
        [attr.aria-labelledby]="'modal-title'"
      >
        <!-- Content wrapper (header + body) -->
        <div class="appcore-modal__content">
          <!-- Header -->
          <div class="appcore-modal__header">
            <div class="appcore-modal__title-group">
              <span class="appcore-modal__title" id="modal-title">{{ title }}</span>
              <span *ngIf="subtitle" class="appcore-modal__subtitle">{{ subtitle }}</span>
            </div>

            <button
              type="button"
              class="appcore-modal__close"
              (click)="close.emit()"
              aria-label="Close modal"
            >
              <app-icon icon="close" iconSet="material" size="sm"></app-icon>
            </button>
          </div>

          <!-- Body slot -->
          <div class="appcore-modal__body">
            <ng-content></ng-content>
          </div>
        </div>

        <!-- Footer CTAs -->
        <div class="appcore-modal__footer">
          <div class="appcore-modal__button-set">
            <appcore-button
              type="secondary"
              size="small"
              [label]="cancelLabel"
              (click)="cancel.emit()"
            ></appcore-button>
            <appcore-button
              type="primary"
              size="small"
              [label]="confirmLabel"
              (click)="confirm.emit()"
            ></appcore-button>
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
