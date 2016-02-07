Template.organization.events({
    "submit .new-need": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var need = event.target.what.value;
      Meteor.call("addNeed", need, this.name);
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
  hasAccess: function() {
    var user = Meteor.user();
    return user && (user.organization == this.organization);
  },

  needProgressType: function() {
    if(this.need == "HIGH") {
      return "progress-bar-danger";
    } else if (this.need == "MEDIUM") {
      return "progress-bar-warning";
    } else if (this.need == "LOW") {
      return "progress-bar-success";
    } else {
      return "progress-bar-info";
    }
  },

  needProgressLength: function() {
    if(this.need == "HIGH") {
      return "20";
    } else if (this.need == "MEDIUM") {
      return "50";
    } else if (this.need == "LOW") {
      return "80";
    } else {
      return "50";
    }
  },

  needUrgency: function() {
    if(this.need == "HIGH") {
      return "list-group-item-danger";
    } else if (this.need == "MEDIUM") {
      return "list-group-item-warning";
    } else if (this.need == "LOW") {
      return "list-group-item-success";
    } else { 
      return "list-group-item-info";
    }
  },

  needUrgencyText: function() {
    if(this.need == "HIGH") {
      return "There is a large need for this item";
    } else if (this.need == "MEDIUM") {
      return "There is a need for this item";
    } else if (this.need == "LOW") {
      return "There is little need for this item";
    } else {
      return "";
    }
  },
});
