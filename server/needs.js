// Need amount scale {HIGH (Red), MEDIUM (Yellow), LOW(Green)}
// Why strings? Beucase we can introduce new values if we want.

Meteor.methods({
    addNeed: function(title, organizationName) {
        var user = Meteor.users.findOne(this.userId);
        if(user.organization == organizationName) {
            var needId = Needs.insert({title: title, need: "HIGH", organization: organizationName, creator: this.userId });
            return needId;
        }
    },

    modifyNeed: function(title, amount, organizationName) {
        var user = Meteor.users.findOne(this.userId);
        if(user.organization == organizationName) {
            var needId = Needs.update({title: title}, { $set: {need: amount}});
        }
    }
});
