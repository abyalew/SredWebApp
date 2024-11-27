import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectsComponent } from './components/projects/projects.component';

export const routes: Routes = [
    {
         path: '', 
         component: DashboardComponent 
    },
    {
        path: 'projects',
        component: ProjectsComponent
    }
];
