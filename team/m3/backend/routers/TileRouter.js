import express from "express";
import {
    createTile,
    getAllTiles,
    getTileByID,
    updateTile,
    deleteTile,
} from "../controllers/TileController.js"

const tileRouter = new express.Router();

tileRouter.post('/', createTile);
tileRouter.get('/', getAllTiles);
tileRouter.get('/:id', getTileByID);
tileRouter.put('/:id', updateTile);
tileRouter.delete('/:id', deleteTile);

export default tileRouter;