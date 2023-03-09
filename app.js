const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Victim = require("./models/Victim");

require("dotenv/config");

//Import Routes

const adminRoute = require("./routes/admins");

app.use(cors());
app.use(bodyParser.json());

app.use("/admin", adminRoute);

//Find victim
app.post("/findByAadhar", async (req, res) => {
  try {
    const victim = await Victim.findOne({ aadhar: req.body.aadhar });
    res.status(200).send(victim);
  } catch (err) {
    res.status(401).send({
      message: "Not Found",
      error: err,
    });
  }
});

app.post("/findByPhone", async (req, res) => {
  try {
    const victim = await Victim.findOne({ phone: req.body.phone });
    res.status(200).send(victim);
  } catch (err) {
    res.status(401).send({
      message: "Not Found",
      error: err,
    });
  }
});

mongoose.connect(process.env.MONGO_URI, () =>
  console.log("~~~CONNECTED TO DB~~~")
);

const listener = app.listen(5000);
console.log("Express server listening on port %d", listener.address().port);
