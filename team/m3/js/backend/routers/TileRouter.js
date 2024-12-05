import express from "express";
import {
    createTile,
    getAllTiles,
    getTileByID,
    updateTile,
    deleteTile,
} from "../controllers/TileController"

const tileRouter = new express.Router();

router.post('/', createTile);
router.get('/', getAllTiles);
router.get('/:id', getTileByID);
router.put('/:id', updateTile);
router.delete('/:id', deleteTile);

export default tileRouter;