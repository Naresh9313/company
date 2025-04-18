const express = require("express");
const app=express();
const mongoose = require("mongoose");
const route = require('./routes/allRoutes');

require("dotenv").config();

const PORT = process.env.PORT

app.listen(PORT,() =>{
    console.log(`Server Running on Port ${PORT}`)
})

mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use(express.json());

app.use('',route);
