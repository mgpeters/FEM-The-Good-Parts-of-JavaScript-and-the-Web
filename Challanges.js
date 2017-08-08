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











