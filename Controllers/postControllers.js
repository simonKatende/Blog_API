const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const logFilePath = path.join(__dirname, "../blog_activity.log");

//Create a new blog, containing author ID
const createPost = async (req, res) => {
  try {
    const { title, content} = req.body;

    const newblog = await prisma.post.create({
      data: {
        title,
        content,
        user: {
          connect: { id: req.user.sub },
        },
      },
    });

    // Log successful post creation
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ✓ New blog post created successfully\n  Title: ${title}\n Post ID: ${newblog.id}\n\n`;
    fs.appendFileSync(logFilePath, logEntry);

    res.status(201).json({
      message: "Post created successfully",
      post: newblog,
    });
  } catch (error) {
    const timestamp = new Date().toISOString();
    const errorLog = `[${timestamp}] ✗ Error creating post: ${error.message}\n\n`;
    fs.appendFileSync(logFilePath, errorLog);
    res.status(500).json({ error: error.message });
  }
};

//Retrieve a list of all posts
const getPosts = async (req, res) => {
  const getPosts = await prisma.post.findMany();
  res.json(getPosts);
};

//Retrieve a single post by its ID, including author details
const getPostWithAuthor = async (req, res) => {
  const postid = parseInt(req.params.id);

  const getpostwithauthor = await prisma.post.findUnique({
    where: {
      id: postid,
    },
  });

  const postauthor = await prisma.user.findUnique({
    where: {
      id: getpostwithauthor.userId,
    }, select: { username: true, email: true },
  });

  res.json({ getpostwithauthor, postauthor });
};

//Update an existing post's title or content
const updatePost = async (req, res) => {
  const postid = parseInt(req.params.id);
  const { title, content } = req.body;

  const updatedpost = await prisma.post.update({
    where: { id: postid },
    data: { title, content },
  });
  res.json({ message: "Post updated successfully", updatedpost });
};

//Delete a post by its ID
const deletePost = async (req, res) => {
  const postid = parseInt(req.params.id);

  await prisma.post.delete({
    where: { id: postid },
  });

  res.json({ message: "Post deleted successfully" });
};

module.exports = {
  createPost,
  getPosts,
  getPostWithAuthor,
  updatePost,
  deletePost,
};
