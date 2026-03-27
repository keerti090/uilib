import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export type StepState = 'not-done' | 'current' | 'done' | 'partially-done' | 'error';

export interface StepItem {
  label: string;
  state: StepState;
  icon?: string; // Material icon name, used when type='icon'
}

@Component({
  selector: 'app-progress-stepper',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  styleUrls: ['./progress-stepper.scss'],
  template: `
    <div
      class="stepper"
      [class.stepper--horizontal]="orientation === 'horizontal'"
      [class.stepper--vertical]="orientation === 'vertical'"
    >
      <div
        *ngFor="let step of steps; let i = index; let last = last"
        class="stepper__step"
      >
        <!-- Vertical layout: left track column (indicator + connector) + right label -->
        <ng-container *ngIf="orientation === 'vertical'">
          <div class="stepper__track-col">
            <div class="stepper__indicator" [ngClass]="'stepper__indicator--' + step.state">
              <ng-container *ngTemplateOutlet="indicatorContent; context: { $implicit: step, idx: i }"></ng-container>
            </div>
            <div *ngIf="!last" class="stepper__connector stepper__connector--vertical"></div>
          </div>
          <span class="stepper__label" [ngClass]="'stepper__label--' + step.state">{{ step.label }}</span>
        </ng-container>

        <!-- Horizontal layout: step-content (indicator + label) + connector -->
        <ng-container *ngIf="orientation === 'horizontal'">
          <div class="stepper__step-content">
            <div class="stepper__indicator" [ngClass]="'stepper__indicator--' + step.state">
              <ng-container *ngTemplateOutlet="indicatorContent; context: { $implicit: step, idx: i }"></ng-container>
            </div>
            <span class="stepper__label" [ngClass]="'stepper__label--' + step.state">{{ step.label }}</span>
          </div>
          <div *ngIf="!last" class="stepper__connector stepper__connector--horizontal"></div>
        </ng-container>
      </div>
    </div>

    <ng-template #indicatorContent let-step let-idx="idx">
      <ng-container [ngSwitch]="step.state">
        <mat-icon *ngSwitchCase="'done'" class="stepper__icon">check</mat-icon>
        <mat-icon *ngSwitchCase="'error'" class="stepper__icon">close</mat-icon>
        <ng-container *ngSwitchDefault>
          <mat-icon *ngIf="type === 'icon' && step.icon; else numTpl" class="stepper__icon">{{ step.icon }}</mat-icon>
          <ng-template #numTpl>
            <span class="stepper__number">{{ idx + 1 }}</span>
          </ng-template>
        </ng-container>
      </ng-container>
    </ng-template>
  `
})
export class ProgressStepperComponent {
  @Input() steps: StepItem[] = [];
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() type: 'default' | 'icon' = 'default';
}
