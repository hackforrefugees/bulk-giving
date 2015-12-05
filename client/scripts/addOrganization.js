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

Template.home.helpers({
  needs: [
    { title: "Mattresses", needed: 10, planned: 2, delivered: 2},
    { title: "Coats", needed: 100, planned: 20, delivered: 50},
    { title: "Socks", needed: 500, planned: 30, delivered: 349}
  ]
});