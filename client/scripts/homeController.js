Meteor.subscribe("needs");

Template.home.helpers({
  needs: function() {
    return Needs.find();
  }
});