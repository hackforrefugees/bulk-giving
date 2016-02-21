Meteor.methods({
    addCategory: function(title, organizationName) {
        var user = Meteor.users.findOne(this.userId);
        if(user.organization == organizationName) {
            var categoryId = Categories.insert({title: title, organization: organizationName, creator: this.userId });
            return categoryId;
        }
    }
});