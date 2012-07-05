
(function(w){
	w.Feed = Feed;
	
	function Feed( template, source, opt_source_type ){
		var source_type = type_of( source );
		var is_array = source_type == 'array';
		
		var is_json = opt_source_type == 'json' || source_type == 'object';
		var is_json_array = is_json || ( is_array && type_of(source[0]) == 'object' && type_of(source[1]) == 'object');
		
		var array = is_array? source : [source];
		var i = array.length;
		
		var output = [];
		var element;
		
		var regexp = /{{([a-z\-_]+[0-9]*)}}/ig;
			
		var header = array[0];
		
		if( is_json || is_json_array ){
			
			while(i--){
				element = array[ i ];
				
				output[ i ] = template.replace( regexp,
					function(holder, name, index, string){
						return element[name] || '{{}}';
					}
				);
			}
		
		}else{
			
			if(i){
				i--;
				while(i--){
					element = array[ i+1 ];
					
					output[ i ] = template.replace( regexp,
						function(holder, name, index, string){
							return ( element[ header[name] ] + "" ) || '';
						}
					);
				}
			}
		}
		
		return clear( output );
	}
	
	// Simple object type detector
	function type_of( object ){
		var type = typeof( object );
		
		if( type == 'object' ){
			if( object === null ){
				type = 'null';
				
			}else if( object instanceof Array || 'splice' in object && 'join' in object ){
				type = 'array';
			}
		}
		
		return type;
	}
	
	// Removes optional brackets and un-replaced place holders
	function clear( data ) {
		var clean_a = /\[\[(.+){{}}(.+)\]\]/ig;
		var clean_b = /{{}}/ig;
		var clean_c = /\[\[(.+)\]\]/ig;
		
		var is_array = data instanceof Array;
		var output = is_array ? data : [data];	
		var i = output.length;
		
		while(i--){
			output[ i ] = output[ i ].replace( clean_a, "" ).replace( clean_b, "" ).replace( clean_c, "$1" );
		}
		
		return is_array? output : output[0];;
	}
	
	// This method would make the Feed function available at string level prototype
	Feed.export = function() {
		String.prototype.feed = function( source, opt_source_type ) {
			var template = this;
			return Feed(template, source, opt_source_type );
		};
	};
	
})(window);