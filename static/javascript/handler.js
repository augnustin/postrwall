function nextContainer() {
	console.log('Current container : ' + CURRENTCONTAINER + ' and content is '
			+ $('#content').css('display') + ' and content2 is '
			+ $('#content2').css('display'));
	if (CURRENTCONTAINER == 'content') {
		$('#' + CURRENTCONTAINER).fadeOut(
				FADETIME,
				function() {
					$(this).empty();
					console.log('Current container : ' + CURRENTCONTAINER
							+ ' and content is ' + $('#content').css('display')
							+ ' and content2 is '
							+ $('#content2').css('display'));

				});
		CURRENTCONTAINER = 'content2';
		return true;
	}
	if (CURRENTCONTAINER == 'content2') {
		$('#' + CURRENTCONTAINER).fadeOut(
				FADETIME,
				function() {
					$(this).empty();
					console.log('Current container : ' + CURRENTCONTAINER
							+ ' and content is ' + $('#content').css('display')
							+ ' and content2 is '
							+ $('#content2').css('display'));
				});
		CURRENTCONTAINER = 'content';
		return true;
	}
};

function urlHandler() {
	if (getParameterByName('view') != view
			|| getParameterByName('event') != event_name) {

		view = getParameterByName('view');
		event_name = getParameterByName('event');

		if (DZ.player.playing) {
			DZ.player.pause();
		}

		nextContainer();
		if (view) {
			data_content_handler(view);
			return true;
		}

		if (event_name) {
			printEvent(searchEventByName(event_name));
			return true;
		} else {
			printEvents(PAGENB * NBPERPAGE);
			return true;
		}

		return false;
	}
	return false;
};

function link_handler(object) {
	if (history.pushState) {
		history.pushState({
			path : this.path
		}, 'Postrwall : ' + object.text(), object.attr('href'));
	}
	urlHandler();
};

function data_content_handler(data_content) {
	$.get('content/' + data_content + '.html', function(data) {
		$('#' + CURRENTCONTAINER).html(data);
	});
	$('#' + CURRENTCONTAINER).html('Loading ...');
	$('#' + CURRENTCONTAINER).fadeIn(FADETIME, function() {
	});
};

function searchEventByName(name) {
	var resultIndex = -1;
	$.each(events, function(index, event) {
		if (urlencode(event.event.name.toLowerCase()) == urlencode(name
				.toLowerCase())
				&& resultIndex == -1) {
			resultIndex = index;
		}
	});
	return resultIndex;
};

