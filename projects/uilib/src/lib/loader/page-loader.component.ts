import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'appcore-page-loader',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./page-loader.scss'],
  template: `
    <div class="appcore-page-loader" [class.appcore-page-loader--visible]="visible" role="status" aria-label="Loading">
      <div class="appcore-page-loader__backdrop"></div>
      <div class="appcore-page-loader__spinner">
        <div class="appcore-page-loader__track"></div>
        <div class="appcore-page-loader__arc"></div>
      </div>
    </div>
  `,
})
export class PageLoaderComponent {
  @Input() visible = true;
}
