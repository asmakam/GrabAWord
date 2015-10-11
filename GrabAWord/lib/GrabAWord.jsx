if (Meteor.isClient) {
  
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  Meteor.startup(function() {
    React.render( < Game / > , document.getElementById("mainBody"));
  });
}
