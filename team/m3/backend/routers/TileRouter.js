import express from "express";
import {
    createTile,
    getAllTiles,
    getTileByID,
    updateTile,
    deleteTile,
    changeTileID,
    clearAllTiles
} from "../controllers/TileController.js"

const tileRouter = new express.Router();

tileRouter.post('/', createTile);
tileRouter.get('/', getAllTiles);
tileRouter.get('/:id', getTileByID);
tileRouter.put('/:id', updateTile);
tileRouter.delete('/:id', deleteTile);
tileRouter.put('/:id/change-id', changeTileID);
tileRouter.delete('/clear', clearAllTiles);


export default tileRouter;