require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

//init middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/consumers";

mongoose
  .connect(MONGODB_URI || "mongodb://localhost/consumers", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

//requiring routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/consumers", require("./routes/consumers"));

//serving static in production build
if (process.env.NODE_ENV === "production") {
  //setting static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 9999;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
