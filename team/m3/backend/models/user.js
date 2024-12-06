import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

// Initialize Sequelize with SQLite database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
});

// Define the User model with attributes and validation
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true, // Ensure the username is not empty
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true, // Ensure the email is in a valid format
            notEmpty: true, // Ensure the email is not empty
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true, // Ensure the password is not empty
        },
    },
}, {
    hooks: {
        // Hash the password before creating a new user
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
    },
});

// Class to handle SQLite operations for the User model
class _SQLiteUser {
    constructor() {}

    // Initialize the database and sync the User model
    async init(refresh = false) {
        await sequelize.authenticate();
        await sequelize.sync({ force: refresh });
        
        if (refresh) {
            await this.deleteAll();
        }
    }

    // Create a new user
    async create(user) {
        return await User.create(user);
    }

    // Get a user by ID
    async getUser(id) {
        return await User.findByPk(id);
    }

    // Get all users
    async getAllUsers() {
        return await User.findAll();
    }

    // Update a user
    async update(user) {
        const currUser = await User.findByPk(user.id);
        if (!currUser) {
            return null;
        }
        await currUser.update(user);
        return currUser;
    }

    // Delete a user
    async delete(user) {
        await User.destroy({ where: { id: user.id } });
        return user;
    }

    // Delete all users
    async deleteAll() {
        await User.destroy({ truncate: true });
        return;
    }
}

// Export an instance of the _SQLiteUser class
const SQLiteUser = new _SQLiteUser();

export default SQLiteUser;