Meteor.methods({

  // Assuming we are passed a tileArray
  // Each tile has 2 properties - letter and value
  // Cant use takes too much memory
  allWordsInGame: function(letters) {
    
    let wordsArray = tree(letters.split('')).map(function(str) {
      return str.join('')
    });
    
    // Find all the words in the dictionary
    let gameDict = Words.find({key: {$in: wordsArray}}).count();
    return gameDict;

  },

  isWordPresent: function(word) {
  	if (Words.findOne({key:word})) {
  		return true;
  	}
  	return false;
  }

});

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
