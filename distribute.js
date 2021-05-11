(function($){
		

	(function ( $ ) {
 
		$.fn.distribute = function( options ) {
	 
			// Default options
			var settings = $.extend({
				cols: 3,	//number of columns
				breakpoints: {
					769:{
						cols=3
					}
				}
			}, options );
	 
			// Apply options
			return this.append('Hello ' + settings.name + '!');
			
		};
	 
	}( jQuery ));


	
  	//Object Instance
  	$.distribute = function(el, options){
    	var slider = $(el);
		// Store a reference to the object
		$.data(el, "distribute", slider);

		//Initialize Distribute
		function init(){

			foreach(breakpoints as $break){

			}

		}


		//Initialize
		methods.init();
	};
	
	$.distribute.defaults = {
		cols: 3,	//number of columns

	}

	//Plugin Function
	$.fn.distribute = function(options) {
		if (options === undefined) { options = {}; }

		if (typeof options === "object") {
			return this.each(function() {
				var $this = $(this),
					selector = (options.selector) ? options.selector : ".columndistribute",
					$columns = $this.find(selector);

				if(($columns.length === 1 && options.allowOneSlide === true ) || $columns.length === 0 ){
					$columns.fadeIn(400);
					if (options.start) { options.start($this); }
				} else
				if ($this.data('distribute') === undefined) {
					new $.distribute(this, options);
				}
			});
		} else {
			// Helper strings to quickly perform functions on the slider
			var distributes = $(this).data('distribute');
			switch (options) {
				case "recalc": distributes.recalc(options); break;
				default: distributes.dowork(options); }
		}
	};
})(jQuery);


