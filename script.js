
    
    // list of all questions, choices, and answers
  var questions = [
    {
      title: "Which one is a fruit:",
      choices: ["radish", "potato", "tomato", "steak"],
      answer: "tomato"
    },
    {
      title: "How many legs does spidey have",
      choices: ["2", "4", "6", "8"],
      answer:"8"
    },
    {
      title: "How do you say I want to eat that in Japanese.",
      choices: [
        "Taberu",
        "Tabemasu",
        "Tabetai",
        "TabeTabe"
      ],
      answer:"Tabetai"
    },
    {
      title: "Which ones are variables in C# ",
      choices: ["string", 
      "int", 
      "double", 
      "char", 
      "bool",
      "All of the above"],
      answer:"All of the above"
    },
    {
      title:"What animals are mammals",
      choices: ["Bears", 
      "Fish", 
      "Spiders", 
      "Whales",
      "Bears and Whales",
      "Fish and Spiders"],
      answer:"Bears and Whales"
    },

    ];

   // below are my question js 
   // variables to keep track of quiz state
  var currentQuestionIndex = 0;
  var time = questions.length * 20;
  var timerId;
  
  // variables to reference DOM elements
  var questionsEl = document.querySelector("#questions");
  var timerEl = document.querySelector("#time");
  var choicesEl = document.querySelector("#choices");
  var submitBtn = document.querySelector("#submit");
  var startBtn = document.querySelector("#start");
  var initialsEl = document.querySelector("#initials");
  var feedbackEl = document.querySelector("#feedback");
  
  // my cool sound effects for right and wrong answers
  var sfxRight = new Audio("sfx/correct.wav");
  var sfxWrong = new Audio("sfx/wrong.wav");
  
  function BeginQz() {
    // hides in the start screen
    var startScreenEl = document.querySelector("#start-screen");
    startScreenEl.setAttribute("class", "hide");
  
    //This will un-hide questions section
    questionsEl.removeAttribute("class");
  
    // This will start timer
    timerId = setInterval(clockTick, 1100);
  
    // show starting time
    timerEl.textContent = time;
  
    getQst();
  }
  
  function getQst() {
    // get current question object from array
    var currentQuestion = questions[currentQuestionIndex];
  
    // update title with current question
    var titleEl = document.querySelector("#question-title");
    titleEl.textContent = currentQuestion.title;
  
    // clear out any old question choices
    choicesEl.innerHTML = "";
  
    // loop over choices
    currentQuestion.choices.forEach(function(choice, i) {
      // create new button for each choice
      var choiceNode = document.createElement("button");
      choiceNode.setAttribute("class", "choice");
      choiceNode.setAttribute("value", choice);
  
      choiceNode.textContent = i + 1 + " . " + choice;
  
      // attach click event listener to each choice
      choiceNode.onclick = questionClick;
  
      // display on the page
      choicesEl.appendChild(choiceNode);
    });
  }
  
  function questionClick() {
    // check if user guessed wrong
    if (this.value !== questions[currentQuestionIndex].answer) {
      // penalize time
      time -= 90;
  
      if (time < 0) {
        time = 0;
      }
  
      // this will show new time
      timerEl.textContent = time;
  
      //Want ot display wrong sound effect
     sfxWrong.play();
  
      feedbackEl.textContent = "Sorry that is Wrong -_-!";
    } else {

    // play "correct" sound effect
      sfxRight.play();
        feedbackEl.textContent = "You Correct! O_o";
    }
   //pops a right or wrong data on page for few second
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback hide");
    }, 1500);
  
    // this code take user to the following questions
    currentQuestionIndex++;
  
    // check if we've run out of questions
    if (currentQuestionIndex === questions.length) {
      endQuiz();
    } else {
      getQst();
    }
  }
  
  function endQuiz() {
    // stopping timer here.
    clearInterval(timerId);
  
    // The end screen will appear

    var endScreenEl = document.querySelector("#end-screen");
    endScreenEl.removeAttribute("class");
  
    // this is to show the final score
    var finalScoreEl = document.querySelector("#final-score");
    finalScoreEl.textContent = time;
  
    // hide questions section
    questionsEl.setAttribute("class", "hide");
  }
  
  function clockTick() {
    // this will update the code.
    time--;
    timerEl.textContent = time;
  
    //this will indicated if users ran out of time.
    if (time <= 0) {
      endQuiz();
    }
  }
  //lskdjflsdkj
  // here is the function for saving hi score.

  function saveHiScore(event) {
    //console.log(event)

    event.preventDefault();
    // get value of input box
    var initials = initialsEl.value.trim();
  
    // make sure value wasn't empty
    if (initials !== "") {
      // get saved scores from local storage, or if not any, set to empty array
      var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
      console.log(highscores)
        // format new score object for current user
      var newScore = {
        score: time,
        initials: initials
      };
      // this .push function will save to local storage
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
      window.location.href = "./highscores.html"
      // want to display a list on the left side when they click "score sheet" to view results.

     }
  }
  // here its when you press enter it should show you your high score.
    function checkEnter(event) {
    // "13" represents the enter key
    if (event.key === "Enter") {
      saveHiScore();
    }
  }
  // user clicks button to start quiz
  startBtn.addEventListener("click", BeginQz );
  submitBtn.addEventListener("submit", saveHiScore);