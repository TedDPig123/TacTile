import {DataForm} from "./DataForm.js";
import {DatabaseConnection } from "./DatabaseConnection.js";

const build = () => {
  const numCols = 10,
    numRows = 10,
    theGrid = document.getElementById("theGrid");
    for(let i = 0; i<numRows; i++){
      for(let j = 0; j<numCols; j++){
        const gridDiv = document.createElement('div');
        gridDiv.classList.add("grid-item");
        gridDiv.classList.add("blackG");
        theGrid.appendChild(gridDiv);
      }
    }
};

build();

const objectDB = new DatabaseConnection();
objectDB.openDatabase();
const dataObjForm = new DataForm(objectDB);
dataObjForm.render();
