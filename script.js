const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text : "Shark", correct : false},
            {text : "Blue Whale", correct : true},
            {text : "Elephant", correct : false},
            {text : "Giraffe", correct : false},
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            {text : "Vatican City", correct : true},
            {text : "Bhutan", correct : false},
            {text : "Nepal", correct : false},
            {text : "Shri Lanka", correct : false},
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            {text : "Kalahari", correct : false},
            {text : "Gobi", correct : false},
            {text : "Sahara", correct : false},
            {text : "Antarctica", correct : true},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            {text : "Asia", correct : false},
            {text : "Australia", correct : true},
            {text : "Arctic", correct : false},
            {text : "Africa", correct : false},
        ]
    },
    {
        question: "What is the capital of India?",
        answers: [
            {text : "Goa", correct : false},
            {text : "Haryana", correct : false},
            {text : "Lucknow", correct : false},
            {text : "New Delhi", correct : true},
        ]
    },
    {
        question: "What is the least populous state in India?",
        answers: [
            {text : "Maharashtra", correct : false},
            {text : "Kerala", correct : false},
            {text : "Sikkim", correct : true},
            {text : "New Delhi", correct : false},
        ]
    },
    {
        question: "What is the richest state in India?",
        answers: [
            {text : "Maharashtra", correct : true},
            {text : "Kerala", correct : false},
            {text : "Bihar", correct : false},
            {text : "Uttar Pradesh", correct : false},
        ]
    },
    {
        question: "What is the current unemployment rate in India?",
        answers: [
            {text : "8.5%", correct : false},
            {text : "7.8%", correct : true},
            {text : "8.7%", correct : false},
            {text : "7.6", correct : false},
        ]
    },
    {
        question: "What is the name of the oldest country in the world?",
        answers: [
            {text : "Sweden", correct : false},
            {text : "France", correct : false},
            {text : "Turkmenistan", correct : false},
            {text : "China", correct : true},
        ]
    },
    {
        question: "What is the name of the most visited country in the world?",
        answers: [
            {text : "Sweden", correct : false},
            {text : "France", correct : true},
            {text : "Turkmenistan", correct : false},
            {text : "China", correct : false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButtons = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButtons.innerHTML = "Next";
    showQuestions();
}

function showQuestions(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButtons.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButtons.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButtons.innerHTML = "Try Again";
    nextButtons.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestions();
    }else{
        showScore();
    }
}

nextButtons.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();