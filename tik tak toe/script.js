const boxes=document.querySelectorAll(".box");
const userInfo=document.querySelector(".user-info");
const newbtn= document.querySelector(".btn");

let currentPlayer;
let gameGrid=[];
 const winningPosition=[
  ["0","1","2"],
  ["3","4","5"],
  ["6","7","8"],
  ["0","4","8"],
  ["2","4","6"],
  ["0","3","6"],
  ["1","4","7"],
  ["2","5","8"]
 ];

function initGame(){
  currentPlayer="x";
  userInfo.innerText=`currentPlayer-${currentPlayer}`;
  gameGrid=["","","","","","","","",""];
  boxes.forEach((box,index)=>{
    box.innerText="";
    boxes[index].style.pointerEvents="all";
    box.classList=`box box${index+1}`;
  });
  newbtn.classList.remove("active");
  userInfo.innerHTML=`current player-${currentPlayer}`;
}
initGame();

 function checkGameOver(){
    let answer="";
    winningPosition.forEach((position)=>{
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="") 
        &&(gameGrid[position[0]]===gameGrid[position[1]] && gameGrid[position[1]]===gameGrid[position[2]])){
      if(gameGrid[position[0]]==="x"){
        answer="x";
      }else{
        answer="0";
      }
      //disable pointerEvent
      boxes.forEach((box)=>{
        box.style.pointerEvents="none";
      })
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");

    }
    });

  if(answer!==""){
   userInfo.innerText=`Winner-${answer}`
   newbtn.classList.add("active");
   return;
  }
  let fillCount=0;
  gameGrid.forEach((box)=>{
    if(box!==""){
        fillCount++;
    }
  });
  if(fillCount===9){
    userInfo.innerText="Game-Tied";
    newbtn.classList.add("active");
  }
}
function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerHTML=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        swapTurn();
        checkGameOver();
    }
}
function swapTurn(){
    if(currentPlayer ==="x"){
        currentPlayer="0";
    }else{
        currentPlayer="x";
    }
    userInfo.innerText=`currentPlayer-${currentPlayer}`;

}


boxes.forEach((box,index)=>{
    box.addEventListener("click", ()=>{
        handleClick(index);
    });
});
newbtn.addEventListener("click",initGame);