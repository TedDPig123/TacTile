import Tile from "../models/SQLiteTile.js";
// This function creates a response object with a status and a message.
const factoryResponse = (status, message) => ({ status, message });

//POST: Creates tile type
export const createTile = async (req, res) =>{
    const {tileID, type, details, imgData} = req.body;
    try{
        const tile = await Tile.create({tileID, type, details, imgData});
        res.status(200).json(tile);
    }catch(error){
        res.status(500).json(factoryResponse(500, "Tile not created due to error"));
    }
}

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
export const updateTile = async (req, res) =>{
    const {id} = req.params;
    const {type, details, imgData } = req.body;

    try{
        const tile = await Tile.findByPk(id);
        if (!tile) {
            return res.status(404).json(factoryResponse(404, "Tile not found"));
        }

        await tile.update({ type, details, imgData });
        res.status(200).json(allTiles);
    }catch(error){
        res.status(500).json(factoryResponse(500, "Error retrieving tiles"));
    }
}

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