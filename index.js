// Adapted code by Dominic Valenciana from https://stackoverflow.com/questions/39861769/ask-the-user-its-name and code by Karan from https://stackoverflow.com/questions/47965648/load-html-before-asking-for-users-input-using-prompt

var delayInMilliseconds = 1000;
var name;

setTimeout(function () {
    function ask() {
        name = prompt("What is your name?");
        if (name != null && isNaN(name) && name != "" && !/\d/.test(name)) {
            document.getElementById("home").innerHTML = "Hello " + name + "!" + " Please press the <strong>START</strong> button to play my Airplane Game.";
        } else {
            alert("Invalid name. Please try again.");
            ask();
        }
    }
    ask();
}, delayInMilliseconds);
