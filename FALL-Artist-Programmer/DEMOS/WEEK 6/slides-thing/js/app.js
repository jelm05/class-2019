// alert("Hello!");

// Don't do anyything until the DOM tree is loaded
window.onload = function() {
  let mainHeading = document.createElement("h1");
  let headingText = document.createTextNode("Hello world!");
  mainHeading.appendChild(headingText);
  document.body.appendChild(mainHeading);

  // Find an anchor tag, store in memory
  let anchorElement = document.querySelector('a');

  // Attach a click event listener to our anchor tag,
  // stored in memory
  
  anchorElement.addEventListener('click', event => {
    // If the anchor was clicked, run some code
  	event.preventDefault();
  	console.log('You clicked the anchor tag!');
  });

}
