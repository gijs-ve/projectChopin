'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class presets extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    presets.init(
        {
            name: { type: DataTypes.STRING, unique: true, allowNull: false },
            password: { type: DataTypes.STRING, allowNull: false },
        },
        {
            sequelize,
            modelName: 'presets',
        },
    );
    return presets;
};
