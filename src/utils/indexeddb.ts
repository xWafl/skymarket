import { openDB, deleteDB, wrap, unwrap } from "idb";
import { WebSocketRequest } from "./websocket";
import { stringStartsWith } from "../utils/functions";

export class DbManager {
  public db: any;
  public cacheLifetime = 1000 * 60 * 60 * 6;

  constructor() {
    this.open();
  }

  async open() {
    this.db = await openDB("mainDB", 2, {
      upgrade(db) {
        db.createObjectStore("users", {
          keyPath: "name"
        });
        db.createObjectStore("itemDetails", {
          keyPath: "Name"
        });
      }
    });
    this.removeOldEntries();
  }

  async cacheUserSearchResponse(request: WebSocketRequest, response: any) {
    const transaction = this.db.transaction("users", "readwrite");
    JSON.parse(response.data).forEach((element: any) => {
      transaction.store.put({
        name: element[0],
        data: element[1],
        number: element[2],
        timestamp: new Date()
      });
    });
    await transaction.done;
  }

  async cacheItemDetailsResponse(request: WebSocketRequest, response: any) {
    const transaction = this.db.transaction("itemDetails", "readwrite");
    let data = JSON.parse(response.data);
    data.timestamp = new Date();
    transaction.store.put(data);
    await transaction.done;
  }

  async removeOldEntries() {
    // delete old user cache
    let trans = this.db.transaction("users", "readwrite");
    let store = trans.objectStore("users");
    store.getAll().then((value: any) => {
      value.forEach((user: any) => {
        if (user.timestamp.getTime() + this.cacheLifetime < Date.now()) {
          store.delete(user.name);
        }
      });
    });
    await trans.done.then(async () => {
      // delete itemDetails
      trans = this.db.transaction("itemDetails", "readwrite");
      store = trans.objectStore("itemDetails");
      store.getAll().then((value: any) => {
        value
          .filter(
            (x: any) => x.timestamp.getTime() + this.cacheLifetime < Date.now()
          )
          .forEach((y: any) => store.delete(y.Name));
      });
      trans.done;
    });
  }

  searchCache(request: WebSocketRequest) {
    return new Promise((resolve, reject) => {
      switch (request.type) {
        case "search":
          this.db
            .transaction("users", "readwrite")
            .objectStore("users")
            .getAll()
            .then((value: any) => {
              let z = value.filter((x: any) =>
              x.name
                .toString()
                .toLowerCase()
                .startsWith(request.data.toString().toLowerCase()));
              if (z.length < 5) {
                resolve();
              }
              let d: any = [];
              z.forEach((element: any) => {
                d.push([element.name, element.data, 0]) ;
              });
              resolve({
                  type: "searchResponse",
                  data: JSON.stringify(d)
                });
              });
          break;
        default:
          resolve();
      }
    });
  }
}
