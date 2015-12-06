Template.navbar.events({
    "click #logout": function() {
        AccountsTemplates.logout();
    }, 
    "click #login": function() {
       Router.go("/signin");
        }
});

Template.navbar.helpers({
	getUserName: function() {
    	return Meteor.user().username;
  	}
});