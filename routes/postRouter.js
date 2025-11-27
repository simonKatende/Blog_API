const express = require("express");
const router = express.Router();
const postControllers = require("../Controllers/postControllers");
const restrictTo = require('../utils/restrictTo.js');


//Create a new blog, containing author ID
router.post("/", restrictTo("ADMIN", "AUTHOR"), postControllers.createPost);

//Retrieve a list of all posts
router.get("/", restrictTo("ADMIN", "AUTHOR", "READER"), postControllers.getPosts);

//Retrieve a single post by its ID, including author details
router.get("/:id", restrictTo("ADMIN", "AUTHOR", "READER"), postControllers.getPostWithAuthor);

//Update an existing post's title or content
router.put("/:id", restrictTo("ADMIN", "AUTHOR"), postControllers.updatePost);

//Delete a post by its ID
router.delete("/:id", restrictTo("ADMIN", "AUTHOR"), postControllers.deletePost);

module.exports = router;