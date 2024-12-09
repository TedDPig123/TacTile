import gridState from "../models/sqliteGridState.js";

// Helper function to create response objects
const factoryResponse = (status, message) => ({ status, message });

// POST: Creates a new GridState
export const createGridState = async (req, res) => {
    const { array } = req.body;

    console.log("Received GridState data:", req.body); 

    try {
        if (!Array.isArray(array)) {
            return res.status(400).json(factoryResponse(400, "Array must be a valid JSON array"));
        }

        const newGridState = await gridState.create({ array });
        console.log("GridState created:", newGridState); 
        res.status(201).json(newGridState);
    } catch (error) {
        console.error("Error creating GridState:", error);
        res.status(500).json(factoryResponse(500, "Unable to create GridState: " + error.message));
    }
};

// GET: Retrieves all GridStates
export const getAllGridStates = async (req, res) => {
    try {
        const gridStates = await gridState.findAll();
        res.status(200).json(gridStates); // Return all records
    } catch (error) {
        console.error("Error fetching all GridStates:", error); // Log the error
        res.status(500).json(factoryResponse(500, "Unable to fetch GridStates: " + error.message));
    }
};

// DELETE: Deletes all GridStates
export const deleteAllGridStates = async (req, res) => {
    try {
        console.log("Attempting to delete all GridStates...");
        const deletedRows = await gridState.destroy({
            where: {}, // Delete all rows
        });
        console.log("Deleted rows count:", deletedRows);

        if (deletedRows === 0) {
            return res.status(404).json(factoryResponse(404, "No GridStates found to delete"));
        }

        res.status(200).json(factoryResponse(200, "All GridStates deleted successfully"));
    } catch (error) {
        console.error("Error deleting all GridStates:", error);
        res.status(500).json(factoryResponse(500, "Unable to delete GridStates: " + error.message));
    }
};
