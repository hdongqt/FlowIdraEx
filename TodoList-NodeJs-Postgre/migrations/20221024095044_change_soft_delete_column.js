'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all(
            [
                queryInterface.renameColumn('todos', 'isDone', 'is_done'),
                queryInterface.renameColumn('todos', 'isDelete', 'status'),
                queryInterface.renameColumn('todos', 'createdAt', 'created_at'),
                queryInterface.renameColumn('todos', 'updatedAt', 'updated_at')
            ]
        )
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    }
};
