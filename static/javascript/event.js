
function printEvent(nb) {
	if (nb == -1) {
		printEvents(0);
	} else {
		if (currentEvent == null) {
			if (nb >= 0 && nb < events.length) {
				currentEvent = events[nb].event;
			}
		}
		insertSkeleton();
		$('#eventPoster').css("background-image",
				"url(" + currentEvent.posterUrl + ")");

		eventView = true;
		$('#trackList').empty();
		$('#event-title').append(
				'<div id="event-title-top"><p class="title"><a href="'
					+ currentEvent.webpage
					+ '" target="_blank">'
					+ currentEvent.name
					+ '</a></p><a href="https://www.google.com/calendar/render?action=TEMPLATE&text='
					+ currentEvent.name
					+ '&dates='
					+ formatDate(currentEvent.date)
					+ '/'
					+ formatDate(currentEvent.date)
					+ '&location='
					+ currentEvent.address
					+ '&details='
					+ currentEvent.description
					+ '&trp;=true&sprop;=+website:'
					+ rootUrl
					+ '&sprop;=name:Postrwall&gsessionid=OK" target="_blank">'
					+ currentEvent.date
					+ '<img src="../design/favicon_v2010_31.ico" /></a> at <a href="http://maps.google.com/maps?q='
					+ currentEvent.address
					+ '" target="_blank">'
					+ currentEvent.address
					+ ' <img src="../design/google_maps_favicon.ico"></a></div>'
					+ '<div id="event-title-bottom">Preview powered by <img src="../design/deezer_logo.png" display="in-line" /></div>'
					);
		$('#trackList').append("<tbody>");
		$('#trackList').append("<tr><td>Loading ...</td></tr>");
		$('#trackList').append("</tbody>");
		playerDisplay(getArtists());
	}
	;
	$('#' + CURRENTCONTAINER).fadeIn(FADETIME, function() {
	});

}

function insertSkeleton() {
	var skeleton = '														\
		<div id="event" class="transition">									\
			<a href="/" id="back"></a>										\
				<div id="eventPoster" class="eventSubBlock"></div>			\
				<div id="eventControl" class="eventSubBlock">				\
					<div id="eventPlayer" class="eventContainer">			\
						<div id="event-title"></div>							\
						<div id="event-content"><table id="trackList"></table></div>					\
					<div id="buttonsControl">								\
						<div class="eventButtons" id="BuyTicketsDiv">		\
							<p>Buy Tickets</p>								\
							<button id="BuyTicketsButton" />	\
						</div>												\
						<div class="eventButtons" id="ShareDiv">			\
							<p>Share</p>									\
							<a target="_blank" href="mailto://?subject=Postrwall%20Check%20this&body=My%20friend,%20you%20should%20also%20check%20this:%20http://postrwall.appspot.com/"> \
							<button id="MailShareButton" /></a>				\
							<a onclick="return !window.open(this.href, \'Share on Facebook\', \'width=1000,height=500\')" target="_blank" href="http://www.facebook.com/dialog/feed?app_id=395894533798093&link=http://postrwall.appspot.com/'
			+ window.location.search
			+ '&picture='
			+ currentEvent.posterUrl
			+ '&name=Postrwall%20:%20'
			+ currentEvent.name
			+ '&caption=Music%20behind%20the%20Poster&description=Listen%20with%20Deezer%20to%20the%20music%20of%20your%20favourites%20concerts%20:%20'
			+ currentEvent.name
			+ '&redirect_uri=http://postrwall.appspot.com">	\
							<button id="FacebookShareButton" /></a>			\
							<a onclick="return !window.open(this.href, \'Share on Twitter\', \'width=500,height=250\')" target="_blank" href="https://twitter.com/intent/tweet?original%20referer=http%3A%2F%2Fpostrwall.appspot.com&source=tweetbutton&text=Hey%2C%20check%20this%20awesome%20Poster%3A&url=http%3A%2F%2Fpostrwall.appspot.com&via=PostrWall">	\
							<button id="TwitterShareButton" /></a>			\
						</div>												\
					</div>													\
			</div>													\
																			\
				</div>														\
			</div>';
	$('#' + CURRENTCONTAINER).append(skeleton);
}

function flipContent() {
	$('#eventControl').flip({
		direction : 'lr',
		color : '#809FAF',
		onBefore: function(){
			$('#eventControl').css('background-color','#809FAF');
		},
		onEnd : function() {
			$('#eventControl').css('background-color','transparent');
			$("#event-content").empty();
			$("#event-content").append("Here are the details");
			
		}
	});
}