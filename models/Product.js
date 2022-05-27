const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Product extends Model { };

Product.init(
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
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(6, 2),
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },
        SKU: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },
        origin: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'category',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        shipping_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'shipping_provider',
                key: 'id'
            }
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 5,
            validate: {
                isNumeric: true
            }
        },
        length: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isNumeric: true
            }
        },
        width: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isNumeric: true
            }
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isNumeric: true
            }
        },
        dimension_units: {
            type: DataTypes.STRING(2),
            allowNull: true
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isNumeric: true
            }
        },
        weight_units: {
            type: DataTypes.STRING(2),
            allowNull: true
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'product'
    }
);

module.exports = Product;