module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.bulkInsert('Users', [
      {
        email: 'user1@example.com',
        password: 'hashedPassword1',
      },
      {
        email: 'user2@example.com',
        password: 'hashedPassword2',
      }
    ]),
  down: (queryInterface, Sequelize) => 
    queryInterface.bulkDelete('Users', null, {}),
};
