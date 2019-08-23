var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;

//generate random number for buttonColor array
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").html("Level " + level);

  var randonSequence = Math.random() * 4;
  var randomChosenColor = buttonColors[Math.floor(randonSequence)];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  console.log(gamePattern);
  playSound(randomChosenColor);
}

// Sound producer
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// On button clicked
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

// playing animation on click of buttin
function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

// start the game on any key pressed
$(document).keypress(function() {
  nextSequence();
});

// verify the game pattern and the user inserted patteren
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("failed");
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").html("Game Over, Press Any Key to Restart ");
    level = 0;
    startOver();
  }
}
//starting the game all over again
function startOver() {
  gamePattern = [];
  userClickedPattern = [];
}
