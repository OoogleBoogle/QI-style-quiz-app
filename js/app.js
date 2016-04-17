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
    },
    {
        question: "In Elizabethan England, what was a common treatment for warts?",
        choices: ["Rubbing the area with half a mouse.", "Leeches on the main vains of the arm.", "A sharp blow with a tiny hammer."],
        correctAnswer: "Rubbing the area with half a mouse."
    }]
};


function showNextQuestion() {
    var choicesText;
    // store which question we're on
    var questionIndex = Quiz.questionArray[Quiz.currentQuestion];
    // clear current choice list and tickbox container
    choiceList.innerHTML = "";
    tickBox.innerHTML = "";
    // display question header
    questionHeader.textContent = questionIndex.question;
    // loop through current choices, and add to quiz list
    for (var i = 0; i < questionIndex.choices.length; i++) {
        var listEle = document.createElement('li'); // Create list element
        var choicesText = document.createTextNode(questionIndex.choices[i]); // create a text node for the choice
        listEle.appendChild(choicesText); // append the choice text to the list element
        choiceList.appendChild(listEle);  // append the list element to the ul in the document
    }
    choiceList.style.display = 'block'; // show the list
    nextBtn.style.display = 'none'; // hide the 'next' button
    updateQuestionNumber(); // show the question number
}

 function checkState() {
    // if there are no more questions left...
    if ((Quiz.currentQuestion + 1) >= Quiz.questionArray.length){
        questionHeader.textContent = scoreFeedback();
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
    var currentNumber = Quiz.currentQuestion + 1; // increase index number by 1 to show as 1 from 6 not 0 from 6 etc...
    var totalQuestions = Quiz.questionArray.length;
    var text = "Question " + currentNumber + " of " + totalQuestions;
    questionNumber.textContent = text;
}

function scoreFeedback() {
    var feedback = "And that's the end of the quiz! ";
    var score = Quiz.score;
    var totQuests = Quiz.questionArray.length;
    if (score === totQuests) {
        feedback += "Congratulations! You've scored an outstanding ";
    }
    else if (score >= totQuests - 2) {
        feedback += "Well done! You've scored a respectable ";
    }
    else if (score >= totQuests - 5) {
        feedback += "You've scored a not very amazing but totally acceptable ";
    }
    else {
        feedback += "Perhaps you shoud have another go. You've scored a shameful "
    }
    feedback += score + " out of " + totQuests + "!";
    return feedback;
}


document.addEventListener('DOMContentLoaded', function() {
    nextBtn.addEventListener('click', function() {
        // when the user clicks the next question button..
        choiceList.addEventListener('click', isCorrect);
        // if the quiz has ended and the button reads "go again"
        if (nextBtn.value === "Go Again!!!") {
            // put it's text back to 'next question'
            nextBtn.value = 'Next Question...';
            // and reset counters and start over
            restart();
        // otherwise check the current game state
        } else {
            checkState();
        }
    });

    // when the browser loads..start the game and add the event listener to list items.
    showNextQuestion();
    choiceList.addEventListener('click', isCorrect);
});
            





