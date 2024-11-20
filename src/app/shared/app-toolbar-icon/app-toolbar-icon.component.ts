import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-toolbar-icon',
  standalone: true,
  imports: [MatIconModule, MatBadgeModule],
  templateUrl: './app-toolbar-icon.component.html',
  styleUrl: './app-toolbar-icon.component.scss'
})
export class AppToolbarIconComponent {
  @Input() icon = '';
  @Input() svgIcon = '';
  @Input() badge = 0;
  @Output() clicked = new EventEmitter<string>();

  onClick(){
    this.clicked.emit();
  }
}
