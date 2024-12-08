import express from "express";
import {
    putCanvas,
    getCanvas,
    deleteCanvas,
} from "../controllers/CanvasController"

const canvasRouter = new express.Router();

router.post('/', putCanvas);
router.get('/', getCanvas);
router.delete('/:id', deleteCanvas);

export default canvasRouter;