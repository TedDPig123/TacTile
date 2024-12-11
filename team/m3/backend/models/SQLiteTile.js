import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
});

//Defining the tile object
const Tile = sequelize.define('Tile',{
    IDBtileID: {type: DataTypes.INTEGER,
        primaryKey: true
    },//tile ID
    type: {type: DataTypes.STRING}, //tile type
    details: {type: DataTypes.TEXT,
        defaultValue: ''
    }, //tile description
    imgData: {type: DataTypes.TEXT} //this contains the image URL
},);

await sequelize.sync();
export default Tile;
