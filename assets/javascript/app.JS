$(document).ready(function(){

// Initialize global variables. 
var selectFood = false; 
var selectMoney = false;
var selectMethod = false; 
var chosenFoods = [];
var selectedFoods = "";
var maxprice = "";
var selectedMethod = "";
var lat = "";
var long = "";

	function renderImages(selectFood, selectMoney, selectMethod){

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
			$("#spacefiller1").css("display","none");
			$("#spacefiller2").css("display","block");
			$("#spacefiller3").css("display","block");
			// $("#wannaspend").css("display","block");
		}});	
   

		$("#poor").on("click", function(){
			if (selectFood == true && selectMoney == false && selectMethod == false) {
			console.log(selectMoney);
			selectMoney = true;
			maxprice = "2";
			console.log(maxprice);
			$("#row1").css("display","none");
			$("#row2").css("display","none");
			$("#row3").css("display","none");
			$("#row4").css("display","none");
			$("#row5").css("display","none");
			// $("#row6").css("display","block");
			$("#row7").css("display","block");
			$("#row8").css("display","block");
			$("#row9").css("display","block");
			// $("#row10").css("display","block");
			$("#spacefiller3").css("display","none");
			$("#spacefiller4").css("display","block");
			$("#spacefiller5").css("display","block");
			// $("#wannaspend").css("display","none");
		}});
	
		$("#rich").on("click", function(){
			if (selectFood == true && selectMoney == false && selectMethod == false) {
			selectMoney = true; 
			maxprice = "4";
			console.log(maxprice);
		
			// removed query URL from here --  will place it in the function following last click
			
			$("#row2").css("display","none");
			$("#row3").css("display","none");
			$("#row4").css("display","none");
			$("#row5").css("display","none");
			// $("#row6").css("display","block");
			$("#row7").css("display","block");
			$("#row8").css("display","block");
			$("#row9").css("display","block");
			// $("#row10").css("display","block");	
			$("#spacefiller3").css("display","none");
			$("#spacefiller4").css("display","block");
			$("#spacefiller5").css("display","block");
			// $("#wannaspend").css("display","none");
		}});
 

		$("#walk").on("click", function () {
			if (selectFood == true && selectMoney == true && selectMethod == false) {
			selectMethod = true; 
			method = "walk";
			console.log(method);
			// need to figure out what the next page of html is -- and put JS here to alter page
		}});

		$("#drive").on("click", function () {
			if (selectFood == true && selectMoney == true && selectMethod == false) {
			selectMethod = true; 
			method = "drive";
			console.log(method);
			// need to figure out what the next page of html is -- and put JS here to alter page
		}});

		$("#deliver").on("click", function () {
			if (selectFood == true && selectMoney == true && selectMethod == false) {
			selectMethod = true; 
			method = " delivery";
			console.log(method);
			// need to figure out what the next page of html is -- and put JS here to alter page
		}});

	};	


renderImages(selectFood, selectMoney, selectMethod);






	// event listener for the last click --  not sure what the final  step's  ID will be,  so just using "search" for now
	$(document).on('click', '#deliver', function() {

		console.log("ajax function running");

		var key = "AIzaSyBT6QkrwpTvY-eL3nEQEkYnMdlO8HmYnBI";

		// need Rick's help getting the user location and storing in these variables
		var latitude = 40.5342742;
		
	  	var longitude = -74.5224469;

	  	var location = latitude+","+longitude;
	  	console.log(location);

	  	var radius = 0;
  	
	  	if (method=="walk"){
	  		radius=1000};

	  	if (method=="drive"){
	  		radius=3000};

	  	if (method==" delivery"){
	  		radius=5000;
	  		var keyword = selectedFoods.concat(method);
	  		}else{keyword=selectedFoods};
	  	
	  	console.log(keyword);

	  	var queryURL = "https://crossorigin.me/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+location+"&radius="+radius+"&type=restaurant&keyword="+selectedFoods+"&maxprice="+maxprice+"&key="+key;
	    console.log(queryURL);


		$.ajax({
	    url: queryURL,
	    method: 'GET',
	    success: function(response){ console.log(response) }

	    // in the function above,  we will push the appropriate results into the html

	    });

	});    

});



        // var results = response.data;

        // for (var i = 0; i < results.length; i++)
        // {
        //   var resultDiv = $('<div>');

        //   var name = results.businesses[i].name;

        //   var p = $('<p>').text(name);

        // 	 var a = $('<a>');

       	//   a.attr('href' , results.businesses[i].url); 

        //   var showImage = $('<img>');
        //   showImage.attr('src' , results.businesses[i].image_url);
        // 	 a.append(showImage);
        //   resultDiv.append(p);
        //   resultDiv.append(a);


        //   // place the results into the resultDiv
        //   $('element id of the html element').prepend(resultDiv);
        // }

  

