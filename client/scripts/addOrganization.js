Meteor.subscribe("allOrganizations");

Template.addOrganization.events({
    "submit .new-organization": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var text = event.target.text.value;

      Meteor.call("createOrganization", text); 
 
      // Clear form
      event.target.text.value = "";

    }
  });

Template.organizationList.helpers({
    organizations: function() {
      return Organizations.find({});
    }
});
