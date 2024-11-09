export class ObjectData{
    dbStore;
    constructor(dbName) {
        this.dbName = dbName;
    }

    //open database
    async openDatabase() {
        return new Promise((resolve, reject) => {
            if (this.dbName === "") {
                reject("Database name cannot be empty.");
                return;
            }
            let request = indexedDB.open(this.dbName, 1);
            request.onupgradeneeded = function (event) {
                let db = event.target.result;
                if (!db.objectStoreNames.contains("ObjectStore")) {
                db.createObjectStore("ObjectStore", { keyPath: "id", autoIncrement:true });
                }
            };
            request.onsuccess = function (event) {
                resolve(event.target.result);
            };
            request.onerror = function (event) {
                reject(event.target.error);
            };
        });
    }

    //add a task to the database
    async addTask(task) {
        const db = await this.openDatabase();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(['ObjectStore'], "readwrite");
            const store = tx.objectStore("ObjectStore");
            const x = store.add(task);
            x.onsuccess = event => {
                return resolve(event.target.result);
            };
            x.onerror = function () {
                reject("Failed to add task.");
            };
        });
    }

    //get a task from the database
    async getTasks(id) {
        const db = await this.openDatabase();
        const task = db.transaction(['ObjectStore'], "readwrite").objectStore("ObjectStore").get(id);
        return new Promise((resolve, reject) => {
            task.onsuccess = function() {
            resolve(task.result);
          }
          task.onerror = function(){
          reject("Method not implemented.");}
        });
    }

    //get all the task from the database
    async getAllTasks() {
        const db = await this.openDatabase();
        const alltask = db.transaction(['ObjectStore'], "readwrite").objectStore("ObjectStore").getAll();
        return new Promise((resolve, reject) => {
            alltask.onsuccess = function() {
                resolve(alltask.result);
            }
            alltask.onerror = function(){
                reject("Method not implemented.");
            }
        });
      }

    //delete a task from the database
    async deleteTask(taskId) {
        const db = await this.openDatabase();
        const del = db.transaction(['ObjectStore'], "readwrite").objectStore("ObjectStore").delete(taskId);
        return new Promise((resolve, reject) => {
          del.onsuccess = function() {
            resolve("Task deleted successfully!");
          }
          del.onerror = function(){
          reject("Method not implemented.");}
        });
    }

    //update a task from the database
    async updateTask(task){
        const db = await this.openDatabase();
        const objStore = db.transaction(['ObjectStore'], "readwrite").objectStore("ObjectStore")
        return new Promise((resolve, reject) => {
            const updateObj = objStore.put(task);
            updateObj.onsuccess = function() {
              resolve("Task deleted successfully!");
            }
            updateObj.onerror = function(){
            reject("Method not implemented.");}
        });
    }
}
