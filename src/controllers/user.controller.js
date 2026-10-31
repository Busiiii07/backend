const service = require('../services/userService');

const createUser = async (req, res) => {
  res.status(201).json({ success: true, data: await service.createUser(req.body) });
};

const getAllUsers = async (req, res) => {
  res.status(200).json({ success: true, ...(await service.getAllUsers(req.query)) });
};

const getUserById = async (req, res) => {
  res.status(200).json({ success: true, data: await service.getUserById(req.params.id) });
};

const updateUser = async (req, res) => {
  res.status(200).json({ success: true, data: await service.updateUser(req.params.id, req.body) });
};

const deactivateUser = async (req, res) => {
  res.status(200).json({ success: true, data: await service.deactivateUser(req.params.id) });
};

module.exports = { createUser, getAllUsers, getUserById, updateUser, deactivateUser };