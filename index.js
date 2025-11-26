const express = require("express");
const app = express();
const loginRouter = require('./routes/loginRouter.js')
const usersRouter = require('./routes/usersRouter.js') 
const userTypeRouter = require('./routes/userTypeRouter.js')
const postRouter = require('./routes/postRouter.js')

//middleware
app.use(express.json());
app.use('/users', usersRouter) 
app.use('/userTypes', userTypeRouter)
app.use('/posts', postRouter) 
app.use('/login', loginRouter)


//JWT check


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}...`);
});
