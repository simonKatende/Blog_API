const express = require('express');
const router = express.Router();
const usersController = require('../Controllers/usersController.js');
const restrictTo = require('../utils/restrictTo.js');

//Create a new user (Author)
router.post("/signup", usersController.createUser);

//User Login Endpoint
router.post("/login", usersController.loginUser);

//Retrieve a user by ID
router.get("/:id", restrictTo("ADMIN", "AUTHOR", "READER"), usersController.getUser);

//Retrieve all users with their user types
router.get("/", restrictTo("ADMIN"), usersController.getUsers);

module.exports = router