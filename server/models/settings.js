'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class settings extends Model {
        static associate(models) {
            settings.belongsTo(models.users);
        }
    }
    settings.init(
        {
            imageURL: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:
                    'https://www.streamscheme.com/wp-content/uploads/2020/04/poggers.png.webp',
            },
            color: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            activePresets: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            showInstrumentButtons: {
                type: DataTypes.BOOLEAN,
            },
            showPresetButtons: {
                type: DataTypes.BOOLEAN,
            },
            displayerOn: {
                type: DataTypes.BOOLEAN,
            },
            recordsOn: {
                type: DataTypes.BOOLEAN,
            },
        },
        {
            sequelize,
            modelName: 'settings',
        },
    );
    return settings;
};
