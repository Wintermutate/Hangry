$(document).ready(function(){

// Initialize global variables. 
var selectFood = false; 
var selectMoney = false;
var selectMethod = false; 
var chosenFoods = [];
var selectedFoods = "";
var selectedMoney = "";
var selectedMethod = "";
var userLat = "";
var userLong = "";


function renderImages(selectFood, selectMoney, selectMethod){

	$("#foodSelect").on("click",function(){
		if (selectFood == false && selectMoney == false && selectMethod == false){
		console.log(selectFood);
		selectFood = true;
		selectedFoods = chosenFoods.join("&");
		// console.log(selectedFoods);
		$("#row1").css("display","none");
		$("#row2").css("display","none");
		$("#row3").css("display","block");
		$("#row4").css("display","block");
		$("#row5").css("display","block");
		$("#spacefiller2").css("display","block");
		$("#wannaspend").css("display","block");
	}
	});	
   
	$("#poor").on("click", function(){
		if (selectFood == true && selectMoney == false && selectMethod == false) {
		console.log(selectMoney);
		selectMoney = true;
		selectedMoney = "1&";
		console.log(selectedMoney);
		$("#row1").css("display","none");
		$("#row2").css("display","none");
		$("#row3").css("display","none");
		$("#row4").css("display","none");
		$("#row5").css("display","none");
		$("#row7").css("display","block");
		$("#row8").css("display","block");
		$("#row9").css("display","block");
		$("#row10").css("display","block");
		$("#spacefiller3").css("display","none");
		$("#spacefiller4").css("display","block");
		$("#spacefiller5").css("display","block");
	}});
	
	$("#rich").on("click", function(){
		if (selectFood == true && selectMoney == false && selectMethod == false) {
		selectMoney = true; 
		selectedMoney = "4&";
		console.log(selectedMoney);
		$("#row2").css("display","none");
		$("#row3").css("display","none");
		$("#row4").css("display","none");
		$("#row5").css("display","none");
		$("#row7").css("display","block");
		$("#row8").css("display","block");
		$("#row9").css("display","block");
		$("#row10").css("display","block");	
		$("#spacefiller3").css("display","none");
		$("#spacefiller4").css("display","block");
		$("#spacefiller5").css("display","block");
	}});
 
}

 $(".cuisine").on("click", function(){
 	
 	if ($(this).hasClass("selected")){

 	$(this).addClass("deselected");
 	$(this).removeClass("selected");
 	var food = $(this).data("food");

 	for (i = 0; i<chosenFoods.length; i++){

 		if (chosenFoods[i] == food){
 			chosenFoods.splice(i, 1);
 			// console.log(chosenFoods);
 		}
  	}
 }else if ($(this).hasClass("deselected")){
 	
 	$(this).addClass("selected");
 	$(this).removeClass("deselected");
 	var food = $(this).data("food");
 	chosenFoods.push(food);
 	// console.log(chosenFoods);
 }

});


renderImages(selectFood, selectMoney, selectMethod);

});


// event listener for the last click --  not sure what the final  step's  ID will be,  so just using "Method" for now
// $(document).on('click', '.delivery', function() {

// 	var delivery = $(this).attr('data-delivery');
// 	console.log(delivery);

// 	$.ajax({
//     url: queryURL,
//     method: 'GET',
//     beforeSend: function(xhr, settings){xhr.setRequestHeader('Authorization', 'Bearer ' + '5QK1RYBT8c1P7pmcJPzib0mhe7pfVIw0SnkQribQ4i2RaxTnh0_hMrUdnktGPxNf6qZsEXzfbBQz-hT_erdvPyWLIws5g6mYaJLJsyqcSNnOOL-dRCzpBO800lvkV3Yx');},
//     success: function(response){ console.log(response) }

//     // in the function above,  we will push the appropriate results into the html

//     });


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

  

