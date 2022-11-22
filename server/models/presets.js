'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class presets extends Model {
        static associate(models) {
            presets.belongsTo(models.users);
            presets.hasMany(models.hotkeys);
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
