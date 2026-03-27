import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { ButtonComponent } from '../Buttons/button.component';

export type DialogueBoxState = 'Default' | 'Success' | 'Warning' | 'Error';
export type DialogueBoxSize = 'S' | 'M' | 'L' | 'XL';

@Component({
  selector: 'AppCore-dialogue-box',
  standalone: true,
  imports: [CommonModule, IconComponent, ButtonComponent],
  styleUrls: ['./dialogue-box.scss'],
  template: `
    <div class="AppCore-dialogue-box" [class.AppCore-dialogue-box--visible]="visible">
      <!-- Overlay -->
      <div class="AppCore-dialogue-box__overlay" (click)="onOverlayClick()"></div>

      <!-- Modal -->
      <div
        class="AppCore-dialogue-box__modal"
        [ngClass]="'AppCore-dialogue-box__modal--' + size"
        role="dialog"
        aria-modal="true"
      >
        <!-- Content -->
        <div class="AppCore-dialogue-box__content">
          <!-- Header -->
          <div class="AppCore-dialogue-box__header">
            <div class="AppCore-dialogue-box__title">
              <!-- Avatar / State Icon -->
              <div
                class="AppCore-dialogue-box__avatar"
                [ngClass]="'AppCore-dialogue-box__avatar--' + state"
              >
                <app-icon
                  *ngIf="state !== 'Default'"
                  [icon]="stateIcon"
                  iconSet="material"
                  size="md"
                ></app-icon>
              </div>

              <!-- Label + Description -->
              <div class="AppCore-dialogue-box__title-content">
                <div class="AppCore-dialogue-box__text">
                  <span class="AppCore-dialogue-box__label">{{ label }}</span>
                  <span *ngIf="description" class="AppCore-dialogue-box__description">{{ description }}</span>
                </div>
              </div>
            </div>

            <!-- Close button -->
            <button
              type="button"
              class="AppCore-dialogue-box__close"
              (click)="close.emit()"
              aria-label="Close"
            >
              <app-icon icon="close" iconSet="material" size="sm"></app-icon>
            </button>
          </div>

          <!-- Body slot -->
          <div class="AppCore-dialogue-box__body">
            <ng-content></ng-content>
          </div>
        </div>

        <!-- CTAs footer -->
        <div class="AppCore-dialogue-box__ctas">
          <div class="AppCore-dialogue-box__button-set">
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
export class DialogueBoxComponent {
  @Input() visible = true;
  @Input() state: DialogueBoxState = 'Default';
  @Input() size: DialogueBoxSize = 'M';
  @Input() label = 'Label';
  @Input() description = 'Description';
  @Input() cancelLabel = 'Cancel';
  @Input() confirmLabel = 'Button';
  @Input() closeOnOverlayClick = false;

  @Output() close = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  get stateIcon(): string {
    switch (this.state) {
      case 'Success': return 'check_circle';
      case 'Warning': return 'warning';
      case 'Error': return 'error';
      default: return 'info';
    }
  }

  onOverlayClick(): void {
    if (this.closeOnOverlayClick) {
      this.close.emit();
    }
  }
}
