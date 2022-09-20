const { ObjectId } = require("mongoose").Types;
const { User } = require("../models");

// get total num of users

const totalUsers = async () =>
    User.aggregate().count("userCount").then((allUsers) => allUsers);

module.exports = {
    // gets all users
}