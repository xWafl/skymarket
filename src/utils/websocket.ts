
var messes: any;

export class WebSocketManager {
  
  messageId: number;
  ws: WebSocket;
  // messages: Array<WebSocketMessage>;

  constructor() {
    this.messageId = 0;
    this.ws = new WebSocket("ws://84.200.7.41:8008/skyblock");
    messes = [];
    

    this.ws.onmessage = this.onMessage;
    this.ws.onclose = this.onClose;
    this.ws.onerror = this.onError;
    this.ws.onopen = this.onOpen;
  }

  send(request: WebSocketRequest): void {
    if (this.ws.readyState === WebSocket.OPEN) {
      let message = new WebSocketMessage(
        this.messageId,
        request.type,
        btoa(request.data),
        request.success,
        request.error
      );

      // save and send message
      messes.push(message);
      this.ws.send(JSON.stringify(message));
    } else {
      if (WebSocketRequest.errorSending >= 2) {
        request.error({ error: "No Websocket connection available" });
        return;
      }
      WebSocketRequest.errorSending++;
      setTimeout(() => {
        this.send(request);
      }, 4000);
    }
  }

  onOpen(): void {
    // nothing to do for now
  }

  onMessage(response: any): void {
    messes.forEach((msg: WebSocketMessage, index: number) => {
      if (msg.mId === msg.mId) {
        delete response.mId;

        //TODO check if response was successfull
        msg.success(response);
        messes.slice(index, 1);
      }
    });
  }

  onError(err: any): void {
    //TODO something
    console.log(err);
  }

  onClose(): void {
    // websocket connection never gets closed
  }
}

export class WebSocketRequest {
  public type: any;
  public data: any;
  public success: Function;
  public error: Function;
  public static errorSending: number = 0;

  constructor(t: any, d: any, s: Function, e: Function) {
    this.type = t;
    this.data = d;
    this.success = s;
    this.error = e;
  }
}

class WebSocketMessage {
  public mId: number;
  public type: any;
  public data: any;
  public success: Function;
  public error: Function;

  constructor(i: number, t: any, d: any, su: Function, err: Function) {
    this.mId = i;
    this.type = t;
    this.data = d;
    this.success = su;
    this.error = err;
  }
}
