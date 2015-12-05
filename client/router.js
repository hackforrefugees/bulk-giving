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
	this.render("organization", {data: function(){ 
		var name = this.params.name; 
		return Organizations.findOne({name: name}) 
	}})
});
Router.route('/signin');
