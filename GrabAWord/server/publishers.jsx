Meteor.publish('latestBoard', () => {
	return Boards.find({}, {sort: {createdAt:-1}, limit:1});
});

Meteor.publish('wordsByUserInBoard', (boardId,userId) => {
	return BoardWords.find({boardId: boardId, user: userId});
});

Meteor.publish('timerInfo', () => {
	return GameTimer.find();
});

