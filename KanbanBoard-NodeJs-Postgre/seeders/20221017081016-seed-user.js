'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('users', [
            {
                fullname: 'Dong',
                email: 'dong@gmail.com',
            },
            {
                fullname: 'Thuan',
                email: 'thuan@gmail.com',
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('users', null, {});
    }
};
