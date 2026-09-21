import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'appcore-content-loader-dots',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./content-loader-dots.scss'],
  template: `
    <div class="appcore-dots-loader" role="status" aria-label="Loading">
      <span class="appcore-dots-loader__dot appcore-dots-loader__dot--1"></span>
      <span class="appcore-dots-loader__dot appcore-dots-loader__dot--2"></span>
      <span class="appcore-dots-loader__dot appcore-dots-loader__dot--3"></span>
      <span class="appcore-dots-loader__dot appcore-dots-loader__dot--4"></span>
    </div>
  `,
})
export class ContentLoaderDotsComponent {}
