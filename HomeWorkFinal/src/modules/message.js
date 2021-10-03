export class Message {
    icon;
    username;
    message;
    sendtime;
    constructor(username, message) {
        this.username = username;
        this.message = message;
    }

    toStringForSend() {
        return JSON.stringify({
            type: "message",
            payload: {
                username: this.username,
                message: this.message,
            },
        });
    }

    toString() {
        return JSON.stringify(this);
    }
}
