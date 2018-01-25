$(document).ready(function() {

	// Starter set of musicians.
	var musicians = [
	"BB King",
	"David Bowie",
	"Bob Dylan",
	"Greg Allman"
	];

	function addButtons() {
		// Delete existing buttons prior to adding new to avoid duplicates.
		$("#person-view").empty();

		// for (var i = 0; i < musicians.length; i++) {
		// 	Dynamically add buttons for all musicians added.
		// 	var addButton = $("<button>");
		// 	addButton.addClass("musician");
		// 	addButton.attr("data-name", musicians[i]);
		// 	addButton.text(musicians[i]);
		// 	$("#person-view").append(addButton);
		// }

		// Dynamically add buttons for all musicians added.
		$.each(musicians, function(index, element) {
			var addButton = $("<button>").addClass("musician").attr("data-name",element).text(element);
			$("#person-view").append(addButton);
		});
 }

	$("#person-input").focus();
 	$("#add-person").on("click", function(event) {
	 	// preventDefault prevents form from submitting itself. Allows use of <enter>.
	 	event.preventDefault();
	 	// Take user input & remove white spaces at the start and end of the string.
	 	var person = $("#person-input").val().trim();
	 	//person.attr("autofocus");

	 	// Add musician from textbox to the array.
	 	musicians.push(person);
	 	addButtons();
 });
 	// Add starter set of musicians.
 	addButtons();

 	// Click any button to generate images search for that musician.
 	$(document).on("click", ".musician", function(event) {
 		// Empty previous images displayed.
 		$(".image-view").empty();
 		console.log($(this).attr("data-name"));
 		// Set data value of button clicked.
 		var person = $(this).attr("data-name");
 		var quoted = "'" + person + "'";
 		console.log(quoted);
 		var encoded = encodeURI(quoted);
 		console.log(encoded);
 		// var person = "'" + person + "'" = 'quoted person'
 		// AJAX search call with data-name value of button clicked.
 		// Use single quotes around name and encodeURiComponent to sanitize it.
 		// var quoted = "'" + term + "'";` = 'quoted term'
 		$.get("https://api.giphy.com/v1/gifs/search?&api_key=QgyyNJu0tpkFEUcHKrttfUbFSFIdhoVU&q=" + encoded + "&limit=10&rating=g&lang=en")
 		.then(function(response) {
 			//Display API object in console.
 			console.log(response);
 			var results = response.data;
 			// Loop to retrieve 10 static images from GIPHY API.
 			for (var i = 0; i < 10; i++) {
 				var imagesDiv = $(".image-view");
 				var rating = results[i].rating.toUpperCase();
 				var p = $("<p>").html("Rating:  " + rating + "<br>");
 				var personImage = $("<img class='person-image'>");

 				// Object for image attributes
 				personImage.attr({
 					src: results[i].images.fixed_height_still.url,
 					"data-still": results[i].images.fixed_height_still.url,
 					"data-animate": results[i].images.fixed_height.url,
 					"data-state": "still",
 				});

 				imagesDiv.append(p);
 				p.append(personImage);
 				imagesDiv.addClass("person-image");
 				$(".image-view").prepend(imagesDiv);
 			}

 		}).done(function(){
 			// Clicking on image changes state from initial "still" to "animated". One more click changes back to "still".
	 		 $("p img").on("click", function(event) {
	            var state = $(this).attr("data-state");
	            console.log($(this).attr("data-state"));
	            if (state == "still") {
	                $(this).attr("src", $(this).data("animate"));
	                $(this).attr("data-state", "animate");
	            } else {
	                $(this).attr("src", $(this).data("still"));
	                $(this).attr("data-state", "still");
	            }
	            
	        });

 		});
	 			

  
    })

 	});
		