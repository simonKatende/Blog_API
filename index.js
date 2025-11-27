const express = require("express");
const app = express();
const usersRouter = require("./routes/usersRouter.js");
const postRouter = require("./routes/postRouter.js");
const jwt = require("jsonwebtoken");
const authentication = require("./utils/authMiddleware.js");
require("dotenv").config();

//middlewares
app.use(express.json());

//authentication middleware
app.use(authentication);

//routes
app.use("/users", usersRouter);
app.use("/posts", postRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}...`);
});
