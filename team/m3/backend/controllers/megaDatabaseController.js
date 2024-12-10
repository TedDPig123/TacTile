import megaDatabase from "../models/sqliteMegadatabase.js";

// Helper function to create response objects
const factoryResponse = (status, message) => ({ status, message });

// POST: Creates or updates a MegaDatabase for a user
export const createOrUpdateMegaDatabase = async (req, res) => {
    const { userId, gridData, gridStateData, tileData, tokenData, userData } = req.body;

    console.log("Received MegaDatabase data:", req.body);

    try {
        // Validate required data
        if (!userId || !gridData || !gridStateData || !tileData || !tokenData || !userData) {
            return res.status(400).json(factoryResponse(400, "All fields (userId, gridData, gridStateData, tileData, tokenData, userData) are required"));
        }

        // Check if MegaDatabase already exists for the user
        const existingMegaDatabase = await megaDatabase.findOne({ where: { userId } });

        if (existingMegaDatabase) {
            // Update the existing MegaDatabase
            await existingMegaDatabase.update({ gridData, gridStateData, tileData, tokenData, userData });
            console.log("MegaDatabase updated:", existingMegaDatabase);
            res.status(200).json(existingMegaDatabase);
        } else {
            // Create a new MegaDatabase entry for the user
            const newMegaDatabase = await megaDatabase.create({
                userId,
                gridData,
                gridStateData,
                tileData,
                tokenData,
                userData,
            });
            console.log("MegaDatabase created:", newMegaDatabase);
            res.status(201).json(newMegaDatabase);
        }
    } catch (error) {
        console.error("Error creating or updating MegaDatabase:", error);
        res.status(500).json(factoryResponse(500, "Unable to create or update MegaDatabase: " + error.message));
    }
};

// GET: Retrieves the MegaDatabase for a user
export const getMegaDatabase = async (req, res) => {
    const { userId } = req.params;

    try {
        const megaData = await megaDatabase.findOne({ where: { userId } });

        if (!megaData) {
            return res.status(404).json(factoryResponse(404, "MegaDatabase not found for this user"));
        }

        res.status(200).json(megaData);
    } catch (error) {
        console.error("Error fetching MegaDatabase:", error);
        res.status(500).json(factoryResponse(500, "Unable to fetch MegaDatabase: " + error.message));
    }
};

// DELETE: Deletes the MegaDatabase for a user
export const deleteMegaDatabase = async (req, res) => {
    const { userId } = req.params;

    try {
        const deletedRows = await megaDatabase.destroy({
            where: { userId },
        });

        if (deletedRows === 0) {
            return res.status(404).json(factoryResponse(404, "No MegaDatabase found for this user"));
        }

        res.status(200).json(factoryResponse(200, "MegaDatabase deleted successfully"));
    } catch (error) {
        console.error("Error deleting MegaDatabase:", error);
        res.status(500).json(factoryResponse(500, "Unable to delete MegaDatabase: " + error.message));
    }
};