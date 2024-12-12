import { Sequelize, DataTypes } from "sequelize";

// Initialize a new Sequelize instance with SQLite
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",  
});

const diceRoll = sequelize.define('DiceRoll',{
    numberOfDice: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    }, 
    numberOfSides: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    modAddedToDice:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    }, 
},);

await sequelize.sync();
export default diceRoll;