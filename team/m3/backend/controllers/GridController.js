
import {Grid} from "..models/SQLiteGrid";

const factoryResponse = (status, message) => ({ status, message });

//CREATE, make new grid (with attributes width, height, and id)
export const createGrid = async (req, res) =>{
    const {gridId, gridWidth, gridHeight} = req.body;
    try{
        const grid = await Grid.create({gridId, gridWidth, gridHeight});
        res.status(200).json(grid);
    }catch(error){
        res.status(500).json(factoryResponse(500, "Grid not created due to error"));
    }
}

//GET , gets all of the grids
export const getAllGrids = async (req, res) =>{
    try{
        const allGrids = await Grid.findAll();
        res.status(200).json(allGrids);
    }catch(error){
        res.status(500).json(factoryResponse(500, "Error retrieving all grids"));
    }
}

//UPDATE grid
export const updateGrid = async (req, res) =>{
    const {gridId} = req.params;
    const {gridWidth, gridHeight } = req.body;

    try{
        const grid = await Grid.findByPk(gridId);
        if (!grid) {
            return res.status(404).json(factoryResponse(404, "Grid not found"));
        }

        await grid.update({gridWidth, gridHeight });
        res.status(200).json(allGrids);
    }catch(error){
        res.status(500).json(factoryResponse(500, "Error retrieving grid"));
    }
}

//DELETE grid
export const deleteGrid = async (req, res) => {
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