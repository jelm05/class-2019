// Wait until the page is loaded
$(document).ready(function(){
  // when the document, run all of our code

  // A method to generate a password to be used later
  function generatePassword() {

    // How long will our password be?
    var lengthOfPassword = 10;
    // This is where we'll get characters to generate our password
    var characterSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    // Cacheing our character set using .length of the string
    var lengthOfCharacterSet = characterSet.length;
    // This is where we'll store the password once it's generated
    var generatedPassword = "";

    // Loop through our characters
    for ( var i = 0; i < lengthOfPassword; i++ ) {
      // Grab a random character by generating a random number 0-1, multiplying by the length of our characterSet
      // We do that to ensure we look all characters and they're all possibility, then we round that number to a whole
      // number so we can pass it to our generated password
      var randomCharacter = Math.floor( Math.random() * lengthOfCharacterSet );
      // Add every character we find to our generatedPassword variable
      generatedPassword += characterSet.charAt( randomCharacter );
      // console.log(generatedPassword);
    }

    // return the password, so we can add it to the HTML document
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
