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
index();
index();
index();

// Write a to function that takes a generator and an end
// value, and returns a generator that will produce numbers 
// up to that limit:

function to(generator, endVal){
	return function(start){
		if (next < endVal){
			var next = start;
			start += 1;
			return generator();
		}
	}
	return undefined;
}
var index = to(from(0), 3);
index();
index();
index();

