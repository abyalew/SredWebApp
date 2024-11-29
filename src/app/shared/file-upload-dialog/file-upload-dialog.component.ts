import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {NgxCsvParserModule} from 'ngx-csv-parser';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import {ColDef} from 'ag-grid-community';
import {Project} from '../../models/project';
import {AgGridAngular} from 'ag-grid-angular';
import {AppState} from '../../state/app.state';
import {Store} from '@ngrx/store';
import {bulkSave} from '../../state/projects/project.actions';
import {selectUploadStatus} from '../../state/projects/project.selector';

@Component({
  selector: 'app-file-upload-dialog',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, NgxCsvParserModule, AgGridAngular],
  templateUrl: './file-upload-dialog.component.html',
  styleUrl: './file-upload-dialog.component.scss'
})
export class FileUploadDialogComponent {
  @Input() title: string = 'Upload';
  fileName: string = '';
  header: boolean = false;
  csvRecords: any;


  colDefs: ColDef[] = [
    { field: 'name'},
    { field: 'description' },
    { field: 'integrationOf' },
    { field: 'timeRecords' },
    { field: 'totalHours' },
    { field: 'isIncluded' }
  ];

  defaultColDef: ColDef = {
    flex: 1,
  };

  rowData: Project[] = [];

  constructor(private ngxCsvParser: NgxCsvParser, private store: Store<AppState>) {

  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      this.header = (this.header as unknown as string) === 'true' || this.header === true;

      this.ngxCsvParser.parse(file, { header: this.header, delimiter: ',', encoding: 'utf8' })
        .pipe().subscribe({
        next: (result): void => {
          console.log('Result', result);
          const data = (result as any[]);
          const headers = data[0];

          for(let i = 1; i < data.length; i++) {
            let row: any = { };
            for(let j = 0; j < headers.length; j++) {
              row[headers[j]] = data[i][j].trim();
              if(row[headers[j]] === 'true' || row[headers[j]] === 'false') {
                row[headers[j]] = row[headers[j]] === 'true';
              }
            }
            this.rowData.push(row);
          }
          console.log(this.rowData);
          this.csvRecords =  result;
        },
        error: (error: NgxCSVParserError): void => {
          console.log('Error', error);
        }
      });
    }
  }

  save() {
    this.store.dispatch(bulkSave({ projects:this.rowData }));
  }
}
