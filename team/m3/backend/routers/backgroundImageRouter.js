import express from "express";
import BackgroundImageController from "../controllers/BackgroundImageController";

class BackgroundImageRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        // Get all background images
        this.router.get("/background-image", async (req, res) => {
            await BackgroundImageController.getAllBackgroundImages(req, res);
        });

        // Create a new background image
        this.router.post("/background-image", async (req, res) => {
            await BackgroundImageController.createBackgroundImage(req, res);
        });

        // Update a background image
        this.router.put("/background-image/:imageId", async (req, res) => {
            await BackgroundImageController.updateBackgroundImage(req, res);
        });

        // Delete a background image
        this.router.delete("/background-image/:imageId", async (req, res) => {
            await BackgroundImageController.deleteBackgroundImage(req, res);
        });
    }

    getRouter() {
        return this.router;
    }
}

export default new BackgroundImageRoutes().getRouter();
