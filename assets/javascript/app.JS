var authStatus;
var beep = document.createElement('audio');
	       beep.setAttribute('src', "assets/images/beep.mp3");
var gimme = document.createElement('audio');
	       gimme.setAttribute('src', "assets/images/gimme.wav");
var kaching = document.createElement('audio');
	       kaching.setAttribute('src', "assets/images/kaching.mp3");
var car = document.createElement('audio');
	       car.setAttribute('src', "assets/images/car.mp3");
var doorbell = document.createElement('audio');
	       doorbell.setAttribute('src', "assets/images/doorbell.mp3");
var running = document.createElement('audio');
	       running.setAttribute('src', "assets/images/running.mp3");	 
var coindrop = document.createElement('audio');
 +         coindrop.setAttribute('src', "assets/images/coindrop.mp3");
    // Initialize global variables. 
  var selectFood = false; 
  var selectMoney = false;
  var selectMethod = false; 
  var chosenFoods = [];
  var selectedFoods = "";
  var selectedMethod = "";
  var latitude;
  var longitude;
  var page = 1;
  
  var search = {
    //name: name,
    //email: email,
    location: "",
    radius: 0,
    terms: "",
    maxprice: "",
    queryURL: ""
  };             



// Variable to reference the database --  This was stored in Firebase previously.  Need to create a different storage method here.
// var database = firebase.database();


// ****  --  setup Google sign-in  manual integration.  --  ***

// var provider = new firebase.auth.GoogleAuthProvider();


// Sign-in was integrated with Firebase previously.  Need to implement manual Google sign-in integration to pull user properties.
// get currently signed in user and set authStatus toggle, get user object items,  push text onto button
// firebase.auth().onAuthStateChanged(function(user){
// 	if (user) {
// 	  authStatus = true
// 	  $("#login").text("Welcome "+user.displayName+"  --  Sign Out")
// 	  var user = user;
// 	  var name = user.displayName;
// 	  var email = user.email;
// 	  var photoUrl = user.photoURL;
// 	  var uid = user.uid;
// 	} else {
// 	  authStatus = false;
// 	  $("#login").text("Login");
// 	}

// });

function logmein() {

  console.log("Will update the logmein function later.");
	
 //  // This integraeted with Firebase previously.  Need to update the with the manual Google sign-in method.
	// auth().signInWithPopup(provider).then(function(result) {
	// 	// This gives you a Google Access Token. You can use it to access the Google API.
	// 	var token = result.credential.accessToken;

	// 	user = result.user;

	// 	name = result.user.displayName;

	// 	email = result.user.email;

		authStatus = true;

	// 	console.log(name);
	// 	console.log(email);


	// }).catch(function(error) {
	//   // Handle Errors here.
	//   var errorCode = error.code;
	//   var errorMessage = error.message;
	//   // The email of the user's account used.
	//   var email = error.email;
	//   // The firebase.auth.AuthCredential type that was used.
	//   var credential = error.credential;
	//   // ...
	// });
	// //  We can include other logins later -- Facebook, Twitter, Github, etc.
}


// event listener for the log-in button
$("#login").on("click",function(){
	if (authStatus == true) {
    	// User is signed in.
  		console.log("user signed out");
  		authStatus = false;
  		} else {
    	logmein();
  		}
	});

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

function renderImages(selectFood, selectMoney, selectMethod) {

  // Need to insert logic to ensure that this button can only be clicked if at least one food is selected.

  $("#foodSelect").on("click", function () {
    if (selectFood == false && selectMoney == false && selectMethod == false) {
      console.log(selectFood);
      selectFood = true;
      selectedFoods = chosenFoods.join(",");
      console.log(selectedFoods);
      $("#screen1").css("display", "none");
      $("#screen2").css("display", "block");
      $("#back").css("display", "block");
      $("#reset").css("display", "block");
      gimme.play();
      page = 2;
    }
  });


  $("#poor").on("click", function () {
    if (selectFood == true && selectMoney == false && selectMethod == false) {
      console.log(selectMoney);
      selectMoney = true;
      search.maxprice = "2";
      console.log(search.maxprice);
      $("#screen2").css("display", "none");
      $("#screen3").css("display", "block");
      page = 3;
      coindrop.play();
    }
  });

  $("#rich").on("click", function () {
    if (selectFood == true && selectMoney == false && selectMethod == false) {
      selectMoney = true;
      search.maxprice = "4";
      console.log(search.maxprice);
      $("#screen2").css("display", "none");
      $("#screen3").css("display", "block");
      kaching.play();
      page = 3;
    }
  });


  $(".method").on("click", function () {
    if (selectFood == true && selectMoney == true && selectMethod == false) {
      selectMethod = true;
      selectedMethod = ($(this).data('method'));
      console.log(selectedMethod);
      // console.log(latitude);
      // console.log(longitude);
      $("#screen3").css("display", "none");
      $("#screen4").css("display", "block");
      page = 4;
    }
  });

  $("#drive").on("click", function () {
    car.play();
  });
  $("#deliver").on("click", function () {
    doorbell.play();
  });
  $("#walk").on("click", function () {
    running.play();
  });

};


$(".cuisine").on("click", function () {

  var parent  = $(this).parent();
  parent.children(".grid-block-content").css("visibility", "visible");

  if ($(this).hasClass("selected")) {
    parent.children(".grid-block-content").css("visibility", "hidden");
    $(this).addClass("deselected");
    $(this).removeClass("selected");
    var food = $(this).data("food");

    for (i = 0; i < chosenFoods.length; i++) {

      if (chosenFoods[i] == food) {
        chosenFoods.splice(i, 1);
        console.log(chosenFoods);
      }
    };

  } else if ($(this).hasClass("deselected")) {
    
    $(this).addClass("selected");
    $(this).removeClass("deselected");
    var food = $(this).data("food");
    chosenFoods.push(food);
    console.log(chosenFoods);
    beep.play();
  };

});

$("#reset").on('click', function () {

  window.location.reload(true);

});



$('#back').on('click', function () {

  if (page==4){
    $("#screen1").css("display","none");
     $("#screen2").css("display","none");
     $("#screen3").css("display","block");
     $("#screen4").css("display","none");
     page=3;
     selectMethod = false;
     selectMoney = true;
     selectFood = true;
     renderImages(selectFood, selectMoney, selectMethod);
   }
 
   else if (page==3){
     $("#screen1").css("display","none");
     $("#screen2").css("display","block");
     $("#screen3").css("display","none");
     $("#screen4").css("display","none");
    page=2;
     selectMoney = false;
     selectMethod = false;
     selectFood = true;
     renderImages(selectFood, selectMoney, selectMethod);
 
   }
   else if (page==2){
     $("#screen1").css("display","block");
     $("#screen2").css("display","none");
     $("#screen3").css("display","none");
     $("#screen4").css("display","none");
     selectFood = false;
     selectMoney = false;
     selectMethod = false;
     page=1;
     renderImages(selectFood, selectMoney, selectMethod);
   }
 

});


$(document).ready(function(){

function getLocation() {
      
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
      } else {
          console.log("Geolocation is not supported by this browser.");
       }
    }
 
   function showPosition(position) {
       latitude = position.coords.latitude
       longitude = position.coords.longitude
  }
 
getLocation();

renderImages(selectFood, selectMoney, selectMethod);

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
		// database.ref().push(search);

		 var parameters = [];
	        parameters.push(['term', search.terms]);
          parameters.push(['radius_filter', search.radius]);
          parameters.push(['category_filter', "restaurants"]);
          parameters.push(['sort', '2']);
	        parameters.push(['ll', search.location]);
	        parameters.push(['callback', 'cb']);
	        parameters.push(['oauth_consumer_key', auth.consumerKey]);
	        parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
	        parameters.push(['oauth_token', auth.accessToken]);
	        parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
	        parameters.push(['limit',10]);
	        
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
        	
        if (results.length>0){
          for (var i = 0; i < results.length; i++){     
        
        		var resultDiv = $('<div>');

            var locationDiv = $('<div>')  
        		
            var reviewDiv = $('<br><div>');

            var reviewCount = results[i].review_count;

            var reviewSnip = results[i].snippet_text;
            
            reviewDiv.prepend(reviewCount+" reviews -  " + reviewSnip);

            var name = results[i].name;

            var resultURL = results[i].url;            

            var restaurantLink = $('<a>').attr('href', resultURL);
            restaurantLink.text(name);

            var location = results[i].location.display_address[0];
            
            var locationCity = results[i].location.display_address[1];
            
            var completeLocation = location.concat(" ", locationCity)
            
            var displayLocation = $('<p>').text(completeLocation);

            locationDiv.append(displayLocation);

        		var restaurant = $('<a href="'+results[i].url+'">  '+results[i].name+'</a>');

            var restaurant2 = $('<p>' + "  " + results[i].display_phone + "  Rating:  " + results[i].rating+'</p>');

        		var image = $('<br><img>').attr('src', results[i].image_url);
        		
            resultDiv.prepend(image);
         		
            resultDiv.append(restaurant);

            resultDiv.append(restaurant2);

            resultDiv.append(locationDiv);

            resultDiv.append(reviewDiv);

          	$('.results').append(resultDiv);

            }
            }else{
              $('.results').text("No restaurants near you!");
              }

	   });

	});   

});