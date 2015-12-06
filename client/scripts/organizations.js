Meteor.subscribe("allOrganizations");

Template.organizationList.helpers({
    organizations: function() {
      return Organizations.find();
    },

    organizationsSortedCaseInsensitive: function() {
    	return Organizations.find().fetch().sort(function (a, b) {
    		return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
		});
    }
});
