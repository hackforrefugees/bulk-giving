Router.route('/',{
    template: 'startpage'
});
Router.route('/home');
Router.route('/createOrganization');
Router.route('/organizations');
Router.route('/organizations/:name', function() {
	var name  =this.params.name;
	// Assuming that at least one orgainzation exists, this will wait until organizations
	// has been loaded prior to attemptign to resolve them.
	// Once we load orgainzations we will get another callback and resolve correctly.
	if(Organizations.findOne() != null)
	{
		if(!Organizations.findOne({name: name})){
			Router.go('/organizations');
		}
		this.render("organization", {data: function(){
			var name = this.params.name;
			return Organizations.findOne({name: name})
		}})
	}
});

Router.route('/organizations/:name/edit', function() {
	var name  =this.params.name;
	//See comment in /:name route
	if(Organizations.findOne() != null)
	{
		// making sure the organization exists otherwise redirect to all organizations list
		if(!Organizations.findOne({name: name})){
			Router.go('/organizations');
		}
		this.render("editOrganization", {data: function(){
			var name = this.params.name;
			return Organizations.findOne({name: name})
		}})
	}
});
Router.route('/signin');
