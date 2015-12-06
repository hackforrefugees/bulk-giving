Template.startpage.events({
    "click #contributionRedirect": function() {
        Router.go('/organizations');
    },
    "click #organizationRedirect": function() {
        if (Meteor.user() == null) {
            Router.go('/signin');
        } else {
            Router.go('/organizations');
        }
        
    }
});
