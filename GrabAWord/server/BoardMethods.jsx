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
		if (Words.findOne({key: word })) {
			// Is the word in BoardWords
			if (!BoardWords.findOne({boardId:board, word: word})) {
				var bwId = BoardWords.insert({boardId: board, word: word, user: user, points: 0});
				// Calculate points and update the word
				Meteor.defer(() => {
					Meteor.call('updateWordsWithPoints',bwId, word);
				});
				return true;
			}
		}
		return false;
	},

	updateWordsWithPoints(wordId, word) {
		var LettersAndPoints = [];
		LettersAndPoints['A'] = 1;
		LettersAndPoints['B'] = 3;
		LettersAndPoints['C'] = 3;
		LettersAndPoints['D'] = 2;
		LettersAndPoints['E'] = 1;
		LettersAndPoints['F'] = 4;
		LettersAndPoints['G'] = 2;
		LettersAndPoints['H'] = 4;
		LettersAndPoints['I'] = 1;
		LettersAndPoints['J'] = 8;
		LettersAndPoints['K'] = 5;
		LettersAndPoints['L'] = 1;
		LettersAndPoints['M'] = 3;
		LettersAndPoints['N'] = 1;
		LettersAndPoints['O'] = 1;
		LettersAndPoints['P'] = 3;
		LettersAndPoints['Q'] = 10;
		LettersAndPoints['R'] = 1;
		LettersAndPoints['S'] = 1;
		LettersAndPoints['T'] = 1;
		LettersAndPoints['U'] = 1;
		LettersAndPoints['V'] = 4;
		LettersAndPoints['W'] = 4;
		LettersAndPoints['X'] = 8;
		LettersAndPoints['Y'] = 4;
		LettersAndPoints['Z'] = 10;

		let score = 0;
		word.split("").forEach(l => {
			score += LettersAndPoints[l];
		});
		BoardWords.update({_id:wordId}, {$set: { points: score}});
	}

});


var createTiles = function() {
	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let text = "";
	for( var i=0; i < 20; i++ ) // TODO use constants for board size
				//TODO - use char probability
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};
