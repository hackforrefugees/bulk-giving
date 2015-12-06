Template.createOrganization.events({
    "submit .newOrg": function (event) {      
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var name = event.target.organizationName.value;
      var contact = event.target.contactPerson.value;
      var contactEmail = event.target.contactPersonEmail.value;

      console.log("Name " +  name + " Contact " + contact + "  contactEmail " + contactEmail )

      Meteor.call("createOrganization", {organizationName: name, contactPerson: contact, contactPersonEmail: contactEmail}); 
 
      // Clear form
      event.target.organizationName.value = "";
      event.target.contactPerson.value = "";
      event.target.contactPersonEmail.value = "";

    }
});

Template.createOrganization.helpers({
    hasNoOrganization: function () {
      console.log(JSON.stringify(Meteor.user()));
      if(Meteor.user().organization) {        
        Meteor.defer(function() {
          Router.go("/organizations/"+Meteor.user().organization);
        });
        return false;
      }
      return true;
    },

    signin: function () {
      Meteor.defer( function () {
        Router.go("/signin");        
      });
    }
});