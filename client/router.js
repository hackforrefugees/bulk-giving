Router.route('/',{
    template: 'startpage'
});
Router.route('/home');
Router.route('/createOrganization');
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
Router.route('/organizations/:name/edit', function() {
	var name  =this.params.name;
	// making sure the organization exists otherwise redirect to all organizations list
	if(!Organizations.findOne({name: name})){
		Router.go('/organizations');
	}
	this.render("editOrganization", {data: function(){ 
		var name = this.params.name;
		return Organizations.findOne({name: name}) 
	}})
});
Router.route('/organizations/(.*)', function() {
	this.render("organizations"); 
});
Router.route('/signin');
