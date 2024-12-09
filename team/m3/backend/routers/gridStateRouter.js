import express from "express";
import { deleteAllGridStates,
    createGridState,
    getAllGridStates
 } from "../controllers/gridStateController.js";

const gridStateRouter = new express.Router();

gridStateRouter.post('/', createGridState);
gridStateRouter.get('/', getAllGridStates);
gridStateRouter.delete('/', deleteAllGridStates);

export default gridStateRouter;