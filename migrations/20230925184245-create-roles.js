'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
async up(queryInterface, Sequelize) {
  await queryInterface.createTable('roles', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    displayName: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    guard: {
      allowNull: false,
      type: Sequelize.STRING,
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
  await queryInterface.dropTable('roles');
},
};