import { Sequelize, DataTypes } from "sequelize";

// Initialize a new Sequelize instance with SQLite
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
});

// Define the Grid model with its attributes
const Grid = sequelize.define("Grid", {
    gridId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    gridWidth: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    gridHeight: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

class _SQLiteGrid{
    constructor(){}

    async init(refresh = false){
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
     // An exception will be thrown if either of these operations fail.
        if(refresh){
            await this.deleteAll();
        }
    }

    async create(grid){
        return await Grid.create(grid);
    }

    async getGrid(id){
        return await Grid.findByPk(id)
    }

    async getAllGrid(){
        return await Grid.findAll();
    }

    async update(grid){
        const currGrid = await Grid.findByPk(grid.gridId);
        if (!currGrid) {
          return null;
        }
        await currGrid.update(grid);
        return currGrid;
    }

    async delete(grid){
        await Grid.destroy({where: {gridId: grid.gridId}});
        return grid;
    }

    async deleteAll(){
        await Grid.destroy({truncate: true});
        return;
    }
}

const SQLiteGrid = new _SQLiteGrid();

export default SQLiteGrid;