import { User } from './user.model';

export class Issue {
    public id: String;
    public issueSummary: String;
    public issueDescription: String;
    public issueType: any;
    public issueCategory: any;
    public issuePriority: any;
    public issueReporter: User;
    public issueAssignee: User;
    public originalEstimate: number;
    public loggedTime: number;

    constructor(id, issueSummary, issueDescription, issueType, issueCategory, issuePriority, issueReporter, issueAssignee, originalEstimate, loggedTime) {
        this.id = id;
        this.issueSummary = issueSummary;
        this.issueDescription = issueDescription;
        this.issueType = issueType;
        this.issueCategory = issueCategory;
        this.issuePriority = issuePriority;
        this.issueReporter = issueReporter;
        this.issueAssignee = issueAssignee;
        this.originalEstimate = originalEstimate;
        this.loggedTime = loggedTime;
    }
}