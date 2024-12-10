import { Sequelize, DataTypes } from "sequelize";
import SQLiteUser from './user.js';

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
});

//this is for the tile object
const gridState = sequelize.define('GridState',{
    array: {type: DataTypes.JSON,},
    gridstateID: {type: DataTypes.INTEGER,
        primaryKey: true
    }
},);

await sequelize.sync();
export default gridState;
