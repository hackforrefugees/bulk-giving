Meteor.subscribe("allOrganizations");

Template.organizationList.helpers({
    organizations: function() {
      return Organizations.find({});
    }
});
