const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

//adding a userType
const createUserType = async (req, res) => {
  const new_userType = await prisma.userType.create({
    data: req.body,
  });

  res.send(new_userType);
};

//Retrieve all user types
const getUserTypes = async (req, res) => {
  const get_userTypes = await prisma.usertype.findMany();
  res.json(get_userTypes);
}

module.exports = {
  createUserType,
  getUserTypes
};