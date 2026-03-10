import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { ButtonComponent } from '../Buttons/button.component';

type ActionBarSize = 'xs' | 's' | 'm' | 'l' | 'xl';
type ActionBarType = 'icon' | 'text';

export interface ActionBarButtonConfig {
  icon: string;
  iconSet?: 'material' | 'asset';
}

export interface ActionBarTextButtonConfig {
  label: string;
  leftIconName?: string;
}

const DEFAULT_ICON_SET1: ActionBarButtonConfig[] = [
  { icon: 'add' },
  { icon: 'filter_list' },
  { icon: 'attach_file' },
  { icon: 'delete' },
  { icon: 'upload' },
];

const DEFAULT_ICON_SET2: ActionBarButtonConfig[] = [
  { icon: 'add' },
  { icon: 'filter_list' },
  { icon: 'attach_file' },
  { icon: 'delete' },
  { icon: 'upload' },
];

const DEFAULT_ICON_SET3: ActionBarButtonConfig[] = [
  { icon: 'add' },
  { icon: 'filter_list' },
  { icon: 'attach_file' },
  { icon: 'delete' },
  { icon: 'upload' },
];

const DEFAULT_TEXT_SET1: ActionBarTextButtonConfig[] = [
  { label: 'Button', leftIconName: 'add' },
  { label: 'Button', leftIconName: 'add' },
  { label: 'Button', leftIconName: 'add' },
  { label: 'Button', leftIconName: 'add' },
];

const DEFAULT_TEXT_SET2: ActionBarTextButtonConfig[] = [
  { label: 'Button', leftIconName: 'add' },
  { label: 'Button', leftIconName: 'add' },
  { label: 'Button', leftIconName: 'add' },
];

const DEFAULT_TEXT_SET3: ActionBarTextButtonConfig[] = [
  { label: 'Button', leftIconName: 'add' },
  { label: 'Button', leftIconName: 'add' },
  { label: 'Button', leftIconName: 'add' },
];

@Component({
  selector: 'AppCore-actionbar',
  standalone: true,
  imports: [CommonModule, IconComponent, ButtonComponent],
  styleUrls: ['./actionbar.scss'],
  template: `
    <div class="AppCore-actionbar" [ngClass]="'AppCore-actionbar--' + size">
      @if (type === 'icon') {
        <div class="set">
          @for (button of set1; track button.icon) {
            <button type="button" class="AppCore-actionbar__icon-button">
              <app-icon
                [icon]="button.icon"
                [iconSet]="button.iconSet ?? 'material'"
                size="sm"
              ></app-icon>
            </button>
          }
        </div>

        @if (showSet2) {
          <div class="set">
            <div class="AppCore-actionbar__divider" aria-hidden="true"></div>
            @for (button of set2; track button.icon) {
              <button type="button" class="AppCore-actionbar__icon-button">
                <app-icon
                  [icon]="button.icon"
                  [iconSet]="button.iconSet ?? 'material'"
                  size="sm"
                ></app-icon>
              </button>
            }
          </div>
        }

        @if (showSet3) {
          <div class="set">
            <div class="AppCore-actionbar__divider" aria-hidden="true"></div>
            @for (button of set3; track button.icon) {
              <button type="button" class="AppCore-actionbar__icon-button">
                <app-icon
                  [icon]="button.icon"
                  [iconSet]="button.iconSet ?? 'material'"
                  size="sm"
                ></app-icon>
              </button>
            }
            <div class="AppCore-actionbar__divider" aria-hidden="true"></div>
          </div>
        }

        @if (showKebabMenu) {
          <div class="icon-button-wrapper">
            <button
              type="button"
              class="AppCore-actionbar__icon-button AppCore-actionbar__icon-button--kebab"
            >
              <app-icon icon="more_vert" iconSet="material" size="sm"></app-icon>
            </button>
          </div>
        }
      } @else {
        <!-- Text Action Bar -->
        <div class="set">
          @for (btn of textSet1; track btn.label + $index) {
            <AppCore-button
              class="AppCore-actionbar__text-button"
              [size]="buttonSize"
              type="tertiary"
              [buttonText]="true"
              [label]="btn.label"
              [showLeftIcon]="!!btn.leftIconName"
              [leftIconName]="btn.leftIconName ?? ''"
            ></AppCore-button>
          }
        </div>

        @if (showSet2) {
          <div class="set">
            <div class="AppCore-actionbar__divider" aria-hidden="true"></div>
            @for (btn of textSet2; track btn.label + $index) {
              <AppCore-button
                class="AppCore-actionbar__text-button"
                [size]="buttonSize"
                type="tertiary"
                [buttonText]="true"
                [label]="btn.label"
                [showLeftIcon]="!!btn.leftIconName"
                [leftIconName]="btn.leftIconName ?? ''"
              ></AppCore-button>
            }
          </div>
        }

        @if (showSet3) {
          <div class="set">
            <div class="AppCore-actionbar__divider" aria-hidden="true"></div>
            @for (btn of textSet3; track btn.label + $index) {
              <AppCore-button
                class="AppCore-actionbar__text-button"
                [size]="buttonSize"
                type="tertiary"
                [buttonText]="true"
                [label]="btn.label"
                [showLeftIcon]="!!btn.leftIconName"
                [leftIconName]="btn.leftIconName ?? ''"
              ></AppCore-button>
            }
            <div class="AppCore-actionbar__divider" aria-hidden="true"></div>
          </div>
        }

        @if (showKebabMenu) {
          <div class="icon-button-wrapper">
            <button
              type="button"
              class="AppCore-actionbar__icon-button AppCore-actionbar__icon-button--kebab"
            >
              <app-icon icon="more_vert" iconSet="material" size="sm"></app-icon>
            </button>
          </div>
        }
      }
    </div>
  `,
})
export class ActionbarComponent {
  /** Visual style for the bar – "icon" or "text". */
  @Input() type: ActionBarType = 'icon';

  /** Size preset that controls spacing; mirrors the design spec (XS by default). */
  @Input() size: ActionBarSize = 'xs';

  /** Whether to show the middle set. */
  @Input() showSet2 = true;

  /** Whether to show the right-hand set. */
  @Input() showSet3 = true;

  /** Whether to show the trailing kebab menu. */
  @Input() showKebabMenu = true;

  /** Icon buttons for the first group (icon mode). */
  @Input() set1: ActionBarButtonConfig[] = DEFAULT_ICON_SET1;

  /** Icon buttons for the second group (icon mode). */
  @Input() set2: ActionBarButtonConfig[] = DEFAULT_ICON_SET2;

  /** Icon buttons for the third group (icon mode). */
  @Input() set3: ActionBarButtonConfig[] = DEFAULT_ICON_SET3;

  /** Text buttons for the first group (text mode). */
  @Input() textSet1: ActionBarTextButtonConfig[] = DEFAULT_TEXT_SET1;

  /** Text buttons for the second group (text mode). */
  @Input() textSet2: ActionBarTextButtonConfig[] = DEFAULT_TEXT_SET2;

  /** Text buttons for the third group (text mode). */
  @Input() textSet3: ActionBarTextButtonConfig[] = DEFAULT_TEXT_SET3;

  /** Map ActionBar size to ButtonComponent size (text variant starts from S). */
  get buttonSize(): 'small' | 'medium' | 'large' {
    switch (this.size) {
      case 's':
        return 'small';
      case 'm':
        return 'medium';
      case 'l':
      case 'xl':
        return 'large';
      default:
        return 'small';
    }
  }
}
