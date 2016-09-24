// var queryURL = "https://api.yelp.com/v3/businesses/search?term=" + cuisine + "&latitude=40.4941043&longitude=-74.440837&pricing_filter=" + cash + "&limit=10";
$(document).ready(function(){

// Initialize global variables. 
var selectFood = false; 
var selectMoney = false;
var selectMethod = false; 
var chosenFoods = [];
var selectedFoods = "";
var selectedMoney = "";
var selectedMethod = "";

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
	}});	
   
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
		$("#row6").css("display","block");
		$("#row7").css("display","block");
		$("#row8").css("display","block");
		$("#row9").css("display","block");
		$("#row10").css("display","block");
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
		$("#row6").css("display","block");
		$("#row7").css("display","block");
		$("#row8").css("display","block");
		$("#row9").css("display","block");
		$("#row10").css("display","block");	
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

// event listener for the last click --  not sure what the final delivery step's  ID will be,  so just using "delivery" for now
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

});    

