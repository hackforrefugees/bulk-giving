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

//Registring this as helper allows us to re-use it in more than one template
Template.registerHelper("hasAccessToOrganization", function() {
    var user = Meteor.user();
    return user && (user.organization == this.name);
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
    Meteor.call("addPlannedDonation", this._id, name, amount, expectedDelivery);
  },
  "change .delivered": function(event) {
    var delivered = event.target.checked;
    if (delivered == true) {
      Meteor.call("addDonation", this._id);
    } else {
      Meteor.call("removeDonation", this._id);
    }
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
  promisedProgress: function() {
    var progress = (this.planned / this.needed) * 100;
    if (progress > 100) {
      progress = 100
    }
    return progress;
  },
  hasAccess: function() {
    var user = Meteor.user();
    return user && (user.organization == this.organization);
  },
  donations: function() {
    Meteor.subscribe('donations', this._id);
    return Donations.find({ needId: this._id });
  },
  needLeft: function() {
    return this.needed - this.delivered;
  }
});
