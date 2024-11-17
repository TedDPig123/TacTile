export class DatabaseConnection{
    constructor(dbStore){
        this.dbStore = dbStore;
    }

    //open database
    async openDatabase() {
        const dbStore = this.dbStore;
        return new Promise((resolve, reject) => {
            if (dbStore === "") {
                reject("Database name cannot be empty.");
                return;
            }
            let request = indexedDB.open(dbStore, 1);
            request.onupgradeneeded = function (event) {
                let db = event.target.result;
                if (!db.objectStoreNames.contains(dbStore)) {
                db.createObjectStore(dbStore, { keyPath: "id", autoIncrement:true });
                }
            };
            request.onsuccess =  event => {
                resolve(event.target.result);
            };
            request.onerror = event => {
                reject(event.target.error);
            };
        });
    }

    //add a task to the database
    async addObject(object) {
        const dbStore = this.dbStore;

        const db = await this.openDatabase();
        const tx = db.transaction([dbStore], "readwrite");
        const store = tx.objectStore(dbStore);
        const x = store.add(object);
        return new Promise((resolve, reject) => {
            x.onsuccess = (event) => {
                return resolve(event.target.result);
            };
            x.onerror = () => {
                reject("Failed to add task.");
            };
        });
    }

    //get an object from the database
    async getObject(id) {
        const dbStore = this.dbStore;

        const db = await this.openDatabase();
        const task = db.transaction([dbStore], "readwrite").objectStore(dbStore).get(id);
        return new Promise((resolve, reject) => {
            task.onsuccess = () => {
                resolve(task.result);
            }
            task.onerror = () => {
                reject("Method not implemented.");
            }
        });
    }

    //get all the objects from the database
    async getAllObject() {
        const dbStore = this.dbStore;

        const db = await this.openDatabase();
        const alltask = db.transaction([dbStore], "readwrite").objectStore(dbStore).getAll();
        return new Promise((resolve, reject) => {
            alltask.onsuccess = () => {
                resolve(alltask.result);
            }
            alltask.onerror = () => {
                reject("Method not implemented.");
            }
        });
    }

    //delete an object from the database
    async deleteObject(objectID) {
        const dbStore = this.dbStore;

        const db = await this.openDatabase();
        const del = db.transaction([dbStore], "readwrite").objectStore(dbStore).delete(objectID);
        return new Promise((resolve, reject) => {
            del.onsuccess = () => {
                resolve("Task deleted successfully!");
            }
            del.onerror = () => {
                reject("Method not implemented.");
            }
        });
    }

    //update an object from the database
    async updateObject(object){
        const dbStore = this.dbStore;

        const db = await this.openDatabase();
        const objStore = db.transaction([dbStore], "readwrite").objectStore(dbStore)
        return new Promise((resolve, reject) => {
            const updateObj = objStore.put(object);
            updateObj.onsuccess = () => {
                resolve("Task updated successfully!");
            }
            updateObj.onerror = () => {
                reject("Method not implemented.");}
        });
    }

    //clears the database
    async clearDatabase() {
        const dbStore = this.dbStore;

        const db = await this.openDatabase();
        const transaction = db.transaction([dbStore], "readwrite");
        const store = transaction.objectStore(dbStore);

        return new Promise((resolve, reject) => {
            const clearRequest = store.clear();
            clearRequest.onsuccess = () => {
                resolve("All objects cleared from the database!");
            };
            clearRequest.onerror = () => {
                reject("Failed to clear the database.");
            };
        });
    }
}
