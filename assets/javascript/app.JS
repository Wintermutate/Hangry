 
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

var user = firebase.auth().currentUser;

function logmein() {
	
	firebase.auth().signInWithPopup(provider).then(function(result) {
		// This gives you a Google Access Token. You can use it to access the Google API.
		var token = result.credential.accessToken;
		// ...
		console.log(result);

		var user = result.user.email
		console.log(user)

	  	var displayName = result.user.displayName;

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

if (user) {
	$("#spacefiller1").text("Welcome "+displayName+"  --  Sign Out")
}

// event listener for the log-in button
$("#login").on("click",function(){
	if (user != null) {
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
<<<<<<< HEAD
	var lat = "";
	var long = "";
	var page = 1;
=======
	var latitude;
	var longitude;
>>>>>>> ff8a2a028f9a15d0ea819d216969352b0b85e014

	
	var search = {
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
             console.log(pos)

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


<<<<<<< HEAD
	function moveToPage (page){
		switch(page){
			case 1:
			// page 1
			// console.log("going to page 1")
			$("#row1").css("display","block");
			$("#row2").css("display","block");
			$("#spacefiller1a").css("display","block");
			$("#spacefiller1b").css("display","block");
			break;
			case 2:
			// once food select clicked > goes to "page 2"
			// console.log("going to page 2")
			$("#row1").css("display","none");
			$("#row2").css("display","none");
			$("#row3").css("display","block");
			$("#row4").css("display","block");
			$("#row5").css("display","block");
			$("#row6").css("display","block");
			$("#spacefiller1").css("display","none");
			$("#spacefiller1a").css("display","none");
			$("#spacefiller1b").css("display","none");
			$("#spacefiller2").css("display","block");
			$("#spacefiller3").css("display","block");
			$("#back").css("display","block");
			$("#reset").css("display","block");
			break;
			case 3:
			// once price select clicked > goes to "page 3"
			// console.log("going to page 3")
			$("#row1").css("display","none");
			$("#row2").css("display","none");
			$("#row3").css("display","none");
			$("#row4").css("display","none");
			$("#row5").css("display","none");
			$("#row6").css("display","block");
			$("#row7").css("display","block");
			$("#row8").css("display","block");
			$("#row9").css("display","block");
			$("#row10").css("display", "none");
			$("#spacefiller2").css("display","none");
			$("#spacefiller3").css("display","none");
			$("#spacefiller4").css("display","block");
			$("#spacefiller5").css("display","block");
			// $("#wannaspend").css("display","none");
			break;
			case 4:
			// once price select clicked > goes to "page 3"
			// console.log("going to page 4")
			$("#row2").css("display","none");
			$("#row3").css("display","none");
			$("#row4").css("display","none");
			$("#row5").css("display","none");
			$("#row6").css("display","block");
			$("#row7").css("display","block");
			$("#row8").css("display","block");
			$("#row9").css("display","block");
			$("#row10").css("display", "none");
			$("#spacefiller2").css("display","none");
			$("#spacefiller3").css("display","none");
			$("#spacefiller4").css("display","block");
			$("#spacefiller5").css("display","block");
			// $("#wannaspend").css("display","none");
			break;
			case 5:
			// once method select clicked > goes to "results - page 4"
			$("#row1").css("display", "none");
			$("#row2").css("display","none");
			$("#row3").css("display","none");
			$("#row4").css("display","none");
			$("#row5").css("display","block");
			$("#row6").css("display","block");
			$("#row7").css("display","none");
			$("#row8").css("display","none");
			$("#row9").css("display","none");
			$("#spacefiller3").css("display","none");
			$("#spacefiller4").css("display","none");
			$("#spacefiller5").css("display","none");
			// $("#wannaspend").css("display","none");
			$("#row10").css("display", "block");
		}
	}


	function renderImages(selectFood, selectMoney, selectMethod){

		// Need to insert logic to ensure that this button can only be clicked if at least one food is selected.

		$("#foodSelect").on("click",function(){
			if (selectFood == false && selectMoney == false && selectMethod == false){
			console.log(selectFood);
			selectFood = true;
			selectedFoods = chosenFoods.join("|");
			console.log(selectedFoods);
			moveToPage(2);
			console.log(moveToPage);
			page++;
			console.log(page);
=======
		$("#foodSelect").on("click",function(){
			if (selectFood == false && selectMoney == false && selectMethod == false){
			console.log(selectFood);
			selectFood = true;
			selectedFoods = chosenFoods.join("|");
			console.log(selectedFoods);
			$("#screen1").css("display","none");
			$("#screen2").css("display","block");
			$("#back").css("display","block");
			$("#reset").css("display","block");
			gimme.play();
>>>>>>> ff8a2a028f9a15d0ea819d216969352b0b85e014
		}
		});	
   

		$("#poor").on("click", function(){
			if (selectFood == true && selectMoney == false && selectMethod == false) {
			console.log(selectMoney);
			selectMoney = true;
			search.maxprice = "2";
			console.log(search.maxprice);
<<<<<<< HEAD
			moveToPage(3);
			page++;
			console.log(page);
=======
			$("#screen2").css("display","none");
			$("#screen3").css("display","block");
>>>>>>> ff8a2a028f9a15d0ea819d216969352b0b85e014
		}
		});
	
		$("#rich").on("click", function(){
			if (selectFood == true && selectMoney == false && selectMethod == false) {
			selectMoney = true; 
			search.maxprice = "4";
			console.log(search.maxprice);
<<<<<<< HEAD
			moveToPage(4);
			page++;
			console.log(page);
=======
			$("#screen2").css("display","none");
			$("#screen3").css("display","block");
			kaching.play();
>>>>>>> ff8a2a028f9a15d0ea819d216969352b0b85e014
		}
		});
 

		$(".method").on("click", function () {
			if (selectFood == true && selectMoney == true && selectMethod == false) {
			selectMethod = true; 
			selectedMethod = ($(this).data('method'));
			console.log(selectedMethod);
<<<<<<< HEAD
			moveToPage(5);
			page++;
			console.log(page);
=======
			console.log(latitude);
			console.log(longitude);
			$("#screen3").css("display","none");
			$("#screen4").css("display","block");
>>>>>>> ff8a2a028f9a15d0ea819d216969352b0b85e014
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
 		page--;
 		switch(page){
			case 1:
			break;
			case 2:
			moveToPage(1);
			break;
			case 3:
			moveToPage(2);
			break;
			case 4:
			moveToPage(3);
			break;
		}
		$("a#back").off().on("click",function(){
			page--;moveToPage(page)
		})
	}
 	
 	);


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

        	for (var i = 0; i < results.length; i++){     
        
          		var resultDiv = $('<div>');

          		var name = results[i].name;

          		var p = $('<p>').text(name);
          		
          		var image = $('<img>').attr('src', results[i].image_url);

          		p.prepend(image);
          			
           		resultDiv.append(p);
         
          	// place the results into the resultDiv
          	$('.results').append(resultDiv);
        	
        	}

	   });

	});   

});



        

  

