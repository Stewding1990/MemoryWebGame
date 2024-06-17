var buttonColors = ["red", "blue", "green", "yellow"];
var userClickPattern = [];

var gamePattern = [];
var started = false;
var level = 0;

$(document).keydown(function(event)
{
    if(!started)
    {
        started = true;
        nextSequence();
    }
    
})

$(".btn").click(function(){
    var buttonClicked = $(this).attr("id");

    userClickPattern.push(buttonClicked);
    
    playSound(buttonClicked);

    animatePress(buttonClicked);

    checkAnswer(userClickPattern.length-1);
});

function checkAnswer(currentlevel)
{
    if( gamePattern[currentlevel] === userClickPattern[currentlevel])
        {
            console.log("done correctly")

            if(userClickPattern.length === gamePattern.length)
                {
                    setTimeout(function(){
                        nextSequence();
                    },1000);
                }

        }
        else{
            started = false;
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);
            $("#level-title").text("Press Any Key To Restart");
            level = 0;
            userClickPattern = [];
            gamePattern = [];

            console.log("wrong");
        }
}

function nextSequence()
{
    userClickPattern = [];
    level+=1;
    $("#level-title").text("Level " + level);
    randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

function playSound(name)
{
    var audio = new Audio("./sounds/" + name + ".mp3");

    audio.play();
}

function animatePress(currentColor)
{
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}