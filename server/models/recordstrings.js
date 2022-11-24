'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class recordstrings extends Model {
        static associate(models) {
            recordstrings.belongsTo(models.recordings);
        }
    }
    recordstrings.init(
        {
            string: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'recordstrings',
        },
    );
    return recordstrings;
};
