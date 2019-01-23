
// timer for each question
// timer for right/wrong display
// score tracking
// button creation at the end of the game to play again, restart game cycle



//object with questions, correct answer, images or gifs
function getGameData() {
    return {
        loadingGIF: "https://gph.is/1XRTmuh",
        winScore: 0,
        lossScore: 0,
        unansweredScore: 0,
        questions: [
            {
                question: "Austin has the only __________ in all of Texas.",
                ans: {
                    A: "skyscraper",
                    B: "cave",
                    C: "nude beach",
                    D: "national park"
                },
                correctAnswer: "C",
                funFact: "Hippie Hollow at Lake Travis is the only legal nude beach in Texas. Also, Austin is the only city in the state that doesn't have legislation preventing ladies from 'hanging it out' for all to see.",
                displayImg: "assets/images/hippiehollow.jpg",
            },
            {
                question: "Austin has the second largest ___________ in the U.S.",
                ans: {
                    A: "State Capitol Building",
                    B: "hippie population",
                    C: "lake",
                    D: "shopping mall"
                },
                correctAnswer: "A",
                funFact: "The Texas State Capitol building is the largest of all domed state capitol buildings and is second in total size only to the National Capitol in Washington, D.C.",
                displayImg: "assets/images/statecapitol.jpg"
            },
            {
                question: "Austin has celebrated the birthday of which fictional character since 1963?",
                ans: {
                    A: "Bart Simpson",
                    B: "Chuck Norris",
                    C: "The Lone Ranger",
                    D: "'Eeyore' from Winnie The Pooh"
                },
                correctAnswer: "D",
                funFact: "Eeyore's Birthday Party is a uniquely Austin celebration that takes place every year since 1963, typically on the last Saturday of April.",
                displayImg: "assets/images/eeyorebirthday.jpg"
            },
            {
                question: "Around 1.5 million _________ emerge from under the Congress Avenue Bridge just before sunset every day from March to October.",
                ans: {
                    A: "rats",
                    B: "cats",
                    C: "bats",
                    D: "gnats"
                },
                correctAnswer: "C",
                funFact: "Every summer night, hundreds of people gather to see the world's largest urban bat colony emerge from under the Congress Avenue Bridge in downtown Austin, Texas.",
                displayImg: "assets/images/congressbats.jpg"
            },
            {
                question: "Which major grocery store chain originated in Austin?",
                ans: {
                    A: "Randall's",
                    B: "Whole Foods",
                    C: "HEB",
                    D: "None of the above"
                },
                correctAnswer: "B",
                funFact: "Whole Foods originally opened in Austin in 1978 when college dropout John Mackley and Rene Lawson Hardy borrowed $45,000 to open a small natural foods store. Amazon acquired the company for $13.4 billion in 2017.",
                displayImg: "assets/images/wholefoods.jpeg"
            },
            {
                question: "Before Bevo became the Longhorns’ mascot, UT’s original mascot was what?",
                ans: {
                    A: "A little tan and white dog named Pig Bellmont",
                    B: "A white spotted bull named Waterloo",
                    C: "A giant armadillo named Willy",
                    D: "An tan and white stallion named Lone Star"
                },
                correctAnswer: "A",
                funFact: "Pig was named after the center of the football team during that time, Gus “Pig” Dittmar. Pig was known to visit classrooms, hang out in the library on cold days, and attend both home and away athletic events.",
                displayImg: "assets/images/pig_bellmont_portrait.gif",
            }]
    }
};
var gameData = getGameData();
const QUESTION_TIME_PERIOD = 15; // bc I can't decide how long I want my question timer, so this makes it easier to change that value in all the places 
var qTimeRem = QUESTION_TIME_PERIOD;
var dispTimeRem = 6;
var questionTimerInterval;
var answerDisplayInterval;
var ansID;
var currentIndex = 0;
var currentQ = null;
function resetIndexState() {
    currentIndex = 0;
    currentQ = null;
};

function beginQtimer() {
    clearInterval(questionTimerInterval);
    qTimeRem = QUESTION_TIME_PERIOD;
    $(".timerDisplay").html("<h3>" + "Time Remaining: " + qTimeRem + " seconds" + "</h3>");
    console.log(qTimeRem);
    questionTimerInterval = setInterval(decrementQtimer, 1000);
};

function beginAnswerTimer() {
    clearInterval(answerDisplayInterval);
    dispTimeRem = 6;
    answerDisplayInterval = setInterval(decrementAns, 1000);
};

function decrementQtimer() {
    qTimeRem--;
    $(".timerDisplay").html("<h3>" + "Time Remaining: " + qTimeRem + " seconds" + "</h3>");
    if (qTimeRem === 0) {
        intervalComplete();
        gameData.unansweredScore++;
        displayWrongAnswer();
    };
};

function decrementAns() {
    dispTimeRem--;
    if (dispTimeRem === 0) {
        intervalComplete();
        if (currentIndex === gameData.questions.length - 1) {
            $("#gameRow").empty();
            $("#scoreRow").show().css("visibility", "visible");
            $("#buttonRow").show();
            $("#winScore").text(gameData.winScore);
            $('#lossScore').text(gameData.lossScore);
            $('#unansweredScore').text(gameData.unansweredScore);
            gameBegin("Play again?");
            return;
        };
        $('#gameRow').empty();
        currentIndex++;
        playGame();
    };
};

function intervalComplete() {
    clearInterval(questionTimerInterval);
    clearInterval(answerDisplayInterval);
};

function createStartButton(buttonText) {
    $("#buttonRow").append("<button>" + buttonText + "</button>").addClass("btn btn-success btn-lg");
    $("button").attr("ID", "startButton");
};

function displayCurrentQuestion(currentQ) {

    $("<div>").appendTo("#gameRow").addClass("timerDisplay");
    $("<div>").appendTo("#gameRow").addClass("questionDisplay").text(currentQ.question);
    $("<div>").appendTo("#gameRow").addClass("answerChoices");
    $("<ul>").appendTo(".answerChoices");
    $("<li>").appendTo("ul").addClass("ans").attr("id", "A").text(currentQ.ans.A);
    $("<li>").appendTo("ul").addClass("ans").attr("id", "B").text(currentQ.ans.B);
    $("<li>").appendTo("ul").addClass("ans").attr("id", "C").text(currentQ.ans.C);
    $("<li>").appendTo("ul").addClass("ans").attr("id", "D").text(currentQ.ans.D);
};

function displayWrongAnswer() {
    $("#gameRow").empty();
    $("<div>").appendTo("#gameRow").text("Ah, dang...");
    $("<div>").appendTo("#gameRow").text("The correct answer was " + currentQ.ans[currentQ.correctAnswer] + ".").css("padding-bottom", "1rem");
    // $('<br />').appendTo("#gameRow");
    $("<div>").appendTo("#gameRow").text(currentQ.funFact).append('<br />');
    $("<img>").attr("src", currentQ.displayImg).appendTo('#gameRow');
    beginAnswerTimer();
};

function displayRightAnswer() {
    $("#gameRow").empty();
    $("<div>").appendTo("#gameRow").text("Alright, alright, al'RIGHT!").css("padding-bottom", "1rem");
    // $('<br />').appendTo("#gameRow");
    $("<div>").appendTo("#gameRow").text(currentQ.funFact);
    $("<img>").attr("src", currentQ.displayImg).appendTo('#gameRow');
    beginAnswerTimer();
};

function playGame() {
    currentQ = gameData.questions[currentIndex];
    displayCurrentQuestion(currentQ);
    beginQtimer();
    console.log("current index", currentIndex)  
}

$("#gameRow").on("click", ".ans", function (answerClicked) {
    ansID = $(this).attr("id");
    console.log("This is the ansID", ansID);
    if (ansID === currentQ.correctAnswer) {
        gameData.winScore++;
        console.log("win score", gameData.winScore);
        displayRightAnswer();
    }
    else {
        gameData.lossScore++;
        displayWrongAnswer();
    }
    
});

//start button that disappears when clicked
function gameBegin(startButtonText) {
    
    createStartButton(startButtonText);
    $("#startButton").on("click", function () {
        resetIndexState();
        gameData = getGameData();
        $("#buttonRow").empty().hide();
        $("#buttonRow").empty();
        $("#gameRow").empty();
        $("#winScore").text("");
        $("#lossScore").text("");
        $("#unansweredScore").text("");
        $('#scoreRow').hide().css("visibility", "hidden");
        playGame();
    });
};
$('#scoreRow').hide();
gameBegin("Start Here, Y'all!");
