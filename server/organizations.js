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
            Meteor.users.update({_id: id}, {$set:{organization: organizationName}})
            var organizationId = Organizations.insert({name: organizationName, owner:id});
            return organizationId;
        }
    },

   addNeed: function(title, amount, organizationName, organizationId) {
        var user = Meteor.users.findOne(this.userId);
        if(user.organization == organizationName) {
            var needId = Needs.insert({title: title, needed: amount, planned: 0, delivered: 0, organization: organizationName, creator: this.userId });
            return needId;
        }
    }
});

