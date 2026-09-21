import { Component } from '@angular/core';

@Component({
  selector: 'appcore-inline-loader',
  standalone: true,
  styleUrls: ['./inline-loader.scss'],
  template: `
    <span class="appcore-inline-loader" role="status" aria-label="Loading">
      <span class="appcore-inline-loader__track"></span>
      <span class="appcore-inline-loader__arc"></span>
    </span>
  `,
})
export class InlineLoaderComponent {}
