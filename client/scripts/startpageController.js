Template.startpage.events({
    "click #contributionRedirect": function() {
        console.log('Yo');
        //Router.go('/home');
    },
    "click #organizationRedirect": function() {
        if (Meteor.user() == null) {
            Router.go('/signin');
        } else {
            Router.go('/organizations');
        }
        
    }
});
