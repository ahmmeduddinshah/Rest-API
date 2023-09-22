const { v4: uuidv4 } = require("uuid");
const User = require("../models/userModel");

const handleGetUsers = async (req, res) => {
  try {
    res
      .status(200)
      .send({ success: true, message: "All Users", Users: await User.find() });
  } catch (error) {
    res.status(500).send({ success: false, errMsg: error.message });
  }
};

const handleGetUser = async (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: "One User",
      User: await User.findOne({ id: req.params.id }),
    });
  } catch (error) {
    res.status(500).send({ success: false, errMsg: error.message });
  }
};

const handleCreateUser = async (req, res) => {
  try {
    const newUser = await new User({
      id: uuidv4(),
      username: req.body.username,
      email: req.body.email,
    }).save();
    res.status(201).send({
      success: true,
      message: "A New User has been Created Successfully.",
      info: newUser,
    });
  } catch (error) {
    res.status(500).send({ success: false, errMsg: error.message });
  }
};

const handleUpdateUser = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    user.username = req.body.username;
    user.email = req.body.email;
    await user.save();
    res.status(201).send({
      success: true,
      message: "A Selected User has been Updated Successfully.",
      updatedUser: user,
    });
  } catch (error) {
    res.status(500).send({ success: false, errMsg: error.message });
  }
};

const handleDeleteUser = async (req, res) => {
  try {
    await User.deleteOne({ id: req.params.id });
    res.status(200).send({
      success: true,
      message: "A Selected User has been Deleted Successfully.",
    });
  } catch (error) {
    res.status(500).send({ success: false, errMsg: error.message });
  }
};

module.exports = {
  handleGetUsers,
  handleGetUser,
  handleCreateUser,
  handleUpdateUser,
  handleDeleteUser,
};
