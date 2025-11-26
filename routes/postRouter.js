const express = require("express");
const router = express.Router();
const postControllers = require("../Controllers/postControllers")


//Create a new blog, containing author ID
router.post("/", postControllers.createPost);

//Retrieve a list of all posts
router.get("/", postControllers.getPosts);

//Retrieve a single post by its ID, including author details
router.get("/:id", postControllers.getPostWithAuthor);


//Update an existing post's title or content
router.put("/:id", postControllers.updatePost);

//Delete a post by its ID
router.delete("/:id", postControllers.deletePost);

module.exports = router;