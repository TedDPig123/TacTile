import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
});

//this defines the tile grid state
const gridState = sequelize.define('GridState',{
    array: {type: DataTypes.JSON,},
    gridstateID: {type: DataTypes.INTEGER,
        primaryKey: true
    }
},);

await sequelize.sync();
export default gridState;
