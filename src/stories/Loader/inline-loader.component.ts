import { Component } from '@angular/core';

@Component({
  selector: 'AppCore-inline-loader',
  standalone: true,
  styleUrls: ['./inline-loader.scss'],
  template: `
    <span class="AppCore-inline-loader" role="status" aria-label="Loading">
      <span class="AppCore-inline-loader__track"></span>
      <span class="AppCore-inline-loader__arc"></span>
    </span>
  `,
})
export class InlineLoaderComponent {}
