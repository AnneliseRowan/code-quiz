const highScoresList = document.querySelector("#highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || []

highScoresList.innerHTML = 
highScores.map(function(score) {
    return `<li class = "high-score>${score.name} - ${score.score}</li>`
}).join("")