function getArtists() {
	artists = [];
	$.each($('.artist-input'),function(index,artistinput) {
		artists.push(artistinput.value);
	});
	return artists;
	};