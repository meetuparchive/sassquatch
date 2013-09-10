$(function() {
	var $meetupSwatches = $('td.swatch'),
		$thirdPartySwatches = $('#thirdPartyColors dl');

	function rgbToHex(color) {
		if (color.substr(0, 1) === '#') {
			return color;
		}
		var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

		var red = parseInt(digits[2]);
		var green = parseInt(digits[3]);
		var blue = parseInt(digits[4]);

		var rgb = blue | (green << 8) | (red << 16);
		return digits[1] + '#' + rgb.toString(16);
	};


	$meetupSwatches.each(function(i, td) {
		var rgb = getComputedStyle(td).backgroundColor;
		$(td).html('<div class="small">' + rgb + '</div><div class="small">' + rgbToHex(rgb) + '</div>');
	});

	$thirdPartySwatches.each(function(i, dl) {
		var $dl = $(dl),
			rgb = getComputedStyle($dl.find('dt')[0]).backgroundColor;

		$dl.find('dd.hex').html('<div class="small">' + rgb + '</div><div class="small">' + rgbToHex(rgb) + '</div>');
	});

});
