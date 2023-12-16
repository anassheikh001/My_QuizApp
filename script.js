//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: 'Number of primitive data types in Java are?',
        options: ['6', '7', '8', '9'],
        correct: '8',
    },
    {
        id: "1",
        question: 'What is the size of float and double in java?',
        options: ['32 and 64', '32 and 32', '64 and 64', '64 and 32'],
        correct: '32 and 64',
    },
    {
        id: "2",
        question: 'Automatic type conversion is possible in which of the possible cases?',
        options: ['Byte to int', 'Int to long', 'Long to int', 'Short to int'],
        correct: 'Int to long',
    },
    {
        id: "3",
        question: 'Select the valid statement.',
        options: [
            'Char[] ch = new char(5)',
            'Char[] ch = new char[5]',
            'Char[] ch = new char()',
            'Char[] ch = new char[]'
        ],
        correct: 'Char[] ch = new char[5]',
    },
    {
        id: "4",
        question: 'When an array is passed to a method, what does the method receive?',
        options: [
            'The reference of the array',
            'A copy of the array',
            'Lenght of the array',
            'Copy of the first element',
        ],
        correct: 'The reference of the array',
    },
    {
        id: "5",
        question: 'Select the valid statement to declare and initialize an array.',
        options: ['int A = []', 'int[] A = {1,2,3}', 'int[] A = (1,2,3)', 'int[][] A = {1,2,3}'],
        correct: 'int[] A = {1,2,3}',
    }, {
        id: "6",
        question: 'When is the object created with new keyword?',
        options: ['At run time', 'At compile time', 'Depends on the code', 'None',],
        correct: 'At run time',
    },
    {
        id: "7",
        question: 'Identify the keyword among the following that makes a variable belong to a class,rather than being defined for each instance of the class.',
        options: ['Final', 'Static', 'Volatile', 'Abstract'],
        correct: 'Static',
    },
    {
        id: "8",
        question: 'In which of the following is toString() method defined? ',
        options: ['java.lang.Object', 'java.lang.String', 'java.lang.util', 'None',],
        correct: 'java.lang.Object',
    },
    {
        id: "9",
        question: 'Identify the return type of a method that does not return any value.',
        options: ['int', 'void', 'double', 'None'],
        correct: 'void',
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};