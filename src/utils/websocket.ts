export class WebSocketManager {
    private messageId: number;
  
    constructor() {
      this.messageId = 0;
    }
  
    send(data: any, callback: Function): void {
      console.log(data);
      callback();
    }
  }
  
  class WebSocketMessage {}
  