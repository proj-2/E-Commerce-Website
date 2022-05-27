const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class ProductTag extends Model { };

ProductTag.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'product',
                key: 'id'
            },
            onDelete: "CASCADE"
        },
        tag_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'tag',
                key: 'id'
            },
            onDelete: "CASCADE"
        }
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        modelName: 'product_tag'
    }
)

module.exports = ProductTag