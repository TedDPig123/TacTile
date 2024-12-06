import express from "express";
import SQLiteToken from "../models/sqliteToken.js";

class TokenRoutes {
    constructor(){
        this.router = express.Router();
        this.initializeRoutes();
        this.database = SQLiteToken;
        this.database.init();
    }

    initializeRoutes(){

        //get all token
        this.router.get("/all", async(req, res) => {
            try{
                const alltoekns = await this.database.getAllToken();
                res.status(201).json({alltoekns})
            }
            catch(error){
                res.status(500).json({ message:"Failed to get all token." });
            }
        });

        //get individual token
        this.router.get("/token/:id", async(req, res) => {
            try{
                const id = req.params.id
                const token = await this.database.getToken(id);
                token
                ? res.json(token)
                : res.status(404).json({ message: "Token not found" });
            }
            catch(error){
                res.status(500).json({ message:"Failed to get token." });
            }
        });

        //this is for adding a new token
        this.router.post("/newToken", async (req, res) => {
            try {
                const newToken = await this.database.create(req.body);
                res.status(201).json(newToken);
            } catch (error) {
                res.status(500).json({ message:"Failed to create token." });
            }
        });


    }

    getRouter(){
        return this.router;
    }
}

export default new TokenRoutes().getRouter();
