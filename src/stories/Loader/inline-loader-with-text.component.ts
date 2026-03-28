import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineLoaderComponent } from './inline-loader.component';

export type InlineLoaderState = 'Active' | 'Success' | 'Error';

@Component({
  selector: 'AppCore-inline-loader-with-text',
  standalone: true,
  imports: [CommonModule, InlineLoaderComponent],
  styleUrls: ['./inline-loader-with-text.scss'],
  template: `
    <span class="AppCore-inline-loader-text" [ngClass]="'AppCore-inline-loader-text--' + state" role="status">
      <!-- Active: spinner -->
      <AppCore-inline-loader *ngIf="state === 'Active'"></AppCore-inline-loader>

      <!-- Success: check_circle icon -->
      <span *ngIf="state === 'Success'" class="AppCore-inline-loader-text__icon AppCore-inline-loader-text__icon--success">
        <span class="material-symbols-rounded">check_circle</span>
      </span>

      <!-- Error: error icon -->
      <span *ngIf="state === 'Error'" class="AppCore-inline-loader-text__icon AppCore-inline-loader-text__icon--error">
        <span class="material-symbols-rounded">error</span>
      </span>

      <span class="AppCore-inline-loader-text__label">{{ label }}</span>
    </span>
  `,
})
export class InlineLoaderWithTextComponent {
  @Input() state: InlineLoaderState = 'Active';
  @Input() label = 'Label';
}
