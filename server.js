const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const questions = require("./models/questions.json");
const answers = require("./models/answers.json");

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Send every request to the React app
// Define any API routes before this runs

app.use(express.json())

app.get("/api/questions/", function (req, res) {
  const questionsList = Object.values(questions);
  res.send(questionsList);
});

app.post("/api/answer/", function (req, res) {
  console.log("got in")
  console.log(req.body)
  res.send({ ...req.body, correct: true })
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
