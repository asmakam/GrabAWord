if (Meteor.isClient) {
  Meteor.startup(function() {
    React.render( < Game / > , document.getElementById("mainBody"));
  });
}
