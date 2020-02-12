// All the questions and answers that are displayed on the html

var questions = [{
        question: "Commonly used data types DO NOT include:",
        answers: [ 
            { text: "strings", isCorrect: false },
            { text: "booleans", isCorrect: false },
            { text: "alerts", isCorrect: true },
            { text: "numbers", isCorrect: false },
        ]
    },
    {
        question: "How to display a prompt?",
        answers: [
            { text: "prompt('prompt')", isCorrect: true },
            { text: "alert('prompt')", isCorrect: false },
            { text: "confirm('prompt')", isCorrect: false },
            { text: "prompt('alert')", isCorrect: false },
        ]
    },
    {
        question: "String values must be enclosed within ___ when being assigned to variables.",
        answers: [
            { text: "Quotes", isCorrect: true },
            { text: "Curley brackets", isCorrect: false },
            { text: "booleans", isCorrect: false },
            { text: "All of the above", isCorrect: false },
        ]
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            { text: "console.log", isCorrect: true },
            { text: "terminal/bash", isCorrect: false },
            { text: "for loops", isCorrect: false },
            { text: "javascript", isCorrect: false },
        ]
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        answers: [
            { text: "Numbers and strings", isCorrect: false },
            { text: "other arrays", isCorrect: true },
            { text: "booleans", isCorrect: false },
            { text: "all of the above", isCorrect: false },
        ]
    }

];

// Selecting the elements
var highscoreInput = document.getElementById("highscore-input")
var highscoresform = document.getElementById("highscore-form");
var highscoreslist = document.getElementById("highscoreslist");
var $quizQ = document.getElementById("question-container");
var $startQuiz = document.getElementById("startQuiz");
var $startButton = document.getElementById("startButton");
var answers = document.getElementById("answer-container");
var $correct = document.getElementById("correct");
var $highscore = document.getElementById("highscore");
var $timeSpan = document.getElementById("timeSpan");
var $container = document.querySelector(".container");

//Creates a variables being called
var seconds = 30;
var timeIncrement;
var highscores = [];

// Hides the highscore user input
document.getElementById("highscore-form").style.display = "none";

//function called countDown
function countDown() {
    if (seconds <= 0) {
        seconds = 0;
        clearInterval(timeIncrement);
        endGame();
    }

    seconds--;
    $timeSpan.innerHTML = seconds;

}

// Set font attributes
answers.setAttribute("style", "font-family: Times New Roman");
$quizQ.setAttribute("style", "font-family: Times New Roman");
// correctAnswers count
var correctAnswers = 0
var questionIndex = 0


// When the button is pushed
$startButton.addEventListener("click", startQuiz);

function startQuiz() {
    // starts the count down
    timeIncrement = setInterval(countDown, 1000);
    // starts the questions and answers
    displayQuestion();
}

function displayQuestion() {
    //hide the starting main
    document.getElementById("startButton").style.display = "none";
    document.getElementById("startQuiz").style.display = "none";

    // If the length of the questions is less then the questionIndex then it will call endGame function
    $quizQ.innerHTML = "";
    answers.innerHTML = "";

    if (questionIndex < questions.length) {
        //loop through the answers of the question index
        for (let i = 0; i < questions[questionIndex].answers.length; i++) {
            //display the question that is equal the question index
            $quizQ.innerHTML = questions[questionIndex].question;
            //create a button
            var btn = document.createElement("button");
            //make button text equal to the answer text
            btn.textContent = questions[questionIndex].answers[i].text;
            //set attribute of value = to isCorrect on button
            btn.setAttribute("value", questions[questionIndex].answers[i].isCorrect);
            //append button to the answer div
            answers.appendChild(btn);
        }
        questionIndex++;
    } else {
        endGame();
        playagain();
    }
}


//Add an event listener for when an answer button is clicked
answers.addEventListener("click", function(event) {
    //pull value off of button that is clicked
    var answerValue = event.target.value;
    //call the checkAnswer function pass it the answerValue
    checkAnswer(answerValue);
});

//function to check answer
function checkAnswer(answerValue) {

    //pull value off of answer that is clicked
    console.log(answerValue);

    //if value is === "true"  then:
    if (answerValue === "true") {
        $correct.innerHTML = "Correct";
        correctAnswers++;
        clearInterval(timeIncrement);
        timeIncrement = setInterval(countDown, 1000);

    }
    //if value is === "false" then: 
    else {
        $correct.innerHTML = "Incorrect";
        // if they answer incorrect the clock goes down by 2 second intervals
        clearInterval(timeIncrement);
        timeIncrement = setInterval(countDown, 300);
    }
    //run the display Question function
    displayQuestion();
}

function endGame() {
    clearInterval(timeIncrement)
    $quizQ.innerHTML = "";
    answers.innerHTML = "";
    //anthing that happens at the end of the game would go inside this function
    $correct.setAttribute("style", "font-family: Times New Roman");
    $correct.innerHTML = "You got " + correctAnswers + " correct";
    if (correctAnswers <= 2) {
        $quizQ.innerHTML = "GAME OVER #BADDDD"
        $container.setAttribute("style", "background-color: red");
    } else if (correctAnswers === 3) {
        $quizQ.innerHTML = "GAME OVER #AVERAGE"
        $container.setAttribute("style", "background-color: yellow");
    } else if (correctAnswers >= 4) {
        $quizQ.innerHTML = "GAME OVER, #WINNER"
        $container.setAttribute("style", "background-color: lightgreen");
    }
    highscore();
}

function highscore() {
    // Displays highscore user input
    document.getElementById("highscore-form").style.display = "initial";

    // get most recent highscore
    $highscore.textContent = (correctAnswers + " correct answers");

    // loop through the array in highscores to diplay names
    function forloopHigh() {
        for (var i = 0; i < highscores.length; i++) {
            var highscore = highscores[i];

            // Creates the list of highscores element
            var li = document.createElement("li");
            li.textContent = highscore;
            li.setAttribute("data-index", i);
            highscoreslist.appendChild(li);
        }
        // storing highscores
    }


    function storeHighscores() {
        // Stringify and set "highscores" key in localStorage to highscores array
        localStorage.setItem("highscores", JSON.stringify(highscores));
    }
    // When form is submitted
    highscoresform.addEventListener("submit", function(event) {
        event.preventDefault();

        var highscoreInputText = highscoreInput.value.trim();

        // Return from function early if submitted highscoreText is blank
        if (highscoreInputText === "") {
            return;
        }

        // Add new highscoreText to highscoreArr array, clear the input
        highscores.push(highscoreInputText);
        highscoreInput.value = "";

        // Re-render the forloophigh
        storeHighscores();
        forloopHigh();
    });
}

function playagain() {
    // create a new button for retry
    var btn = document.createElement("button");
    btn.textContent = "Retry";
    $quizQ.appendChild(btn);
    btn.addEventListener("click", reload);
}

function reload() {
    location.reload();
}