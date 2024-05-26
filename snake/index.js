const canvasElemeto = document.querySelector('canvas');
const campoCanvaCtx = canvasElemeto.getContext('2d');


let sizeW = 10
let sizeH = 10
let positionX = 0
let positionY = 0
let direction,idSetTimeout;



const posicaoMovimentoSnake = () =>{
    
   if(direction === 'top'){
      positionY -= sizeH
    }
      
   if(direction === 'right'){
      
        positionX += sizeW
    }
      
   if(direction === 'bottom'){
     
        positionY += sizeH
        
    }
      
   if(direction === 'left'){
       
        positionX -= sizeW
    }
      
    

}

const creatSnake = (onLive) =>{
   
     if(onLive){  
        campoCanvaCtx.fillStyle = "rgb(200,0,0)";
        campoCanvaCtx.fillRect(positionX, positionY, sizeW,sizeH); 
     }
      
}


// const gridSnake = () =>{
//    campoCanvaCtx.lineWidth = 0
//    campoCanvaCtx.strokeStyle = 'white'

  
   
   
   

//    for(let i=0; i <= canvasElemeto.width; i+=30){
      
//        campoCanvaCtx.beginPath()
//        campoCanvaCtx.lineTo(i,0)
//        campoCanvaCtx.lineTo(i,300)
//        campoCanvaCtx.stroke()
       

//       campoCanvaCtx.beginPath()
//       campoCanvaCtx.lineTo(0,i)
//       campoCanvaCtx.lineTo(300,i)
//       campoCanvaCtx.stroke() 
//    }

  
// }


const numberAleatory = (min, max) =>{
   return Math.round(Math.random() * (max - min) + min)
}


const positionAleatoryFood = () =>{
     const number = numberAleatory(10,canvasElemeto.height - sizeW)
  return Math.round(number / 20) * 20

}


console.log(positionAleatoryFood())

let objFoodSnake = {
   widthPositionX: positionAleatoryFood(),
   heightPositionY: positionAleatoryFood(),
   color: "white"
};

const foodsDraw = () =>{
   campoCanvaCtx.fillStyle = objFoodSnake.color
   campoCanvaCtx.fillRect(objFoodSnake.widthPositionX,objFoodSnake.heightPositionY,20,10)

   console.log(objFoodSnake)
}

const lopSnake = () =>{
     clearTimeout(idSetTimeout)

      campoCanvaCtx.clearRect(0,0,canvasElemeto.width,canvasElemeto.height)
      //gridSnake()
      foodsDraw()
      posicaoMovimentoSnake()
      creatSnake(true)

 idSetTimeout = setTimeout(()=>{
   lopSnake()
},200)

}

document.addEventListener('keydown', ({key})=>{
   
   if(key === 'ArrowUp' && direction != 'bottom'){
      console.log('Evento  direction = "up"');
      direction = "top";
   }

   if(key === 'ArrowRight' && direction != 'left'){
      console.log('Evento  direction = "right"');
      direction = "right";
   }

   if(key === 'ArrowDown' && direction != 'up'){
      console.log('Evento  direction = "bottom"');
      direction = "bottom";
   }

   if(key === 'ArrowLeft' && direction != 'right'){
      console.log('Evento  direction = "left"');
      direction = "left";
   }

})


lopSnake()

