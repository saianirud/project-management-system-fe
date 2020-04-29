import { Project } from 'src/app/models/project.model';
import * as ProjectActions from './project.actions';

export interface State {
    projects: Project[]
}

const initialState: State = {
    projects: []
}

export function ProjectReducer(state = initialState, action: ProjectActions.ProjectActions) {

    switch (action.type) {
        case ProjectActions.INITIALIZE_PROJECTS:
            return {
                ...state,
                projects: [...action.payload]
            }
        case ProjectActions.CREATE_PROJECT:
            return {
                ...state,
                projects: [action.payload, ...state.projects]
            }
        case ProjectActions.UPDATE_PROJECT:
            const updatedProject = { ...state.projects[action.payload.index], ...action.payload.project };
            const updatedProjects = [...state.projects];
            updatedProjects[action.payload.index] = updatedProject;
            return {
                ...state,
                projects: updatedProjects
            }
        default:
            return {
                ...state
            }
    }
}