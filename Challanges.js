// Challange 1:
// Write three binary functions, add, sub, mul that take two numbers and
// return their sum, difference and product.

function add(x, y){
	return x + y;
}
function sub(x, y){
	return x - y;
}
function mul(x, y){
	return x * y;
}
add(3, 4);
sub(3, 4);
mul(3, 4);

// Write a function identityf that takes an argument and returns
// a function that returns that argument:

function identityf(arg){
	return function(){
		return arg;
	};
}
var three = identityf(3);
three();

// Write a function addf that adds from two invocations:

function addf(x){
	return function(y){
		return x + y;
	};
}
addf(3)(4);

// Write a function liftf which takes a binary function, and
// makes it callable with two invocations.

function liftf(binaryFunction){
	return function (x){
		return function(y){
			return binaryFunction(x, y)
		};
	}
}
var addf = liftf(add);
addf(3)(4);
liftf(mul)(3)(4);

// Function Challanges 2

// Write a function curry that takes a binary function
// and an argument, and returns a function that can take a 
// second argument:

function curry (fun, x){
	return function second(y){
		return fun(x, y);
	};
}
var add3 = curry(add, 3);
add3(4);

curry(mul, 5)(6);

// Without writing any new functions, show three ways to create
// the inc function:
// var inc = _ _ _;
// inc(5); 			// 6
// inc(inc(5));		// 7

var inc1 = addf(1);
var inc2 = liftf(add)(1);
var inc3 = curry(add, 1);

// Write a function twice that takes a binary function
// and returns a unary function that passes it's argument
// to the binary function twice:

function twice(binaryFunction){
	return function(first){
		return binaryFunction(first, first);
	};
}
var doubl = twice(add);
var square = twice(mul);

// Write reverse, a function which reverses the arguments of
// a binary function

function reverse(binaryFunction){
	return function(x, y){
		return binaryFunction(y, x);
	};
}
var bus = reverse(sub);
bus(3, 2)

// Write a function composeu, that takes two unary functions
// and returns a unary function that calls them both:

function composeu (firstUnary, secondUnary){
	return function (arg){
		return secondUnary(firstUnary(arg));
	};
}
composeu(doubl, square)(5);

// Write a function composeb that takes two binary functions
// and returns a function that calls them both:

function composeb(firstBinary, secondBinary){
	return function (first, second, third){
		return secondBinary(firstBinary(first, second), third)
	};
}

composeb(add, mul)(2, 3, 7); 	// 35

// Write a limit function that allows a binary function to
// be called a limited amount of times.

function limit(binaryFunction, limit){
	var round = 0;
	return function (first, second){
		if (round < limit){
			round += 1;
			return binaryFunction(first, second);
		};
	}
	return undefined;
}
var add_ltd = limit(add, 1);
add_ltd(3, 4);	// 7
add_ltd(3, 4);	// undefined

// Write a from function that produces a generator 
// that will produce a series of values:

function from(start){
	return function(){
		var next = start;
		start += 1;
		return next;
	};
}
var index = from(0);
index();	// 0
index();	// 1
index();	// 2.. etc

// Write a to function that takes a generator and an end
// value, and returns a generator that will produce numbers 
// up to that limit:

function to(generator, endVal){
	return limit(generator, endVal);
}
var index = to(from(0), 3);
index();
index();
index();

/* Teachers Solution:
	function to(gen, end){
		return function (){
			var value = gen();
			if (value < end){
			}
			return undefined;
		};
	}
*/

// Write a fromTo function that produces a generator that
// will produce values in a range:

function fromTo(begin, end){
	return to(from(begin), end);
	}
}

var index = fromTo(1, 3);
console.log(index());
console.log(index());
console.log(index());

// Write an element function that takes an array and a 
// generator and returns a generator that will produce elements
// from an array:

function element(array, generator){
	return function(){
		var index = generator();
		if (index !== undefined){
			return array[index];
		}
	};
}

var ele = element(['a','b','c','d'], fromTo(1, 3));

console.log(ele());
console.log(ele());
console.log(ele());

// Modify the element function so that the generator argument
// is optional. If a generator is not provided, then each of
// the elements of the array will be produced:

function element(array, generator){
	var start = 0;
	return function(){
		if (!generator){
			var next = start;
			start += 1;
			return array[next];
		}
		else {
			var index = generator();
			if (index !== undefined){
				return array[index];
			}
		}
	};
}

var ele = element(['a','b','c','d']);

console.log(ele());
console.log(ele());
console.log(ele());
console.log(ele());

/* Teachers solution:
	function element(array, generator){
		if (generator === undefined){
			generator = fromTo(0, array.length);
		}
		return function(){
			var index = generator();
			if (index !== undefined){
				return array[index];
			}
		}
	};
} */

// Write a collect function which takes a generator and an
// array and produces a function that will collect the results
// in the array:

function collect(generator, array){
	var start = 0;
	return function(){
		var next = start, index = generator();
		if (index !== undefined){
			array[start] = index;
			start += 1;
			return index;
		}
	};
}
var array = [], col = collect(fromTo(0, 2), array);

console.log(col());
console.log(col());
console.log(col());
console.log(array);

/* Teachers solution - Used push()!!
	function collect(generator, array){
		return function(){
			var val = generator();
			if (value !== undefined){
				array.push(value);
			}
			return value;
		};
	}
*/
// Write a filter function that takes a generator and a 
// predicate and produces a generator that produces only the 
// values approved by the predicate:

function filter(generator, predicate){
	return function(){
		var value;
		do {
			value = generator();
		}
		while (value !== undefined && !predicate(value));
		return value;
	};
}

var fil = filter(fromTo(0, 5), function third(value) {
	return (value % 3) === 0;});

console.log(fil());
console.log(fil());
console.log(fil());

// Write a concat function that takes two generators, 
// and produces a generator that combines the sequences:

function concat(generator1, generator2){
	return function (){
		var gen1 = generator1();
		if (gen1 !== undefined){
			return gen1;
		}
		else{
			var gen2 = generator2();
			return gen2;
		}
	};
}

var con = concat(fromTo(0, 3), fromTo(0, 2));

console.log(con());
console.log(con());
console.log(con());
console.log(con());
console.log(con());
console.log(con());


// Write a function gensymf that makes a function that
// generates unique symbols:

function gensymf(id){
	var start = 0;
	return function (){
		start += 1;
		return String(id + start)
	};
}
var genh = gensymf("H"), geng = gensymf("G");

console.log(geng());
console.log(genh());
console.log(geng());
console.log(genh());

// Make a function fibonaccif that returns a generator
// that will produce the next set of Fibonacci's number:

function fibonaccif(first, second){
	var round = 0, last;
	return function(){
		if (round === 0){
			round += 1;
			return first;
		}
		else if (round === 1){
			round += 1;
			return second;
		}
		else {
			last = first + second;
			first = second;
			second = last;
			return last;
		}
	};
}

var fib = fibonaccif(0, 1);
console.log(fib());		// 0
console.log(fib());		// 1
console.log(fib());		// 1
console.log(fib());		// 2
console.log(fib());		// 3
console.log(fib());		// 5

// Write a counter function that returns an obkect
// containing two funtions that implement an up/down counter
// hiding the counter:

function counter(input){;
	return {
		up: function(){
			input += 1;
			return input;
		},
		down: function(){
			input -= 1;
			return input;
		}
	}
}
var object = counter(10), up = object.up, down = object.down;

console.log(up());		// 11
console.log(down());	// 10
console.log(down());	// 9
console.log(up());		// 10

// Make a revocable function that takes a binary function, 
// and returns an object containing an invoke function that can
// invoke the finary function, and a revoke function that disables
// the invoke function:

function revocable(biFunction){
	var revoked = false;
	return {
		invoke: function(a, b){
			if (revoked === false){
				return biFunction(a, b);
			}
		},
		revoke: function(){
			revoked = true;
		}
	};
}
var rev = revocable(add), add_rev = rev.invoke;

console.log(add_rev(3,4));		// 7
rev.revoke();
console.log(add_rev(5, 7));		// undefined

// Write a function m that takes a value and an optional
// dource string and returns them in an object:

function m(value, source){
	return {
		value: value,
		source: (typeof source === 'string') ? source : String(value)
	};
}

// Write a function addm that takes two m objects and 
// returns an m object:

function addm(firstm, secondm){
	return m(firstm.value + secondm.value, "(" + firstm.source + "+" + secondm.source + ")");
}
JSON.stringify(addm(m(3), m(4)))
JSON.stringify(addm(m(1), m(Math.PI, "pi")))

// Write a function liftm that takes a binary function and
// a string and returns a function that acts on m objects:


function liftm(biFunction, str){
	return function(first, second){
			return m(biFunction(first.value, second.value), "(" + first.source + str + second.source + ")");
	}
}
var addm = liftm(add, "+");
JSON.stringify(addm(m(3), m(4)))
JSON.stringify(liftm(mul, "*")(m(3), m(4)))

// Modify the function liftm so that the functions it produces
// can accept arguments that are either numbers or m objects:

function liftm(biFunction, str){
	return function(first, second){
		if (typeof first === 'number'){
			first= m(first);
		}
		if (typeof second === 'number'){
			second = m(second);
		}
		return m(biFunction(first.value, second.value), "(" + first.source + str + second.source + ")");	
	};
}
var addm = liftm(add, "+");
JSON.stringify(addm(3, 4))

// Write a function exp that evaluates a simple array expression:

function exp (arr){
	if (Array.isArray(arr)){
		return arr[0](arr[1], arr[2]);
		}
	return arr;
}
var sea = [mul, 5, 11];
console.log(exp(sea));	// 55
console.log(exp(45));	// 45

/* Shorthand notation/teachers way:

	function exp(value){
		if(Array.isArray(value)) ? value[0](value[1], value[2]) : value;
	}
*/

// Modify exp to evaluate nested array expressions:

function exp (arr){
	if (Array.isArray(arr)){
		return arr[0](exp(arr[1]), exp(arr[2]));
		}
	return arr;
}

var nae = [Math.sqrt,[add,[square, 3],[square, 4]]];
console.log(exp(nae));

// Write a function addg that adds from many invocations,
// until it sees an empty invocation:

function addg(first){
	function more(next){
		if (next === undefined){
			return first;
		}
		first += next;
		return more;
	}
	if (first !== undefined){
		return more;
	}
}
// retursion: a function returns itself

console.log(addg());				// Undefined
console.log(addg(2)());				// 2
console.log(addg(2)(7)());			// 9
console.log(addg(3)(0)(4)());		// 7
console.log(addg(1)(2)(4)(8)());	// 15

// Write a function liftg that will take a binary function and apply
// it to many invocations:

function liftg(biFunction){
	return function(next1){
		function more(next2){
			if (next2 === undefined){
				return next1;
			}
			next1 = biFunction(next2, next1);
			return more;
		}
		if(next1 !== undefined){
			return more;
		}
	};
}

console.log(liftg(mul)());				// Undefined
console.log(liftg(mul)(3)());			// 3
console.log(liftg(mul)(3)(0)(4)());		// 0
console.log(liftg(mul)(1)(2)(4)(8)());	// 64

