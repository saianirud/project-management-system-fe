import { Action } from '@ngrx/store';

export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const LOGOUT = 'LOGOUT';

export class AuthenticationSuccess implements Action {

    readonly type = AUTHENTICATION_SUCCESS;

    constructor(public payload: { username: string, name: string, token: string }) { }
}

export class Logout implements Action {

    readonly type = LOGOUT;
}

export type AuthActions = AuthenticationSuccess | Logout;