const express = require('express')
const router = express.Router()
const usersController = require('../Controllers/usersController.js')

//Create a new user (Author)
router.post("/signup", usersController.createUser);

//User Login Endpoint
router.post("/login", usersController.loginUser);

//Retrieve a user by ID
router.get("/:id", usersController.getUser);

//Retrieve all users with their user types
router.get("/", usersController.getUsers);


module.exports = router