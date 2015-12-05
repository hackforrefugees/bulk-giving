 Meteor.publish("allOrganizations", function () {
    return Organizations.find();
  });

Meteor.publish("myOrganizations", function () {
    return Organizations.find(
        { owner: this.userId }
    );
});

Meteor.methods({
    createOrganization: function(organizationName) {
        var id = Meteor.userId();
        if(id != null) {
            //returns the _id of the newly created record        
            var newId = Organizations.insert({name: organizationName, owner:id});
            return newId;
        }        
    },

   addNeed: function(title, amount, organizationName, organizationId) {
        var userId = Meteor.userId();
        // if(userId != null) {
            var needId = Needs.insert({title: title, needed: amount, planned: 0, delivered: 0, organization: organizationName, creator: userId });
            return needId;
        // }        
    }
});

