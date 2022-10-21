'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('users', [
            {
                fullname: 'Unasigned',
                email: 'Unasigned',
                status: false
            },
            {
                fullname: 'Dong',
                email: 'dong@gmail.com',
                status: false
            },
            {
                fullname: 'Thuan',
                email: 'thuan@gmail.com',
                status: false
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('users', null, {});
    }
};
