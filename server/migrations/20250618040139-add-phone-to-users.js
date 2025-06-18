'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'phone', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('users', 'phone');
  },
};
