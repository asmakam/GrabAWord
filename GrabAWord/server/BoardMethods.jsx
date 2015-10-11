Meteor.methods({
	
	// Function creates the Board and returns the id
	createBoard() {
		// Need to create random tiles 4 x 5
		var tiles = createTiles();
		const board_id = Boards.insert({ createdAt: new Date(), users: [], tiles: tiles});
		return board_id;
	},

	// Someone grabs a words
	grabWord(word, board, user) {
		//If the word is walid,
		if (isWordPresent(word)) {
			// Is the word in BoardWords
			if (BoardWords.findOne({boardId:board, word: word})) {
				BoardWords.insert({boardId: board, words: word, user: user});
				return true;
			}
		}
		return false;
	}

});


var createTiles = function() {
	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let text = "";
	for( var i=0; i < 20; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};