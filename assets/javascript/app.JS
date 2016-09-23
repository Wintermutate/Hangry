// var queryURL = "https://api.yelp.com/v3/businesses/search?term=" + cuisine + "&latitude=40.4941043&longitude=-74.440837&pricing_filter=" + cash + "&limit=10";


// $(document).on('click', '.form-group', function() {

// var cuisine = $(this).data('food');
// console.log(cuisine);


// });


// $(document).on('click', '.price', function() {


// var cash = $(this).attr('data-money');
// console.log(cash);
$(document).ready(function(){
$(".img-responsive").on("click",function(){
	$("#row1").css("display","none");
	$("#row2").css("display","block");
	$("#row3").css("display","block");
	$("#row4").css("display","block");
	$("#row5").css("display","block");
});

$("#poor").on("click",function(){
	$("#row2").css("display","none");
	$("#row3").css("display","none");
	$("#row4").css("display","none");
	$("#row5").css("display","none");
	$("#row6").css("display","block");
	$("#row7").css("display","block");
	$("#row8").css("display","block");
	$("#row9").css("display","block");
	$("#row10").css("display","block");
});

$("#rich").on("click",function(){
	$("#row2").css("display","none");
	$("#row3").css("display","none");
	$("#row4").css("display","none");
	$("#row5").css("display","none");
	$("#row6").css("display","block");
	$("#row7").css("display","block");
	$("#row8").css("display","block");
	$("#row9").css("display","block");
	$("#row10").css("display","block");
});

// });


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

