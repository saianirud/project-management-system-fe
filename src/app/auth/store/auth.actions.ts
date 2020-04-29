import { Action } from '@ngrx/store';

export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const LOGOUT = 'LOGOUT';

export class AuthenticationSuccess implements Action {

    readonly type = AUTHENTICATION_SUCCESS;

    constructor(public payload: { username: String, name: String, role: String, token: String }) { }
}

export class Logout implements Action {

    readonly type = LOGOUT;
}

export type AuthActions = AuthenticationSuccess | Logout;