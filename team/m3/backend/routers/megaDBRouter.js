import express from "express";
import {
    createOrUpdateMegaDatabase,
    getMegaDatabase,
    deleteMegaDatabase
} from "../controllers/megaDatabaseController.js";

const megaDatabaseRouter = new express.Router();

megaDatabaseRouter.post('/', createOrUpdateMegaDatabase);
megaDatabaseRouter.get('/:userId', getMegaDatabase);
megaDatabaseRouter.delete('/:userId', deleteMegaDatabase);

export default megaDatabaseRouter;