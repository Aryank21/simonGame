var ButtonColor = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started=false;


//keyboard event pressed
$(document).keypress(function () {
  
  if (!started) {
    $("h1").text("level " + level);
    nextSequence();
    started=true;
  }
});

$(".btn").click(function () {

  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkanswer(userClickedPattern.length - 1);


});





function nextSequence() {

  userClickedPattern = [];
  level++;
  $("h1").text("level " + level);
  var random = Math.floor(Math.random() * 4);
  var randomChosenColour = ButtonColor[random];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed"); // add remove class

  }, 500);
}

function checkanswer(currentlevel) {


  if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {


    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      
      
      setTimeout(function () {
        nextSequence();
      }, 1000);


    }


  } else {

    startover();
    playSound("wrong");

  }
}

function startover()
{
  
    level=0;
    $("h1").text("  Game Over (refresh to restart)");
   
    $("body").css("background-color","red");
   
  
}