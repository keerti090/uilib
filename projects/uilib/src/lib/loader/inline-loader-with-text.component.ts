import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineLoaderComponent } from './inline-loader.component';

export type InlineLoaderState = 'Active' | 'Success' | 'Error';

@Component({
  selector: 'appcore-inline-loader-with-text',
  standalone: true,
  imports: [CommonModule, InlineLoaderComponent],
  styleUrls: ['./inline-loader-with-text.scss'],
  template: `
    <span class="appcore-inline-loader-text" [ngClass]="'appcore-inline-loader-text--' + state" role="status">
      <!-- Active: spinner -->
      <appcore-inline-loader *ngIf="state === 'Active'"></appcore-inline-loader>

      <!-- Success: check_circle icon -->
      <span *ngIf="state === 'Success'" class="appcore-inline-loader-text__icon appcore-inline-loader-text__icon--success">
        <span class="material-symbols-rounded">check_circle</span>
      </span>

      <!-- Error: error icon -->
      <span *ngIf="state === 'Error'" class="appcore-inline-loader-text__icon appcore-inline-loader-text__icon--error">
        <span class="material-symbols-rounded">error</span>
      </span>

      <span class="appcore-inline-loader-text__label">{{ label }}</span>
    </span>
  `,
})
export class InlineLoaderWithTextComponent {
  @Input() state: InlineLoaderState = 'Active';
  @Input() label = 'Label';
}
