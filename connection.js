const express = require("express");
const { connect, connection } = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(require("./routes"));

mongoose.connect(process.env.MONGODB_URI || "", {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});


module.exports = connection;
app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));