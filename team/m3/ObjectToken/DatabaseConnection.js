export class DatabaseConnection{

    //open database
    async openDatabase() {
        return new Promise((resolve, reject) => {
            if ("ObjectBase" === "") {
                reject("Database name cannot be empty.");
                return;
            }
            let request = indexedDB.open("ObjectBase", 1);
            request.onupgradeneeded = function (event) {
                let db = event.target.result;
                if (!db.objectStoreNames.contains("ObjectStore")) {
                db.createObjectStore("ObjectStore", { keyPath: "id", autoIncrement:true });
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
        const db = await this.openDatabase();
        const tx = db.transaction(['ObjectStore'], "readwrite");
        const store = tx.objectStore("ObjectStore");
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

    //get a task from the database
    async getObject(id) {
        const db = await this.openDatabase();
        const task = db.transaction(['ObjectStore'], "readwrite").objectStore("ObjectStore").get(id);
        return new Promise((resolve, reject) => {
            task.onsuccess = () => {
                resolve(task.result);
            }
            task.onerror = () => {
                reject("Method not implemented.");
            }
        });
    }

    //get all the task from the database
    async getAllObject() {
        const db = await this.openDatabase();
        const alltask = db.transaction(['ObjectStore'], "readwrite").objectStore("ObjectStore").getAll();
        return new Promise((resolve, reject) => {
            alltask.onsuccess = () => {
                resolve(alltask.result);
            }
            alltask.onerror = () => {
                reject("Method not implemented.");
            }
        });
    }

    //delete a task from the database
    async deleteObject(objectID) {
        const db = await this.openDatabase();
        const del = db.transaction(['ObjectStore'], "readwrite").objectStore("ObjectStore").delete(objectID);
        return new Promise((resolve, reject) => {
            del.onsuccess = () => {
                resolve("Task deleted successfully!");
            }
            del.onerror = () => {
                reject("Method not implemented.");
            }
        });
    }

    //update a task from the database
    async updateObject(object){
        const db = await this.openDatabase();
        const objStore = db.transaction(['ObjectStore'], "readwrite").objectStore("ObjectStore")
        return new Promise((resolve, reject) => {
            const updateObj = objStore.put(object);
            updateObj.onsuccess = () => {
                resolve("Task updated successfully!");
            }
            updateObj.onerror = () => {
                reject("Method not implemented.");}
        });
    }
}
