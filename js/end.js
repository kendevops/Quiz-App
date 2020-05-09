const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
finalScore.innerText = localStorage.getItem("mostRecentScore");

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});
saveHighScore = (e) => {
  e.preventDefault();
};
