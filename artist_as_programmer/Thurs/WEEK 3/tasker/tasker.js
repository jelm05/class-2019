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
    console.log( taskList );

  });

  function uniqueID() {
    return '_' + Math.random().toString(36).substr(2,9);
  }

  function addTask( taskID, input ) {

    var taskObject = {
      id : taskID,
      content : input,
      completed : false
    };

    taskList.push( taskObject );

  }

});
