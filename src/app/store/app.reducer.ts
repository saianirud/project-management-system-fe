import * as fromAuth from '../auth/store/auth.reducer';
import * as fromProject from '../homepage/projects/store/project.reducer';
import * as fromIssue from '../homepage/projects/store/issue.reducer';
import * as fromWorklog from '../homepage/projects/store/worklogs.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    auth: fromAuth.State,
    project: fromProject.State,
    issue: fromIssue.State,
    worklog: fromWorklog.State
}

export const appReducer: ActionReducerMap<AppState> = {
    auth: fromAuth.AuthReducer,
    project: fromProject.ProjectReducer,
    issue: fromIssue.IssueReducer,
    worklog: fromWorklog.WorklogReducer
}