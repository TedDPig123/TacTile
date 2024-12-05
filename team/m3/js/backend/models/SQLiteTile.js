import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
});

//this is for the tile object
const Tile = sequelize.define('Tile',{
    tileID: {type: DataTypes.INTEGER}, //the tileID given via indexDB
    type: {type: DataTypes.STRING}, //tile type
    details: {type: DataTypes.STRING}, //tile description
    imgData: {type: DataTypes.STRING} //this contains the image URL
},);

export default Tile;
