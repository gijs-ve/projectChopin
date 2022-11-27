'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('settings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            imageURL: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue:
                    'https://www.streamscheme.com/wp-content/uploads/2020/04/poggers.png.webp',
            },
            color: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            activePresets: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            showInstrumentButtons: {
                type: Sequelize.BOOLEAN,
            },
            showPresetButtons: {
                type: Sequelize.BOOLEAN,
            },
            displayerOn: {
                type: Sequelize.BOOLEAN,
            },
            recordsOn: {
                type: Sequelize.BOOLEAN,
            },
            userId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    key: 'id',
                    model: 'users',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('settings');
    },
};
