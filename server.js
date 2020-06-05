const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const questions = require("./models/questions.json");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(express.json());


app.get("/api/questions/", function (req, res) {
  const questionsList = Object.values(questions);

  const noAnswer = questionsList.map(item =>
    ({
      id: item.id,   
      question: item.question,
      options: item.options
    }));
  res.send(noAnswer);
});


 
app.post("/api/answer/", function (req, res) {
  const userQuestionId = req.body.id;
  const userAnswer = req.body.answer;
  const correctAnswer = questions.find(question => question.id === userQuestionId).answer;

  if (correctAnswer !== undefined) {
    res.send({ ...req.body, correct: correctAnswer.toLowerCase() === userAnswer.toLowerCase() });
  } else {
    res.status(500).send(req.body);
  }
});


app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
