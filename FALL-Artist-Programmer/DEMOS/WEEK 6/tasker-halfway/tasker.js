
// This is incomplete, we will finish the demo next week


// Wait until the document (DOM) is loaded before executing any code
$(document).ready(function(){

  // An array to store all the tasks we generate
  let taskList = [];

  // Store the new task, mark all buttons, and input as jQuery objects so we can add an event listener later
  let $newTaskButton = $('button#new-task');
  let $markAllButton = $('button#mark-all');
  let $input = $('input');

  // Listen for clicks on the new task button
  $newTaskButton.click(function(){
    // Get the value in the input field using jQuery's val() method
    let $inputValue = $input.val();
    // Invoke our custom addTask() function that we added below
    addTask($inputValue);
    // After we've added the task, clear the input field so it's ready for new content
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

  // Listen for clicks on list items that are children of an unordered list, and run a function
  // This is similar to click methods above, we're the on() method for demo purposes, just to see an alternate
  // https://stackoverflow.com/questions/1051782/whats-the-difference-between-this-and-this
  $('ul').on('click', 'li', function(){
    // $(this) denotes whatever we're currently interacting with
    $(this).toggleClass('checked');
  });

  // A function we've created to bundle all our logic at once, to invoke when a click event is fired
  function addTask(input) {
    // Here we create an object that will represent each task within our array
    // Notice that content: input, input corresponds to the parameter of addTask()
    // That means that whenever we invoke addTask(), we must provide an argument for the input parameter
    // We'll use the input, in the form of whatever the end user types, as our input argument and then we attach
    // it to the taskObject object to store in our array
    let taskObject = {
        content: input,
        completed: false
    }
    // After we create the taskObject with all corresponding values, we store it in our array
    taskList.push(taskObject);
    // Template literals, to create an html element in the form of a jQuery object that we can add to the front end
    // Otherwise we'd have no visual representation of the tasks on the front end
    let $newItem = $(`<li class="task">${input}</li>`);
    // Here we need to check to make sure that the end user actually entered something in the input field,
    // No point in creating an empty task
    if( input === '') {
      alert("You didn't enter a task.");
    } else {
      $('ul').append($newItem);
    }
  }

});
