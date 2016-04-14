var questionHeader = document.querySelector('#question'),
    choiceList = document.querySelector("#choices"),
    nextBtn = document.querySelector('#nextBtn'),
    tickBox = document.querySelector('#ticbox');
    

var Quiz = {
    name: "Quiz",
    score: 0,
    currentQuestion: 0,
    questionArray: [{
        question: "What is Simon's favorite color?",
        choices: ["Red", "Blue", "Green"],
        correctAnswer: "Blue"
    },
    {
        question: "What Graham's favorite is color?",
        choices: ["Red", "Blue", "Yellow"],
        correctAnswer: "Yellow"
    },
    {
        question: "What color is the sky?",
        choices: ["Green", "Blue", "Yellow"],
        correctAnswer: "Blue"
    },
    {
        question: "What color is grass?",
        choices: ["Red", "Blue", "Green"],
        correctAnswer: "Green"
    }],
}

function showNextQuestion() {
    var choicesText;
    var questionIndex = Quiz.questionArray[Quiz.currentQuestion];
    // clear current choice list
    choiceList.innerHTML = "";
    // display question header
    questionHeader.textContent = questionIndex.question;
    // loop through current question choices, and add to quiz list
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
}


// function to increment currentQuestion and 
    // if it's the last question
        //enter win state,
    // else 
        // showNextQuestion();
        
// function to deal with win state;

// function to show correct answer;
    // listen for event (user moving to next question)


choiceList.addEventListener('click', function(event) {
    if (event.target.textContent === Quiz.questionArray[Quiz.currentQuestion].correctAnswer) {
        tickBox.innerHTML = '<p>&#9989;</p>'
    };
    
});

showNextQuestion();

// mock event to try functionality
nextBtn.addEventListener('click', function() {
    Quiz.currentQuestion++;
    showNextQuestion();
});