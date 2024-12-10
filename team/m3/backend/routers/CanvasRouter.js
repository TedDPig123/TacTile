import express from "express";
import {
    putCanvas,
    getCanvas,
    deleteCanvas,
} from "../controllers/CanvasController.js"

const canvasRouter = new express.Router();

canvasRouter.post('/post', putCanvas);
canvasRouter.get('/get', getCanvas);
canvasRouter.delete('/delete', deleteCanvas);

export default canvasRouter;