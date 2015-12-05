Router.route('/',{
    template: 'home'
});
Router.route('/organizations');
Router.route('/organizations/:name', function() {
	this.render("organization", {data: function(){ 
		var name = this.params.name; 
		return Organizations.findOne({name: name}) 
	}})
});
