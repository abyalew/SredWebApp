import { Component } from '@angular/core';
import { SideBarComponent } from "./core/side-bar/side-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SideBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'SredWebApp';
}
