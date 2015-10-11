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
    if (Boards.find().count() === 0) {
      Meteor.call('createBoard');
    }
  });
}
