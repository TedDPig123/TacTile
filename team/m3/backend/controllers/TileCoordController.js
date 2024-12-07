import TileCoordinate from "../models/SQLiteTileCoordinates.js";

// This function creates a response object with a status and a message.
const factoryResponse = (status, message) => ({ status, message });

//POST: Creates a placed tile coordinate object
export const placeTileCoordinate = async (req, res) =>{
    const {tileID, x, y} = req.body;
    try{
        const tile = await Tile.findByPk(tileID);
        if (!tile) {
            return res.status(404).json({ error: 'Tile not found' });
        }

        await TileCoordinate.create({x:x, y:y, tileID: tileID});
        res.status(200).json(factoryResponse(200, "Tile placed successfully"));
    }catch(error){
        res.status(500).json(factoryResponse(500, "Tile not added due to error"));
    }
}

//DELETE: Deletes a placed tile coordinate object
export const deleteTileCoordinate = async (req, res) =>{
    const {tileID, x, y} = req.body;
    try{
        const tileCoord = await TileCoordinate.findOne({
            where: { tileID, x, y },
        });

        if (!tileCoord) {
            return res.status(404).json(factoryResponse(404, "Tile Coordinate not found"));
        }

        await tileCoord.destroy();
        res.status(200).json(factoryResponse(200, "Tile Coordinate deleted successfully"));
    }catch(error){
        res.status(500).json(factoryResponse(500, "Tile not added due to error"));
    }
}