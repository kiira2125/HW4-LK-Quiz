function prtHiscores() {
    // either get scores from localstorage or set to empty array
    var hiScores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  console.log(hiScores)
    // sort highscores by score property in descending order
    hiScores.sort(function(a, b) {
      return b.score - a.score;
 });

  hiScores.forEach(function(score) {
        // create li tag for each high score
        var liTag = document.createElement("li");
        liTag.textContent = score.initials + " - " + score.score;
    
        // display on page
        var olEl = document.querySelector("#hiScores");
        olEl.appendChild(liTag);
 });
}
// Go to clean function first to make sure it works at as i code.
function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
};    
document.querySelector("#clear").addEventListener("click",clearHighscores);

  // this runs on other webpage
  prtHiscores();