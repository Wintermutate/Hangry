var queryURL = "https://api.yelp.com/v3/businesses/search?term=" + cuisine + "&latitude=40.4941043&longitude=-74.440837&pricing_filter=" + cash + "&limit=10";


$(document).on('click', '.form-group', function() {

var cuisine = $(this).data('food');
console.log(cuisine);


});


$(document).on('click', '.price', function() {


var cash = $(this).attr('data-money');
console.log(cash);



});