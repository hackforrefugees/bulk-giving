Meteor.startup(function () {
    // code to run on server at startup
  });

Meteor.publish("needs", function () {
  return Needs.find();
});

