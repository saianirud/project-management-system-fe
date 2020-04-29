import * as WorklogActions from './worklogs.actions';
import { WorkLog } from 'src/app/models/worklog.model';

export interface State {
    worklogs: WorkLog[]
}

const initialState: State = {
    worklogs: []
}

export function WorklogReducer(state: State = initialState, action: WorklogActions.WorklogActions) {

    switch (action.type) {
        case WorklogActions.INITIALIZE_WORKLOGS:
            return {
                ...state,
                worklogs: [...action.payload]
            }
        case WorklogActions.CREATE_WORKLOG:
            return {
                ...state,
                worklogs: [...state.worklogs, action.payload]
            }
        case WorklogActions.UPDATE_WORKLOG:
            const updatedWorklog = { ...state.worklogs[action.payload.index], ...action.payload.worklog };
            const updatedWorklogs = [...state.worklogs];
            updatedWorklogs[action.payload.index] = updatedWorklog;
            return {
                ...state,
                worklogs: updatedWorklogs
            }
        case WorklogActions.DELETE_WORKLOG:
            const modifiedWorklogs = [...state.worklogs];
            modifiedWorklogs.splice(action.payload, 1);
            return {
                ...state,
                worklogs: modifiedWorklogs
            }
        case WorklogActions.CLEAR_WORKLOGS:
            return {
                ...state,
                worklogs: []
            }
        default:
            return {
                ...state
            }
    }
}