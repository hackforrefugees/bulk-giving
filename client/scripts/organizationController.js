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
  hasAccess: function() {
    var user = Meteor.user();
    return user && (user.organization == this.name);
  }
});

Template.organizationNeed.events({
  "submit .new-donation": function (event) {
    event.preventDefault();
    var name = event.target.name.value;
    var amount = parseInt(event.target.amount.value);
    var expectedDelivery = event.target.expectedDelivery.value;
    Meteor.call("addDonation", this._id, name, amount, expectedDelivery);
  }
});

Template.organizationNeed.helpers({
  progress: function() {
    var progress = (this.delivered / this.needed) * 100;
    if (progress > 100) {
      progress = 100
    }
    return progress;
  },
  hasAccess: function() {
    var user = Meteor.user();
    return user && (user.organization == this.organization);
  }
});
