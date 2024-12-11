import {Component} from '@angular/core';
import {ICellRendererAngularComp} from '@ag-grid-community/angular';
import { ICellRendererParams } from '@ag-grid-community/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NgIf} from '@angular/common';

@Component({
  selector: 'projects-edit-action-renderer',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, NgIf],
  template: `
    <button mat-icon-button aria-label="Edit" (click)="clicked()" *ngIf="!params.data.isDeleted">
      <mat-icon>edit_outlined</mat-icon>
    </button>
    <button mat-icon-button aria-label="Edit" (click)="delete()" *ngIf="!params.data.isDeleted">
      <mat-icon>delete_outlined</mat-icon>
    </button>
    <button mat-icon-button aria-label="restore archived" (click)="restore()" *ngIf="params.data.isDeleted">
      <mat-icon>refresh</mat-icon>
    </button>
  `,
  styleUrl: './edit-action-renderer.component.scss'
})
export class EditActionRendererComponent implements ICellRendererAngularComp {
  params: any;
  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
    this.refresh(params);
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true;
  }

  clicked(): any {
    console.log(this.params.data);
    if (this.params?.onEdit) {
      this.params.onEdit(this.params.data);
    }
  }

  delete(): any {
    if (this.params?.onDelete) {
      this.params.onDelete(this.params.data);
    }
  }

  restore(): any {
    if (this.params?.onRestore) {
      this.params.onRestore(this.params.data);
    }
  }

}
