$(document).ready(function(){

  // Grab our input field
  const $input = $("#input");

  // Listen for a keyup event on our input
  $input.on( "keyup", function(){

    // We check to make sure there's something in the input field
    if( !$input.length ) return true;

    // Make whatever we entered all lowercase, so the search isn't case sensitive
    let $value = $input.val().toLowerCase();

    // Pass the lowercase value to our findHashtags function
    // The function will ensure we're only searching for hashtagged items, it won't take
    // any surrounding values
    findHashtags( $value );

  });

  // We're using this to find hashtagged values, using a param to filter through
  // So we're passing everything that's entered into our input, but we're plucking out
  // words that have a hashtag in front
  function findHashtags( searchText ) {
    // in order to do this, we need use regex
    // check it out here: https://regex101.com/r/VmPp8g/1
    let regexp = /\B\#\w\w+\b/g
    // If we match something via the hashtag, match() puts the string into an array
    result = searchText.match(regexp);
    // If we found a result, do stuff...
    if (result) {
      // you can see the result of line 30 here:
      console.log(result);

      // Our projects array is located in projects.js, and contains all of our searchable objects
      // we look through all of them
      projects.forEach( (img) => {

        // compare our two arrays
        if( compare( result, img.tags ) ){
          // If we have a match, grab the index of that match
          let idx = img.index;
          // Show us the index, there can be multiple
          console.log( idx );

          // This commented line will either show or hide a class according to the matches found 
          // $(`[data-index=${idx}]`).removeClass("hidden"); // only show the matching results
        };

      });

    } else {
        return false;
    }
  }

  // we'll use this function to compare our two arrays
  // one array is our starting point in projects.js under projects[i].tags
  // the other array we create on line 30
  function compare( arr1, arr2 ) {
    let boolean;
    arr1.forEach( (x) => {
      arr2.forEach( (y) => {
        if( x === y ){ boolean = true; }
      });
    });
    return boolean;
  };

});
