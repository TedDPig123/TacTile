import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
});

const Token = sequelize.define("Token", {
    tokenid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    column: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    row: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    top: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    left: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    img: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    imgname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    mime: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

class _SQLiteToken{
    constructor(){}

    //initialize the database
    async init(){
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
    }

    //to create a new Token in the database
    async create(token){
        try{
            const newToken = await Token.create(token);
            return newToken;
        }
        catch(error){
            throw error;
        }
    }

    //to get a specific token with its id
    async getToken(id){
        try{
            const requiredToken = await Token.findByPk(id);
            return requiredToken;
        }
        catch(error){
            throw error;
        }   
    }

    //to get all token
    async getAllToken(){
        try{
            const allTokens = await Token.findAll();
            return allTokens;
        }
        catch(error){
            throw error;
        }   
    }

    //to update a specific token
    async update(token) {
        try {
            const updatedRecords = await Token.update(
                token,
                {
                    where: { tokenid: token.tokenid }, 
                    returning: true,   
                }
            );
            return updatedRecords[1];
        } 
        catch (error) {
            throw error;
        }
    }

    //to delete a specific token
    async delete(id){
        try{
            const numDeleted = await Token.destroy({where: {tokenid: id}});
            return numDeleted;
        }
        catch (error) {
            throw error;
        }
    }

    //to delete all token
    async deleteAll(){
        try{
            await Token.truncate();
            return;
        }
        catch (error) {
            throw error;
        }
    }
}

const SQLiteToken = new _SQLiteToken();

export default SQLiteToken;