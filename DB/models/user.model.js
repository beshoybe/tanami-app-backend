import { sequelizeDb } from "../connection.js";
import { DataTypes } from "sequelize";
import bcrypt from 'bcryptjs';

const User = sequelizeDb.define("User", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { 
        type: DataTypes.STRING(255), 
        allowNull: false, 
        unique: "unique_email_constraint",
        validate: { isEmail: true }
    },
    password: { type: DataTypes.STRING, allowNull: false },
    type: { 
        type: DataTypes.ENUM("normal", "google", "apple"), 
        defaultValue: "normal" 
    },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
    deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    verified: { type: DataTypes.BOOLEAN, defaultValue: false },
    otp: { type: DataTypes.STRING, allowNull: true },
    otpExpires: { type: DataTypes.DATE, allowNull: true },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { 
    tableName: "users", 
    timestamps: true,  
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                user.password = await bcrypt.hash(user.password, 12);
            }
        },
        beforeUpdate: async (user) => {
            if (user.changed("password")) {
                user.password = await bcrypt.hash(user.password, 12);
            }
        }
    }
});

// Instance Methods
User.prototype.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

User.prototype.deleteUser = async function () {
    this.deleted = true;
    this.active = false;
    return this.save();
};

export default User;
