import { BackgroundImage } from "../models/SQLiteBackgroundImage";

const factoryResponse = (status, message) => ({ status, message });

// CREATE: Add a new background image
export const createBackgroundImage = async (req, res) => {
    const { backgroundId, name, image } = req.body;
    try {
        const backgroundImage = await BackgroundImage.create({ mapId, name, image });
        res.status(200).json(backgroundImage);
    } catch (error) {
        res.status(500).json(factoryResponse(500, "Background image not created due to error"));
    }
};

// GET: Retrieve all background images
export const getAllBackgroundImages = async (req, res) => {
    try {
        const allBackgroundImages = await BackgroundImage.findAll();
        res.status(200).json(allBackgroundImages);
    } catch (error) {
        res.status(500).json(factoryResponse(500, "Error retrieving all background images"));
    }
};

// UPDATE: Update an existing background image
export const updateBackgroundImage = async (req, res) => {
    const { imageId } = req.params;
    const { mapId, name, image } = req.body;

    try {
        const backgroundImage = await BackgroundImage.findByPk(imageId);
        if (!backgroundImage) {
            return res.status(404).json(factoryResponse(404, "Background image not found"));
        }

        await backgroundImage.update({ mapId, name, image });
        res.status(200).json(backgroundImage);
    } catch (error) {
        res.status(500).json(factoryResponse(500, "Error updating background image"));
    }
};

// DELETE: Delete a background image
export const deleteBackgroundImage = async (req, res) => {
    const { imageId } = req.params;
    try {
        const backgroundImage = await BackgroundImage.findByPk(imageId);
        if (!backgroundImage) {
            return res.status(404).json(factoryResponse(404, "Background image not found"));
        }

        await backgroundImage.destroy();
        res.status(200).json(factoryResponse(200, "Background image deleted successfully"));
    } catch (error) {
        res.status(500).json(factoryResponse(500, "Error deleting background image"));
    }
};
