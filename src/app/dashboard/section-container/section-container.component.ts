import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'dashboard-section-container',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './section-container.component.html',
  styleUrl: './section-container.component.css'
})
export class SectionContainerComponent {
  @Input() title : string = "";
}
