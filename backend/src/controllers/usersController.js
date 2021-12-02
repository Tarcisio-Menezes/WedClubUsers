const joi = require('joi');
const rescue = require('express-rescue');
const service = require('../services/usersService');

const registerUser = rescue(async (req, res, next) => {
  const { error } = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    bio: joi.string().required(),
  }).validate(req.body);

  if (error) return next(error);

  const { name, email, bio } = req.body;

  const result = await service.registerUser({ name, email, bio });
  if (result.error) return next(result.error);
  return res.status(201).json(result);
});

const getAllUsers = rescue(async (_req, res, next) => {
  const users = await service.getAllUsers();
  if (users.error) return next(users.error);
  return res.status(200).json(users);
});

const getUserByName = rescue(async (req, res, next) => {
  const { name } = req.params;

  const result = await service.getUserByName(name);
  if (result.error) return next(result.error);
  return res.status(200).json(result);
});

const userEdit = rescue(async (req, res, next) => {
  const { error } = joi.object({
    name: joi.string().required(),
    bio: joi.string().required(),
  }).validate(req.body);

  if (error) return next(error);

  const { name, bio } = req.body;
  const { id } = req.params;

  const edit = await service.userEdit(id, name, bio);
  if (edit.error) return next(edit.error);
  return res.status(200).json(edit);
});

const addImageInUser = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { imagePath } = req;
  const result = await service.addImageInUser(id, imagePath);
  if (result.error) return next(result.error);
  return res.status(200).json(result);
});

const userRemove = rescue(async (req, res, next) => {
  const { id } = req.params;
  const result = await service.userRemove(id);
  if (result.error) return next(result.error);
  return res.status(204).send();
});

module.exports = {
  registerUser,
  getAllUsers,
  getUserByName,
  userEdit,
  addImageInUser,
  userRemove,
};
