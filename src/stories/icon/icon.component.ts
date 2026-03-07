import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (iconSet === 'material') {
      <span
        class="material-symbols-rounded icon"
        [ngClass]="[size, color ?? 'default', background ?? 'default']"
        [attr.aria-label]="alt || materialIconName"
      >{{ materialIconName }}</span>
    } @else if (icon) {
      <img
        class="icon"
        [ngClass]="[size, color ?? 'default', background ?? 'default']"
        [src]="'assets/icons/' + icon + '.svg'"
        [alt]="alt || icon"
      />
    }
  `,
  styleUrls: ['./icon.scss'],
})
export class IconComponent {
  /** Icon name: for Material use names like "add", "search", "arrow_forward"; for asset use file name without .svg (e.g. "icon-search"). */
  @Input() icon!: string;
  /**
   * 'material' = Material Symbols Rounded (default); 'asset' = SVG from assets/icons/
   * When using iconSet="material", the host app must load the font, e.g. in index.html:
   * <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
   */
  @Input() iconSet: 'material' | 'asset' = 'material';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() alt?: string;
  @Input() color?: 'primary' | 'neutral' | 'default' = 'default';
  @Input() background?: 'primary' | 'neutral' | 'default' = 'default';

  /** Material Symbol name: strip "icon-" prefix so "icon-add" and "add" both work */
  get materialIconName(): string {
    return this.icon?.replace(/^icon-/, '') ?? '';
  }
}
