const characters = [hmida, housam, youcef];

let currentCharacterIndex = 0;
let currentQuestionIndex = 0;

var questionIndex = getQueryParameter('q');
var characterIndex = getQueryParameter('c');

if (questionIndex === "null") {
   currentQuestionIndex = 0;
} else {
   currentQuestionIndex = parseInt(questionIndex);
}

if (characterIndex === "null") {
   currentCharacterIndex = 0;
} else {
   currentCharacterIndex = parseInt(characterIndex);
}

// Call the function to set the initial question and answers
setQuestionAndAnswers();

function getQueryParameter(name) {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return urlSearchParams.get(name);
}

function setQuestionAndAnswers() {
  const currentCharacter = characters[currentCharacterIndex];

  if (currentCharacterIndex === characters.length && currentQuestionIndex === 0) {
      // If it's the last character and the first question, redirect to the finish page
      window.location.href = "finish.html";
      return;
  }

  const currentQuestionKey = Object.keys(currentCharacter.questions)[currentQuestionIndex];

  const question = currentCharacter.questions[currentQuestionKey].question;
  const image = currentCharacter.questions[currentQuestionKey].image;
  const answers = currentCharacter.answers[currentQuestionKey];

  // Replace these lines with your code to update HTML or perform other operations
  document.getElementById('question').innerHTML = question;
  document.getElementById('image').src = image;

  // Example of how to update answer buttons (you need to adjust this based on your HTML structure)
  for (let i = 1; i <= 4; i++) {
    document.getElementById(`answer-${i}`).innerHTML = answers[`answer${i}`];
  }
}

function moveToNextQuestion() {
  const currentCharacter = characters[currentCharacterIndex];

  // Check if there are more questions for the current character
  if (currentQuestionIndex < Object.keys(currentCharacter.questions).length - 1) {
    currentQuestionIndex++;
  } else {
    // Move to the next character
    currentCharacterIndex++;

    // Check if there are more characters
    if (currentCharacterIndex < characters.length) {
      currentQuestionIndex = 0;
    } else {
      // If there are no more characters, redirect to the finish page
      window.location.href = "finish.html";
      return;
    }
  }

  // Set the next question after updating the indices
  setQuestionAndAnswers();
}

moveToNextQuestion();

for (let i = 1; i <= 4; i++) {
  document.getElementById(`answer-${i}`).addEventListener('click', () => handleUserSelection(i));
}

// Example function to handle user selection
function handleUserSelection(selectedAnswer) {
  const currentCharacter = characters[currentCharacterIndex];
  const currentQuestionKey = Object.keys(currentCharacter.questions)[currentQuestionIndex];
  const correctAnswer = currentCharacter.questions[currentQuestionKey].answer;

  // Replace this with your code to check if the selected answer is correct
  const isCorrect = selectedAnswer.toString() === correctAnswer.toString();

  // Handle correctness, show feedback, etc. (you need to adjust this based on your HTML structure)
  if (isCorrect) {
    window.location.href = "right.html?c=" + String(currentCharacterIndex) + "&q=" + String(currentQuestionIndex)
  } else {
    window.location.href = "wrong.html"
  }

  // Move to the next question after handling the current question
  debugger; // Add this debugger statement
  moveToNextQuestion();
}

function setCookie(name, value, days) {
  var expires = "";
  
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
  }
  
  document.cookie = name + "=" + value + expires + "; path=/";
}

// Function to delete a cookie by setting its expiration date to the past
function deleteCookie(name, value) {
  document.cookie = name + "=" + value + "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function changeCookieValue(name, newValue, days) {
  // Read the current cookie value
  var currentValue = getCookie(name);

  // Set the cookie with the new value
  setCookie(name, newValue, days);

  // Optionally, you can delete the old cookie if needed
  deleteCookie(name, currentValue);
}

function getCookie(name) {
  var cookieName = name + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(';');

  for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i].trim();
      if (cookie.indexOf(cookieName) == 0) {
          return cookie.substring(cookieName.length, cookie.length);
      }
  }

  return false;
}
