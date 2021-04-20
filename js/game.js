const question = document.querySelector("#question"); 
const choices = Array.from(document.querySelectorAll(".choice-text")); 
const scoreText = document.querySelector("#score");
const timeLeft = document.querySelector("#time-left"); 


let currentQuestion = {};
let acceptingAnswer = true; 
let score = 0; 
let questionCounter = 0; 
let availableQuestions = []; 

let questions = [
    {
        question : "Who possesses the ring of power at the start of the trilogy?",
        choice1 : "Gandalf",
        choice2 : "Frodo",
        choice3 : "Bilbo",
        choice4 : "Sauron", 
        answer : 4,
    },
    {
        question : "Who do the hobbits encounter at the Prancing Pony?",
        choice1 : "Gandalf",
        choice2 : "Legolas",
        choice3 : "Boromir",
        choice4 : "Strider",
        answer : 4,
    },
    {
        question : "How many members make up the fellowship of the ring?",
        choice1 : "Seven",
        choice2 : "Nine",
        choice3 : "Eight",
        choice4 : "Ten",
        answer : 1,
    },
    {
        question : "What is the name of the elf in the fellowship?",
        choice1 : "Legolas",
        choice2 : "Gimli",
        choice3 : "Boromir",
        choice4 : "Thranduil",
        answer : 1,
    },
    {
        question : "What is the name of the dwarf in the fellowship?",
        choice1 : "Merry",
        choice2 : "Pippin",
        choice3 : "Gimli",
        choice4 : "Sauron",
        answer : 3,
    }
];


const SCORE_POINTS = 50; 
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0; 
    score = 0; 
    availableQuestions = [...questions]; 
    getNewQuestions(); 
}

function countdown() {
    var countDown = 75;
    let timeInterval = setInterval(function () {
      if (countDown > 1) {
        timeLeft.textContent = "Timer : " + countDown;
        countDown--;
      } else {
        timeLeft.textContent = 'Time is up!';
        clearInterval(timeInterval);
        }
    }, 1000);
}

var getNewQuestions = function() {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score)

        return window.location.assign("../html/end.html")
    }

    questionCounter++;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question; 

    choices.forEach(function(choice) {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number]; 
    })

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswer = true; 
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswer) return;
        
        acceptingAnswer = false; 
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"]; 

        let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if(classToApply === "correct") {
            incrementScore(SCORE_POINTS)
        }

        if(classToApply === "incorrect") {
            timeLeft - 5; 
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(function() {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestions()
        }, 500)
    })
})

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}



countdown(); 
startGame(); 