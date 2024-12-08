import express from "express";
import {
    placeTileCoordinate,
    deleteTileCoordinate
} from "../controllers/TileCoordController.js"

const tileCoordRouter = express.Router();

tileCoordRouter.post('/', placeTileCoordinate);
tileCoordRouter.delete('/', deleteTileCoordinate);

export default tileCoordRouter;