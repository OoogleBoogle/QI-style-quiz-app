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
};


function showNextQuestion() {
    var choicesText;
    var questionIndex = Quiz.questionArray[Quiz.currentQuestion];
    // clear current choice list
    choiceList.innerHTML = "";
    tickBox.innerHTML = "";
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

 function showScore(){
    if ((Quiz.currentQuestion + 1) >= Quiz.questionArray.length){
        questionHeader.textContent = "Congratulations you have a scored "+ Quiz.score +"/"+ Quiz.questionArray.length;
    } else {
        Quiz.currentQuestion++;
        showNextQuestion();
    }
 };

function isCorrect(event) {
    choiceList.removeEventListener('click', isCorrect);
    console.log(Quiz.questionArray[Quiz.currentQuestion].correctAnswer)
    //if currentQuestion=4 then change header to "congratulations, you finished" else run this
    if (event.target.textContent === Quiz.questionArray[Quiz.currentQuestion].correctAnswer) {
        tickBox.innerHTML = '<p>&#9989;</p>';
        Quiz.score++;
        questionHeader.textContent = "CORRECT!";
    } else {
        questionHeader.textContent = "NOPE!";
        tickBox.innerHTML = '<p>&#x274C;</p>';
    }
}


choiceList.addEventListener('click', isCorrect);

showNextQuestion();

// mock event to try functionality
nextBtn.addEventListener('click', function() {
    choiceList.addEventListener('click', isCorrect);
    showScore();
});