Router.configure({
  waitOn: function() {
    if (Meteor.user() && Meteor.user().organization) {
      return [
        Meteor.subscribe('userData', Meteor.user()),
      ];
    }
  }
});
Router.route('/',{
    template: 'startpage'
});
Router.route('/home');
Router.route('/organizations');
Router.route('/organizations/:name', function() {
	var name  =this.params.name;
	// making sure the organization exists otherwise redirect to all organizations list
	if(!Organizations.findOne({name: name})){
		Router.go('/organizations');
	}
	this.render("organization", {data: function(){ 
		var name = this.params.name;
		return Organizations.findOne({name: name}) 
	}})
});
Router.route('/organizations/(.*)', function() {
	this.render("organizations"); 
});
Router.route('/signin');
