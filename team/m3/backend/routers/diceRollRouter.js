import express from "express";
import {
    getDiceRoll, 
    createDiceRoll,
    deleteDiceRoll,
} from "../controllers/diceRollController.js"

const diceRollRouter = new express.Router();

diceRollRouter.post('/post', createDiceRoll);
diceRollRouter.get('/get', getDiceRoll);
diceRollRouter.delete('/delete', deleteDiceRoll);

export default diceRollRouter;