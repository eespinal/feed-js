Feed JS - Standalone JavaScript template engine
=======

Examples
--------------------------------------

Feeding a template with a simple JSON.

```bash
var template = "Hello {{name}}";
var data = { name: "World" };

Feed( template, data );	// "Hello World"
```

Feeding a template with a JSON array.

```bash
var template = "Hello {{name}}";
var data = [ {name:"foo"}, {name:"var"} ];

Feed( template, data, 'json' );	// "Hello World"
```

Feeding a template with a JSON header array. In this case the first element of the array is a JSON object and it's properties contain the index at which their values are on the subsequet rows.

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