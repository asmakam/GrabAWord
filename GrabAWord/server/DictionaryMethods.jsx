Meteor.methods({

  // Assuming we are passed a tileArray
  // Each tile has 2 properties - letter and value
  allWordsInGame(tileArray) {
    //create a string with the tileArray
    let letters = "";
    tileArray.forEach(tile => {
      letters += tile.character;
    });

    // permutation of letters
    var tree = function(leafs) {
      var branches = [];
      if (leafs.length == 1) return leafs;
      for (var k in leafs) {
        var leaf = leafs[k];
        tree(leafs.join('').replace(leaf, '').split('')).concat("").map(
          function(subtree) {
            branches.push([leaf].concat(subtree));
          });
      }
      return branches;
    };

    let wordsArray = tree(letter.split('')).map(function(str){return str.join('')});
    
    // Find all the words in the dictionary

  }

});
