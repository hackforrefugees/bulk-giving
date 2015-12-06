Template.editOrganization.events({
    "submit .editOrg": function (event) {      
      // Prevent default browser form submit
      event.preventDefault();
 
      var organizationName = this.name;
      // Get value from form element
      var contact = event.target.contactPerson.value;
      var contactEmail = event.target.contactPersonEmail.value;
      var message = event.target.message.value;

      Meteor.call("editOrganization", {organizationName: organizationName, contactPerson: contact, contactPersonEmail: contactEmail, message:message}, function (error, response)
        {
          Router.go("/organizations/"+organizationName);
        }); 
 
      // Clear form      
      event.target.contactPerson.value = "";
      event.target.contactPersonEmail.value = "";
      event.target.message.value = "";
    }
});