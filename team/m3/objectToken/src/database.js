export class TaskRepositoryService{
    constructor() {
      super();
      this.dbName = 'objectDB';
      this.storeName = 'obj';
      this.db = null;

      this.initDB()
        .then(() => {
          this.loadTasksFromDB();
        })
        .catch(error => {
          console.error(error);
        });
    }

    async openDatabase() {
        return new Promise((resolve, reject) => {    
            let request = indexedDB.open(this.dbName, 1);
            request.onupgradeneeded = function (event) {
            let db = event.target.result;
            db.createObjectStore(this.storeName, {
                keyPath: "name",});
            };
            request.onsuccess = function (event) {
            resolve(event.target.result);
            };
            request.onerror = function (event) {
            reject(event.target.error);
            };
        });
    }
    
      // Method to add a task
    async addTask(task) {
        const db = await this.openDatabase();
        const tx = db.transaction(this.storeName, "readwrite");
        const store = tx.objectStore(this.storeName);
        store.add(task);

        return new Promise((resolve, reject) => {
            tx.oncomplete = function () {
            resolve("Task added successfully!");
            };
            tx.onerror = function () {
            reject("Failed to add task.");
            };
        });
    }

    // Method to get all tasks
    async getTasks() {
    // TASK: Implement this method
        const db = await this.openDatabase();
        const alltask = db.transaction(this.storeName, "readwrite").objectStore(this.storeName).getAll();
        return new Promise((resolve, reject) => {
            alltask.onsuccess = function() {
            resolve(alltask.result);
            }
            alltask.onerror = function(){
            reject("Method not implemented.");}
        });
    }

    // Method to delete a task by its ID
    async deleteTask(taskName) {
    // TASK: Implement this method
        const db = await this.openDatabase();
        const del = db.transaction(this.storeName, "readwrite").objectStore(this.storeName).delete(taskName)
        return new Promise((resolve, reject) => {
            del.onsuccess = function() {
            resolve("Task deleted successfully!");
            }
            del.onerror = function(){
            reject("Method not implemented.");}
        });
    }
}