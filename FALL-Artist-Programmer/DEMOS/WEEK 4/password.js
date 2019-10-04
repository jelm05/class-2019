
// We're going to need:
// A place to store passwords
// Something to draw password characters from
// How long is the password?
// How do we run our code on a button click?
// How do we get our generated password into html?

function generatePassword() {
  let password = [];
  let lengthOfPassword = 10;
  let characterSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

  // This will loop 10 times
  for (var i = 0; i < lengthOfPassword; i++) {
    let randomNum = Math.floor( Math.random() * characterSet.length );
    password.push( characterSet.charAt(randomNum) )
  }

  document.getElementById("password-holder").innerHTML = password.join('');

}

document.getElementById("password-generator").onclick = generatePassword;
