$(function() {
	var $meetupSwatches = $('td.swatch'),
		$thirdPartySwatches = $('#thirdPartyColors dl');
		
	function componentToHex(c) {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}

	function cssRgbToHex( cssVal ) {
		var RGB = [], parts = cssVal.split(',');
		for (i=0;i<parts.length;i++) {
			RGB.push(parts[i].match(/[0-9]+/)[0]);
		}
		return "#" + componentToHex(RGB[0]) + componentToHex(RGB[1]) + componentToHex(RGB[2]);
	};

	$meetupSwatches.each(function(i, td) {
		var rgb = getComputedStyle(td).backgroundColor;
		$(td).text(rgb);
	});

	$thirdPartySwatches.each(function(i, dl) {
		var $dl = $(dl),
			rgb = getComputedStyle($dl.find('dt')[0]).backgroundColor;

		$dl.find('dd.hex').text(rgb);
	});

});
