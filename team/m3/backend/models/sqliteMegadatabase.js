import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "megadatabase.sqlite",
});

const megaDatabase = sequelize.define("MegaDatabase", {
    userId: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    gridData: {
        type: DataTypes.JSONB,
        allowNull: false,
    },
    gridStateData: {
        type: DataTypes.JSONB,
        allowNull: false,
    },
    tileData: {
        type: DataTypes.JSONB,
        allowNull: false,
    },
    tokenData: {
        type: DataTypes.JSONB,
        allowNull: false,
    },
    userData: {
        type: DataTypes.JSONB,
        allowNull: false,
    },
});

await sequelize.sync();
export default megaDatabase;