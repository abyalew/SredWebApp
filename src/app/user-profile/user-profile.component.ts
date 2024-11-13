import { Component, ElementRef, ViewChild, AfterViewInit  } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements AfterViewInit {
  @ViewChild('userProfile', { static: false }) userProfile!: ElementRef;
  userAvatarUrl: string = 'avatar.png'; 
  userName: string = 'John Doe'; 
  userType: string = 'Admin';
  menuWidth: string = 'auto';

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.menuWidth = `${this.userProfile.nativeElement.offsetWidth}px`;
    });
  }
  openMenu(event: any){

  }
}
