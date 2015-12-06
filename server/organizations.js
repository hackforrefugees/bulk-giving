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
    },

   addNeed: function(title, amount, organizationName, organizationId) {
        var user = Meteor.users.findOne(this.userId);
        if(user.organization == organizationName) {
            var needId = Needs.insert({title: title, needed: amount, planned: 0, delivered: 0, organization: organizationName, creator: this.userId });
            return needId;
        }
    },

    addDonation: function(id) {
        var user = Meteor.users.findOne(this.userId);
        donation = Donations.findOne({_id: id});
        need = Needs.findOne({_id: donation.needId});
        if(user.organization == need.organization) {
            Donations.update({_id: id}, {$set: {delivered: true}})
            decreaseValue = (donation.amount * -1);
            Needs.update({_id: donation.needId}, {$inc: {delivered: donation.amount, planned: decreaseValue}});
        }
    },
    removeDonation: function(id) {
        var user = Meteor.users.findOne(this.userId);
        donation = Donations.findOne({_id: id});
        need = Needs.findOne({_id: donation.needId});
        if(user.organization == need.organization) {
            Donations.update({_id: id}, {$set: {delivered: false}})
            decreaseValue = (donation.amount * -1);
            Needs.update({_id: donation.needId}, {$inc: {delivered: decreaseValue, planned: donation.amount}});
        }
    },
    addPlannedDonation: function(needId, name, amount, expectedDelivery) {
        Donations.insert({needId: needId, name: name, amount: amount, expectedDelivery: expectedDelivery});
        Needs.update({_id: needId}, {$inc: {planned: amount}});
    }
});

