const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class ShippingProvider extends Model { };

ShippingProvider.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: false,
        modelName: 'shipping_provider'
    }
)

module.exports = ShippingProvider;