$(document).ready(function(){
  // Place to store our tasks
  var taskList = [];
  // Variables for new task button and our input
  var $newTaskButton = $('button#new-task');
  // Variable to use to capture input
  var $input = $('input');

  // Listen for a click event on the new task button
  $newTaskButton.on('click', function(){

    // Generate unique ID using our function we defined below
    var taskID = uniqueID();

    // Capture the input the user typed in and store in a task
    var $inputValue = $input.val();

    // Add our task using the function we defined below
    addTask(taskID, $inputValue);

  });

  // Look for ul, and listen for a click on a child li,
  // then run a function
  $('ul').on('click', 'li', function(){
    // Add or remove the class .checked to add style to our task, a cross through
    // Those styles are defined in tasker.css
    $(this).toggleClass( 'checked' );

    // capture the previously generated ID of the task list item when we click on it
    var $taskId = $(this).attr( 'data-id' );

    // Loop through our taskList and find the task that has the same ID as the task we clicked on, store in a variable
    var taskStatus = taskList.find( function( taskItem ) {
      return taskItem.id === $taskId;
    });

    // Update the taskStatus
    if( taskStatus.completed === false ) {
      taskStatus.completed = true;
    } else {
      taskStatus.completed = false;
    }
    // console.log( taskList );
  });

  // generate a unique ID
  function uniqueID() {
    return '_' + Math.random().toString(36).substr(2,9);
  }
  // addTask method to be used later
  function addTask( taskID, input ) {
    // create a task object
    var taskObject = {
      id : taskID,
      content : input,
      completed : false
    };
    // add our task to our taskList array
    taskList.push( taskObject );

    // jQuery object to add our task to the DOM
    // Note, we pass our params so they'll end up on the page
    var $newItem = $(
      '<li data-id=' + taskID +
      ' class="task">' + input +
      '</li>'
    );

    // Make sure the user put something in the input, and if they did, add the task to the page
    if ( input === '' ) {
      alert("You didn't enter anything")
    } else {
      $('ul').append( $newItem );
    }
    // console.log(taskList);
  }

});
