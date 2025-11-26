const express = require("express");
const router = express.Router();
const userTypeControllers = require("../Controllers/userTypeControllers.js");

const { PrismaClient } = require("../generated/prisma/index.js");
const prisma = new PrismaClient();

//adding a userType
router.post("/", userTypeControllers.createUserType);

//Retrieve all user types
router.get("/", userTypeControllers.getUserTypes);
module.exports = router;