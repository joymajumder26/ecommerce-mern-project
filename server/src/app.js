const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const userRouter = require("./routers/userRouter");
const { seedUser } = require("./controllers/seedController");
const seedRouter = require("./routers/seedRouter");
const { errorResponse } = require("./controllers/responseController");
const authRouter = require("./routers/authRouter");
const app = express();

const rateLimiter = rateLimit({
  //koybar request pathaite parbo minute a
  window: 1 * 60 * 100, // 1 minute
  max: 5,
  message: "Too many request from this IP..Please try again later", //5 minute er besi hole ai message dibe
});

app.use(rateLimit());
app.use(xssClean());
app.use(morgan("dev")); //error ta dekhabe terminal a
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/users',userRouter)
app.use('/api/seed',seedRouter)
app.use('/api/auth',authRouter)



app.get("/test", (req, res) => {
  res.status(200).send({ message: "api is working perfectly" }); //json format a dekhabe
});



//client error handling
app.use((req, res, next) => {
 
  next(createError(404, "Route not found"));
});
//server error handling ->all the errors
app.use((err, req, res, next) => {
  //jodi route na pay tahle server a ai error dibe

  return errorResponse(res,
    {
      statusCode:err.status,
      message:err.message
    })
});

module.exports = app;
