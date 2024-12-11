import diceRoll from "../models/SQLdiceRoll.js";

const factoryResponse = (status, message) => ({ status, message });

//POST: Uploads image data to database
export const createDiceRoll = async (req, res) =>{
    const imgData = req.body;
    try{
        const newRoll = await diceRoll.create({imgData: JSON.stringify(imgData)});
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

//DELETE grid
export const deleteDiceRoll = async (req, res) => {
    const { gridId } = req.params;
    try {
        const grid = await Grid.findByPk(gridId);
        if (!grid) {
            return res.status(404).json(factoryResponse(404, "Tile not found"));
        }

        await grid.destroy();
        res.status(200).json(factoryResponse(200, "Grid deleted successfully"));
    } catch (error) {
        res.status(500).json(factoryResponse(404, "Error in deleting grid"));
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

