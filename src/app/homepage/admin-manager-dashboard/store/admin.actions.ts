import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const INITIALIZE_USERS = 'INITIALIZE_USERS';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

export class InitializeUsers implements Action {
    readonly type = INITIALIZE_USERS;
    constructor(public payload: User[]) { }
}

export class UpdateUser implements Action {
    readonly type = UPDATE_USER;
    constructor(public payload: { user: User, index: number }) { }
}

export class DeleteUser implements Action {
    readonly type = DELETE_USER;
    constructor(public payload: number) { }
}

export type AdminActions = InitializeUsers | UpdateUser | DeleteUser;