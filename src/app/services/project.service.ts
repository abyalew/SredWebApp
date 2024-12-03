import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SimpleObject} from './dashboard.service';
import {Project} from '../models/project';
import {GridFilter} from '../shared/grid-filter/grid-filter.component';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private readonly httpClient : HttpClient){}
  baseUrl: string = "https://localhost:7059/Projects/";
  getAllProjects(filter : GridFilter | undefined) : Observable<Project[]> {
    let params: {[param: string]: string} = { };
    console.log(filter);
    if(filter) {
      for(let key in filter.filter) {
        if(filter.filter[key].value)
          params[key] = filter.filter[key].value ?? '';
      }
    }
    console.log(params);
    return this.httpClient.get<Project[]>("https://localhost:7059/Projects/GetProjects", { params: params}, );
  }
  saveProject(project: Project) : Observable<Project> {
    const url = this.baseUrl + (project.id ? 'update' : 'AddProject');
    return this.httpClient.post<Project>(url, project);
  }

  saveProjects(projects: Project[]) : Observable<Project[]> {
    const url = this.baseUrl + 'AddProjects';
    return this.httpClient.post<Project[]>(url, projects);
  }
}
