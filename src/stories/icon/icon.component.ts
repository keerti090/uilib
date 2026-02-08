import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <img
      *ngIf="icon"
      class="icon"
      [class]="size + ' ' + color + background" 
      [src]="'assets/icons/' + icon + '.svg'"
      [alt]="alt || icon"
      
    />
  `,
  styleUrls: ['./icon.scss'],
})
export class IconComponent {
  @Input() icon!: string; // e.g., "icon-search"
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() alt?: string;
  @Input() color?:'primary' |'neutral'|'default'= 'default';
  @Input() background? :'primary'|'neutral'|'default' = 'default';
}
