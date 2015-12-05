Session.setDefault('counter', 0);

  Template.body.events({
    "submit .new-organization": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var text = event.target.text.value;
 
      // Insert a task into the collection
 //     Tasks.insert({
 //       text: text,
 //       createdAt: new Date() // current time
//      });
     console.log("Yay!");
 
      // Clear form
      event.target.text.value = "";

    }
  });