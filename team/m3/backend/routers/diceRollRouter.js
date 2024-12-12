import express from "express";
import {
    getDiceRoll, 
    createDiceRoll,
    deleteAllDiceRolls
} from "../controllers/diceRollController.js"

const diceRollRouter = new express.Router();

diceRollRouter.post('/post', createDiceRoll);
diceRollRouter.get('/get', getDiceRoll); //gets all dice rolls
diceRollRouter.delete('/delete', deleteAllDiceRolls);

export default diceRollRouter;