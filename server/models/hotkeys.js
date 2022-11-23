'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class hotkeys extends Model {
        static associate(models) {
            hotkeys.belongsTo(models.presets);
        }
    }
    hotkeys.init(
        {
            type: { type: DataTypes.STRING },
            keysString: { type: DataTypes.STRING, allowNull: false },
        },
        {
            sequelize,
            modelName: 'hotkeys',
        },
    );
    return hotkeys;
};
