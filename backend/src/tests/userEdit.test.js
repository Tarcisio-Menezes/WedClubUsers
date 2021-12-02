const { expect } = require('chai');
const userModel = require('../models/usersModel');

describe('Edita um user no BD', function () {
  const payloadUser = {
    name: 'Linus Torvals',
    email: 'superlinux@gmail.com',
    bio: 'Cara, eu sou muito fera!',
  };

  const { name, email, bio } = payloadUser;

  describe('retorna um objeto', function () {
    it('a reposta é um objeto', async function () {
      const response = await userModel.userEdit(name, email, bio);

      expect(response).to.be.a('object');
    });
  });
});
