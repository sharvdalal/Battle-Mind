let correctPathsOptions = [
  ["img2", "img7", "img8", "img13", "img14", "img15", "img19", "img20"],
  ["img2", "img7", "img12", "img13", "img18", "img23", "img24"],
  ["img6", "img7", "img8", "img13", "img14", "img19", "img20"],
  ["img6", "img11", "img16", "img17", "img22", "img18", "img23", "img24"],
  ["img2", "img3", "img4", "img5", "img9", "img10", "img14", "img15", "img19", "img24"],
  ["img2", "img3", "img8", "img13", "img14", "img15", "img19", "img20"],
  ["img6", "img7", "img12", "img17", "img18", "img19", "img24"],
  ["img2", "img3", "img4", "img9", "img14", "img19", "img20"],
  ["img6", "img11", "img12", "img13", "img14", "img15", "img20"],
  ["img6", "img11", "img16", "img21", "img22", "img23", "img24"],
  ["img2", "img3", "img4", "img5", "img10", "img15", "img20"]
];

let randNoOfPaths = Math.random() * 11;
randNoOfPaths = Math.floor(randNoOfPaths);
let correctPaths = correctPathsOptions[randNoOfPaths];

let logicArray = [
  ["img1", "img2", "img3", "img4", "img5"],
  ["img6", "img7", "img8", "img9", "img10"],
  ["img11", "img12", "img13", "img14", "img15"],
  ["img16", "img17", "img18", "img19", "img20"],
  ["img21", "img22", "img23", "img24", "img25"]
];


let finalStage1 = [logicArray[logicArray.length - 2][logicArray.length - 1]];
let finalStage2 = [logicArray[logicArray.length - 1][logicArray.length - 2]];
let myCurrentPosition = [0, 0];
let myCurrimg = 1;
let gameStarted = false;
let idx = 0;
let idx1 = 0;
let idx2 = 0;
let possibleOptions = [];
let option1Idx = [];
let option2Idx = [];
let option1 = "";
let option2 = "";
let myCurrPosition = logicArray[idx1][idx2];
let clickedOption = "";
let set1 = new Set();
let randIdx = 0;
let finalRandIdx = 0;
let removeCurrImg = [];
let isUnMute = true;
const myAudio = new Audio("/public/Sounds/background.mp3");
var screenWidth = window.screen.width;
var screenHeight = window.screen.height;
console.log(screenWidth + " " + screenHeight)




$("#img" + myCurrimg).html("<img src='/public/images/swordsman.png'></img>");

if(screenWidth > 850){

$(".startButton").css({"visibility":"hidden"});

$(document).on("keydown", function () {
  if (!gameStarted) {

    gameStarted = true;
    playSound();
    $("h1").text("Game Started!!");
    randIdxGenerator();
    Options();
    giveRiddle(randIdx);
  }
});
}

else{
  $(".mainPageHeading").css({"visibility":"hidden"});
  $(".startButton").on("click", ()=>{
  $(".startButton").html("Restart");
  gameStarted = true;
  playSound();

  randIdxGenerator();
  Options();
  giveRiddle(randIdx);
  })

}



$(document).on("keydown", function (event) {

  if (event.keyCode == 32) {

  }

})

$(".muteUnmute").on("click", function () {
  if (isUnMute) {
    $(this).attr("src", "public/images/volume-mute.png");
    myAudio.volume = 0;
    isUnMute = false;
  }
  else {
    $(this).attr("src", "public/images/volume-unmute.png");
    myAudio.volume = 0.19;
    isUnMute = true;
  }


})


$(".box").on("click", function () {
  clickedOption = $(this).attr("id");
  if (clickedOption === correctPaths[idx]) {
    $("#" + option1).html("");
    $("#" + option2).html("");
    $("#" + clickedOption).html("<img src='/public/images/swordsman.png'></img>");

    removeCurrImg = logicArray[myCurrentPosition[0]][myCurrentPosition[1]];
    $("#" + removeCurrImg).html("");


    rightAnswerSound();

    var op1idx1 = possibleOptions[0][0];
    var op1idx2 = possibleOptions[0][1];
    var op2idx1 = possibleOptions[1][0];
    var op2idx2 = possibleOptions[1][1];

    var tempansoption = logicArray[op1idx1][op1idx2];
    $("#" + logicArray[myCurrentPosition[0]][myCurrentPosition[1]]).addClass("correctPath");

    if (tempansoption === correctPaths[idx]) {
      myCurrentPosition = [op1idx1, op1idx2];
    } else {
      myCurrentPosition = [op2idx1, op2idx2];
    }
    idx++;
    setTimeout(() => {
      if (logicArray[myCurrentPosition[0]][myCurrentPosition[1]] == finalStage1 || logicArray[myCurrentPosition[0]][myCurrentPosition[1]] == finalStage2) {
        lastStage();
      } else {
        randIdxGenerator();
        giveRiddle(randIdx);
        Options();

      }

    }, 500);

  } else {
    startOver();
  }
});

function giveRiddle(randIdx) {
  var alt = questions.ques[randIdx].ques1;
  console.log(alt);

  swal({
    title: alt,
  });

}

function Options() {

  giveOptionsIdx();
  currect_option = questions.ques[randIdx].corr_ans;
  wrong_option = questions.ques[randIdx].wrong_ans;

  var op1idx1 = possibleOptions[0][0];
  var op1idx2 = possibleOptions[0][1];
  var op2idx1 = possibleOptions[1][0];
  var op2idx2 = possibleOptions[1][1];

  option1 = logicArray[op1idx1][op1idx2];
  option2 = logicArray[op2idx1][op2idx2];

  if (option1 === correctPaths[idx]) {
    $("#" + option1).text(currect_option);
    $("#" + option2).text(wrong_option);
  } else {
    $("#" + option2).text(currect_option);
    $("#" + option1).text(wrong_option);
  }
}
function giveOptionsIdx() {

  var optionsCount = 0;
  var i = 0;
  if (myCurrentPosition[1] < logicArray[0].length - 1) {
    possibleOptions[i] = [myCurrentPosition[0], myCurrentPosition[1] + 1];
    optionsCount++;
    i++;

  } else {
    possibleOptions[i] = [myCurrentPosition[0] + 1, myCurrentPosition[1] - 1];
    optionsCount++;
    i++

  }

  if (myCurrentPosition[0] < logicArray.length - 1) {
    possibleOptions[i] = [myCurrentPosition[0] + 1, myCurrentPosition[1]];
    optionsCount++;

  } else {
    possibleOptions[i] = [myCurrentPosition[0] - 1, myCurrentPosition[1] + 1];
    optionsCount++;

  }
}


async function lastStage() {
  randFinalStageQues();
  let question = finalStageQues.ques[finalRandIdx].ques1;
  let answer = finalStageQues.ques[finalRandIdx].ans;


  let userAns = await swal({

    content: "input",        //let result = text.toLowerCase();
    text: question,
  });
  let lowUserAns = userAns.toLowerCase();

  if (lowUserAns == answer) {

    finalWinAudio();
    fire();
    $("h1").text("You Win! Reload To Restart");
    removeCurrImg = logicArray[myCurrentPosition[0]][myCurrentPosition[1]];
    $("#" + removeCurrImg).html("");
    $("#" + logicArray[myCurrentPosition[0]][myCurrentPosition[1]]).addClass("correctPath");
    $("#img25").html("<img src='/public/images/winningCastle.jpg'></img>");

  }
  else {
    $("h1").text("you lose");
    startOver();
  }

}


function startOver() {

  $(".box").removeClass("correctPath");

  $("#" + option1).html("");
  $("#" + option2).html("");
  removeCurrImg = logicArray[myCurrentPosition[0]][myCurrentPosition[1]];
  $("#" + removeCurrImg).html("");

  $("#img" + myCurrimg).html("<img src='/public/images/swordsman.png'></img>");
  $("h1").text("Game Over... Press Any Key to Restart!!");

  myCurrentPosition = [0, 0];
  myCurrimg = 1;
  gameStarted = false;
  idx1 = 0;
  idx2 = 0;
  possibleOptions = [];
  option1Idx = [];
  option2Idx = [];
  option1 = "";
  option2 = "";
  clickedOption = "";
  idx = 0;
  set1.clear();

  randNoOfPaths = Math.random() * 11;
  randNoOfPaths = Math.floor(randNoOfPaths);
  correctPaths = correctPathsOptions[randNoOfPaths];


  myAudio.pause();
  myAudio.load();
  wrongAnswerSound();

}

$("#showRiddle").on("click", function () {
  console.log("Show Riddle Clicked");

  if (gameStarted == true) {

    giveRiddle(randIdx);
  }



});




function randIdxGenerator() {
  randIdx = Math.random() * 30;
  randIdx = Math.floor(randIdx);

  if (set1.has(randIdx)) {
    randIdxGenerator();
  }
  else {
    set1.add(randIdx);
    return randIdx;
  }
}

const questions = {                 // 30 ques
  ques: [
    {
      ques1: "first progreamming language ever?",
      corr_ans: "FORTRAN",
      wrong_ans: "LISP",
    },
    {
      ques1: "who Developed the Theory of General Relativity ?",
      corr_ans: "Einstein",
      wrong_ans: "Feynman",
    },
    {
      ques1: "who wrote bhagwat gita ?",
      corr_ans: "Ganesha",
      wrong_ans: "Vyasa",
    },
    {
      ques1: "i am used in nuclear weapons reactor who am i?",
      corr_ans: "Uranium235",
      wrong_ans: "Uranium238",
    },
    {
      ques1: "i am Highest scorer in footbal of all time. who am i ?",
      corr_ans: "Ronaldo",
      wrong_ans: "Messi",
    },
    {
      ques1: "who has most wickest in his cricket CAREER?",
      corr_ans: " Murlidharan",
      wrong_ans: "Warne",
    },
    {
      ques1: "I am a god, a planet and I can measure heat. What am I?",
      corr_ans: " Mercury",
      wrong_ans: " Pluto",
    },
    {
      ques1: "speed of light In m/s",
      corr_ans: " 3x10^8 ",
      wrong_ans: " 3x10^6 ",
    },
    {
      ques1: "tom is born on 25 dec but his birthday always comes in summer. on what hemisphere does Tom live ?",
      corr_ans: "southern ",
      wrong_ans: "Northern ",
    },
    {
      ques1: "What is Captain America's shield made of?",
      corr_ans: "Vibranium",
      wrong_ans: "Promethium",
    },
    {
      ques1: "Total How Many Infinity Stones Are There ?",
      corr_ans: "6",
      wrong_ans: "5",
    },
    {
      ques1: "In Which Of This Countries Are On Winning Side In World War 2 ?   ",
      corr_ans: "China",
      wrong_ans: "Italy",
    },
    {
      ques1: "PUBG Mobile Relesed World Wide In Which Year ? ",
      corr_ans: "2018",
      wrong_ans: "2019",
    },
    {
      ques1: " The Name Of First Mars Rover Is___",
      corr_ans: " Sojourner",
      wrong_ans: "Majourner",
    },
    {
      ques1: "If there are four apples and you take away three, how many do you have?",
      corr_ans: "3",
      wrong_ans: "1",
    },
    {
      ques1: "lebron james plays which sport ?",
      corr_ans: "Basketball",
      wrong_ans: "Baseball",
    },
    {
      ques1: "In Basketball HOW Many Players Can Play Of One Team ? ",
      corr_ans: "5",
      wrong_ans: "11",
    },
    {
      ques1: "The National Sport Of India ? ",
      corr_ans: "Hockey",
      wrong_ans: "Kabbadi",
    },
    {
      ques1: "The National Sport Of India ? ",
      corr_ans: "Hockey",
      wrong_ans: "Kabbadi",
    },
      { ques1: "India Have How Many States ? ",
      corr_ans: "28",
      wrong_ans: "27",
    },
    { ques1: "Birth Year of chhatrapati shivaji maharaj___",
    corr_ans: "1630",
    wrong_ans: "1635",
    },
    { ques1: "Which Of The Following Is Spelled correctly",
    corr_ans: "Separate",
    wrong_ans: "Seperate  ",
    },
    { ques1: "Where does chess originate from ?",
    corr_ans: "India",
    wrong_ans: "French",
    },
    { ques1: "Who invented the telescope ?",
    corr_ans: "Lippershey",
    wrong_ans: "Galileo",
    },
    { ques1: "the closest galaxy to the milky way is____",
    corr_ans: "Andromeda",
    wrong_ans: "Cygnus A",
    },
    { ques1: "How Many Years Ago Did big Bang Happened ?",
    corr_ans: "13.8 bn",
    wrong_ans: "12.5 bn",
    },
    { ques1: " How many colors are in the rainbow?",
    corr_ans: "seven",
    wrong_ans: "eight",
    },
    { ques1: " What is the hardest natural substance on Earth ?",
    corr_ans: "Diamond",
    wrong_ans: "Vibranium",
    },
    { ques1: " Can an airplane go in reverse ?",
    corr_ans: "Yes",
    wrong_ans: "No",
    },
    { ques1: " Does sound travel faster in the air or in water? ?",
    corr_ans: "Water",
    wrong_ans: "Air",
    },
  ],
};



function randFinalStageQues() {
  finalRandIdx = Math.random() * 10;
  finalRandIdx = Math.floor(finalRandIdx);
  return finalRandIdx;
}


const finalStageQues = {             //10 ques 
  ques: [
    {
      ques1: "Divide 30 by 1/2 and add 10. What is the answer?",
      ans: "70"
    },
    {
      ques1: "A father's child, a mother's child, yet no one's son. who am I?",
      ans: "daughter"
    },
    {
      ques1: "I shave every day yet my beard stays the same. What am I?",
      ans: "barber"
    },
    {
      ques1: "my automic number is 8 . what am i?",
      ans: "oxygen"
    },
    {
      ques1: " I have lakes with no water, mountains with no stone and cities with no buildings. What am I?",
      ans: "map"
    },
    {
      ques1: "When my dad was 31, I was just 8 years old. Now his age is twice as old as my age. What is my present age?",
      ans: "23"
    },
    {
      ques1: "India Have How Many Union Territories ? ",
      ans: "8"
    },
    {
      ques1: " How many letters are in 'the alphabet' ? ",
      ans: "11"
    },
    {
      ques1: " True Or False ____There are five different blood groups",
      ans: "false"
    },
    {
      ques1: " True Or False ____There are five different blood groups",
      ans: "west indies "
    },
  ]
}





function playSound() {


  if (typeof myAudio.loop == 'boolean') {
    myAudio.loop = true;
  }
  else {
    myAudio.addEventListener('ended', function () {
      this.currentTime = 0;
      this.play();
    }, false);
  }
  myAudio.volume = 0.19;
  myAudio.play();
}



function wrongAnswerSound() {
  $("body").addClass("game-over");
  setTimeout(function () {
    myAudio.pause();
    myAudio.load();
    let looseaudio = new Audio("/public/Sounds/wrong.mp3");
    looseaudio.play();
    $("body").removeClass("game-over");
  }, 200);

}

function rightAnswerSound() {

  let rightAudio = new Audio("/public/Sounds/Right.mp3");
  rightAudio.play();
}

function finalWinAudio() {
  let winAudio = new Audio("/public/Sounds/winning.mp3");
  myAudio.pause();
  myAudio.load();
  winAudio.play();
}

function fire() {
  $("#fire").addClass("fireworksDiv");
  const fireDiv = document.querySelector('.fireworksDiv');
  const fireworks = new Fireworks(fireDiv, {});
  fireworks.start();
}

