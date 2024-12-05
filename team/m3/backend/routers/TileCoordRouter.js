import express from "express";
import {
    placeTileCoordinate,
    deleteTileCoordinate
} from "../controllers/TileCoordController"

const tileCoordRouter = new express.Router();

tileCoordRouter.post('/', placeTileCoordinate);
tileCoordRouter.delete('/', deleteTileCoordinate);

export default tileCoordRouter;