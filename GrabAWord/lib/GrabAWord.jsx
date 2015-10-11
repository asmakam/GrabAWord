if (Meteor.isClient) {

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  Meteor.startup(function() {
    React.render( < Game / > , document.getElementById("mainBody"));
  });
}


if (Meteor.isServer) {

  // Initialize timer
  MyTimer.remove({});
  MyTimer.insert({showBoard: true, tickCount: 0});

  Meteor.setInterval(ticker, 1000);

  Meteor.startup(function() {
    if (Boards.find().count() === 0) {
      Meteor.call('createBoard');
    }
  });

}


var tickCount = 0;


function ticker() {
  tickCount = tickCount + 1;
    
  current = MyTimer.findOne();
    
  MyTimer.update(MyTimer.findOne()._id, {
      showBoard: true, 
      tickCount: current.tickCount + 1
    });  

  if(tickCount < 61) {
    
  } else {

  }
}