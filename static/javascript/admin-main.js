var rootUrl = 'http://postrwall.appspot.com/';

$(document).ready(
		function() {
			deezerOn(); // Start the Deezer player in background

			poster = $('#poster-preview').attr('src');

			$('#content').fadeIn(1000);

			$('#posterUrlInput').blur(
					function() {
						if ($('#posterUrlInput').val() != poster) {
							$('#poster-preview').attr('src',
									$('#posterUrlInput').val());
						}
					});

			$('#button-plus').click(
					function() {
						$('#artist-input-list').append(
								'<li><input type="text" id="artist-'
										+ ($('.artist-input').length + 1)
										+ '" name="artist-'
										+ ($('.artist-input').length + 1)
										+ '" class="artist-input" /></li>')
					});

			$('#button-minus').click(function() {
				$('#artist-' + $('.artist-input').length).parent().remove();
			});

			$('#date').datepicker({
				dateFormat : 'dd/mm/yy',
			});

			$('#generate-preview').click(function() {
				playerDisplay(getArtists());

			});

			$('.artist-input').bind(
					{
						focus: function() {
							$(this).parent().append(
									'<div id="auto-completion"></div>');							
						},
						keyup: function() {
							if($(this).val() != '') {
								console.log('query='+$(this).val());
								DZ.api('/search/artist/?q=' + $(this).val(), function(response) {
									$('#auto-completion').empty();
									if(response.total > 0) {
										$('#auto-completion').append('<ul>');
										for (i = 0; i < 5; i++) {
											$('#auto-completion').append('<li>'+response.data[i].name+'</li>');
										}
										$('#auto-completion').append('</ul>');
										if($('#auto-completion').css('display')=='none') {									
											$('#auto-completion').fadeIn(1000);
										}
									}
								});
							}
						},
						blur: function() {
							$('#auto-completion').fadeOut(1000,function(){
								$(this).remove();
							});
						}
					});

		});
