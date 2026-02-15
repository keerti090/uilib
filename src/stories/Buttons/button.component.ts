import { Component, Input, ContentChild, AfterContentInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- required
import { MatButtonModule } from '@angular/material/button';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'storybook-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, IconComponent], // <-- add MatButtonModule
  styleUrls: ['./button.scss'],
  template: `
    <button
      mat-button
      class="storybook-button"
      [ngClass]="[
  'storybook-button--' + type,
  'storybook-button--' + state,
  'storybook-button--' + size
]"
      [disabled]="state === 'disabled'"
      (mouseenter)="onHover()"
      (mouseleave)="onLeave()"
      (mousedown)="onPressed()"
      (mouseup)="onReleased()"
      (click)="onClick()"
    >
      <!-- Left Icon or fallback -->
      <ng-content select="[leftIconSwap]"></ng-content>
      <app-icon *ngIf="!hasLeftIcon" icon="default-left" size="sm"></app-icon>

      <!-- Label -->
      <div *ngIf="buttonText" class="button-text-wrapper">
        <ng-container [ngSwitch]="state">
          <span *ngSwitchCase="'loading'">⏳</span>
          <span *ngSwitchDefault>{{ label }}</span>
        </ng-container>
      </div>

      <!-- Right Icon or fallback -->
      <ng-content select="[rightIconSwap]"></ng-content>
      <app-icon *ngIf="!hasRightIcon" icon="default-right" size="sm"></app-icon>
    </button>
  `
})
export class ButtonComponent implements AfterContentInit {
  @Input() buttonText = true;
  @Input() label = 'Button';
  @Input() size: 'small' | 'medium' | 'large' = 'large';
  @Input() state: 'default' | 'hover' | 'pressed' | 'disabled' | 'error' | 'success' | 'loading' = 'default';
  @Input() type: 'primary' | 'secondary' | 'tertiary' | 'toned' | 'link' = 'primary';

  @ContentChild('leftIconSwap', { read: ElementRef }) leftIcon?: ElementRef;
  @ContentChild('rightIconSwap', { read: ElementRef }) rightIcon?: ElementRef;

  hasLeftIcon = false;
  hasRightIcon = false;

  ngAfterContentInit() {
    this.hasLeftIcon = !!this.leftIcon;
    this.hasRightIcon = !!this.rightIcon;
  }

  onHover() {
    if (this.state !== 'disabled') this.state = 'hover';
  }
  onLeave() {
    if (this.state !== 'disabled') this.state = 'default';
  }
  onPressed() {
    if (this.state !== 'disabled') this.state = 'pressed';
  }
  onReleased() {
    if (this.state !== 'disabled') this.state = 'default';
  }
  onClick() {
    if (this.state !== 'disabled') console.log('Button clicked');
  }
}
