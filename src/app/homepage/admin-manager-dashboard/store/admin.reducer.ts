import { User } from 'src/app/models/user.model';
import * as AdminActions from './admin.actions';

export interface State {
    users: User[]
}

const initialState: State = {
    users: []
}

export function AdminReducer(state = initialState, action: AdminActions.AdminActions) {

    switch (action.type) {
        case AdminActions.INITIALIZE_USERS:
            return {
                ...state,
                users: [...action.payload]
            }
        case AdminActions.UPDATE_USER:
            const updatedUser = { ...state.users[action.payload.index], ...action.payload.user };
            const updatedUsers = [...state.users];
            updatedUsers[action.payload.index] = updatedUser;
            return {
                ...state,
                users: updatedUsers
            }
        case AdminActions.DELETE_USER:
            const modifiedUsers = [...state.users];
            modifiedUsers.splice(action.payload, 1);
            return {
                ...state,
                users: modifiedUsers
            }
        default:
            return {
                ...state
            }
    }
}