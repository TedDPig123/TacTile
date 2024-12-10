import { Sequelize, DataTypes } from 'sequelize';
import { User } from './user.js'; //added by shan

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
});

const Token = sequelize.define('Token', {
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
    mime: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id', // Reference the id field in the Users table
        },
    },
});
//added by shan
User.hasMany(Token, { foreignKey: 'userId' });
Token.belongsTo(User, { foreignKey: 'userId' });


class _SQLiteToken {
    constructor() {}

    async init() {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
    }

    async create(token) {
        try {
            const newToken = await Token.create(token);
            return newToken;
        } catch (error) {
            throw error;
        }
    }

    async getToken(id) {
        try {
            const requiredToken = await Token.findByPk(id);
            return requiredToken;
        } catch (error) {
            throw error;
        }
    }

    async getAllToken() {
        try {
            const allTokens = await Token.findAll();
            return allTokens;
        } catch (error) {
            throw error;
        }
    }

    async update(token) {
        try {
            const updatedRecords = await Token.update(token, {
                where: { tokenid: token.tokenid },
                returning: true,
            });
            return updatedRecords[1];
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const numDeleted = await Token.destroy({ where: { tokenid: id } });
            return numDeleted;
        } catch (error) {
            throw error;
        }
    }

    async deleteAll() {
        try {
            await Token.truncate();
            return;
        } catch (error) {
            throw error;
        }
    }
}

const SQLiteToken = new _SQLiteToken();

export default SQLiteToken;