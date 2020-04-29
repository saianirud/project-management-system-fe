import { User } from './user.model';

export class WorkLog {

    public id: number;
    public timeSpent: number;
    public workDescription: String;
    public loggedUser: User;
    public logDateTime: Date;

    constructor(id, timeSpent, workDescription, loggedUser, logDateTime) {

        this.id = id;
        this.timeSpent = timeSpent;
        this.workDescription = workDescription;
        this.loggedUser = loggedUser;
        this.logDateTime = logDateTime;
    }
}