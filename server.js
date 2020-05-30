const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const questions = require("./models/questions.json");

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Send every request to the React app
// Define any API routes before this runs

app.use(express.json());



app.get("/api/questions/", function (req, res) {
  const questionsList = Object.values(questions);

  const noAnswerList = questionsList.map(question => {
    delete question.answer;
    return question
  });

  res.send(noAnswerList);
});



app.post("/api/answer/", function (req, res) {
  const userQuestionId = req.body.id;
  const userAnswer = req.body.answer;
  const correctAnswer = questions.find(question => question.id === userQuestionId);

  if (correctAnswer !== undefined) {
    res.send({ ...req.body, correct: correctAnswer.toLowerCase() === userAnswer.toLowerCase() });
  } else {
    res.status(500).send(req.body)
  }
});



app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});



app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
