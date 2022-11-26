'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class recordings extends Model {
        static associate(models) {
            recordings.belongsTo(models.users);
            recordings.hasMany(models.recordstrings);
            recordings.hasMany(models.sharedrecordings);
        }
    }
    recordings.init(
        {
            name: { type: DataTypes.STRING, allowNull: false },
            createdBy: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            uuid: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        },
        {
            sequelize,
            modelName: 'recordings',
        },
    );
    return recordings;
};
