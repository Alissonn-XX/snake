const canvasElemeto = document.querySelector('[data-js="canvas-tela"]');
const campoCanvaCtx = canvasElemeto.getContext('2d');

const cronometro = document.querySelector('[data-js="cronometro"] span')
const nivelJogo = document.querySelector('[data-js="niveis-jogo"]')
const score = document.querySelector('[data-js="score"]');
const btnPlayGame = document.querySelector('[data-js="play-game"]')
const btnRetornoGame = document.querySelector('[data-js="retorno-game"]')
const gameOverDisplay = document.querySelector('[data-js="game-over"]')

const audioEating = new Audio("../audio/assets_audio.mp3")
const audioGameOver = new Audio("../audio/failure.mp3")

let size = 20;
let direction,idSetTimeout;

let positionInicial = {x: 0,y: 0}
let snake = [positionInicial]
let color = 'white';
let level = 100;

const gameOver = ()=>{
  gameOverDisplay.classList.add('active')
  audioGameOver.play()
}

const gameLevel = (elem) =>{
  let arrSelectLevel = [elem.target.options];
  let labelLevel = document.querySelector('[data-js="label-nivel"]')
  let inputLvel = document.querySelector('#nivel-jogo')
   
    arrSelectLevel.forEach((levelInput) =>{
      let indexSelecionado =  levelInput.selectedIndex

       switch(indexSelecionado){
          case 1: 
            labelLevel.textContent = levelInput[indexSelecionado].value
            inputLvel.checked = false
            level = 100
        break;
          case 2:
            labelLevel.textContent = levelInput[indexSelecionado].value
            inputLvel.checked = false
            level = 80
        break;
          case 3:
            labelLevel.textContent = levelInput[indexSelecionado].value
            inputLvel.checked = false
            level = 60          
            break;
          } 
          
          
        })
}
       
const tempPlayGame = ()=>{
  let minutos = 0
  let segundos = 0
  let tempo;
 
  if(gameOverDisplay.classList.contains('active')){
      gameOverDisplay.classList.remove('active')
   }

  setInterval(() => {
     
     if(segundos >= 60){
       minutos++
       segundos = 0
     }
     
     tempo = `${minutos >= 10 ? minutos : '0' + minutos}:${segundos >= 10 ? segundos : '0'+ segundos}`
     
     cronometro.textContent = tempo
     
     segundos++
 },1000)

 
 document.querySelector('.iniciar').remove()

   
}

const scoreSnakeFood = () =>{
   let ponto = parseInt(score.textContent);

   return score.textContent = ponto + 10
}

const drawSnake = ()=>{
    campoCanvaCtx.fillStyle = color

    snake.forEach((position, index) => {
        if (index == snake.length - 1) {
            campoCanvaCtx.fillStyle = "fdfdfd"
        }

        campoCanvaCtx.fillRect(position.x,position.y,size,size)
      })
      
}


const randomNumber = (max,min) =>{
    return Math.floor(Math.random() * (max - min) + min)
}

const randomPosition = () =>{
   let number = randomNumber(0,(canvasElemeto.width - 20))
   return Math.round(number / 20) * 20
}


const randomColor = () =>{
  
  const red  = randomNumber(0,255)
  const green = randomNumber(0,255)
  const blue = randomNumber(0,255)

  return `rgb(${red},${green},${blue})`

}

let food = {
  x:randomPosition(), 
  y:randomPosition(),
  color: randomColor()
}

const drawFood = () =>{
  
  let {x,y,color}  = food
  campoCanvaCtx.clearRect(0,0,canvasElemeto.width,canvasElemeto.height)
  
  campoCanvaCtx.fillStyle = color
  campoCanvaCtx.fillRect(x,y,size,size)
  
}

const contrSnake = () => {
      
      if (!direction) return;
  
      const head = snake[snake.length - 1];
      let snakeNew;
  
      if (direction === 'top') {
          snakeNew = { x: head.x, y: head.y - size };
      }
      if (direction === 'right') {
          snakeNew = { x: head.x + size, y: head.y };
      }
      if (direction === 'bottom') {
          snakeNew = { x: head.x, y: head.y + size };
      }
      if (direction === 'left') {
          snakeNew = { x: head.x - size, y: head.y };
      }
  
      snake.push(snakeNew);
  
      
      snake.shift();
      
      
      snakeUpdate()
      
};
  
const snakeUpdate = ()=>{
    let head = snake[snake.length - 1]
      
    if(head.x == food.x && head.y == food.y) {
      scoreSnakeFood()
      color = food.color
      audioEating.play()
      snake.push(head)
      let positionX = randomPosition()
      let positionY = randomPosition()

      while (snake.find((position) => position.x == positionX && position.y == positionY)) {
        positionX = randomPosition()
        positionY = randomPosition()
      }

      food.x = positionX
      food.y = positionY
      food.color = randomColor()
 }
}

const fieldLimit = () =>{

   const head = snake[snake.length - 1]
   const limitFieldX = canvasElemeto.width
   const limitFieldY = canvasElemeto.height
   const indexLimitSnake = snake.length - 2
   
   const colisionField =
   head.x < 0 || head.x > limitFieldX || head.y < 0 || head.y + size > limitFieldY

  const collision = snake.find((position, index) => {
    return index < indexLimitSnake && position.x == head.x && position.y == head.y
  })

  if (colisionField || collision) {
    gameOver()
    
  }
}

const drawGrid = () => {
  campoCanvaCtx.lineWidth = 1
  campoCanvaCtx.strokeStyle = "#191919"

  for (let i = 0; i < canvasElemeto.width; i += 20) {
      campoCanvaCtx.beginPath()
      campoCanvaCtx.lineTo(i, 0)
      campoCanvaCtx.lineTo(i, 500)
      campoCanvaCtx.stroke()

  }

  for (let i = 0; i < canvasElemeto.height; i += 20) {
   
    campoCanvaCtx.beginPath()
    campoCanvaCtx.lineTo(0, i)
    campoCanvaCtx.lineTo(300, i)
    campoCanvaCtx.stroke()
}
}


const loopGame = ()=>{
   clearTimeout(idSetTimeout)

   campoCanvaCtx.clearRect(0,0,600,600)
   contrSnake()
   drawFood()
   drawGrid()
   drawSnake()
   fieldLimit()

  
   idSetTimeout = setTimeout(loopGame,level)
 
}

nivelJogo.addEventListener('input',gameLevel)

document.addEventListener('keydown',({key})=>{
      
     if(key === 'ArrowUp' && direction !== 'bottom'){
       direction = 'top'
      }
      
      if(key === 'ArrowRight' && direction !== 'left'){
        direction = 'right'
      }

     if(key === 'ArrowDown' && direction !== 'top'){
       direction = 'bottom'
     }

     if(key === 'ArrowLeft' && direction !== 'right'){
       direction = 'left'
     }

     
  console.log(level);
     
})
    
btnPlayGame.addEventListener('click', ()=>{
  tempPlayGame()
  loopGame()
})    

btnRetornoGame.addEventListener('click', ()=>{
  tempPlayGame()
  loopGame()
})    