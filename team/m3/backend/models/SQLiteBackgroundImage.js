import { Sequelize, DataTypes } from "sequelize";

// Initialize a new Sequelize instance with SQLite
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",  
});

// Define the BackgroundImage model with its attributes
const BackgroundImage = sequelize.define("BackgroundImage", {
    imageId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    backgroundId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.BLOB("long"),
        allowNull: true,
    },
});

class _SQLiteBackgroundImage {
    constructor() {}

    async init(refresh = false) {
        await sequelize.authenticate();     
        await sequelize.sync({ force: refresh });
        if (refresh) {
            await this.deleteAll();
        }
    }

    async create(backgroundImage) {
        return await BackgroundImage.create(backgroundImage);
    }

    async getImage(id) {
        return await BackgroundImage.findByPk(id);
    }

    async getAllImages() {
        return await BackgroundImage.findAll();
    }

    async update(backgroundImage) {
        const currentImage = await BackgroundImage.findByPk(backgroundImage.imageId);
        if (!currentImage) {
            return null;
        }
        await currentImage.update(backgroundImage);
        return currentImage;
    }

    async delete(backgroundImage) {
        await BackgroundImage.destroy({ where: { imageId: backgroundImage.imageId } });
        return backgroundImage;
    }

    async deleteAll() {
        await BackgroundImage.destroy({ truncate: true });
        return;
    }
}

const SQLiteBackgroundImage = new _SQLiteBackgroundImage();

export default SQLiteBackgroundImage;
