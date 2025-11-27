const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { use } = require("react");
require("dotenv").config();

//Create a new user
const createUser = async (req, res) => {
  bcrypt.hash(req.body.password, 10, async (err, hashed) => {
    if (!err) {
      const newUser = await prisma.user.create({
        data: {
          username: req.body.username,
          email: req.body.email,
          password: hashed,
          roles: req.body.roles,
        },
      });

      if (!newUser) {
        res.send({ message: "Error creating user" });
        return;
      }
      res.send({ Message: "User created successfully", user: newUser });
    }
  });
};

//user Login Endpoint
const loginUser = async (req, res) => {
  //body should have email and password
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      username: true,
      email: true,
      password: true,
      roles: true,
    },
  });

  if (user) {
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        //create the payload for JWT
        const payload = {
          sub: user.id,
          name: user.username,
          roles: user.roles,
        };

        //create the token
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: "1h" },
          (err, token) => {
            if (err) {
              return res.send({ message: "Error generating token" });
            } else {
              res.send({ message: "Login successful", token: token });
            }
          }
        );
      } else {
        return res.send({ message: "Invalid email or password" });
      }
    });
  } else {
    return res.send({ message: "Invalid email or password" });
  }
};

//Retrieve a user by ID
const getUser = async (req, res) => {
  const userID = parseInt(req.params.id);

  const user = await prisma.user.findUnique({
    where: {
      id: userID,
    },
  });

  res.json(user);
};

//Retrieve all users
const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

module.exports = {
  createUser,
  loginUser,
  getUser,
  getUsers,
};
