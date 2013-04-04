var eventView = false;
var events = [];
var currentEvent = null;
var rootUrl = 'http://postrwall.appspot.com/';

// PARAMETERS
var NBPERPAGE = 10;
var PAGENB = 0;
var FADETIME = 1000;
var CURRENTCONTAINER = 'content';
var view = "";
var event_name ="";

$(document).ready(function() {
	getEvents(); // Retrieve the list of events we want
	deezerOn(); // Start the Deezer player in background
	desactivateLinks(); // Desactivate the reload of the page when a link is pressed
	window.onpopstate = urlHandler; // If prev and next page in browser are manipulated, same function is called
});

function getEvents() {
	$.getJSON("/data", function(data) {
		console.log("Data Loaded");
		events = data.events; // Store events
		urlHandler(); // Interpret the given url
	});
};

function desactivateLinks() {
	$('a').live('click', function(event) {
		if ($(this).attr('target') != '_blank') {
			event.preventDefault();
			link_handler($(this));
		}
	});
}


  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-36223212-3']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();