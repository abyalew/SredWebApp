import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SimpleObject} from './dashboard.service';
import {Project} from '../models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private readonly httpClient : HttpClient){}
  baseUrl: string = "https://localhost:7059/Projects/";
  getAllProjects() : Observable<Project[]> {
    return this.httpClient.get<Project[]>("https://localhost:7059/Projects/GetProjects");
  }
  saveProject(project: Project) : Observable<Project> {
    const url = this.baseUrl + (project.id ? 'update' : 'AddProject');
    return this.httpClient.post<Project>(url, project);
  }
}
