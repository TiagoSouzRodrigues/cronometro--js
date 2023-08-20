const minutesEl = document.querySelector('#minutes')
const secondsEl = document.querySelector('#seconds')
const millisecondsEl = document.querySelector('#milliseconds')
const startBtn = document.querySelector('#startBtn')
const pauseBtn = document.querySelector('#pauseBtn')
const resumeBtn = document.querySelector('#resumeBtn')
const resetBtn = document.querySelector('#resetBtn')

let interval
let minutes = 0
let seconds = 0
let milliseconds = 0
let isPaused = false

// Adicionando event listeners aos botões
startBtn.addEventListener('click', toggleStartPause)
pauseBtn.addEventListener('click', toggleStartPause)
resumeBtn.addEventListener('click', toggleStartPause)
resetBtn.addEventListener('click', resetTimer)

// Função para alternar entre iniciar, pausar e retomar o cronômetro
function toggleStartPause() {
  if (interval) {
    if (!isPaused) {
      pauseTimer()
    } else {
      resumeTimer()
    }
  } else {
    startTimer()
  }
}

// Iniciar o cronômetro
function startTimer() {
  interval = setInterval(updateTime, 10)
  toggleButtonsDisplay(true, false, false)
}

// Atualizar o tempo
function updateTime() {
  if (!isPaused) {
    milliseconds += 10
    if (milliseconds === 1000) {
      seconds++
      milliseconds = 0
    }
    if (seconds === 60) {
      minutes++
      seconds = 0
    }
    updateDisplay()
  }
}

// Atualizar a exibição do tempo
function updateDisplay() {
  minutesEl.textContent = formatTime(minutes)
  secondsEl.textContent = formatTime(seconds)
  millisecondsEl.textContent = formatMilliseconds(milliseconds)
}

// Pausar o cronômetro
function pauseTimer() {
  isPaused = true
  toggleButtonsDisplay(false, true, false)
}

// Retomar o cronômetro
function resumeTimer() {
  isPaused = false
  toggleButtonsDisplay(false, false, true)
}

// Reiniciar o cronômetro
function resetTimer() {
  clearInterval(interval)
  interval = null
  minutes = 0
  seconds = 0
  milliseconds = 0
  updateDisplay()
  toggleButtonsDisplay(true, false, false)
  isPaused = false
}

// Alternar a visibilidade dos botões
function toggleButtonsDisplay(start, pause, resume) {
  startBtn.style.display = start ? 'block' : 'none'
  pauseBtn.style.display = pause ? 'block' : 'none'
  resumeBtn.style.display = resume ? 'block' : 'none'
}

// Formatar o tempo com zero à esquerda quando necessário
function formatTime(time) {
  return time.toString().padStart(2, '0')
}

// Formatar os milissegundos com zeros à esquerda quando necessário
function formatMilliseconds(time) {
  return time.toString().padStart(3, '0')
}
