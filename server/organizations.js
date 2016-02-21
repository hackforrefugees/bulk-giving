 Meteor.publish("allOrganizations", function () {
    return Organizations.find();
  });

Meteor.publish("myOrganizations", function () {
    return Organizations.find(
        { owner: this.userId }
    );
});

Meteor.publish("donations", function (needId) {
    return Donations.find({ needId: needId });
});

Meteor.methods({
    createOrganization: function(organizationInformation) {        
        var id = Meteor.userId();
        if(id != null) {
            
            Meteor.users.update({_id: id}, {$set:{organization: organizationInformation.organizationName}})

            var organizationId = Organizations.insert({name: organizationInformation.organizationName, 
                contactPerson: organizationInformation.contactPerson,
                contactPersonEmail: organizationInformation.contactPersonEmail,
                message:organizationInformation.message,
                owner:id
            });
            return organizationId;
        }
    },

    editOrganization: function(organizationInformation) {        
        var id = Meteor.userId();
        if(id != null) {
            Organizations.update( {name: organizationInformation.organizationName, owner:id }, 
                {
                    $set: {
                        contactPerson: organizationInformation.contactPerson,
                        contactPersonEmail: organizationInformation.contactPersonEmail,
                        message:organizationInformation.message,
                    }
                }
            );
        }
    }
});

