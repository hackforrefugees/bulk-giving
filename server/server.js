Meteor.startup(function () {
    // code to run on server at startup
  });

Meteor.publish("needs", function () {
  return Needs.find();
});

Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
      {fields: {'organization': 1}});
  } else {
    this.ready();
  }
});