import { Component, Input, Output, ContentChild, AfterContentInit, ElementRef, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- required
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'appcore-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, IconComponent], // <-- add MatIconModule
  styleUrls: ['./button.scss'],
  template: `
    <button
      mat-button
      class="appcore-button"
      [ngClass]="[
  'appcore-button--' + type,
  'appcore-button--' + state,
  'appcore-button--' + size
]"
      [disabled]="state === 'disabled'"
      (mouseenter)="onHover()"
      (mouseleave)="onLeave()"
      (mousedown)="onPressed()"
      (mouseup)="onReleased()"
      (click)="onClick()"
    >
      <span class="appcore-button__inner">
        <!-- Left Icon -->
        <ng-container *ngIf="showLeftIcon">
          <ng-content select="[leftIconSwap]"></ng-content>
          <app-icon
            *ngIf="!hasLeftIcon"
            [icon]="leftIconName"
            [iconSet]="leftIconSet"
            [src]="leftIconSrc"
            size="sm"
          ></app-icon>
        </ng-container>

        <!-- Label -->
        <span *ngIf="buttonText" class="appcore-button__label">
          <ng-container [ngSwitch]="state">
            <span *ngSwitchCase="'loading'">⏳</span>
            <span *ngSwitchDefault>{{ label }}</span>
          </ng-container>
        </span>

        <!-- Right Icon -->
        <ng-container *ngIf="showRightIcon">
          <ng-content select="[rightIconSwap]"></ng-content>
          <app-icon
            *ngIf="!hasRightIcon"
            [icon]="rightIconName"
            [iconSet]="rightIconSet"
            [src]="rightIconSrc"
            size="sm"
          ></app-icon>
        </ng-container>
      </span>
    </button>
  `
})
export class ButtonComponent implements AfterContentInit {
  @Input() buttonText = true;
  @Input() label = 'Button';
  @Input() size: 'small' | 'medium' | 'large' = 'large';
  @Input() state: 'default' | 'hover' | 'pressed' | 'disabled' | 'error' | 'success' | 'loading' = 'default';
  @Input() type: 'primary' | 'secondary' | 'tertiary' | 'toned' | 'link' = 'primary';
  @Input() nativeType: 'button' | 'submit' | 'reset' = 'button';
  @Output() buttonClick = new EventEmitter<void>();
  @Input() showLeftIcon = false;
  @Input() showRightIcon = false;
  @Input() leftIconName = 'add';
  @Input() rightIconName = 'add';
  /** Icon set for left icon: 'material' (default) or 'asset' (assets/icons/<leftIconName>.svg). */
  @Input() leftIconSet: 'material' | 'asset' = 'material';
  /** Icon set for right icon: 'material' (default) or 'asset'. */
  @Input() rightIconSet: 'material' | 'asset' = 'material';
  /** Custom left icon URL. When set, overrides leftIconName/leftIconSet (use for external or custom SVGs). */
  @Input() leftIconSrc?: string;
  /** Custom right icon URL. When set, overrides rightIconName/rightIconSet. */
  @Input() rightIconSrc?: string;

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
    if (this.state !== 'disabled') this.buttonClick.emit();;
  }
}
