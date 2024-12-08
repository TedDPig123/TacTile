import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
});

//holds information for the canvas drawing
const Canvas = sequelize.define('Canvas',{
    imgData: {type: DataTypes.ARRAY} //the array of pixels drawn on the canvas
},);

await sequelize.sync();
export default Canvas;
