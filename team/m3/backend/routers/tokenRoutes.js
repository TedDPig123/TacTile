import express from "express";
import SQLiteToken from "../models/sqliteToken.js";
import SQLiteUser from "../models/user.js"; //added by shan

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

        //this is for adding a new token, og version before user token
        // this.router.post("/newToken", async (req, res) => {
        //     try {
        //         const newToken = await this.database.create(req.body);
        //         res.status(201).json(newToken);
        //     } catch (error) {
        //         res.status(500).json({ message:"Failed to create token." });
        //     }
        // });

        //this is for adding a new token,
        //added by shan. idrk if this works but general idea is here
        this.router.post("/newToken", async (req, res) => {
            try {
                const { userId, name, description, column, row, top, left, img, mime } = req.body;
                const user = await SQLiteUser.getUser(userId);
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                const newToken = await this.database.create({ userId, name, description, column, row, top, left, img, mime });
                res.status(201).json(newToken);
            } catch (error) {
                res.status(500).json({ message: "Failed to create token." });
            }
        });

        //this is for updating token
        this.router.put("/update", async (req, res) => {
            try{
                const numRowsUpdated = await this.database.update(req.body);
                return (numRowsUpdated === 0)?res.status(404).json({ message: "Token not found" }):res.status(201).json({ message: "Token updated successfully" });
            }
            catch (error) {
                res.status(500).json({ message:"Failed to update token." });
            }
        }); 

        //this is for deleting token
        this.router.delete("/delete/:id", async(req, res)=>{
            try{
                const id = req.params.id;
                const num = await this.database.delete(id);
                (num===0)?res.status(404).json({ message: "Token not found" }):res.status(201).json({ message: 'token deleted successfully' });
            }
            catch(error){
                res.status(500).json({ message:"Failed to delete token." });

            }
        });


        //this is for deleting all token
        this.router.delete("/deleteAll", async(req, res)=>{
            try{
                await this.database.deleteAll();
                res.status(201).json({ message: 'all token deleted successfully' });
            }
            catch(error){
                res.status(500).json({ message:"Failed to delete all token." });
            }
        });
    }

    getRouter(){
        return this.router;
    }
}

export default new TokenRoutes().getRouter();
