const quiz = [
    {
      question: "What does CSS stand for?",
      answers: [
        { text: "Cascading Style Sheet", correct: true },
        { text: "Correct styling slot", correct: false },
        { text: "Convey sliding sheets", correct: false },
        { text: "chandaleir sheet style", correct: false }
      ]
    },
    {
      question: "What does /../ mean?",
      answers: [
        { text: "typo", correct: false },
        { text: "comment tag", correct: true },
        { text: "bad syntax", correct: false },
      ]
    },
    {
      question: "What does element does # affect?",
      answers: [
        { text: "html tag", correct: false },
        { text: "body tag", correct: false },
        { text: "ID", correct: true },
        { text: "ul tag", correct: false }
      ]
    }
  ];
  
  let questionIndex = 0;
  let score = 0;
  let timeLeft = 60;
  let timerId;
  
  const startBtn = document.getElementById("start-btn");
  const quizScreen = document.getElementById("quiz-screen");
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const timerEl = document.getElementById("time-left");
  const endScreenEl = document.getElementById("end-screen")
  
  function startQuiz() {
    startBtn.classList.add("hide");
    quizScreen.classList.remove("hide");
    displayQuestion();
    startTimer();
  }
  
  function displayQuestion() {
    const question = quiz[questionIndex];
    questionEl.innerText = question.question;
    answersEl.innerHTML = "";
    for (let i = 0; i < question.answers.length; i++) {
      const answer = question.answers[i];
      const answerBtn = document.createElement("button");
      answerBtn.classList.add("answer-btn");
      answerBtn.innerText = answer.text;
      if (answer.correct) {
        answerBtn.dataset.correct = true;
      }
      answerBtn.addEventListener("click", selectAnswer);
      answersEl.appendChild(answerBtn);
    }
  }
  
  function selectAnswer(event) {
    const selectedBtn = event.target;
    const correct = selectedBtn.dataset.correct;
    if (correct) {
      score++;
    } else {
      timeLeft -= 10;
    }
    questionIndex++;
    if (questionIndex < quiz.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }
  
  function startTimer() {
    timerId = setInterval(function() {
      timeLeft--;
      timerEl.innerText = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timerId);
        endQuiz();
      }
    }, 1000);
  }
  
function endQuiz() {
    clearInterval(timerId);
    quizScreen.classList.add("hide");
    endScreenEl.classList.remove("hide");
    const scoreEl = document.getElementById("score");
    scoreEl.innerText = score;
  
    const initialsForm = document.getElementById("initials-form");
    initialsForm.addEventListener("submit", saveHighScore);
    
    displayHighScores();
  }
  
  function saveHighScore(event) {
    event.preventDefault();
    const initialsInput = document.getElementById("initials");
    const initials = initialsInput.value;
    if (initials) {
      const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
      highScores.push({ initials, score });
      localStorage.setItem("highScores", JSON.stringify(highScores));
      displayHighScores();
    }
  }
  
  function displayHighScores() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.sort((a, b) => b.score - a.score);
    const highScoresList = document.getElementById("high-scores");
    highScoresList.innerHTML = "";
    for (let i = 0; i < highScores.length; i++) {
      const highScore = highScores[i];
      const listItem = document.createElement("li");
      listItem.innerText = `${highScore.initials}: ${highScore.score}`;
      highScoresList.appendChild(listItem);
    }
  }
    
  startBtn.addEventListener("click", startQuiz);
  