Meteor.methods({
    createOrganization: function(organizationName) {
        //returns the _id of the newly created record
        console.log("wo " + organizationName);
        var newId = Organizations.insert({name: organizationName});
        var things = Organizations.find().fetch();
        for(i = 0; i < things.length ; i++ ) {
            console.log(things[i].name);
        }

        return newId;
    }
});