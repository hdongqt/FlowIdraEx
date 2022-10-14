'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.changeColumn('todos', 'isDone', {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            }),
            queryInterface.changeColumn('todos', 'isDelete', {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            }),
            queryInterface.changeColumn('todos', 'createdAt', {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('NOW')
            }),
            queryInterface.changeColumn('todos', 'updatedAt', {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.fn('NOW')
            })
        ])
    },
    down(queryInterface, Sequelize) {
        // return Promise.all([
        //     queryInterface.removeColumn('todos', 'isDone'),
        //     queryInterface.removeColumn('todos', 'isDelete'),
        //     queryInterface.removeColumn('todos', 'createdAt'),
        //     queryInterface.removeColumn('todos', 'updatedAt')
        // ])
    }
};
