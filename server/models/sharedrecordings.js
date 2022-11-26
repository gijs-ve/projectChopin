'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class sharedrecordings extends Model {
        static associate(models) {
            sharedrecordings.belongsTo(models.recordings);
            sharedrecordings.belongsTo(models.users);
        }
    }
    sharedrecordings.init(
        {},
        {
            sequelize,
            modelName: 'sharedrecordings',
        },
    );
    return sharedrecordings;
};
