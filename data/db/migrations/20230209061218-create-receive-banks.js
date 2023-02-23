'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ReceiveBanks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idBank: {
        type: Sequelize.INTEGER,
        references: {
          model: "Banks",
          key: "id"
        }
      },
      number: {
        type: Sequelize.STRING
      },
      owner: {
        type: Sequelize.STRING
      },
      branch: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ReceiveBanks');
  }
};