import { Sequelize, DataTypes } from "sequelize";
import {Tile} from "./SQLiteTile"

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
});

const TileCoordinate = sequelize.define('TileCoordinate',{
    x:{
        type: DataTypes.INTEGER
    },
    y:{
        type: DataTypes.INTEGER
    }
},);

//this defines a one-to-many relationship between Tile and TileCoordinate, as each Tile can be placed
//on different coordinates on the battlegrid. onDelete: 'CASCADE' simply ensures that when
//a Tile is deleted its TileCoordinates are deleted too
Tile.hasMany(TileCoordinate, {onDelete: 'CASCADE'});

//THis ensures that a TileCoordinate can belong to only one Tile
TileCoordinate.belongsTo(Tile);
export default TileCoordinate;