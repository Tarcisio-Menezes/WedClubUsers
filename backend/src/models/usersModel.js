const { ObjectId } = require('mongodb');
const connection = require('./connection');

const userExists = async (email) => {
  try {
    const db = await connection();
    const search = await db.collection('users').findOne({ email });
    if (search) return search;
    return false;
  } catch (err) {
      return ({
        error: 'Error when looking for users in the database',
        code: err,
      });
    }
};

const getUserById = async (id) => {  
  try {
    const db = await connection();
    const search = await db.collection('users').findOne({ _id: ObjectId(id) });
    if (search) return search;
    return false;
  } catch (err) {
      return ({
        error: 'Error when looking for user_id in the database',
        code: err,
      });
    }
};

const usersRegister = async (name, email, bio) => {
  try {
    const db = await connection();
    const register = await db.collection('users').insertOne({ name, email, bio });
    return ({
      user: {
        name,
        email,
        bio,
        _id: register.insertedId,
      },
    });
  } catch (err) {
      return ({
        error: { message: 'An error occurred with the database', code: err },
      });
    }
};

const getAllUsers = async () => {
  try {
    const db = await connection();
    return db.collection('users').find().toArray();
  } catch (err) {
      return ({
        error: { message: 'An error occurred in search in the database', code: err },
      });
  }
};

const getUserByName = async (name) => {
  try {
    const db = await connection();
    const search = await db.collection('users').findOne({ name });
    if (search) return search;
    return false;
  } catch (err) {
      return ({
        error: 'Error when looking for users in the database',
        code: err,
      });
    }
};

const userEdit = async (id, name, bio) => {
  try {
    const db = await connection();
    await db.collection('users').updateOne({ _id: ObjectId(id) }, 
    { $set: { name, bio } });
    return ({ _id: id, name, bio });
  } catch (err) {
      return ({
        error: 'Error when edit user in the database',
        code: err,
      });
  }
};

const addImageInUser = async (id, imagePath) => {
  try {
    const db = await connection();
    const user = await getUserById(id);
    const { name, email, bio } = user;
    await db.collection('users').updateOne({ _id: ObjectId(id) },
      { $set: { name, email, bio, imagePath } });
    return ({ _id: id, name, email, bio, imagePath });
  } catch (err) {
      return ({
        error: 'Error when add image in the database',
        code: err,
      });
  }
};

const userRemove = async (id) => {
  try {
    const db = await connection();
    return db.collection('users').deleteOne({ _id: ObjectId(id) });
  } catch (err) {
      return ({
        error: 'Error when remove user in the database',
        code: err,
      });
  }
};

module.exports = {
  usersRegister,
  userExists,
  getAllUsers,
  getUserByName,
  userEdit,
  getUserById,
  addImageInUser,
  userRemove,
};
