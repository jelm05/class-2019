$(document).ready(function(){

  // This is where we'll store our tasks
  var taskList = [];
  // Variable for our new-task button
  var $newTaskButton = $('button#new-task');

  // When we click on newTaskButton, do something
  $newTaskButton.on( 'click', function() {
    // Generate an ID for our task via the uniqueID function we defined below
    var taskID = uniqueID();
    // Grab the value in the input via jQuery's val() method
    var $inputValue = $("input").val();
    // console.log just to make sure it worked
    console.log("ID: ", taskID);
    console.log("Content: ", $inputValue);
    // Add the task to the HTML page (DOM) using the function we defined below
    addTask( taskID, $inputValue );
    // console.log to make sure we're updating our taskList array
    console.log("tasks: ", taskList );
  });


  function uniqueID() {
  // Math.random() gives us a random number 0-1, then we convert it to a string that includes characters, then chop it to to 7 characters
    return '_' + Math.random().toString(36).substr(2,9);
  }

  // Note the two parameters
  function addTask( taskID, input ) {
    // Create a task object that we'll use to store the specific info of our task
    // Note we're using those params we defined before
    var taskObject = {
      id : taskID,
      content : input,
      completed : false
    }
    // Add our task to the taskList array
    taskList.push( taskObject );

    // Create a jQuery object that we'll append to the DOM
    // Note we're using those params we defined before
    var $newItem = $(
      '<li data-id=' +taskID+
      ' class="task">' +input+
      '</li>'
    );

    // Check to make sure the user actually put something in the input
    if ( input === '' ) {
      alert("You didn't enter anything!");
    } else {
      // Add the $newItem to the page
      $('ul').append( $newItem );
    }

  }

});
