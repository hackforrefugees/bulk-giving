Template.organization.events({
    "submit .new-need": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var need = event.target.what.value;
      var amount = event.target.amount.value;
      Meteor.call("addNeed", need, amount, this.name, this._id);
    },
    "submit .new-delivery": function (event) {
      event.preventDefault();
      var amount = parseInt(event.target.amount.value);
      Meteor.call("addDelivery", this._id, this.organization, amount);
    }
});

Template.organization.helpers({
  organizationNeeds: function() {
    return Needs.find({organization:this.name});
  },
  hasAccessToOrganization: function() {
    var user = Meteor.user();
    return user && (user.organization == this.name);
  },
  hasAccessToNeed: function() {
    var user = Meteor.user();
    return user && (user.organization == this.organization);
  }
});


Template.organizationNeed.helpers({
  progress: function() {
    var progress = (this.delivered / this.needed) * 100;
    if (progress > 100) {
      progress = 100
    }
    return progress;
  }
});
