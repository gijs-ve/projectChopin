'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class users extends Model {
        static associate(models) {
            users.hasMany(models.presets);
            users.hasMany(models.recordings);
            users.hasMany(models.sharedrecordings);
            users.hasOne(models.settings, {
                as: 'userSettings',
                foreignKey: 'userId',
            });
        }
    }
    users.init(
        {
            name: { type: DataTypes.STRING, unique: true, allowNull: false },
            password: { type: DataTypes.STRING, allowNull: false },
        },
        {
            sequelize,
            modelName: 'users',
        },
    );
    return users;
};
