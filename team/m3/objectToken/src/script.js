

const printMe = (i, j) => {
  console.log("You clicked on (" + (i + 1) + ", " + (j + 1) + ")");
};

const build = () => {
  const numCols = 8,
    numRows = 8,
    theGrid = document.getElementById("theGrid");
    for(let i = 0; i<numRows; i++){
      for(let j = 0; j<numCols; j++){
        const gridDiv = document.createElement('div');
        gridDiv.classList.add("grid-item");
        ((i+j)%2 === 0)?gridDiv.classList.add("whiteG"):gridDiv.classList.add("blackG");
        theGrid.appendChild(gridDiv);
      }
    }
  // TODO #2: Build the chessboard with clicking application behavior
  
  // Your code goes here
};

build();


//object Interface
const objB = document.getElementById("object_button");
const form = document.getElementById("object_form");
form.style.display= "none";
objB.addEventListener("click", event => {
  if(form.style.display==="none"){
    form.style.display= "block";
  }
  else{
    form.style.display= "none";
  }
});


const clear = document.getElementById("cancel");
const nameObj = document.getElementById("name");
const descrip = document.getElementById("description");
const num = document.getElementById("copy")
const c = document.getElementById("c")
const r = document.getElementById("r")
num.value = 1;
c.value = 1;
r.value = 1;

function clearAllform(){
  nameObj.value = "";
  descrip.value = "";
  num.value = 1;
  c.value = 1;
  r.value = 1;
}
clear.addEventListener("click", event => clearAllform())


function createObject(){
  if(nameObj.value===""){
    console.log("need name")
  }
  else{
    const objdiv = document.createElement("div");
    objdiv.classList.add("object");
    objdiv.classList.add("tooltip");
    const spanElement = document.createElement("span");
    spanElement.textContent = "name: "+nameObj.value+"\ndescription: "+ descrip.value;
    spanElement.classList.add("tooltiptext");
    objdiv.appendChild(spanElement);
    const rowE = Number(r.value)+1;
    const colE = Number(c.value)+1;
    console.log(rowE, colE)
    objdiv.style.gridArea = `1/1/${rowE}/${colE}`;
    const objC = document.getElementById("objGrid");
    objC.appendChild(objdiv);
    clearAllform();
    form.style.display= "none";
  }
}
const create = document.getElementById("create");
create.addEventListener("click", () => createObject())

//keep data in indexdb
//make an object div under grid item div: done
//show name and description when hover: done
//when click, reopen form, have update and delete instead of create and cacnle, us indexdb to update and delete




