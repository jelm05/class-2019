
// This is incomplete, we will finish the demo next week


// Wait until the document (DOM) is loaded before executing any code
$(document).ready(function(){

  // An array to store all the tasks we generate
  let taskList = [];

  // Store the new task, mark all buttons, and input as jQuery objects so we can add an event listener later
  let $newTaskButton = $('button#new-task');
  let $markAllButton = $('button#mark-all');
  let $input = $('input');

  $input.keypress( function(event) {
    // If the 'enter' key was pressed
    if( event.which == 13 ) {
      let $inputValue = $input.val();
      let taskID = uniqueID();
      addTask(taskID, $inputValue);
      $input.val('');
    }
  });

  // Listen for clicks on the new task button
  $newTaskButton.click(function(){

    let $inputValue = $input.val();
    let taskID = uniqueID();
    addTask(taskID, $inputValue);
    $input.val('');

  });

  // Listen for clicks on the mark all button
  $markAllButton.click(function(){
    // Find all list items that have a class of 'task' and store them in a jQuery object
    let $task = $('li.task');
    // For each list item with class of 'task', add the class 'checked'
    // Look in the css to see that a class of 'checked' adds a strike through
    $task.each(function(){
      $task.addClass('checked');
    });
  });

  $('ul').on('click', 'li', function(){
    $(this).toggleClass('checked');

    let $taskID = $(this).attr('id');

    let taskStatus = taskList.find( (taskItem) => {
      return taskItem.id === $taskID;
    });

    if ( taskStatus.completed === false ) {
      taskStatus.completed = true;
    } else {
      taskStatus.completed = false;
    }

  });

  $('button#delete-completed').on('click', function(){
    if( confirm("Are you sure?") ) {
      $('li.checked').remove();
    }
  });

  function uniqueID() {
    return Math.random().toString(36).substr(2, 9);
  }

  function addTask(taskID, input) {

    let taskObject = {
        id: taskID,
        content: input,
        completed: false
    }
    taskList.push(taskObject);
    console.log(taskList);

    let $newItem = $(`<li id="${taskID}" class="task">${input}</li>`);

    if( input === '') {
      alert("You didn't enter a task.");
    } else {
      $('ul').append($newItem);
    }
  }

});
