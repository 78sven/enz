var currentQuestion = getQueryParameter('q')
var currentCharacter = getQueryParameter('c')

function getQueryParameter(name) {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return urlSearchParams.get(name);
}

function redirectToGame() {
    window.location.href = "game.html?c=" + String(currentCharacter) + "&q=" + String(currentQuestion)
}
function redirectToMainpage() {
  window.location.href = "index.html";
}

