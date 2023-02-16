'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        idUser: 1,
        command: "change",
        idPrice: 1,
        code: "25135988745125",
        serial: "257874132133313",
        status: "Success"
      },
      {
        idUser: 1,
        command: "change",
        idPrice: 2,
        code: "25135988745125",
        serial: "257874132133313",
        status: "Penanty"
      },
      {
        idUser: 1,
        command: "change",
        idPrice: 3,
        code: "25135988745125",
        serial: "257874132133313",
        status: "Success"
      },
      {
        idUser: 1,
        command: "change",
        idPrice: 4,
        code: "25135988745125",
        serial: "257874132133313",
        status: "Success"
      },
      {
        idUser: 1,
        command: "change",
        idPrice: 5,
        code: "25135988745125",
        serial: "257874132133313",
        status: "Error"
      },
      {
        idUser: 1,
        command: "buy",
        idPrice: 1,
        code: "25135988745125",
        serial: "257874132133313",
        status: "Success"
      },
      {
        idUser: 1,
        command: "buy",
        idPrice: 2,
        code: "25135988745125",
        serial: "257874132133313",
        status: "Success"
      },
      {
        idUser: 1,
        command: "buy",
        idPrice: 3,
        code: "25135988745125",
        serial: "257874132133313",
        status: "Success"
      },
      {
        idUser: 1,
        command: "buy",
        idPrice: 4,
        code: "25135988745125",
        serial: "257874132133313",
        status: "Success"
      },
      {
        idUser: 1,
        command: "buy",
        idPrice: 5,
        code: "25135988745125",
        serial: "257874132133313",
        status: "Success"
      },
      //User2
      {
        idUser: 2,
        command: "change",
        idPrice: 1,
        code: "25135988745125",
        serial: "257874132133313",
        status: "Success"
      },
      {
        idUser: 2,
        command: "change",
        idPrice: 2,
        code: "25135988745125",
        serial: "257874132133313",
        status: "Penanty"
      },
      {
        idUser: 2,
        command: "change",
        idPrice: 3,
        code: "25135988745125",
        serial: "257874132133313",
        status: "Success"
      },
      {
        idUser: 2,
        command: "change",
        idPrice: 4,
        code: "25135988745125",
        serial: "257874132133313",
        status: "Error"
      },
      {
        idUser: 2,
        command: "change",
        idPrice: 5,
        code: "25135988745125",
        serial: "257874132133313",
        status: "Success"
      },
      {
        idUser: 2,
        command: "buy",
        idPrice: 1,
        code: "25135988745125",
        serial: "257874132133313",
        status: "Success"
      },
      {
        idUser: 2,
        command: "buy",
        idPrice: 2,
        code: "25135988745125",
        serial: "257874132133313",
        status: "Success"
      },
      {
        idUser: 2,
        command: "buy",
        idPrice: 3,
        code: "25135988745125",
        serial: "257874132133313",
        status: "Success"
      },
      {
        idUser: 2,
        command: "buy",
        idPrice: 4,
        code: "25135988745125",
        serial: "257874132133313",
        status: "Success"
      },
      {
        idUser: 2,
        command: "buy",
        idPrice: 5,
        code: "25135988745125",
        serial: "257874132133313",
        status: "Success"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
