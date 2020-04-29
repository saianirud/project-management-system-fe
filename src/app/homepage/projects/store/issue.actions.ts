import { Action } from '@ngrx/store';
import { Issue } from 'src/app/models/issue.model';

export const INITIALIZE_ISSUES = "INITIALIZE_ISSUES";
export const CREATE_ISSUE = 'CREATE_ISSUE';
export const UPDATE_ISSUE = 'UPDATE_ISSUE';
export const DELETE_ISSUE = 'DELETE_ISSUE';
export const CLEAR_ISSUES = 'CLEAR_ISSUES'

export class InitializeIssues implements Action {
    readonly type = INITIALIZE_ISSUES;
    constructor(public payload: Issue[]) { }
}

export class CreateIssue implements Action {
    readonly type = CREATE_ISSUE;
    constructor(public payload: Issue) { }
}

export class UpdateIssue implements Action {
    readonly type = UPDATE_ISSUE;
    constructor(public payload: { issue: Issue, index: number }) { }
}

export class DeleteIssue implements Action {
    readonly type = DELETE_ISSUE;
    constructor(public payload: number) { }
}

export class ClearIssues implements Action {
    readonly type = CLEAR_ISSUES;
}

export type IssueActions = InitializeIssues | CreateIssue | UpdateIssue | DeleteIssue | ClearIssues;