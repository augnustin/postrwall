
var trackList = [];

function indexOfSub(o,element,label){
	var result = 0;
	$.each(o,function(index,el) {
		if(el[label]==element) {
			result = index;
		}
	});
	return result;
};

function makePlaylist(id) {
	playList = [];
	$.each(trackList.slice(indexOfSub(trackList,id,'id')),function(index,track){
		playList.push(track['id']);
	});
	return playList;
}


function deezerOn(event) {
	DZ.init({
		appId : '104051',
		channelUrl : rootUrl+'channel.html', // __app/channel.html
// channelUrl : 'http://localhost:8084/channel.html', // __app/channel.html
		player : {
			onload : function() {
			console.log("Player loaded");
			}
		}
	});
};

function startEvents() {
	DZ.player.playing = false;

	DZ.Event.suscribe('player_play', function(evt_name){
		console.log("Play answered");
		DZ.player.playing = true;
//		$('.currentTrack').hover(
//				function () {
//					$('.currentTrack').css('background-image','url("../design/pause-blue.png")')
//				}, 
//				function () {
//					$('.currentTrack').css('background-image','url("../design/speeker-padded.png")');				
//				}); 
	});			
	
	DZ.Event.suscribe('player_paused', function(evt_name){
		console.log("Pause answered");
		DZ.player.playing = false;
//		$('.currentTrack').hover(
//				function () {
//					$('.currentTrack').css('background-image','url("../design/play-blue.png")')
//				}, 
//				function () {
//					$('.currentTrack').css('background-image','url("../design/speeker-padded.png")');				
//				}); 
	});
	
	DZ.Event.suscribe('current_track', function(track, evt_name){
		console.log("current track object", track);
		showPlayingTrack(track.track.id);
	});
}

function playerDisplay(artists) {
	trackList = [];
	var nbOK = 0;
		
	$.each(artists, function(index, artist) {
		DZ.api('/search?q='+artist, function(response){
			for(var i=0;i<Math.min(3,response['data'].length);i++) {
				trackList.push(response['data'][i]);
			}
			console.log('Results Found for '+artist);
			nbOK++;
			allReady(artists, nbOK);
			
		});
	});
};

function allReady(artists, nbOK) {
	if(nbOK==artists.length) {
		trackList = shuffle(trackList);		
		$("#trackList").children('tbody').empty();
		$.each(trackList, function(index, track) {
			$("#trackList").children('tbody').append('<tr><td id="'+track['id']+'"><a href="'+track['artist']['link']+'" target="_blank">' + track['artist']['name'] + '</a> - <a href="'+track['link']+'" target="_blank">' + track['title'] +'</a></td></tr>');
		});
		activateCells();
		startEvents();
	}
};



function showPlayingTrack(id) {
	$('.currentTrack').css('background-image','none');
	$('.currentTrack').removeClass('currentTrack');
	$('#'+id).addClass('currentTrack');
}

function playpauseTrack(id) {
		if($('.currentTrack').attr('id') == id) { // One and only one .currentTrack and same as clicked
			if(DZ.player.playing) {
				DZ.player.pause();
				console.log("Pausing ...");
				$('.currentTrack').hover(
						function () {
							$('.currentTrack').css('background-image','url("/design/play-blue.png")')
						}, 
						function () {
							$('.currentTrack').css('background-image','url("/design/speeker-padded.png")');				
						}); 
			}
			else {
				DZ.player.play();
				console.log("Resuming ...");
				$('.currentTrack').hover(
						function () {
							$('.currentTrack').css('background-image','url("/design/pause-blue.png")')
						}, 
						function () {
							$('.currentTrack').css('background-image','url("/design/speeker-padded.png")');				
						});
			}
		}		
	else { // Other track selected
		console.log("Playtrack :"+id);
		DZ.player.playTracks(makePlaylist(id), function(response) {
			console.log('Playing ...');
		});	
	}
}

function activateCells() {
	$("#trackList").children('tbody').children('tr').children('td').click(function() {
		playpauseTrack($(this).attr('id'));
	});
	
};

//suscribe for a "player_play" event.


