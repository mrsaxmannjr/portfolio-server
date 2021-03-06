const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("./public"));
app.use(cors());

const mailer = require("./mailer");

app.post("/send", (req, res) => {
  const message = {
    from: process.env.FROM_EMAIL,
    to: process.env.TO_EMAIL,
    subject: "Site Contact Form",
    text: `From: ${req.body.email}\n Name: ${req.body.name} \n Sent: ${new Date()} \nMessage:\n${req.body.message}`,
  };

  mailer
    .sendMessage(message)
    .then(() => {
      res.json({
        message: "Email sent.",
      });
    }).catch(error => {
      res.status(500);
      res.json({
        error,
      });
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
