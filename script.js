let currentQuestionIndex = 0
let questions = [{
  prompt: "Who is the prime minister of Canada?",
  answers: ["Justin Trudeau", "Wayne Gretski", "Tim Horton", "Matthew Broderick"],
  correctAnswerIndex: 0
}, {
  prompt: "Which of the following is Matthew Broderick's favorite language?",
  answers: ["JavaScript", "Python", "Java", "All of the Above"],
  correctAnswerIndex: 3
}]

$('#submit-answer').click(() => {
  // Get the selected radio button
  let userChoice = $('input[name="answer"]:checked')
  if (userChoice.length) {
    // They selected something; cool good yes
    // Remove error message
    $('#error-message').text('')

    // Find the index (aka value) of what they selected
    let indexChosen = parseInt(userChoice[0].value)

    // Store the user's choice for this question
    questions[currentQuestionIndex].userChoice = indexChosen

    // Unselect the radio button
    userChoice[0].checked = false

    // Move to next question
    nextQuestion()
  }
  else {
    $('#error-message').text('Please select an answer')
  }
})

const nextQuestion = () => {
  currentQuestionIndex++
  if (currentQuestionIndex >= questions.length) {
    // End/Score the game
    scoreQuiz()
  }
  else {
    // Load the next question
    loadQuestion()
  }
}

const loadQuestion = () => {
  $('#prompt').text(questions[currentQuestionIndex].prompt)
  $('#a0').text(questions[currentQuestionIndex].answers[0])
  $('#a1').text(questions[currentQuestionIndex].answers[1])
  $('#a2').text(questions[currentQuestionIndex].answers[2])
  $('#a3').text(questions[currentQuestionIndex].answers[3])
}

const scoreQuiz = () => {
  // Show score div / Hide Question div
  $('#question').css('display', 'none')
  $('#score').css('display', 'block')

  // Tally up the score
  // let score = questions.reduce((total, q) => {
  //   return total + (q.correctAnswerIndex == q.userChoice ? 1 : 0)
  // }, 0)
  let score = 0
  for (let i = 0; i < questions.length; i++) {
    if (questions[i].correctAnswerIndex == questions[i].userChoice) {
      score++
    }
  }

  // Show the score in the DOM
  let p = $('<p>').append(`You got ${score} out of ${questions.length}`)
  if ((score / questions.length) >= 0.5) {
    $('#score').css('background-color', 'hotpink')
  }
  $('#score').append(p)
}

loadQuestion()
