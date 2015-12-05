Template.organization.events({
    "submit .new-need": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var need = event.target.what.value;
      var amount = event.target.amount.value;
      console.log("adding need with id : " + Meteor.call("addNeed", need, amount, this.name, this._id));
      console.log("New need has been added : " + need + "  in amount of " + amount);
    }

});

Template.organization.helpers({
  organizationNeeds: function(id) {
    return Needs.find({organization_id:id});
  }
});

