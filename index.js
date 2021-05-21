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
