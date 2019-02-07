$(document).ready(function(){

  // This is where we'll store our tasks
  var taskList = [];
  // Variable for our new-task button
  var $newTaskButton = $('button#new-task');

  // When we click on newTaskButton, do something
  $newTaskButton.on( 'click', function() {
    var taskID = uniqueID();
    var $inputValue = $("input").val();
    console.log("ID: ", taskID);
    console.log("Content: ", $inputValue);
    addTask( taskID, $inputValue );
    console.log("tasks: ", taskList );
  });

  function uniqueID() {
    return '_' + Math.random().toString(36).substr(2,9);
  }

  function addTask( taskID, input ) {

    var taskObject = {
      id : taskID,
      content : input,
      completed : false
    }
    taskList.push( taskObject );

    var $newItem = $(
      '<li data-id=' +taskID+
      ' class="task">' +input+
      '</li>'
    );

    if ( input === '' ) {
      alert("You didn't enter anything!");
    } else {
      $('ul').append( $newItem );
    }

  }

});
