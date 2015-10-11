Meteor.publish('latestBoard', () => {
	return Boards.find({}, {sort: {createdAt:-1}, limit:1});
})