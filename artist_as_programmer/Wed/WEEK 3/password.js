// Wait until the page is loaded
$(document).ready(function(){
  // when the document, run all of our code

  // A method to generate a password to be used later
  function generatePassword() {

    var lengthOfPassword = 10;
    var characterSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var lengthOfCharacterSet = characterSet.length;
    var generatedPassword = "";

    for ( var i = 0; i < lengthOfPassword; i++ ) {
      var randomCharacter = Math.floor( Math.random() * lengthOfCharacterSet );
      generatedPassword += characterSet.charAt( randomCharacter );
      // console.log(generatedPassword);
    }

    return generatedPassword;

  }

  // jQuery, look for a button, if you find it
  // Listen for a click event, on that button, and run
  // a block of code when the button is clicked
  $("button").click(function(){
    var password = generatePassword();
    $("#password-holder").html( password );
  });

});
