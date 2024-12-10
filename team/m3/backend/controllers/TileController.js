import Tile from "../models/SQLiteTile.js";
// This function creates a response object with a status and a message.
const factoryResponse = (status, message) => ({ status, message });

//POST: Creates tile type
export const createTile = async (req, res) => {
    const { IDBtileID, type, details, imgData } = req.body;

    console.log("Received tile data:", req.body); // Log to debug the incoming data

    try {
        if (isNaN(IDBtileID)) {
            return res.status(400).json(factoryResponse(400, "IDBtileID must be a valid integer"));
        }
        
        const tile = await Tile.create({IDBtileID, type, details, imgData });
        console.log("Tile created:", tile); // Log the created tile
        res.status(200).json(tile);
    } catch (error) {
        console.error("Error creating tile:", error); // Log the error for debugging
        res.status(500).json(factoryResponse(500, "Tile not created due to error: " + error.message));
    }
};

//GET: Retrieves all tiles types
export const getAllTiles = async (req, res) =>{
    try{
        const allTiles = await Tile.findAll();
        res.status(200).json(allTiles);
    }catch(error){
        res.status(500).json(factoryResponse(500, "Error retrieving tiles"));
    }
}

//GET: Retrieves a single tile type
export const getTileByID = async (req, res) =>{
    const {id} = req.params;
    try{
        const tile = await Tile.findByPk(id);
        res.status(200).json(tile);
    }catch(error){
        res.status(500).json(factoryResponse(500, "Error retrieving tile"));
    }
}

//PUT: Updates a single tile type
export const updateTile = async (req, res) => {
    const { id } = req.params;
    const { type, details, imgData } = req.body;
    console.log("details: ", typeof(details));
    try {
        const tile = await Tile.findByPk(id); 
        if (!tile) {
            return res.status(404).json(factoryResponse(404, "Tile not found")); // Return 404 if tile doesn't exist
        }

        await tile.update({ type, details, imgData });

        res.status(200).json(tile);
        console.log("Server successfully updated tile:", tile);
    } catch (error) {
        console.error("Error updating tile:", error);
        res.status(500).json(factoryResponse(500, "Error updating tile: " + error.message));
    }
};

//DELETE: deletes a tile type
export const deleteTile = async (req, res) => {
    const { id } = req.params;
    try {
        const tile = await Tile.findByPk(id);
        if (!tile) {
            return res.status(404).json(factoryResponse(404, "Tile not found"));
        }

        await tile.destroy();
        res.status(200).json(factoryResponse(200, "Tile deleted successfully"));
    } catch (error) {
        res.status(500).json(factoryResponse(404, "Error in deleting tile"));
    }
};

// PUT: Updates the IDBtileID of a specific tile for syncing
export const changeTileID = async (req, res) => {
    const { id } = req.params;
    const { newIDBtileID } = req.body;

    try {
        if (isNaN(newIDBtileID) || !Number.isInteger(Number(newIDBtileID))) {
            return res.status(400).json(factoryResponse(400, "new IDBtileID must be valid integer"));
        }

        const tile = await Tile.findByPk(id);
        if (!tile) {
            return res.status(404).json(factoryResponse(404, "tile not found"));
        }

        await tile.update({ IDBtileID: newIDBtileID });

        res.status(200).json(tile);
        console.log("Tile ID successfully updated:", tile);
    } catch (error) {
        console.error("Error changing tile ID:", error);
        res.status(500).json(factoryResponse(500, "Error changing tile ID: " + error.message));
    }
};

export const clearAllTiles = async (req, res) => {
    console.log("Request to clear all tiles received");
    try {
        await sequelize.query('PRAGMA foreign_keys = OFF;');
        
        const deletedTiles = await Tile.destroy({
            where: {},
        });
        console.log(`Deleted ${deletedTiles} tiles.`);

        if (deletedTiles === 0) {
            console.log("No tiles found to delete.");
            return res.status(200).json({ message: "No tiles to delete. The database is already empty." });
        }

        res.status(200).json({ message: `${deletedTiles} tiles were deleted successfully.` });
    } catch (error) {
        console.error("Error clearing all tiles:", error);
        res.status(500).json({ message: "Error clearing all tiles" });
    }
};