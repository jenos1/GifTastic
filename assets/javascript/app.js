$(document).ready(function() {

	// Starter set of musicians.
	var musicians = [
	"Schubert",
	"Bill Monroe",
	"Greg Allman"
	];

	function addButtons() {
		// Delete existing buttons prior to adding new to avoid duplicates.
		$("#person-view").empty();

		for (var i = 0; i < musicians.length; i++) {
		// Dynamically add bottons for all musicians.
		var addButton = $("<button>");
		addButton.addClass("musician");
		addButton.attr("data-name", musicians[i]);
		addButton.text(musicians[i]);
		$("#person-view").append(addButton);
		}
 }

 $("#add-person").on("click", function(event) {
 	// preventDefault prevents form from submitting itself. Allows use of <enter>.
 	event.preventDefault();
 	// Take user input & remove white spaces at the start and end of the string.
 	var person = $("#person-input").val().trim();
 	// Add musician from textbox to the array.
 	musicians.push(person);
 	addButtons();

 });
 	addButtons();
})