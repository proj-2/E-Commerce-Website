const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {
    validatePassword(password) {
        return bcrypt.compareSync(password, this.password)
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false
        },
        verifcationSent: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        verified: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        hooks: {
            async beforeCreate(userData) {
                userData.password = await bcrypt.hash(userData.password, 10)
            },
            async beforeUpdate(userData) {
                userData.password = await bcrypt.hash(userData.password, 10)
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;