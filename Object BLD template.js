// Below is Douglas Crawford's suggestion for making a better
// constructor, which does not use the traditional this keyword,
// as he finds the this binding (to the callsite) sometimes confusing
// and therefore, misused.

// ES5 and below:

function constructor(init){
	var that =  other_constructor(init),
		member,
		method = function(){
			// init, member, method
		};
	that.method = method;
	return that;
}

// ES6 and above:

function constructor(spec){
	let {member} = spec;
	const {other} = other_constructor(spec);
	const method = function(){
		// spec, member, other, method
	};
	return Object.freeze({method, other});
}