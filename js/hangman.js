// VARIABLES
var selectedWord = "";
var selectedHint = "";
var board = [];
var remainingGuesses = 6;
var words = [{ word: "snake", hint: "It's a reptile" },
             { word: "monkey", hint: "It's a mammal" },
             { word: "beetle", hint: "It's an insect" }];
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
                'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
                'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var hintShown = false;
            
// LISTENERS
window.onload = startGame();


// FUNCTIONS
function startGame() {
    pickWord();
    initBoard();
    updateBoard();
    createLetters();
    revealHint();
}

function pickWord() {
    var randomInt = Math.floor(Math.random() * words.length);
    selectedWord = words[randomInt].word.toUpperCase();
    selectedHint = words[randomInt].hint;
}
            
function initBoard() {
    for (var letter in selectedWord) {
       board.push("_");
    }
}
            
function updateBoard() {
    $("#word").empty();
    
    for (var i=0; i < board.length; i++) {
        $("#word").append(board[i] + " ");
    }
    
    $("#word").append("<br />");
}

function revealHint() {
    if (hintShown) {
        $("#hint").empty();
        $("#hint").append("<span class='hint'>Hint: " + selectedHint + "</span>");
    } else {
        $("#hint").empty();
        $("#hint").append("<button class='btn' id='btn-hint'>Hint</button>");
    }
}


function createLetters() {
    for (var letter of alphabet) {
        $("#letters").append("<button class='letter btn btn-success' id='" + letter + "'>" + letter + "</button>");
    }
}

function disableButton(btn) {
    btn.prop("disabled",true);
    btn.attr("class", "btn btn-danger")
}

function checkLetter(letter) {
    var positions = new Array();
    
    for (var i=0; i < selectedWord.length; i++) {
        console.log(selectedWord)
        if (letter == selectedWord[i]) {
            positions.push(i);
        }
    }
    
    if (positions.length > 0) {
        updateWord(positions, letter);
        
        if (!board.includes('_')) {
            endGame(true);
        }
        
    } else {
        remainingGuesses -= 1;
        updateMan();
    }
    
    if (remainingGuesses <= 0) {
        endGame(false);
    }
}

function updateWord(positions, letter) {
    for (var pos of positions) {
        board[pos] = letter;
    }
    
    updateBoard();
}

function updateMan() {
    $("#hangImg").attr("src", "img/stick_" + (6 - remainingGuesses) + ".png");
}

function endGame(win) {
    $("#letters").hide();
    
    if (win) {
        $('#won').show();
    } else {
        $('#lost').show();
    }
}

// HANDLERS
$(".letter").click(function() {
    checkLetter($(this).attr("id"));
    disableButton($(this));
});

$(".replayBtn").on("click", function() {
    $('#guessed').append(selectedWord + "<br/>");
    $('#letters').empty();
    $('#letters').show();
    $('#won').hide();
    $('#lost').hide();
    hintShown = false;
    remainingGuesses = 6;
    board = [];
    selectedWord, selectedHint = "";
    startGame();
    updateMan();
    
    
});

$("#btn-hint").on("click", function() {
    hintShown=true;
    remainingGuesses -= 1;
    updateMan();
    revealHint();
});

