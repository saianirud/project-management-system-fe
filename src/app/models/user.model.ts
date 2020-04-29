export class User {
    public username: String;
    public name: String;
    public token: String;
    public role: String;

    constructor(username, name, role, token) {
        this.username = username;
        this.name = name;
        this.token = token;
        this.role = role;
    }
}