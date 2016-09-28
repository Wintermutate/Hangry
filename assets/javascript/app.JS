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
	  // The signed-in user info.
	  var user = result.user;
	  // ...
	  console.log(firebase.auth().currentUser);
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

// event listener for the log-in button
$("#login").on("click",function(){
	if (user) {
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
	var lat = "";
	var long = "";

	var search = {
		location: "",
		radius: 0,
		terms: "",
		maxprice: "",
		queryURL: ""
	}

	function renderImages(selectFood, selectMoney, selectMethod){

		// Need to insert logic to ensure that this button can only be clicked if at least one food is selected.

		$("#foodSelect").on("click",function(){
			if (selectFood == false && selectMoney == false && selectMethod == false){
			console.log(selectFood);
			selectFood = true;
			selectedFoods = chosenFoods.join("|");
			console.log(selectedFoods);
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
			$("#spacefiller3a").css("display","block");
			$("#back").css("display","block");
			$("#reset").css("display","block");

		}
		});	
   

		$("#poor").on("click", function(){
			if (selectFood == true && selectMoney == false && selectMethod == false) {
			console.log(selectMoney);
			selectMoney = true;
			search.maxprice = "2";
			console.log(search.maxprice);
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
		}
		});
	
		$("#rich").on("click", function(){
			if (selectFood == true && selectMoney == false && selectMethod == false) {
			selectMoney = true; 
			search.maxprice = "4";
			console.log(search.maxprice);
					
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
		}
		});
 

		$(".method").on("click", function () {
			if (selectFood == true && selectMoney == true && selectMethod == false) {
			selectMethod = true; 
			selectedMethod = ($(this).data('method'));
			console.log(selectedMethod);
			$("row1").css("display", "none");
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
			};
 	
 		});
 	

 	$("#reset").on('click', function(){		
 		
 	window.location.reload(true);
 	
 	});		


 	
 	$('#back').on('click', function(){

 		console.log("back");
 	
 	});


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


		// need Rick's help getting the user location and storing in these variables
		var latitude = 40.5342742;
		
	  	var longitude = -74.5224469;

	  	search.location = latitude+","+longitude;
	  	console.log(search.location);
  	
	  	if (selectedMethod=="walk"){
	  		search.radius=1000};

	  	if (selectedMethod=="drive"){
	  		search.radius=3000};

	  	if (selectedMethod=="delivery"){
	  		search.radius=5000;
	  		search.keyword = selectedFoods.concat("|" + selectedMethod);
	  		}else{search.keyword=selectedFoods};
	  	
	  	console.log(search.keyword);

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
	    	var results = response.results;

        	for (var i = 0; i < results.length; i++){     
        
          		var resultDiv = $('<div>');

          		var name = results[i].name;

          		var p = $('<p>').text(name);
          
          		if (results[i].hasOwnProperty("photos")){
          		// console.log(results[i].photos[0].html_attributions[0]);
          		p.append(" " + results[i].photos[0].html_attributions[0]);
          			}

          		if (results[i].types[0] == "meal_delivery"){
          			p.append(" We Deliver");
          			}
          
          	resultDiv.append(p);
         
          	// place the results into the resultDiv
          	$('.results').append(resultDiv);
        	
        	}

	   });

	});   

});



        

  

