
// function tells JS that we're going to write a function
// replaceTheWords is the name of our function,
// it can be named whatever we want it
// All associated code goes between the curly brackets
function replaceTheWords() {
  console.log("I'm working");

  // this is a local variable to replaceTheWords
  // it can be called whatever you want it
  // and it has an assignment of data type string
  // called Replaced!

  let replacementWords = "Replaced!";

  document.getElementById("demo").innerHTML = replacementWords;

}

// replaceTheWords();
