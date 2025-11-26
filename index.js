const express = require("express");
const app = express();
const usersRouter = require('./routes/usersRouter.js') 
const userTypeRouter = require('./routes/userTypeRouter.js')
const postRouter = require('./routes/postRouter.js')
const jwt = require("jsonwebtoken");
require("dotenv").config();

//middleware
app.use(express.json());

app.use((req, res, next) => {
  if(req.url === '/users/login'){
    next();
    return;
  }

  if(req.headers.authorization){
    if(req.headers.authorization.startsWith("Bearer ")){
      const token = req.headers.authorization.split(" ")[1];

      //Verity the token
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
          return res.send({message: "Invalid token"});
        }else{
          //token is valid
          req.jwtData = decoded; 
          return next();
        }
      });
    }
  }else{
    res.send({message: "No authorization header"})
  }
  
})

app.use('/users', usersRouter) 
app.use('/userTypes', userTypeRouter)
app.use('/posts', postRouter)




//JWT check


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}...`);
});
