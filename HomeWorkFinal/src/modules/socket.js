const CONNECTION_URL = "wss://fep-app.herokuapp.com/";

export class ChatSocket {
    #isReconnect = false;

    constructor(config) {
        this.config = config;
        this.isOnline = false;
    }

    initConnection() {
        this.socket = new WebSocket(CONNECTION_URL);

        this.socket.onopen = this.onSocketOpen.bind(this);
        this.socket.onclose = this.onSocketClose.bind(this);
        this.socket.onmessage = this.onSocketMessage.bind(this);
    }

    onSocketOpen() {
        this.isOnline = true;
        this.config.changeBtn(!this.isOnline);
    }

    onSocketClose() {
        this.isOnline = false;
        this.config.changeBtn(!this.isOnline);
        if (this.#isReconnect) {
            this.initConnection();
        }
    }

    onSocketMessage(e) {
        this.config.addMessageToChat && this.config.addMessageToChat(JSON.parse(e.data).payload);
    }

    send(message) {
        this.socket.send(message);
    }

    close() {
        this.socket.close();
    }

    setReconnect(isReconnect) {
        this.#isReconnect = isReconnect;
        if (!this.isOnline && this.#isReconnect) {
            this.initConnection();
        }
    }
}
