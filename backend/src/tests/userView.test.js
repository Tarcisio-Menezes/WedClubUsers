const { expect } = require('chai');
const usersModel = require('../models/usersModel');

describe('Visualiza usuários do BD WedClub', function () {
  it('os usuários podem ser visualizados?', async function () {
  const response = await usersModel.getAllUsers();
  expect(response).to.be.a('array');
  });
});
