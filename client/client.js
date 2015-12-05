Session.setDefault('counter', 0);

  Template.hello1.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'mousedown': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });