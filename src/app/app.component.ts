import { Component } from '@angular/core';
import { SideBarComponent } from "./core/side-bar/side-bar.component";
import {ProjectService} from './services/project.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SideBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ProjectService]
})
export class AppComponent {
  title = 'SredWebApp';
}
