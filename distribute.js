(function($){

  	//Object Instance
  	$.distribute = function(el, options){
    	var slider = $(el);
		// Store a reference to the object
		$.data(el, "distribute", slider);
 

		//Initialize
		dowork();
	};

	$.distribute.defaults = {
		cols: 3,	//number of columns
		element: '',
		breakpoints: {
			769:{
				cols=3
			},
		}
	}

	//Plugin Function
	$.fn.distribute = function(options) {
		if (options === undefined) { options = {}; }

			// Helper strings to quickly perform functions on the slider
			var distributes = $(this).data('distribute');
			switch (options) {
				case "recalc": distributes.recalc(options); break;
				default: distributes.dowork(options);
			}
	};
})(jQuery);
