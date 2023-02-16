'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        userName: "user1",
        displayName: "User1",
        fullName: "HGA User1",
        adress: "43d/10",
        email: "user1@gmail.com",
        phone: "0943830707",
        surplus: "3500000",
        admin: false
      },
      {
        userName: "user2",
        displayName: "User2",
        fullName: "HGA User2",
        adress: "43d/10",
        email: "user2@gmail.com",
        phone: "0943830707",
        surplus: "3500000",
        admin: false
      },
      {
        userName: "user3",
        displayName: "User3",
        fullName: "HGA User3",
        adress: "43d/10",
        email: "user3@gmail.com",
        phone: "0943830707",
        surplus: "3500000",
        admin: false
      },
      {
        userName: "user4",
        displayName: "User4",
        fullName: "HGA User4",
        adress: "43d/10",
        email: "user4@gmail.com",
        phone: "0943830707",
        surplus: "3500000",
        admin: false
      },
      {
        userName: "user5",
        displayName: "User5",
        fullName: "HGA User5",
        adress: "43d/10",
        email: "user5@gmail.com",
        phone: "0943830707",
        surplus: "3500000",
        admin: false
      },
      {
        userName: "user6",
        displayName: "User6",
        fullName: "HGA User6",
        adress: "43d/10",
        email: "user6@gmail.com",
        phone: "0943830707",
        surplus: "3500000",
        admin: false
      },
      {
        userName: "user7",
        displayName: "User7",
        fullName: "HGA User7",
        adress: "43d/10",
        email: "user7@gmail.com",
        phone: "0943830707",
        surplus: "3500000",
        admin: false
      },
      {
        userName: "user8",
        displayName: "User8",
        fullName: "HGA User8",
        adress: "43d/10",
        email: "user8@gmail.com",
        phone: "0943830707",
        surplus: "3500000",
        admin: false
      },
      {
        userName: "user9",
        displayName: "User9",
        fullName: "HGA User9",
        adress: "43d/10",
        email: "user9@gmail.com",
        phone: "0943830707",
        surplus: "3500000",
        admin: false
      },
      {
        userName: "user10",
        displayName: "User10",
        fullName: "HGA User10",
        adress: "43d/10",
        email: "user10@gmail.com",
        phone: "0943830707",
        surplus: "3500000",
        admin: false
      },
      {
        userName: "user11",
        displayName: "User11",
        fullName: "HGA User11",
        adress: "43d/10",
        email: "user11@gmail.com",
        phone: "0943830707",
        surplus: "3500000",
        admin: false
      },
      {
        userName: "user12",
        displayName: "User12",
        fullName: "HGA User12",
        adress: "43d/10",
        email: "user12@gmail.com",
        phone: "0943830707",
        surplus: "3500000",
        admin: false
      },
      {
        userName: "user13",
        displayName: "User13",
        fullName: "HGA User13",
        adress: "43d/10",
        email: "user13@gmail.com",
        phone: "0943830707",
        surplus: "3500000",
        admin: false
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
