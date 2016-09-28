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


// ****  --  Tried to setup Google sign-in, using redirect.  Redirect is much easier than a manual integration.  --  ***

// ****  --   There is a known problem with the redirect method that throws an unsupported error. A workaround is available but will take significant time to replicate -- ****


	// Create sign-in flow using the Firebase SDK
	var provider = new firebase.auth.GoogleAuthProvider();
	// adding Google Maps auth.  to scope
	provider.addScope('https://www.googleapis.com/auth/plus.login');


	// User authenticates with Firebase, using Google sign-in.  This method uses a redirect to sign-in page.
	firebase.auth().signInWithPopup(provider).then(function(result) {
	  	// This gives you a Google Access Token. You can use it to access the Google API.
		var token = result.credential.accessToken;
		// The signed-in user info.
		var user = result.user;
		}).catch(function(error) {
	  		// Handle Errors here.
	  		var errorCode = error.code;
	  		var errorMessage = error.message;
	  		// The email of the user's account used.
	  		var email = error.email;
	  		// The firebase.auth.AuthCredential type that was used.
	  		var credential = error.credential;
	});

		// event listener for auth. state
		firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		    console.log(firebase.auth().currentUser);
		  } else {
		    console.log("User is not signed in.");
		  }
		});


	//  We can include other logins later -- Facebook, Twitter, Github, etc.



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
var page = 1

var search = {
	location: "",
	radius: 0,
	keyword: "",
	maxprice: "",
	queryURL: ""
}

	function moveToPage (page){
		switch(page){
			case 1:
				
			case 2:
				$("#row1").css("display","none");
				$("#row2").css("display","none");
				$("#row3").css("display","block");
				$("#row4").css("display","block");
				$("#row5").css("display","block");
				$("#row6").css("display","block");
				$("#spacefiller1").css("display","none");
				$("#spacefiller2").css("display","block");
				$("#spacefiller3").css("display","block");
				$("#back").css("display","block");
				$("#reset").css("display","block");
			case 3:
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
			case 4:
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
			case 5:
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
	}

	function renderImages(selectFood, selectMoney, selectMethod){

		$("#foodSelect").on("click",function(){
			if (selectFood == false && selectMoney == false && selectMethod == false){
			console.log(selectFood);
			selectFood = true;
			selectedFoods = chosenFoods.join("|");
			console.log(selectedFoods);
			moveToPage(2);
			page++;
			console.log(page);

		}
		});	
   

		$("#poor").on("click", function(){
			if (selectFood == true && selectMoney == false && selectMethod == false) {
			console.log(selectMoney);
			selectMoney = true;
			search.maxprice = "2";
			console.log(search.maxprice);
			moveToPage(3);
			page++;
			console.log(page);
		}
		});
	
		$("#rich").on("click", function(){
			if (selectFood == true && selectMoney == false && selectMethod == false) {
			selectMoney = true; 
			search.maxprice = "4";
			console.log(search.maxprice);
			moveToPage(4);
			page++;
			console.log(page);
		}
		});
 

		$(".method").on("click", function () {
			if (selectFood == true && selectMoney == true && selectMethod == false) {
			selectMethod = true; 
			selectedMethod = ($(this).data('method'));
			console.log(selectedMethod);
			moveToPage(5);
			page++;
			console.log(page);
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


 	
 	});

renderImages(selectFood, selectMoney, selectMethod);




	// event listener for the last click --  not sure what the final  step's  ID will be,  so just using "search" for now
	$(document).on('click', '.method', function() {

		var key = "AIzaSyBT6QkrwpTvY-eL3nEQEkYnMdlO8HmYnBI";

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

	  	search.queryURL = "https://crossorigin.me/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+search.location+"&radius="+search.radius+"&type=restaurant&keyword="+ search.keyword +"&maxprice="+search.maxprice+"&key="+key;
	    
	    console.log(search.queryURL);

	    // Save query parameters to Firebase
		database.ref().push(search);

		$.ajax({
	    url: search.queryURL,
	    method: 'GET',
	    success: function(response){ 
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

	   }

	    

	    });

	});    

});



        

  

