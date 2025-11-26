const e = require("express");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

//Create a new user (Author)
const createUser = async (req, res) => {
  const createUser = await prisma.user.create({
    data: req.body,
  });

  res.send(createUser);
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
  getUser,
  getUsers
};