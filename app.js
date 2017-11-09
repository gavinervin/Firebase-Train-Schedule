
//firebase connect//
var config = {
    apiKey: "AIzaSyCqSvgfPLISLp8N98cpVKz-gR9BzEE6F4A",
    authDomain: "swayzeexpress-3d7e1.firebaseapp.com",
    databaseURL: "https://swayzeexpress-3d7e1.firebaseio.com",
    projectId: "swayzeexpress-3d7e1",
    storageBucket: "swayzeexpress-3d7e1.appspot.com",
    messagingSenderId: "883498151158"
  };
  firebase.initializeApp(config);

  var trainData = firebase.database();

  $("#addNewTrain").on("click",function(){
  	var trainName = $("#inputNewTrain").val().trim();
  	var destination = $("#destinationInput").val().trim();
  	var firstTrain = moment($("#departureInput").val().trim(),"HH:mm").subtract(10,"years").format("X");
  	var frequency = $("#frequencyInput").val().trim();
  	var newTrain = {
  		name: trainName,
  		destination: destination,
  		firstTrain: firstTrain,
  		frequency: frequency
  	}

  	trainData.ref().push(newTrain);
  	alert("New Train Added");

  	$("#inputNewTrain").val("");
  	$("#destinationInput").val("");
  	$("#departureInput").val("");
  	$("#frequencyInput").val("");

  	return false
  })

  trainData.ref().on("child_added",function(snapshot) {
  	var name = snapshot.val().name;
  	var destination = snapshot.val().destination;
  	var frequency = snapshot.val().frequency;
  	var firstTrain = snapshot.val().firstTrain;
  	var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
  	var minutes = frequency - remainder;
  	var arrival = moment().add(minutes,"m").format("hh:mm A");

  	$("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+" mins</td><td>"+arrival+"</td><td>"+minutes+" mins</td></tr>");
  })