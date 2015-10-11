if (Meteor.isClient) {

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  Meteor.startup(function() {
    React.render( < Game / > , document.getElementById("mainBody"));
  });
}


if (Meteor.isServer) {
  Meteor.startup(function() {
    GameTimer.remove({});
    GameTimer.insert({showBoard: true, tickCount: 0});
    Meteor.setInterval(ticker, 1000);

    if (Boards.find().count() === 0) {
      Meteor.call('createBoard');
    }
  });
}

const GAMETIME = 60; // seconds
const LEADERBOARDTIME = 15; //seconds

function ticker() {

  let timerObj = GameTimer.findOne();
  timerObj.tickCount++;

  if(timerObj.tickCount < GAMETIME) {
      // Game play
      timerObj.showBoard = true;
    } else if (timerObj.tickCount < GAMETIME+LEADERBOARDTIME) {
      // Leader board
      timerObj.showBoard = false;
    } else {
      // New game
      Meteor.call('createBoard');
      timerObj.tickCount = 0;
      timerObj.showBoard = true;
  }

  GameTimer.update({_id:timerObj._id}, timerObj);
}
