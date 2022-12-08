let correctPaths = ["img2","img7","img8","img13","img14","img15","img19","img20"];
var idx = 0;
let logicArray = [
  ["img1", "img2", "img3", "img4", "img5"],
  ["img6", "img7", "img8", "img9", "img10"],
  ["img11", "img12", "img13", "img14", "img15"],
  ["img16", "img17", "img18", "img19", "img20"],
  ["img21", "img22", "img23", "img24", "img25"]
];
let myCurrentPosition = [0, 0];
let myCurrimg = 1;
// let optionsToGive = [];
//comment
var gameStarted = false;
let idx1 = 0;
let idx2 = 0;
let possibleOptions = [];
let option1Idx = [];
let option2Idx = [];
var option1 = "";
var option2 = "";
let myCurrPosition = logicArray[idx1][idx2];
var clickedOption = "";

$("#img" + myCurrimg).html("<img src='images/swordsman.png'></img>");

var questions = {
  ques: [
    {
      ques1: "my name is chinmay ____",
      corr_ans: "sabnis",
      wrong_ans: "dalal",
    },
    {
      ques1: "college name ____",
      corr_ans: "dypcoe",
      wrong_ans: "pccoe",
    },
    {
      ques1: "Year ____",
      corr_ans: "3",
      wrong_ans: "2",
    },
    {
      ques1: "expected Package ____",
      corr_ans: "10 lpa",
      wrong_ans: "12 lpa",
    },
    {
        ques1: "my name is chinmay ____",
        corr_ans: "sabnis",
        wrong_ans: "dalal",
      },
      {
        ques1: "college name ____",
        corr_ans: "dypcoe",
        wrong_ans: "pccoe",
      },
      {
        ques1: "Year ____",
        corr_ans: "3",
        wrong_ans: "2",
      },
      {
        ques1: "expected Package ____",
        corr_ans: "10 lpa",
        wrong_ans: "12 lpa",
      },
      {
        ques1: "my name is chinmay ____",
        corr_ans: "sabnis",
        wrong_ans: "dalal",
      },
      {
        ques1: "college name ____",
        corr_ans: "dypcoe",
        wrong_ans: "pccoe",
      },
      {
        ques1: "Year ____",
        corr_ans: "3",
        wrong_ans: "2",
      },
      {
        ques1: "expected Package ____",
        corr_ans: "10 lpa",
        wrong_ans: "12 lpa",
      },
  ],
};

if (!gameStarted) {
  gameStarted = true;

  $(document).on("keydown", function () {
    $("h1").text("Game Started!!");
    Options();
    giveRiddle(idx);
  });
}

$(".box").on("click", function () {
  clickedOption = $(this).attr("id");
  if (clickedOption === correctPaths[idx]) {
    $(".box").html("");
    $("#" + clickedOption).html("<img src='images/swordsman.png'></img>");

    var op1idx1 = possibleOptions[0][0];
    var op1idx2 = possibleOptions[0][1];
    var op2idx1 = possibleOptions[1][0];
    var op2idx2 = possibleOptions[1][1];
    var tempansoption = logicArray[op1idx1][op1idx2];
    if (tempansoption === correctPaths[idx]) {
      myCurrentPosition = [op1idx1, op1idx2];
    } else {
      myCurrentPosition = [op2idx1, op2idx2];
    }
    idx++;
  } else {
    startOver();
  }
});

function giveRiddle(idx) {
  var alt = questions.ques[idx].ques1;
  console.log(alt);

  alert(alt);
}

function Options() {
  giveOptionsIdx();
  currect_option = questions.ques[idx].corr_ans;
  wrong_option = questions.ques[idx].wrong_ans;
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
    if (optionsCount == 2) return;
  } else {
    possibleOptions[i] = [myCurrentPosition[0] + 1, myCurrentPosition[1] - 1];
    optionsCount++;
    if (optionsCount == 2) return;
  }
  if (myCurrentPosition[0] < logicArray.length - 1) {
    possibleOptions[i] = [myCurrentPosition[0] + 1, myCurrentPosition[1]];
    optionsCount++;
    if (optionsCount == 2) return;
  } else {
    possibleOptions[i] = [myCurrentPosition[0] - 1, myCurrentPosition[1] + 1];
    optionsCount++;
    if (optionsCount == 2) return;
  }
}

function lastStage1() {
  let ans = prompt(questions.ques[idx].ques1);
  if (ans == questions.ques[idx].corr_ans) {
    $("h1").text("You Moved to Last Stage! Get Ready for Final Question");
    $(".box").html("");
    $("#img9").html("<img src='images/swordsman.png'></img>");
  }
}

function startOver() {
  $(".box").html("");
  $("#img" + myCurrimg).html("<img src='images/swordsman.png'></img>");
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
}
