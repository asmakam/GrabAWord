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



function ticker() {

  tickCount = MyTimer.findOne().tickCount + 1;
 if(tickCount < 60) {
    isShow = true;     
  } else if (tickCount < 90) {
    isShow = false;
  } else {
    Meteor.call('createBoard');
    tickCount = 0;
    isShow = true;
  }

  MyTimer.remove({});  
  MyTimer.insert({
      showBoard: isShow, 
      tickCount: tickCount, 
  }); 
}