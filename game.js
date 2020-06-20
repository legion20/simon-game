var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
started = false;
var level = 0;

$(document).keypress(function(){
    if(!started)
    {
        nextSequence();
        started = true;
    }
})

$(".btn").click(function(event){
    if(started){
        var userChosenColour = event.target.id;
        userClickedPattern.push(userChosenColour);
        animatepress(userChosenColour);
        playsound(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
    }
});


function nextSequence(){
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(200).fadeIn(200);
    playsound(randomChosenColour);
    level++;
}

function checkAnswer(currentlevel){
    if(gamePattern[currentlevel] === userClickedPattern[currentlevel]){
        if(userClickedPattern.length === gamePattern.length){
            userClickedPattern = [];
            setTimeout(nextSequence,1000);
        }
    }
    else{
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        playsound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function animatepress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },50);
}

function playsound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}