const express = require("express");
const app = express();
const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

//middleware
app.use(express.json());

//JWT check

//login
app.post("/login", async (req, res) => {
  const Userlogin = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  res.send(Userlogin);
});

//adding a usertype
app.post("/usertypes", async (req, res) => {
  const new_usertype = await prisma.usertype.create({
    data: req.body,
  });

  res.send(new_usertype);
});

//Create a new user (Author)
app.post("/users", async (req, res) => {
  const new_user = await prisma.user.create({
    data: req.body,
  });

  res.send(new_user);
});

//Retrieve a user by ID
app.get("/users/:id", async (req, res) => {
  const userID = parseInt(req.params.id);

  const user = await prisma.user.findUnique({
    where: {
      id: userID,
    },
  });

  res.json(user);
});

//Create a new blog, containing author ID
app.post("/blogs", async (req, res) => {
  const { title, content, authorID } = req.body;

  const newblog = await prisma.post.create({
    data: {
      title,
      content,
      user: {
        connect: { id: authorID },
      },
    },
  });

  res.send(newblog);
});

//Retrieve a list of all posts
app.get("/blogs", async (req, res) => {
  const getPosts = await prisma.post.findMany();
  res.json(getPosts);
});

//Retrieve a single post by its ID, including author details
app.get("/blogs/:id", async (req, res) => {
  const postid = parseInt(req.params.id);

  const getpostwithauthor = await prisma.post.findUnique({
    where: {
      id: postid,
    },
  });

  const postauthor = await prisma.user.findUnique({
    where: {
      id: getpostwithauthor.userId,
    },
  });

  res.json({ getpostwithauthor, postauthor });
});

//Update an existing post's title or content
app.put("/blogs/:id", async (req, res) => {
  const postid = parseInt(req.params.id);
  const { title, content } = req.body;

  const updatedpost = await prisma.post.update({
    where: { id: postid },
    data: { title, content },
  });
  res.json({ message: "Post updated successfully", updatedpost });
});

//Delete a post by its ID
app.delete("/blogs/:id", async (req, res) => {
  const postid = parseInt(req.params.id);

  await prisma.post.delete({
    where: { id: postid },
  });

  res.json({ message: "Post deleted successfully" });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}...`);
});
