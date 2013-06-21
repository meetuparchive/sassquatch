(function ($) {
	
	/*
	 * OPTIONS
 	 * callback: 		function to be called after closing element
     * x_wrap_selector: optional selector to find child of closeable element for appending "X". If empty, "X" will be appended directly to the closeable element.
	 *
	 */
	$.fn.closeable = function(options){

		var settings = $.extend( {
			'callback'           : function(){},
			'x_wrap_selector'  	 : false,
			'remove_after_hide'  : true
		}, options);

		return this.each(function() {
			var $closeable = $(this);		
			var $x = $('<div class="close-me"></div>');
			var close = function(){
				$closeable.slideUp(function(){
					if(settings.remove_after_hide){
						$closeable.remove();
					}
					settings.callback();
				});
			};

			$x.click(close);
			$closeable.bind('close', close);

			var $x_wrap = (settings.x_wrap_selector) ? $closeable.find(settings.x_wrap_selector) : $closeable;
			if($x_wrap.css('position') == 'static' || $x_wrap.css('position') == ''){
				$x_wrap.css({'position':'relative'});
			}
			$x_wrap.append($x);
		});
	}

})(jQuery);
