import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Project} from '../models/project';
import {GridFilter} from '../shared/grid-filter/grid-filter.component';
import {FiscalPeriod} from '../models/fiscalPeriod';

export interface PageParam {
  currentPage: number;
  pageSize: number;
}

export interface Page<T> {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  list: T[]
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private readonly httpClient : HttpClient){}
  baseUrl: string = "https://localhost:7059/Projects/";

  getPage(currentFiscalPeriod: FiscalPeriod | null, filter: GridFilter | undefined, param : PageParam | undefined) : Observable<Page<Project>> {
    let params: {[param: string]: string} = { };

    if(!currentFiscalPeriod || !param) {
      const page: Page<Project> = {
        currentPage: 1,
        pageSize: 10,
        totalPages: 0,
        list: []
      }
      return of(page);
    }
    params['fiscalPeriodId'] = currentFiscalPeriod.id!.toString();
    params['currentPage'] = param.currentPage.toString();
    params['pageSize'] = param.pageSize.toString();

    if(filter) {
      let filters = [];
      for(let key in filter.filter) {
        if(filter.filter[key].value) {
          filters.push({ column: key, predicate: filter.filter[key].value ? `@${ filter.filter[key].predicate }:${ filter.filter[key].value }` : '' });
        }
      }
      params['filters'] = JSON.stringify(filters);
    }

    return this.httpClient.get<Page<Project>>(`${this.baseUrl}GetPage`, { params: params});
  }

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

  deleteProject(projectId: number) : Observable<any> {
    const url = this.baseUrl + 'delete';
    let params: { [key: string]: string } = { };
    params['id'] = projectId.toString();
    return this.httpClient.get(url, { params: params });
  }
}
