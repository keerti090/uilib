import { Component } from '@angular/core';
import { ButtonComponent } from '../stories/Buttons/button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'storybook-apptium';
}
