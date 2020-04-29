import { Issue } from 'src/app/models/issue.model';
import * as IssueActions from './issue.actions';

export interface State {
    issues: Issue[]
}

const initialState: State = {
    issues: []
}

export function IssueReducer(state: State = initialState, action: IssueActions.IssueActions) {

    switch (action.type) {
        case IssueActions.INITIALIZE_ISSUES:
            return {
                ...state,
                issues: [...action.payload]
            }
        case IssueActions.CREATE_ISSUE:
            return {
                ...state,
                issues: [...state.issues, action.payload]
            }
        case IssueActions.UPDATE_ISSUE:
            const updatedIssue = { ...state.issues[action.payload.index], ...action.payload.issue };
            const updatedIssues = [...state.issues];
            updatedIssues[action.payload.index] = updatedIssue;
            return {
                ...state,
                issues: updatedIssues
            }
        case IssueActions.DELETE_ISSUE:
            const modifiedIssues = [...state.issues];
            modifiedIssues.splice(action.payload, 1);
            return {
                ...state,
                issues: modifiedIssues
            }
        case IssueActions.CLEAR_ISSUES:
            return {
                ...state,
                issues: []
            }
        default:
            return {
                ...state
            }
    }
}