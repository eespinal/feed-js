Feed JS - Standalone JavaScript template engine
=======

This utility exists because feeding a template using javascript should be "a piece of cake". You certainly don't need to be dealing with all sort of crazy sintax and place holders when there is a much simpler, straight forward and efficient aproach.

Feed JS tries it best to adhere to simplicity, while keeping things flexible and smart.

Dependencies
--------------------------------------
None :)

Utility methods
--------------------------------------

If you want to use Feed JS at string level prototype then all you need to do is call the following method (once) at the begining of your application.
```bash
Feed.set_prototype();
```

Examples
--------------------------------------

Feeding a template with a simple JSON.

```bash
var template = "Hello {{name}}";
var data = { name: 'World' };

Feed( template, data );	// "Hello World"
```

Feeding a template with a JSON array.

```bash
var template = "Hello {{name}}";
var data = [ {name:'foo'}, {name:'var'} ];

Feed( template, data, 'json' );	// ["Hello foo", "Hello var"]
```

Feeding a template with a JSON header array. In this case the first element of the array is a JSON object and its properties contain the index at which their values are on the subsequet rows.

```bash
var data = [
    { name: 0, email: 1 },
    [ 'Maria', 'maria@foo.bar' ],
    [ 'Jose', 'jose@foo.bar' ],
    [ 'Pedro', 'pedro@foo.bar' ],
    [ 'Arturo', 'arturo@foo.bar' ]
];

Feed( "{{name}}: {{email}}", data );

// ["Maria: maria@foo.bar", "Jose: jose@foo.bar", "Pedro: pedro@foo.bar", "Arturo: arturo@foo.bar"]
```