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
            name: { type: DataTypes.STRING, unique: true, allowNull: false },
            type: { type: DataTypes.STRING, allowNull: false },
            keysString: { type: DataTypes.STRING, allowNull: false },
        },
        {
            sequelize,
            modelName: 'hotkeys',
        },
    );
    return hotkeys;
};
