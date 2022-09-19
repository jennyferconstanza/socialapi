const { connect, connection } = require("mongoose");

const connectionString =
process.env.MONGODB_URI || '';

connect(connectionString, {
 useNewURL: true,
    useUnified: true,
});
module.exports = connection;