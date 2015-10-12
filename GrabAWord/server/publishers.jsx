Meteor.publish('latestBoard', () => {
  return Boards.find({}, {
    sort: {
      createdAt: -1
    },
    limit: 1
  });
});

Meteor.publish('wordsByUserInBoard', (boardId, userId) => {
  return BoardWords.find({
    boardId: boardId,
    user: userId
  });
});

Meteor.publish('timerInfo', () => {
  return GameTimer.find();
});

Meteor.publish('leaderboard', (boardId) => {
  return BoardWords.aggregate([{
    $match: {
      boardId: boardId
    }
  }, {
    $group: {
      _id: '$user',
      totalPoints: {
        $sum: '$points'
      }
    }
  }]);
});

Meteor.publish('leaderboardUsers', (boardId) => {
	var users = BoardWords.find({boardId:boardId}, {$fields: { user: 1}}).fetch();
	return Meteor.users.find({_id: {$in: users}}, {$fields: { username: 1}});
});