const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv/config");

//Import Routes

const adminRoute = require('./routes/admins');

app.use(cors());
app.use(bodyParser.json  ());

app.use('/admin', adminRoute);

mongoose.connect(process.env.MONGO_URI, () =>
  console.log("~~~CONNECTED TO DB~~~")
);

app.listen(3000); 
