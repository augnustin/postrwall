 

function printEvents(min_index) {
	currentEvent = null;
	if (PAGENB > 0) {
		$('#'+CURRENTCONTAINER).append('<a id="prevButton"  href="/"></a>');
		$('#prevButton').click(prev);
	}

	if (min_index >= 0) {
		for (i = min_index; i < Math.min(min_index + NBPERPAGE, events.length); i++) {
			$('#'+CURRENTCONTAINER).append(
					'<a href="?event='+urlencode(events[i].event.name)+'"><div class = "poster" id="poster' + i + '"></div></a>');
			$("#poster" + i).css("background-image",
					"url(" + events[i]['event'].posterUrl + ")");
		}
	}

	if (((PAGENB + 1) * NBPERPAGE) < events.length) {
		$('#'+CURRENTCONTAINER).append('<a id="nextButton" href="/"></a>');
		$('#nextButton').click(next);
	}
	$('#'+CURRENTCONTAINER).fadeIn(FADETIME, function() {});
}

function next() {
	// $('#content').fadeOut(FADETIME, function() {});
	$('#'+CURRENTCONTAINER).empty();
	PAGENB = PAGENB + 1;
	printEvents(PAGENB * NBPERPAGE);
}

function prev() {
	// $('#content').fadeOut(FADETIME, function() {});
	$('#'+CURRENTCONTAINER).empty();
	PAGENB = PAGENB - 1;
	printEvents(PAGENB * NBPERPAGE);
}