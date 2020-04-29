import { User } from 'src/app/models/user.model';
import * as AuthActions from './auth.actions';

export interface State {
    user: User
}

const initialState: State = {
    user: null
};

export function AuthReducer(state: State = initialState, action: AuthActions.AuthActions) {

    switch (action.type) {
        case AuthActions.AUTHENTICATION_SUCCESS:
            const user = new User(action.payload.username, action.payload.name, action.payload.role, action.payload.token);
            return {
                ...state,
                user: user
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
}