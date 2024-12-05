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

    async init(refresh = false){
        await sequelize.authenticate();
        await sequelize.sync({ force: true });

        if(refresh){
            await this.deleteAll();
        }
    }

    async create(token){
        return await Token.create(token);
    }

    async getToken(id){
        return await Token.findByPk(id)
    }

    async getAllToken(){
        return await Token.findAll();
    }

    async update(token){
        const currtoken = await Task.findByPk(token.tokenid);
        if (!currtoken) {
          return null;
        }
        await currtoken.update(token);
        return currtoken;
    }

    async delete(token){
        await Token.destroy({where: {tokenid: token.tokenid}});
        return token
    }

    async deleteAll(){
        await Token.destroy({truncate: true});
        return;
    }
}

const SQLiteToken = new _SQLiteToken();

export default SQLiteToken;