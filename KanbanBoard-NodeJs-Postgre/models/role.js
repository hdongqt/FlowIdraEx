'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }
    role.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        roleCode: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    }, {
        sequelize,
        modelName: 'roles',
        underscored: true,
        timestamps: false,
    });
    return role;
};