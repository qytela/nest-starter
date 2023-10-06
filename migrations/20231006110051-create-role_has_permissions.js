'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('role_has_permissions', {
      roleId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'roles',
          key: 'id',
        },
      },
      permissionId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'permissions',
          key: 'id',
        },
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
    await queryInterface.dropTable('role_has_permissions');
  },
};
