Template.organization.events({
    "submit .new-need": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var need = event.target.what.value;
      var amount = event.target.amount.value;
       console.log("New need has been added : " + need + "  in amount of " + amount);
    }

});


Meteor.subscribe("needs");

Template.organization.helpers({
  organizationNeeds: function(id) {
    return Needs.find({organization_id:id});
  }
});

