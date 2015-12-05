Meteor.methods({
    createOrganization: function(organizationName) {
        var id = Meteor.userId();
        if(id != null) {
            //returns the _id of the newly created record        
            var newId = Organizations.insert({name: organizationName, owner:id});
            return newId;
        }        
    }
});