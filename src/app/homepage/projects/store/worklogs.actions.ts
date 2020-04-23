import { Action } from '@ngrx/store';
import { WorkLog } from 'src/app/models/worklog.model';

export const INITIALIZE_WORKLOGS = 'INITIALIZE_WORKLOGS';
export const CREATE_WORKLOG = 'CREATE_WORKLOG';
export const UPDATE_WORKLOG = 'UPDATE_WORKLOG';
export const DELETE_WORKLOG = 'DELETE_WORKLOG';
export const CLEAR_WORKLOGS = 'CLEAR_WORKLOGS';

export class InitializeWorklogs implements Action {
    readonly type = INITIALIZE_WORKLOGS;
    constructor(public payload: WorkLog[]) { }
}

export class CreateWorklog implements Action {
    readonly type = CREATE_WORKLOG;
    constructor(public payload: WorkLog) { }
}

export class UpdateWorklog implements Action {
    readonly type = UPDATE_WORKLOG;
    constructor(public payload: { worklog: WorkLog, index: number }) { }
}

export class DeleteWorklog implements Action {
    readonly type = DELETE_WORKLOG;
    constructor(public payload: number) { }
}

export class ClearWorklogs implements Action {
    readonly type = CLEAR_WORKLOGS;
}

export type WorklogActions = InitializeWorklogs | CreateWorklog | UpdateWorklog | DeleteWorklog | ClearWorklogs;