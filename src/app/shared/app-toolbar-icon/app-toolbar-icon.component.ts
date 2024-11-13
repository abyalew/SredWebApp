import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-toolbar-icon',
  standalone: true,
  imports: [MatIconModule, MatBadgeModule],
  templateUrl: './app-toolbar-icon.component.html',
  styleUrl: './app-toolbar-icon.component.css'
})
export class AppToolbarIconComponent {
  @Input() icon = '';
  @Input() badge = 0;
}
