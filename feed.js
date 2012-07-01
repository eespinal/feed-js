
(function(w){
	w.Feed = feed;
	
	function feed( template, source, source_type ){
		source_type = typeof source_type === 'undefined' && type_of(source) == 'object' ? 'json' : source_type;
			
		var isArray = source instanceof Array;
		
		var array = isArray? source : [source];
		var i = array.length;
		
		var output = [];
		var element;
			
		var regexp = /{{([a-z\-_]+[0-9]*)}}/ig;
			
		var header = array[0];
		
		if( source_type == 'json' ){
			
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
		
		// Removes optional brackets and un-replaced place holders
		var clean_a = /\[\[(.+){{}}(.+)\]\]/ig;
		var clean_b = /{{}}/ig;
		var clean_c = /\[\[(.+)\]\]/ig;
			
		i = output.length;
		while(i--){
			output[ i ] = output[ i ].replace( clean_a, "" ).replace( clean_b, "" ).replace( clean_c, "$1" );
		}
			
		return isArray? output : output[0];
	}
	

	function type_of( object ){
	
		var type = typeof( object );
		
		if( type == 'object' ){
			if( object === null ){
				type = 'null';
				
			}else if( 'splice' in object && 'join' in object ){
				type='array';
			}
		}
		
		return type;
	};
})(window);