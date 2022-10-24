'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users', null,
            {
                truncate: true, cascade: true,
                restartIdentity: true
            });
        await queryInterface.bulkDelete('roles', null, {
            truncate: true, cascade: true,
            restartIdentity: true
        });
        await queryInterface.bulkInsert('roles', [
            {
                name: 'Admin',
                role_code: 'ADMIN',
                description: '',
                status: true
            },
            {
                name: 'User',
                role_code: 'USER',
                description: '',
                status: true
            }
        ]);

        const roleUser = await queryInterface.sequelize.query(
            `Select id from roles where role_code = 'USER';`
        );
        const roleUserRow = roleUser[0];

        await queryInterface.bulkInsert('users', [
            {
                fullname: 'Unasigned',
                email: 'Unasigned',
                status: false,
                role_id: roleUserRow[0].id
            },
            {
                fullname: 'Dong',
                email: 'dong@gmail.com',
                status: false,
                role_id: roleUserRow[0].id
            },
            {
                fullname: 'Thuan',
                email: 'thuan@gmail.com',
                status: false,
                role_id: roleUserRow[0].id
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        const {sequelize} = queryInterface;
    }
};
