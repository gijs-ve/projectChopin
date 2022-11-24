'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            users.hasMany(models.presets);
            users.hasMany(models.recordings);
        }
    }
    users.init(
        {
            name: { type: DataTypes.STRING, unique: true, allowNull: false },
            password: { type: DataTypes.STRING, allowNull: false },
            imageURL: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue:
                    'https://www.streamscheme.com/wp-content/uploads/2020/04/poggers.png.webp',
            },
        },
        {
            sequelize,
            modelName: 'users',
        },
    );
    return users;
};
