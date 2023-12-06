const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    myScore: document.querySelector("#my-score"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
    oldRandomSquare: '10',
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  }

}

function countDown() {
  state.values.currentTime--
  state.view.timeLeft.textContent = state.values.currentTime

  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.countDownTimerId)
    clearInterval(state.actions.timerId)
    alert("Game Over! Sua pontuação: " + state.values.result)
  }
}

function playSound(soundName) {
  let audio = new Audio(`./src/sounds/${soundName}.m4a`)
  audio.volume = 0.1
  audio.play()
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy")
  })

  const base = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
  const indexBase = base.indexOf(state.values.oldRandomSquare)

  if (indexBase !== -1) {
    base.splice(indexBase, 1)
  }
  let randomNumber = Math.floor(Math.random() * base.length)
  let randomSquare = state.view.squares[Number(base[randomNumber]) - 1]
  randomSquare.classList.add("enemy")
  state.values.hitPosition = randomSquare.id
  state.values.oldRandomSquare = randomSquare.id
  console.log(state.values.oldRandomSquare)
}

function addListenerHitbox() {
  state.view.squares.forEach((square) => {
    square.addEventListener('mousedown', () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++
        state.view.myScore.textContent = state.values.result
        state.values.hitPosition = null
        playSound("hit")
      }
    })
  })
}

function init() { //init, initialize, main
  addListenerHitbox()
}

init()