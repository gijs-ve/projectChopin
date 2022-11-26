'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('recordings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            isPublished: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            createdBy: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            uuid: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
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
        await queryInterface.dropTable('recordings');
    },
};
