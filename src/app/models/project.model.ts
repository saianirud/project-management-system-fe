import { User } from './user.model';

export class Project {

    public projectKey: String;
    public projectName: String;
    public projectType: String;
    public projectDescription: String;
    public projectLead: User;

    constructor(projectKey, projectName, projectType, projectDescription, projectLead) {

        this.projectKey = projectKey;
        this.projectName = projectName;
        this.projectType = projectType;
        this.projectDescription = projectDescription;
        this.projectLead = projectLead;
    }
}