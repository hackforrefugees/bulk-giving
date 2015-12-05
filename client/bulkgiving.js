Template.navbar.events({
    "click #logout": function() {
        AccountsTemplates.logout();
    }
});

Template.navbar.helpers({
	getUserName: function() {
    	return Meteor.user().username;
  	}
});