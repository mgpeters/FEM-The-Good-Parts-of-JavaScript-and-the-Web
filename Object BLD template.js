// Below is Douglas Crawford's suggestion for making a better
// constructor, which does not use the traditional this keyword,
// as he finds the this binding (to the callsite) sometimes confusing
// and therefore, misused.

function constructor(init){
	var that =  other_constructor(init),
		member,
		method = function(){
			// init, member, method
		};
	that.method = method;
	return that;
}