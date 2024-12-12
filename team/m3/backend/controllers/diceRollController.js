import diceRoll from "../models/SQLdiceRoll.js";

const factoryResponse = (status, message) => ({ status, message });

//POST: Uploads diceroll data to database
export const createDiceRoll = async (req, res) =>{
    //clears dice first
    await diceRoll.destroy({
        where: {}, // Delete all rolls
    });
    
    let {numberOfDice, numberOfSides, modAddedToDice } = req.body;
    try{
        numberOfDice = parseInt(numberOfDice, 10);
        numberOfSides = parseInt(numberOfSides, 10);
        modAddedToDice = parseInt(modAddedToDice, 10);
        const newRoll = await diceRoll.create({numberOfDice, numberOfSides, modAddedToDice });
        
        res.status(200).json(newRoll);
    }catch(error){
        console.log(error);
        res.status(500).json(factoryResponse(500, "Dice roll not uploaded to error"));
    }
}

//GET , gets all of the dice rolls
export const getDiceRoll = async (req, res) =>{
    try{
        const allRolls = await diceRoll.findAll();
        res.status(200).json(allRolls);
    }catch(error){
        res.status(500).json(factoryResponse(500, "Error retrieving dice roll"));
    }
}

//DELETE deletes all dice roll
export const deleteAllDiceRolls = async (req, res) => {
    try {
        await diceRoll.destroy();
        res.status(200).json(factoryResponse(200, "Dicerolls deleted successfully"));
    } catch (error) {
        res.status(500).json(factoryResponse(404, "Error in deleting dicerolls"));
    }
};

// DELETE: Controller function to handle user deletion
export const deleteCanvas = async (req, res) => {
    const { numberOfDice } = req.params;
    try {
        const dice = await diceRoll.findByPk(numberOfDice);
        if (!dice) {
            return res.status(404).json(factoryResponse(404, "Dice not found"));
        }
        await dice.destroy();
        res.status(200).json(factoryResponse(200, "Rolls deleted successfully"));
    } catch (error) {
        res.status(500).json(factoryResponse(404, "Error in deleting rolls"));
    }
};

