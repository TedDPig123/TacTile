import express from "express";
import { deleteAllGridStates,
    createGridState,
    getAllGridStates
 } from "../controllers/gridStateController.js";

const gridStateRouter = new express.Router();

// Define the routes for gridstate creation, retrieval, deletion, etc.
gridStateRouter.post('/', createGridState);
gridStateRouter.get('/', getAllGridStates);
gridStateRouter.delete('/', deleteAllGridStates);

export default gridStateRouter;