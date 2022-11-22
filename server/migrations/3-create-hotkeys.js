'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('hotkeys', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            keysString: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            presetId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    key: 'id',
                    model: 'presets',
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
        await queryInterface.dropTable('hotkeys');
    },
};
