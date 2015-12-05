Template.organization.events({
    "submit .new-need": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var need = event.target.what.value;
      var amount = event.target.amount.value;
      Meteor.call("addNeed", need, amount, this.name, this._id);
    }

});

Template.organization.helpers({
  organizationNeeds: function() {
    return Needs.find({organization:this.name});
  }
});

