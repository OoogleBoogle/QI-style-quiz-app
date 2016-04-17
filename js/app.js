var questionHeader = document.querySelector('#question'),
    choiceList = document.querySelector("#choices"),
    nextBtn = document.querySelector('#nextBtn'),
    tickBox = document.querySelector('#tickbox'),
    questionNumber = document.querySelector('#questionNumber');

var Quiz = {
    name: "Quiz",
    score: 0,
    currentQuestion: 0,
    questionArray: [{
        question: "In what 'code' did Thomas Edison propose to his wife?",
        choices: ["JavaScript.", "Morse.", "Enigma."],
        correctAnswer: "Morse."
    },
    {
        question: "What is the fastest recorded speed for a Mobility Scooter?",
        choices: ["107.6 mph.", "84.7 mph.", "68.2 mph."],
        correctAnswer: "107.6 mph."
    },
    {
        question: "Which of these are younger?",
        choices: ["Saturn's Rings.", "The Dinosaurs."],
        correctAnswer: "Saturn's Rings."
    },
    {
        question: "In Vietnam, what can the police give you as punishment for a driving offence instead of a fine?",
        choices: ["A slap around the face with a rotten haddock.", "Wearing a 'criminal mask' for 30 days (even at night).", "50 Lines."],
        correctAnswer: "50 Lines."
    },
    {
        question: "The pressure in a good bottle of Champagne is equal to what?",
        choices: ["40 feet underwater.", "The tyre pressure of a London double decker bus.", "The cabin of a decending aircraft."],
        correctAnswer: "The tyre pressure of a London double decker bus."
    },
    {
        question: "In the last 50 years, which of these have (strangely) gotten quieter?",
        choices: ["Movie Theaters.", "Un-oiled door hinges.", "Insects' footsteps."],
        correctAnswer: "Insects' footsteps."
    }],
};


function showNextQuestion() {
    var choicesText;
    // store which question we're on
    var questionIndex = Quiz.questionArray[Quiz.currentQuestion];
    // clear current choice list
    choiceList.innerHTML = "";
    tickBox.innerHTML = "";
    // display question header
    questionHeader.textContent = questionIndex.question;
    // loop through current choices, and add to quiz list
    for (var i = 0; i < questionIndex.choices.length; i++) {
        // Create list element
        var listEle = document.createElement('li');
        // create a text node for the choice
        var choicesText = document.createTextNode(questionIndex.choices[i]);
        // append the choice text to the list element
        listEle.appendChild(choicesText);
        // append the list element to the ul in the document
        choiceList.appendChild(listEle);
    }
    // show the list
    choiceList.style.display = 'block';
    // hide the 'next' button
    nextBtn.style.display = 'none';
    // show the question number
    updateQuestionNumber();
}

 function checkState(){
    // if there are no more questions left...
    if ((Quiz.currentQuestion + 1) >= Quiz.questionArray.length){
        questionHeader.textContent = "Congratulations you have a scored "+ Quiz.score +"/"+ Quiz.questionArray.length;
        nextBtn.value = 'Go Again!!!';
        tickBox.innerHTML = "";
    // if not, show the next question
    } else {
        Quiz.currentQuestion++;
        showNextQuestion();
    }
 };

function isCorrect(event) {
    // take the click listener from the list (just in case)
    choiceList.removeEventListener('click', isCorrect);
    // hide the list
    choiceList.style.display = 'none';
    // show the 'next' button
    nextBtn.style.display = 'block';
    // if it's the right answer...
    if (event.target.textContent === Quiz.questionArray[Quiz.currentQuestion].correctAnswer) {
        tickBox.innerHTML = '<p>&#9989;</p>';
        Quiz.score++;
        questionHeader.textContent = "CORRECT!";
    // if it's incorrect...
    } else {
        questionHeader.textContent = "NOPE!";
        tickBox.innerHTML = '<p>&#x274C;</p>';
    }
}

function restart() {
    Quiz.currentQuestion = 0;
    Quiz.score = 0;
    showNextQuestion();
}

function updateQuestionNumber() {
    var currentNumber = Quiz.currentQuestion + 1;
    var totalQuestions = Quiz.questionArray.length;
    var text = "Question " + currentNumber + " of " + totalQuestions;
    questionNumber.textContent = text;
}


document.addEventListener('DOMContentLoaded', function() {
    nextBtn.addEventListener('click', function() {
        // when the user clicks the next question button..
        choiceList.addEventListener('click', isCorrect);
        // if the quiz has ended and the button reads "go again"
        if (nextBtn.value === "Go Again!!!") {
            // put it's text back to 'next question'
            nextBtn.value = 'Next Question...';
            // and reset counters
            restart();
        // other wise check the current game state
        } else {
            checkState();
        }
    });

    // when the browser loads..start the game and add the event listener to list items.
    showNextQuestion();
    choiceList.addEventListener('click', isCorrect);
});
            





