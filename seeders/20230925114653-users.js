'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        id: 'ebb72863-1a95-4e08-88d4-913d70f33185',
        fullname: 'Admin',
        username: 'admin',
        password: bcrypt.hashSync('password', 10),
        email: 'admin@mail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('user_has_roles', [
      {
        userId: 'ebb72863-1a95-4e08-88d4-913d70f33185',
        roleId: '6a8507d7-a192-4bac-bd86-9f3fed89262b',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users');
  },
};
