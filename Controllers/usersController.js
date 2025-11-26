const e = require("express");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Create a new user (Author)
const createUser = async (req, res) => {
  const createUser = await prisma.user.create({
    data: req.body,
  });

  res.send(createUser);
}

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
      usertype: {           
        select: { usertype: true }
      }
    }
  });

  if (!user) {
    return res.send({ message: "User not found" });
  }

  if (user.password !== password) {
    return res.send({ message: "Invalid email or password" });
  }

  //create the payload for JWT
  const payload = {
    sub: user.id,
    name: user.username,
    userType: user.usertype,
  }

  //create the token
  jwt.sign(
    payload,
    process.env.JWT_SECRET, { expiresIn: "1h" },
    (err, token) => {
      if (err) {
        return res.send({ message: "Error generating token" });
      } else{
        res.send({message: "Login successful", token: token});
      }
    }
    );

}


//Retrieve a user by ID
const getUser = async (req, res) => {
  const userID = parseInt(req.params.id);

  const user = await prisma.user.findUnique({
    where: {
      id: userID,
    },
  });

  res.json(user);
}

//Retrieve all users with their user types
const getUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    include: { usertype: true},
  });
  res.json(users);
}

module.exports = {
  createUser,
  loginUser,
  getUser,
  getUsers
};