$(document).ready(function(){

  // This is where we'll store all of our tasks
  var taskList = [];

  // We store the new task button and input in variables, with a dollar sign to denote jquery
  var $newTaskButton = $('button#new-task');
  var $input = $('input');

  // Listen for click event, then addTask()
  $newTaskButton.on('click', function(){

    var taskID = uniqueId();
    var $inputValue = $input.val();
    addTask( taskID, $inputValue );
    $input.val('');
    // console.log( taskList );

  });

  // Start with click event
  // Listen for enter keypress, then addTask()
  $input.keypress( function( event ) {
    if ( event.which == 13 ) {
      var taskID = uniqueId();
      var $inputValue = $input.val();
      addTask( taskID, $inputValue );
      $input.val('');
    }
  });

  // Listen for click on a list item
  $('ul').on('click', 'li', function() {

    // If clicked on a list item, toggle the class 'checked' so it'll cross out the item
    $(this).toggleClass( 'checked' );
    // but also have to grab the ID, to update our object in our array
    var $taskId = $(this).attr('data-id');
    // console.log("ID: ", $taskId);

    // So, look through the taskList and find the object that has the same ID and return it
    var taskStatus = taskList.find( function( taskItem ) {
      return taskItem.id === $taskId;
    });

    // console.log("list: ", taskList);
    // console.log("status: ", taskStatus);

    // Then, according to the status, change it
    // If it's already completed, make it to do, if its not completed, mark it complete
    if ( taskStatus.completed === false ) {
      taskStatus.completed = true;
    } else {
      taskStatus.completed = false;
    }

    // Ternary:
    // taskStatus.completed === false ?
    // taskStatus.completed = true :
    // taskStatus.completed = false;

  });

  // listen for click event on mark all button
  $('button#mark-all').on('click', function() {

    // if it's click, look at all the tasks
    $('li.task').each(function(){

      // if the list item doesn't have a class called checked, add it
      var theClass = !$(this).hasClass("checked");

      // console.log( theClass );
      if ( theClass === true ) {
        $('li.task').addClass( 'checked' );
      }

    });

  });

  // listen for a click on delete button, if clicked, delete everything that has a class of checked
  $('button#delete-completed').on('click', function() {
    if( confirm('Are you sure you want to delete all of the items? There\'s no going back...') ) {
      $('li.checked').remove();
    }
  });

  // basic unique id method
  function uniqueId() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  // add task method 
  function addTask( taskID, input ) {

    var taskObject = {
      id : taskID,
      content : input,
      completed : false
    }

    taskList.push( taskObject );

    var $newItem = $('<li data-id=' + taskID + ' class="task">' + input + '</li>');
    if( input === ''){
      alert('You didn\'t enter anything...');
    } else {
      $('ul').append( $newItem );
      // console.log( taskCollection );
    }

  }

});
