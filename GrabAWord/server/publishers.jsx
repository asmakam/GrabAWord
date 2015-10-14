Meteor.publish('latestBoard', () => {
  return Boards.find({}, {
    sort: {
      createdAt: -1
    },
    limit: 1
  });
});

Meteor.publish('BoardUsers', (boardId, userId) => {
  return BoardWords.find({
    boardId: boardId,
  },
  {fields:{user:1}});
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

  var list = Meteor.users.find().fetch();

  Players.remove({});
  for(var idx = 0; idx < list.length; idx++) {
    Players.insert({username: list[idx].username, idx: list[idx]._id});
  }

  return Players.find();
});
