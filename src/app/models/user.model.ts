export class User {
    public username: String;
    public name: String;
    public token: String;

    constructor(username, name, token?) {
        this.username = username;
        this.name = name;
        this.token = token;
    }
}