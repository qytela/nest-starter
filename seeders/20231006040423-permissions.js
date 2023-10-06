'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('permissions', [
      {
        id: '58e044d0-f644-4382-a865-b3de862e3828',
        name: 'create-book',
        displayName: 'Create Book',
        description: 'Can Create Book',
        guard: 'api',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'aed2f2a1-7950-4b6f-b5f6-b3a2ebae7455',
        name: 'read-book',
        displayName: 'Read Book',
        description: 'Can Read Book',
        guard: 'api',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '39fdb624-5137-42cb-b16d-2692342bc3c1',
        name: 'update-book',
        displayName: 'Update Book',
        description: 'Can Update Book',
        guard: 'api',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'a1f9d18f-6b97-4796-90a7-e0692a0ac895',
        name: 'delete-book',
        displayName: 'Delete Book',
        description: 'Can Delete Book',
        guard: 'api',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permissions');
  },
};
