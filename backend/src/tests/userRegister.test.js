const { expect } = require('chai');
const userModel = require('../models/usersModel');

describe('Insere um novo usuário no BD WedClub', function () {
  const payloadUser = {
    name: 'Linus Torvals',
    email: 'superlinux@gmail.com',
    bio: 'Cara, eu sou muito fera!',
  };

  const { name, email, bio } = payloadUser;

  describe('quando é inserido com sucesso', function () {
    it('o objeto possui os atributos "name", "bio" e "email" do novo usuário inserido',
      async function () {
        const response = await userModel.usersRegister(name, email, bio);

        expect(response).to.be.a('object');
        expect(response.user).to.have.a.property('name');
        expect(response.user).to.have.a.property('bio');
        expect(response.user).to.have.a.property('email');

      const user = await userModel.getUserByName(name);
      const { _id } = user;
      await userModel.userRemove(_id);
    });
  });
});
