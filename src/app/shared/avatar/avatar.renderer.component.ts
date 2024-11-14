import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { ICellRendererParams } from '@ag-grid-community/core';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [],
  template: `
      <span :class="avatarContainer">
          @if (value) {
              <img
                  [alt]="value"
                  [src]="value"
                  [height]="30"
                  :class="avatar"
              />
              <span>{{ name }}</span>
          }
      </span>
  `,
  styleUrl: './avatar.renderer.component.css'
})
export class AvatarRendererComponent implements ICellRendererAngularComp{
  public value!: string;
  public name!: string;
  agInit(params: ICellRendererParams<any, any, any>): void {
    this.refresh(params);
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    this.value = params.node.data.image;
    this.name = params.node.data.name;
     return true;
  }

}