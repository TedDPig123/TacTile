import express from "express";
import {
    getDiceRoll, 
    createDiceRoll,
    deleteOldDiceRoll,
} from "../controllers/diceRollController.js"

const diceRollRouter = new express.Router();

diceRollRouter.post('/post', createDiceRoll);
diceRollRouter.get('/get', getDiceRoll);
diceRollRouter.delete('/delete', deleteOldDiceRoll);

export default diceRollRouter;