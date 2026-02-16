import { Component, Input, ContentChild, AfterContentInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- required
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'AppCore-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, IconComponent], // <-- add MatIconModule
  styleUrls: ['./button.scss'],
  template: `
    <button
      mat-button
      class="AppCore-button"
      [ngClass]="[
  'AppCore-button--' + type,
  'AppCore-button--' + state,
  'AppCore-button--' + size
]"
      [disabled]="state === 'disabled'"
      (mouseenter)="onHover()"
      (mouseleave)="onLeave()"
      (mousedown)="onPressed()"
      (mouseup)="onReleased()"
      (click)="onClick()"
    >
      <!-- Left Icon -->
      <ng-container *ngIf="showLeftIcon">
        <ng-content select="[leftIconSwap]"></ng-content>
        <app-icon *ngIf="!hasLeftIcon" [icon]="leftIconName" size="sm"></app-icon>
      </ng-container>

      <!-- Label -->
      <div *ngIf="buttonText" class="button-text-wrapper">
        <ng-container [ngSwitch]="state">
          <span *ngSwitchCase="'loading'">⏳</span>
          <span *ngSwitchDefault>{{ label }}</span>
        </ng-container>
      </div>

      <!-- Right Icon -->
      <ng-container *ngIf="showRightIcon">
        <ng-content select="[rightIconSwap]"></ng-content>
        <app-icon *ngIf="!hasRightIcon" [icon]="rightIconName" size="sm"></app-icon>
      </ng-container>
    </button>
  `
})
export class ButtonComponent implements AfterContentInit {
  @Input() buttonText = true;
  @Input() label = 'Button';
  @Input() size: 'small' | 'medium' | 'large' = 'large';
  @Input() state: 'default' | 'hover' | 'pressed' | 'disabled' | 'error' | 'success' | 'loading' = 'default';
  @Input() type: 'primary' | 'secondary' | 'tertiary' | 'toned' | 'link' = 'primary';
  @Input() showLeftIcon = false;
  @Input() showRightIcon = false;
  @Input() leftIconName = 'icon-add';
  @Input() rightIconName = 'icon-add';

  @ContentChild('[leftIconSwap]', { read: ElementRef }) leftIcon?: ElementRef;
  @ContentChild('[rightIconSwap]', { read: ElementRef }) rightIcon?: ElementRef;

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
