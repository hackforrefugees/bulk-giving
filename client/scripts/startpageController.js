Template.startpage.events({
    "click #contributionRedirect": function() {
        console.log('Yo');
        //Router.go('/home');
    },
    "click #organizationRedirect": function() {
        Router.go('/signin');
    }
});
