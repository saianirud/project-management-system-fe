import { Action } from '@ngrx/store';
import { Project } from 'src/app/models/project.model';

export const INITIALIZE_PROJECTS = 'INITIALIZE_PROJECTS';
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';

export class InitializeProjects implements Action {
    readonly type = INITIALIZE_PROJECTS;
    constructor(public payload: Project[]) { }
}

export class CreateProject implements Action {
    readonly type = CREATE_PROJECT;
    constructor(public payload: Project) { }
}

export class UpdateProject implements Action {
    readonly type = UPDATE_PROJECT;
    constructor(public payload: { project: Project, index: number }) { }
}

export type ProjectActions = InitializeProjects | CreateProject | UpdateProject;