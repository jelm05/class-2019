$(document).ready(function(){
  // Place to store our tasks
  var taskList = [];
  // Variables for new task button and our input
  var $newTaskButton = $('button#new-task');
  var $input = $('input');

  // Listen for a click event on the new task button
  $newTaskButton.on('click', function(){

    var taskID = uniqueID();
    // console.log("taskID: ", taskID);

    var $inputValue = $input.val();
    // console.log("inputValue: ", $inputValue );

    addTask(taskID, $inputValue);
    // console.log( taskList );

  });

  // Look for ul, and listen for a click on a child li,
  // then run a function
  $('ul').on('click', 'li', function(){
    $(this).toggleClass( 'checked' );

    var $taskId = $(this).attr( 'data-id' );

    var taskStatus = taskList.find( function( taskItem ) {
      return taskItem.id === $taskId;
    });

    if( taskStatus.completed === false ) {
      taskStatus.completed = true;
    } else {
      taskStatus.completed = false;
    }

    console.log( taskList );


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

    var $newItem = $(
      '<li data-id=' + taskID +
      ' class="task">' + input +
      '</li>'
    );

    if ( input === '' ) {
      alert("You didn't enter anything")
    } else {
      $('ul').append( $newItem );
    }

    console.log(taskList);

  }

});
