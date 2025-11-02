const express = require('express');
const app = express();
const {PrismaClient} = require('./generated/prisma')
const prisma = new PrismaClient()

//middleware
app.use(express.json())

//adding a usertype
app.post("/usertypes", async (req, res) => {
  const new_usertype = await prisma.usertype.create({
    data: req.body
  });

  res.send(new_usertype)
});


//adding a user
app.post("/users", async (req, res) => {
  const new_user = await prisma.user.create({
    data: req.body
  });

  res.send(new_user)
});



const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}...`)
})