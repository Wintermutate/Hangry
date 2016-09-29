 
var beep = document.createElement('audio');
	       beep.setAttribute('src', "assets/images/beep.mp3");
var gimme = document.createElement('audio');
	       gimme.setAttribute('src', "assets/images/gimme.wav");
var kaching = document.createElement('audio');
	       kaching.setAttribute('src', "assets/images/kaching.mp3");
var car = document.createElement('audio');
	       car.setAttribute('src', "assets/images/car.mp3");

  // Initialize Firebase
var config = {
apiKey: "AIzaSyBCOZD_mXD_Id9GIXvrEYxarrQSmChgBgQ",
authDomain: "hangry-e5636.firebaseapp.com",
databaseURL: "https://hangry-e5636.firebaseio.com",
storageBucket: "hangry-e5636.appspot.com",
messagingSenderId: "926964885767"
};
firebase.initializeApp(config);

// Variable to reference the database
var database = firebase.database();


// ****  --  setup Google sign-in  manual integration.  --  ***

var provider = new firebase.auth.GoogleAuthProvider();

var currentUser = firebase.auth().currentUser;

var name, email, photoUrl, uid;

if (currentUser != null) {
  name = currentUser.displayName;
  email = currentUser.email;
  photoUrl = currentUser.photoURL;
  uid = currentUser.uid;  
}

// observer for auth state change
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $("#login").text("Welcome "+user.displayName+"  --  Sign Out")
  } else {
    $("#login").text("Login")
  }
});



function logmein() {
	
	firebase.auth().signInWithPopup(provider).then(function(result) {
		// This gives you a Google Access Token. You can use it to access the Google API.
		var token = result.credential.accessToken;

		var user = result.user

		name = result.user.displayName;

		email = result.user.email;

		console.log(name);
		console.log(email);

	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
	});
	//  We can include other logins later -- Facebook, Twitter, Github, etc.
}


var ref = new Firebase("https://hangry-e5636.firebaseio.com");
var authData = ref.getAuth();

if (authData) {
  	var auth = true
	}else{var auth = false}

// event listener for the log-in button
$("#login").on("click",function(){
	if (auth=true) {
    	// User is signed in.
  		firebase.auth().signOut();
  		} else {
    	logmein();
  		}
	});






$(document).ready(function(){

	// Initialize global variables. 
	var selectFood = false; 
	var selectMoney = false;
	var selectMethod = false; 
	var chosenFoods = [];
	var selectedFoods = "";
	var selectedMethod = "";
	var latitude;
	var longitude;

	
	var search = {
		name: name,
		email: email,
		location: "",
		radius: 0,
		terms: "",
		maxprice: "",
		queryURL: ""
	}
//initializes map with random coordinates
  function initMap() {
     
    var map = new google.maps.Map(document.getElementById('map'), {
         center: {lat: -34.397, lng: 150.644},
         zoom: 6
    });
    
    var infoWindow = new google.maps.InfoWindow({map: map});

       // Try HTML5 geolocation
       if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function(position) {
           var pos = {
             lat: position.coords.latitude,
             lng: position.coords.longitude
           };
             console.log(pos);

           infoWindow.setPosition(pos);
           infoWindow.setContent('location found');
           var latitude = pos.lat;
           var longitude = pos.lng;
           map.setCenter(pos);
         }, function() {
           handleLocationError(true, infoWindow, map.getCenter());
         });
       } else {
         // Browser doesn't support Geolocation (newer chrome)
         handleLocationError(false, infoWindow, map.getCenter());
       }
     }

 function handleLocationError(browserHasGeolocation, infoWindow, pos) {
       infoWindow.setPosition(pos);
       infoWindow.setContent(browserHasGeolocation ?
                             'Error: The Geolocation service failed.' :
                             'Error: Your browser doesn\'t support geolocation.');
     }

	function renderImages(selectFood, selectMoney, selectMethod){

		// Need to insert logic to ensure that this button can only be clicked if at least one food is selected.

		$("#foodSelect").on("click",function(){
			if (selectFood == false && selectMoney == false && selectMethod == false){
			console.log(selectFood);
			selectFood = true;
			selectedFoods = chosenFoods.join(",");
			console.log(selectedFoods);
			$("#screen1").css("display","none");
			$("#screen2").css("display","block");
			$("#back").css("display","block");
			$("#reset").css("display","block");
			gimme.play();
		}
		});	
   

		$("#poor").on("click", function(){
			if (selectFood == true && selectMoney == false && selectMethod == false) {
			console.log(selectMoney);
			selectMoney = true;
			search.maxprice = "2";
			console.log(search.maxprice);
			$("#screen2").css("display","none");
			$("#screen3").css("display","block");
		}
		});
	
		$("#rich").on("click", function(){
			if (selectFood == true && selectMoney == false && selectMethod == false) {
			selectMoney = true; 
			search.maxprice = "4";
			console.log(search.maxprice);
			$("#screen2").css("display","none");
			$("#screen3").css("display","block");
			kaching.play();
		}
		});
 

		$(".method").on("click", function () {
			if (selectFood == true && selectMoney == true && selectMethod == false) {
			selectMethod = true; 
			selectedMethod = ($(this).data('method'));
			console.log(selectedMethod);
			console.log(latitude);
			console.log(longitude);
			$("#screen3").css("display","none");
			$("#screen4").css("display","block");
		}
		});

		$("#drive").on("click",function(){
			car.play();
		});

	};	



	$(".cuisine").on("click", function(){
		
 	
		if ($(this).hasClass("selected")){

	 		$(this).addClass("deselected");
	 		$(this).removeClass("selected");
	 		var food = $(this).data("food");

			for (i = 0; i<chosenFoods.length; i++){

				if (chosenFoods[i] == food){
				chosenFoods.splice(i, 1);
				console.log(chosenFoods);
				}
			};
		
		}else if ($(this).hasClass("deselected")){

		 	$(this).addClass("selected");
		 	$(this).removeClass("deselected");
		 	var food = $(this).data("food");
		 	chosenFoods.push(food);
		 	console.log(chosenFoods);
		 	beep.play();
			};
 	
 		});
 	

 	$("#reset").on('click', function(){		
 		
 	window.location.reload(true);
 	
 	});		


 	
 	$('#back').on('click', function(){

 		console.log("back");
 	
 	});


renderImages(selectFood, selectMoney, selectMethod);
initMap();



	// event listener for the last click --  on the walk/drive/delivery buttons
	$(document).on('click', '.method', function() {

        function cb(data) {
    	console.log("cb: " + JSON.stringify(data));
		};

    	var auth = {
	        //
	        // Update with your auth tokens.
	        //
	        consumerSecret : "qcLcpyI5kemEQAE06ZDakKdIrps",
	        consumerKey : "hYN2DiZ-3d6p6Nl-Tk0mOQ",
	        accessToken : "K344zUR0tJ4cKqBPFqVcdfUzVXnOuFi7",
	        // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
	        // You wouldn't actually want to expose your access token secret like this in a real application.
	        accessTokenSecret : "-5JrWSl8GI6nYu7HPH0NcpcsywM",
	        serviceProvider : {
                    signatureMethod : "HMAC-SHA1"}
            };

        var accessor = {
        	consumerSecret : auth.consumerSecret,
        	tokenSecret : auth.accessTokenSecret
            };	


		// need Rick's help getting the user location and storing in these variables
	
	  	search.location = latitude+","+longitude;
	  	console.log(search.location);
  	
	  	if (selectedMethod=="walk"){
	  		search.radius=1000};

	  	if (selectedMethod=="drive"){
	  		search.radius=3000};

	  	if (selectedMethod=="delivery"){
	  		search.radius=5000;
	  		search.terms = selectedFoods.concat("," + selectedMethod);
	  		}else{search.terms=selectedFoods};
	  	
	  	console.log(search);

	    // Save query parameters to Firebase
		database.ref().push(search);

		 var parameters = [];
	        parameters.push(['term', search.terms]);
	        parameters.push(['ll', search.location]);
	        parameters.push(['callback', 'cb']);
	        parameters.push(['oauth_consumer_key', auth.consumerKey]);
	        parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
	        parameters.push(['oauth_token', auth.accessToken]);
	        parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
	        parameters.push(['limit',10]);
	        parameters.push(['sort_by','rating']);

        var message = {
            'action' : 'https://api.yelp.com/v2/search',
            'method' : 'GET',
            'parameters' : parameters
        	};

        OAuth.setTimestampAndNonce(message);
        OAuth.SignatureMethod.sign(message, accessor);

        var parameterMap = OAuth.getParameterMap(message.parameters);

        $.ajax({
            'url' : message.action,
            'data' : parameterMap,
            'dataType' : 'jsonp',
            'jsonpCallback' : 'cb',
            'cache': true
        	})
	    	
		.done(function(response){ 
		    console.log(response);


	    $('.results').empty();
	    	var results = response.businesses;
	    	console.log(results);
        	for (var i = 0; i < results.length; i++){     
        
          		var resultDiv = $('<div>');

          		var name = results[i].name;

          		var p = $('<p>').text(name + " " + results[i].display_phone);
          		
          		var image = $('<img>').attr('src', results[i].image_url);

          		p.prepend(image);
          			
           		resultDiv.append(p);
         
          	// place the results into the resultDiv
          	$('.results').append(resultDiv);
        	
        	}

	   });

	});   

});



        

  

