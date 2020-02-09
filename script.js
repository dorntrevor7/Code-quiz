var $startButton = document.querySelector("#startButton");
var questionIndex = 0

var questions = [{
        question: "is the sky blue?",
        answers0: [
            { text: "Yes", isCorrect: true },
            { text: "No", isCorrect: true },
        ]
    },
    {
        question1: "is the sky blue?",
        answers: [
            { text: "Yes", isCorrect: true },
            { text: "No", isCorrect: true },
        ]
    },
    {
        question2: "is the sky blue?",
        answers: [
            { text: "Yes", isCorrect: true },
            { text: "No", isCorrect: true },
        ]
    },
    {
        question3: "is the sky blue?",
        answers: [
            { text: "Yes", isCorrect: true },
            { text: "No", isCorrect: true },
        ]
    }

];

$startButton.addEventListener("click", function(e) {
    console.log("trev is so cool")
})