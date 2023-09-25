'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        id: '6a8507d7-a192-4bac-bd86-9f3fed89262b',
        name: 'admin',
        displayName: 'Admin',
        guard: 'api',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '9e54c310-2eba-4574-918a-a9309aab3815',
        name: 'user',
        displayName: 'User',
        guard: 'api',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles');
  },
};
