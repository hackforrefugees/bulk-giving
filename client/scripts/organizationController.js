Template.organization.events({
    "submit .new-need": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var need = event.target.what.value;
      Meteor.call("addNeed", need, this.name);
    },

    "submit .new-category": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var category = event.target.what.value;
      Meteor.call("addCategory", category, this.name);
    }
});

//Registring this as helper allows us to re-use it in more than one template
Template.registerHelper("hasAccessToOrganization", function() {
  var user = Meteor.user();
  return user && (user.organization == this.name);
});

Template.registerHelper("organizationCategories", function(name) {
  console.log("Looking for " + name);
  return Categories.find({organization:name});
});

Template.organization.helpers({
  uncategorizedOrganizationNeeds: function() {
    return Needs.find({organization:this.name, category: {$exists: false}});
  },
  
  hasAccess: function() {
    var user = Meteor.user();
    return user && (user.organization == this.name);
  }
});

Template.categoryNeeds.helpers({
  organizationNeeds: function() {
    return Needs.find({organization:this.organization, category:this.title});
  },
});

Template.organizationNeed.events({
  "click #low": function(event) {
    Meteor.call("modifyNeed", this._id, "LOW", this.organization);
  },

  "click #medium": function(event) {
    Meteor.call("modifyNeed", this._id, "MEDIUM", this.organization);
  },

  "click #high": function(event) {
    Meteor.call("modifyNeed", this._id, "HIGH", this.organization);
  },

  "click #deleteButton": function(event) {
    Meteor.call("deleteNeed", this._id, this.organization);
  }
});

Template.categoryButton.events({
  "click .categoryButton": function(event) {
    var parent = Template.parentData(); //Parent template is 'need - used to find what need we are changing
    Meteor.call("setNeedCategory", parent._id, this.title, this.organization);
  }
});

Template.organizationNeed.helpers({
  hasAccess: function() {
    var user = Meteor.user();
    return user && (user.organization == this.organization);
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
