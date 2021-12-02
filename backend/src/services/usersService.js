const { ObjectId } = require('mongodb');
const model = require('../models/usersModel');
const { validEmail } = require('../utils/validations');

const registerUser = async ({ name, email, bio }) => {
  const existingRegister = await model.userExists(email);
  if (existingRegister) {
    return {
      error: { code: 'conflict' },
    };
  }

  if (!validEmail(email)) {
    return {
      error: { code: 'invalid' },
    };
  }

  if (validEmail(email) && !existingRegister) {
    return model.usersRegister(name, email, bio);
  }
};

const getAllUsers = () => model.getAllUsers();

const getUserByName = async (name) => {
  const result = await model.getUserByName(name);
  if (!result) {
    return ({
      error: { code: 'userNotFound' },
    });
  } return result;
};

const userEdit = async (id, name, bio) => {
  if (ObjectId.isValid(id)) {
    const userExist = await model.getUserById(id);
    if (userExist) return model.userEdit(id, name, bio);
    return ({ error: { code: 'userNotFound' } });
  } return ({ error: { code: 'userNotFound' } });
};

const addImageInUser = async (id, imagePath) => {
  if (ObjectId.isValid(id)) {
    const validUser = await model.getUserById(id);
    if (validUser) return model.addImageInUser(id, imagePath);
    return ({ error: { code: 'userNotFound' } });
  } return ({ error: { code: 'userNotFound' } });
};

const userRemove = async (id) => {
  if (ObjectId.isValid(id)) {
    const validUser = await model.getUserById(id);
    if (validUser) return model.userRemove(id);
    return ({ error: { code: 'userNotFound' } });
  } return ({ error: { code: 'userNotFound' } });
};

module.exports = {
  registerUser,
  getAllUsers,
  getUserByName,
  userEdit,
  addImageInUser,
  userRemove,
};
