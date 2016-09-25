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
			$("#spacefiller2").css("display","block");
			$("#spacefiller3").css("display","block");
			// $("#wannaspend").css("display","block");
		}
		});	
   

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
			$("#row5").css("display","block");
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
			maxprice = "4";
			console.log(maxprice);
					
			$("#row2").css("display","none");
			$("#row3").css("display","none");
			$("#row4").css("display","none");
			$("#row5").css("display","block");
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
 		
 		
 	if (!selectFood || !selectMoney || !selectMethod){	
 		
 		selectFood = false;
 		selectMoney = false;
 		selectMethod = false;
 		
 		// console.log(selectFood);
 		// console.log(selectMoney);
 		// console.log(selectMethod);

 		$("#row1").css("display","block");
 		$("#row2").css("display","block");
		$("#row3").css("display","none");
		$("#row4").css("display","none");
		$("#row5").css("display","block");
		$("#row6").css("display","block");
		$("#row7").css("display","none");
		$("#row8").css("display","none");
		$("#row9").css("display","none");
		$("#row10").css("display", "none");
		$("#spacefiller1").css("display","block");
		$("#spacefiller2").css("display","none");
		$("#spacefiller3").css("display","none");
		$("#spacefiller4").css("display","none");
		$("#spacefiller5").css("display","none"); 

 		// console.log("RESET!");

 		renderImages(selectFood, selectMoney, selectMethod);

 		// console.log("function fired!")
 	}
 	});		
 	
 	$('#back').on('click', function(){

 		console.log("back");
 	
 	});

renderImages(selectFood, selectMoney, selectMethod);




	// event listener for the last click --  not sure what the final  step's  ID will be,  so just using "search" for now
	$(document).on('click', '.method', function() {

		console.log("ajax function running");

		var key = "AIzaSyBT6QkrwpTvY-eL3nEQEkYnMdlO8HmYnBI";

		// need Rick's help getting the user location and storing in these variables
		var latitude = 40.5342742;
		
	  	var longitude = -74.5224469;

	  	var location = latitude+","+longitude;
	  	console.log(location);

	  	var radius = 0;
  	
	  	if (selectedMethod=="walk"){
	  		radius=1000};

	  	if (selectedMethod=="drive"){
	  		radius=3000};

	  	if (selectedMethod=="delivery"){
	  		radius=5000;
	  		var keyword = selectedFoods.concat("|" + selectedMethod);
	  		}else{keyword=selectedFoods};
	  	
	  	console.log(keyword);

	  	var queryURL = "https://crossorigin.me/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+location+"&radius="+radius+"&type=restaurant&keyword="+ keyword +"&maxprice="+maxprice+"&key="+key;
	    console.log(queryURL);


		$.ajax({
	    url: queryURL,
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

          	p.append(results[i].photos[0].html_attributions[0]);

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



        

  

