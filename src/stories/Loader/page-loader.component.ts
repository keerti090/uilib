import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'AppCore-page-loader',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./page-loader.scss'],
  template: `
    <div class="AppCore-page-loader" [class.AppCore-page-loader--visible]="visible" role="status" aria-label="Loading">
      <div class="AppCore-page-loader__backdrop"></div>
      <div class="AppCore-page-loader__spinner">
        <div class="AppCore-page-loader__track"></div>
        <div class="AppCore-page-loader__arc"></div>
      </div>
    </div>
  `,
})
export class PageLoaderComponent {
  @Input() visible = true;
}
