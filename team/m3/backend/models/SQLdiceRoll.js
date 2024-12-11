import { Sequelize, DataTypes } from "sequelize";

// Initialize a new Sequelize instance with SQLite
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",  
});

const diceRoll = sequelize.define('DiceRoll',{
    numberOfDice: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    }, 
    numberOfSides: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    modAddedToDice:{
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true,
    }, 
},);

await sequelize.sync();
export default diceRoll;