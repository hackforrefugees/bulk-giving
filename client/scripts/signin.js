//Stuff related to the login form can be found in config.js
Template.signin.helpers({
    goToCreation: function () {
      Meteor.defer( function () {
        Router.go("/createOrganization");
      });
    }
});