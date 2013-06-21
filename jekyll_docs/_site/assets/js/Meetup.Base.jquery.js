/*!
 * jQuery JavaScript Library v1.7.1
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Mon Nov 21 21:11:03 2011 -0500
 */
(function( window, undefined ) {

var document = window.document,
	navigator = window.navigator,
	location = window.location;
var jQuery = (function() {

var jQuery = function( selector, context ) {
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	_jQuery = window.jQuery,

	_$ = window.$,

	rootjQuery,

	quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,

	rnotwhite = /\S/,

	trimLeft = /^\s+/,
	trimRight = /\s+$/,

	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,

	rvalidchars = /^[\],:{}\s]*$/,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,

	rwebkit = /(webkit)[ \/]([\w.]+)/,
	ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
	rmsie = /(msie) ([\w.]+)/,
	rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,

	rdashAlpha = /-([a-z]|[0-9])/ig,
	rmsPrefix = /^-ms-/,

	fcamelCase = function( all, letter ) {
		return ( letter + "" ).toUpperCase();
	},

	userAgent = navigator.userAgent,

	browserMatch,

	readyList,

	DOMContentLoaded,

	toString = Object.prototype.toString,
	hasOwn = Object.prototype.hasOwnProperty,
	push = Array.prototype.push,
	slice = Array.prototype.slice,
	trim = String.prototype.trim,
	indexOf = Array.prototype.indexOf,

	class2type = {};

jQuery.fn = jQuery.prototype = {
	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem, ret, doc;

		if ( !selector ) {
			return this;
		}

		if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;
		}

		if ( selector === "body" && !context && document.body ) {
			this.context = document;
			this[0] = document.body;
			this.selector = selector;
			this.length = 1;
			return this;
		}

		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				match = [ null, selector, null ];

			} else {
				match = quickExpr.exec( selector );
			}

			if ( match && (match[1] || !context) ) {

				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;
					doc = ( context ? context.ownerDocument || context : document );

					ret = rsingleTag.exec( selector );

					if ( ret ) {
						if ( jQuery.isPlainObject( context ) ) {
							selector = [ document.createElement( ret[1] ) ];
							jQuery.fn.attr.call( selector, context, true );

						} else {
							selector = [ doc.createElement( ret[1] ) ];
						}

					} else {
						ret = jQuery.buildFragment( [ match[1] ], [ doc ] );
						selector = ( ret.cacheable ? jQuery.clone(ret.fragment) : ret.fragment ).childNodes;
					}

					return jQuery.merge( this, selector );

				} else {
					elem = document.getElementById( match[2] );

					if ( elem && elem.parentNode ) {
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			} else {
				return this.constructor( context ).find( selector );
			}

		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	selector: "",

	jquery: "1.7.1",

	length: 0,

	size: function() {
		return this.length;
	},

	toArray: function() {
		return slice.call( this, 0 );
	},

	get: function( num ) {
		return num == null ?

			this.toArray() :

			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	pushStack: function( elems, name, selector ) {
		var ret = this.constructor();

		if ( jQuery.isArray( elems ) ) {
			push.apply( ret, elems );

		} else {
			jQuery.merge( ret, elems );
		}

		ret.prevObject = this;

		ret.context = this.context;

		if ( name === "find" ) {
			ret.selector = this.selector + ( this.selector ? " " : "" ) + selector;
		} else if ( name ) {
			ret.selector = this.selector + "." + name + "(" + selector + ")";
		}

		return ret;
	},

	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		jQuery.bindReady();

		readyList.add( fn );

		return this;
	},

	eq: function( i ) {
		i = +i;
		return i === -1 ?
			this.slice( i ) :
			this.slice( i, i + 1 );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ),
			"slice", slice.call(arguments).join(",") );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	push: push,
	sort: [].sort,
	splice: [].splice
};

jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		i = 2;
	}

	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		if ( (options = arguments[ i ]) != null ) {
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				if ( target === copy ) {
					continue;
				}

				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					target[ name ] = jQuery.extend( deep, clone, copy );

				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	return target;
};

jQuery.extend({
	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	isReady: false,

	readyWait: 1,

	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	ready: function( wait ) {
		if ( (wait === true && !--jQuery.readyWait) || (wait !== true && !jQuery.isReady) ) {
			if ( !document.body ) {
				return setTimeout( jQuery.ready, 1 );
			}

			jQuery.isReady = true;

			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			readyList.fireWith( document, [ jQuery ] );

			if ( jQuery.fn.trigger ) {
				jQuery( document ).trigger( "ready" ).off( "ready" );
			}
		}
	},

	bindReady: function() {
		if ( readyList ) {
			return;
		}

		readyList = jQuery.Callbacks( "once memory" );

		if ( document.readyState === "complete" ) {
			return setTimeout( jQuery.ready, 1 );
		}

		if ( document.addEventListener ) {
			document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

			window.addEventListener( "load", jQuery.ready, false );

		} else if ( document.attachEvent ) {
			document.attachEvent( "onreadystatechange", DOMContentLoaded );

			window.attachEvent( "onload", jQuery.ready );

			var toplevel = false;

			try {
				toplevel = window.frameElement == null;
			} catch(e) {}

			if ( document.documentElement.doScroll && toplevel ) {
				doScrollCheck();
			}
		}
	},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		return obj && typeof obj === "object" && "setInterval" in obj;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		return obj == null ?
			String( obj ) :
			class2type[ toString.call(obj) ] || "object";
	},

	isPlainObject: function( obj ) {
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			return false;
		}


		var key;
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		for ( var name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	parseJSON: function( data ) {
		if ( typeof data !== "string" || !data ) {
			return null;
		}

		data = jQuery.trim( data );

		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		if ( rvalidchars.test( data.replace( rvalidescape, "@" )
			.replace( rvalidtokens, "]" )
			.replace( rvalidbraces, "")) ) {

			return ( new Function( "return " + data ) )();

		}
		jQuery.error( "Invalid JSON: " + data );
	},

	parseXML: function( data ) {
		var xml, tmp;
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	globalEval: function( data ) {
		if ( data && rnotwhite.test( data ) ) {
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
	},

	each: function( object, callback, args ) {
		var name, i = 0,
			length = object.length,
			isObj = length === undefined || jQuery.isFunction( object );

		if ( args ) {
			if ( isObj ) {
				for ( name in object ) {
					if ( callback.apply( object[ name ], args ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.apply( object[ i++ ], args ) === false ) {
						break;
					}
				}
			}

		} else {
			if ( isObj ) {
				for ( name in object ) {
					if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.call( object[ i ], i, object[ i++ ] ) === false ) {
						break;
					}
				}
			}
		}

		return object;
	},

	trim: trim ?
		function( text ) {
			return text == null ?
				"" :
				trim.call( text );
		} :

		function( text ) {
			return text == null ?
				"" :
				text.toString().replace( trimLeft, "" ).replace( trimRight, "" );
		},

	makeArray: function( array, results ) {
		var ret = results || [];

		if ( array != null ) {
			var type = jQuery.type( array );

			if ( array.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow( array ) ) {
				push.call( ret, array );
			} else {
				jQuery.merge( ret, array );
			}
		}

		return ret;
	},

	inArray: function( elem, array, i ) {
		var len;

		if ( array ) {
			if ( indexOf ) {
				return indexOf.call( array, elem, i );
			}

			len = array.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				if ( i in array && array[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var i = first.length,
			j = 0;

		if ( typeof second.length === "number" ) {
			for ( var l = second.length; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}

		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var ret = [], retVal;
		inv = !!inv;

		for ( var i = 0, length = elems.length; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	map: function( elems, callback, arg ) {
		var value, key, ret = [],
			i = 0,
			length = elems.length,
			isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ( ( length > 0 && elems[ 0 ] && elems[ length -1 ] ) || length === 0 || jQuery.isArray( elems ) ) ;

		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		} else {
			for ( key in elems ) {
				value = callback( elems[ key ], key, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		return ret.concat.apply( [], ret );
	},

	guid: 1,

	proxy: function( fn, context ) {
		if ( typeof context === "string" ) {
			var tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		var args = slice.call( arguments, 2 ),
			proxy = function() {
				return fn.apply( context, args.concat( slice.call( arguments ) ) );
			};

		proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;

		return proxy;
	},

	access: function( elems, key, value, exec, fn, pass ) {
		var length = elems.length;

		if ( typeof key === "object" ) {
			for ( var k in key ) {
				jQuery.access( elems, k, key[k], exec, fn, value );
			}
			return elems;
		}

		if ( value !== undefined ) {
			exec = !pass && exec && jQuery.isFunction(value);

			for ( var i = 0; i < length; i++ ) {
				fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );
			}

			return elems;
		}

		return length ? fn( elems[0], key ) : undefined;
	},

	now: function() {
		return ( new Date() ).getTime();
	},

	uaMatch: function( ua ) {
		ua = ua.toLowerCase();

		var match = rwebkit.exec( ua ) ||
			ropera.exec( ua ) ||
			rmsie.exec( ua ) ||
			ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
			[];

		return { browser: match[1] || "", version: match[2] || "0" };
	},

	sub: function() {
		function jQuerySub( selector, context ) {
			return new jQuerySub.fn.init( selector, context );
		}
		jQuery.extend( true, jQuerySub, this );
		jQuerySub.superclass = this;
		jQuerySub.fn = jQuerySub.prototype = this();
		jQuerySub.fn.constructor = jQuerySub;
		jQuerySub.sub = this.sub;
		jQuerySub.fn.init = function init( selector, context ) {
			if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {
				context = jQuerySub( context );
			}

			return jQuery.fn.init.call( this, selector, context, rootjQuerySub );
		};
		jQuerySub.fn.init.prototype = jQuerySub.fn;
		var rootjQuerySub = jQuerySub(document);
		return jQuerySub;
	},

	browser: {}
});

jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

browserMatch = jQuery.uaMatch( userAgent );
if ( browserMatch.browser ) {
	jQuery.browser[ browserMatch.browser ] = true;
	jQuery.browser.version = browserMatch.version;
}

if ( jQuery.browser.webkit ) {
	jQuery.browser.safari = true;
}

if ( rnotwhite.test( "\xA0" ) ) {
	trimLeft = /^[\s\xA0]+/;
	trimRight = /[\s\xA0]+$/;
}

rootjQuery = jQuery(document);

if ( document.addEventListener ) {
	DOMContentLoaded = function() {
		document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
		jQuery.ready();
	};

} else if ( document.attachEvent ) {
	DOMContentLoaded = function() {
		if ( document.readyState === "complete" ) {
			document.detachEvent( "onreadystatechange", DOMContentLoaded );
			jQuery.ready();
		}
	};
}

function doScrollCheck() {
	if ( jQuery.isReady ) {
		return;
	}

	try {
		document.documentElement.doScroll("left");
	} catch(e) {
		setTimeout( doScrollCheck, 1 );
		return;
	}

	jQuery.ready();
}

return jQuery;

})();


var flagsCache = {};

function createFlags( flags ) {
	var object = flagsCache[ flags ] = {},
		i, length;
	flags = flags.split( /\s+/ );
	for ( i = 0, length = flags.length; i < length; i++ ) {
		object[ flags[i] ] = true;
	}
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	flags:	an optional list of space-separated flags that will change how
 *			the callback list behaves
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible flags:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( flags ) {

	flags = flags ? ( flagsCache[ flags ] || createFlags( flags ) ) : {};

	var // Actual callback list
		list = [],
		stack = [],
		memory,
		firing,
		firingStart,
		firingLength,
		firingIndex,
		add = function( args ) {
			var i,
				length,
				elem,
				type,
				actual;
			for ( i = 0, length = args.length; i < length; i++ ) {
				elem = args[ i ];
				type = jQuery.type( elem );
				if ( type === "array" ) {
					add( elem );
				} else if ( type === "function" ) {
					if ( !flags.unique || !self.has( elem ) ) {
						list.push( elem );
					}
				}
			}
		},
		fire = function( context, args ) {
			args = args || [];
			memory = !flags.memory || [ context, args ];
			firing = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( context, args ) === false && flags.stopOnFalse ) {
					memory = true; // Mark as halted
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( !flags.once ) {
					if ( stack && stack.length ) {
						memory = stack.shift();
						self.fireWith( memory[ 0 ], memory[ 1 ] );
					}
				} else if ( memory === true ) {
					self.disable();
				} else {
					list = [];
				}
			}
		},
		self = {
			add: function() {
				if ( list ) {
					var length = list.length;
					add( arguments );
					if ( firing ) {
						firingLength = list.length;
					} else if ( memory && memory !== true ) {
						firingStart = length;
						fire( memory[ 0 ], memory[ 1 ] );
					}
				}
				return this;
			},
			remove: function() {
				if ( list ) {
					var args = arguments,
						argIndex = 0,
						argLength = args.length;
					for ( ; argIndex < argLength ; argIndex++ ) {
						for ( var i = 0; i < list.length; i++ ) {
							if ( args[ argIndex ] === list[ i ] ) {
								if ( firing ) {
									if ( i <= firingLength ) {
										firingLength--;
										if ( i <= firingIndex ) {
											firingIndex--;
										}
									}
								}
								list.splice( i--, 1 );
								if ( flags.unique ) {
									break;
								}
							}
						}
					}
				}
				return this;
			},
			has: function( fn ) {
				if ( list ) {
					var i = 0,
						length = list.length;
					for ( ; i < length; i++ ) {
						if ( fn === list[ i ] ) {
							return true;
						}
					}
				}
				return false;
			},
			empty: function() {
				list = [];
				return this;
			},
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			disabled: function() {
				return !list;
			},
			lock: function() {
				stack = undefined;
				if ( !memory || memory === true ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !stack;
			},
			fireWith: function( context, args ) {
				if ( stack ) {
					if ( firing ) {
						if ( !flags.once ) {
							stack.push( [ context, args ] );
						}
					} else if ( !( flags.once && memory ) ) {
						fire( context, args );
					}
				}
				return this;
			},
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			fired: function() {
				return !!memory;
			}
		};

	return self;
};




var // Static reference to slice
	sliceDeferred = [].slice;

jQuery.extend({

	Deferred: function( func ) {
		var doneList = jQuery.Callbacks( "once memory" ),
			failList = jQuery.Callbacks( "once memory" ),
			progressList = jQuery.Callbacks( "memory" ),
			state = "pending",
			lists = {
				resolve: doneList,
				reject: failList,
				notify: progressList
			},
			promise = {
				done: doneList.add,
				fail: failList.add,
				progress: progressList.add,

				state: function() {
					return state;
				},

				isResolved: doneList.fired,
				isRejected: failList.fired,

				then: function( doneCallbacks, failCallbacks, progressCallbacks ) {
					deferred.done( doneCallbacks ).fail( failCallbacks ).progress( progressCallbacks );
					return this;
				},
				always: function() {
					deferred.done.apply( deferred, arguments ).fail.apply( deferred, arguments );
					return this;
				},
				pipe: function( fnDone, fnFail, fnProgress ) {
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( {
							done: [ fnDone, "resolve" ],
							fail: [ fnFail, "reject" ],
							progress: [ fnProgress, "notify" ]
						}, function( handler, data ) {
							var fn = data[ 0 ],
								action = data[ 1 ],
								returned;
							if ( jQuery.isFunction( fn ) ) {
								deferred[ handler ](function() {
									returned = fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise().then( newDefer.resolve, newDefer.reject, newDefer.notify );
									} else {
										newDefer[ action + "With" ]( this === deferred ? newDefer : this, [ returned ] );
									}
								});
							} else {
								deferred[ handler ]( newDefer[ action ] );
							}
						});
					}).promise();
				},
				promise: function( obj ) {
					if ( obj == null ) {
						obj = promise;
					} else {
						for ( var key in promise ) {
							obj[ key ] = promise[ key ];
						}
					}
					return obj;
				}
			},
			deferred = promise.promise({}),
			key;

		for ( key in lists ) {
			deferred[ key ] = lists[ key ].fire;
			deferred[ key + "With" ] = lists[ key ].fireWith;
		}

		deferred.done( function() {
			state = "resolved";
		}, failList.disable, progressList.lock ).fail( function() {
			state = "rejected";
		}, doneList.disable, progressList.lock );

		if ( func ) {
			func.call( deferred, deferred );
		}

		return deferred;
	},

	when: function( firstParam ) {
		var args = sliceDeferred.call( arguments, 0 ),
			i = 0,
			length = args.length,
			pValues = new Array( length ),
			count = length,
			pCount = length,
			deferred = length <= 1 && firstParam && jQuery.isFunction( firstParam.promise ) ?
				firstParam :
				jQuery.Deferred(),
			promise = deferred.promise();
		function resolveFunc( i ) {
			return function( value ) {
				args[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments, 0 ) : value;
				if ( !( --count ) ) {
					deferred.resolveWith( deferred, args );
				}
			};
		}
		function progressFunc( i ) {
			return function( value ) {
				pValues[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments, 0 ) : value;
				deferred.notifyWith( promise, pValues );
			};
		}
		if ( length > 1 ) {
			for ( ; i < length; i++ ) {
				if ( args[ i ] && args[ i ].promise && jQuery.isFunction( args[ i ].promise ) ) {
					args[ i ].promise().then( resolveFunc(i), deferred.reject, progressFunc(i) );
				} else {
					--count;
				}
			}
			if ( !count ) {
				deferred.resolveWith( deferred, args );
			}
		} else if ( deferred !== firstParam ) {
			deferred.resolveWith( deferred, length ? [ firstParam ] : [] );
		}
		return promise;
	}
});




jQuery.support = (function() {

	var support,
		all,
		a,
		select,
		opt,
		input,
		marginDiv,
		fragment,
		tds,
		events,
		eventName,
		i,
		isSupported,
		div = document.createElement( "div" ),
		documentElement = document.documentElement;

	div.setAttribute("className", "t");
	div.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";

	all = div.getElementsByTagName( "*" );
	a = div.getElementsByTagName( "a" )[ 0 ];

	if ( !all || !all.length || !a ) {
		return {};
	}

	select = document.createElement( "select" );
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName( "input" )[ 0 ];

	support = {
		leadingWhitespace: ( div.firstChild.nodeType === 3 ),

		tbody: !div.getElementsByTagName("tbody").length,

		htmlSerialize: !!div.getElementsByTagName("link").length,

		style: /top/.test( a.getAttribute("style") ),

		hrefNormalized: ( a.getAttribute("href") === "/a" ),

		opacity: /^0.55/.test( a.style.opacity ),

		cssFloat: !!a.style.cssFloat,

		checkOn: ( input.value === "on" ),

		optSelected: opt.selected,

		getSetAttribute: div.className !== "t",

		enctype: !!document.createElement("form").enctype,

		html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",

		submitBubbles: true,
		changeBubbles: true,
		focusinBubbles: false,
		deleteExpando: true,
		noCloneEvent: true,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableMarginRight: true
	};

	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	select.disabled = true;
	support.optDisabled = !opt.disabled;

	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	if ( !div.addEventListener && div.attachEvent && div.fireEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});
		div.cloneNode( true ).fireEvent( "onclick" );
	}

	input = document.createElement("input");
	input.value = "t";
	input.setAttribute("type", "radio");
	support.radioValue = input.value === "t";

	input.setAttribute("checked", "checked");
	div.appendChild( input );
	fragment = document.createDocumentFragment();
	fragment.appendChild( div.lastChild );

	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	support.appendChecked = input.checked;

	fragment.removeChild( input );
	fragment.appendChild( div );

	div.innerHTML = "";

	if ( window.getComputedStyle ) {
		marginDiv = document.createElement( "div" );
		marginDiv.style.width = "0";
		marginDiv.style.marginRight = "0";
		div.style.width = "2px";
		div.appendChild( marginDiv );
		support.reliableMarginRight =
			( parseInt( ( window.getComputedStyle( marginDiv, null ) || { marginRight: 0 } ).marginRight, 10 ) || 0 ) === 0;
	}

	if ( div.attachEvent ) {
		for( i in {
			submit: 1,
			change: 1,
			focusin: 1
		}) {
			eventName = "on" + i;
			isSupported = ( eventName in div );
			if ( !isSupported ) {
				div.setAttribute( eventName, "return;" );
				isSupported = ( typeof div[ eventName ] === "function" );
			}
			support[ i + "Bubbles" ] = isSupported;
		}
	}

	fragment.removeChild( div );

	fragment = select = opt = marginDiv = div = input = null;

	jQuery(function() {
		var container, outer, inner, table, td, offsetSupport,
			conMarginTop, ptlm, vb, style, html,
			body = document.getElementsByTagName("body")[0];

		if ( !body ) {
			return;
		}

		conMarginTop = 1;
		ptlm = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;";
		vb = "visibility:hidden;border:0;";
		style = "style='" + ptlm + "border:5px solid #000;padding:0;'";
		html = "<div " + style + "><div></div></div>" +
			"<table " + style + " cellpadding='0' cellspacing='0'>" +
			"<tr><td></td></tr></table>";

		container = document.createElement("div");
		container.style.cssText = vb + "width:0;height:0;position:static;top:0;margin-top:" + conMarginTop + "px";
		body.insertBefore( container, body.firstChild );

		div = document.createElement("div");
		container.appendChild( div );

		div.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";
		tds = div.getElementsByTagName( "td" );
		isSupported = ( tds[ 0 ].offsetHeight === 0 );

		tds[ 0 ].style.display = "";
		tds[ 1 ].style.display = "none";

		support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

		div.innerHTML = "";
		div.style.width = div.style.paddingLeft = "1px";
		jQuery.boxModel = support.boxModel = div.offsetWidth === 2;

		if ( typeof div.style.zoom !== "undefined" ) {
			div.style.display = "inline";
			div.style.zoom = 1;
			support.inlineBlockNeedsLayout = ( div.offsetWidth === 2 );

			div.style.display = "";
			div.innerHTML = "<div style='width:4px;'></div>";
			support.shrinkWrapBlocks = ( div.offsetWidth !== 2 );
		}

		div.style.cssText = ptlm + vb;
		div.innerHTML = html;

		outer = div.firstChild;
		inner = outer.firstChild;
		td = outer.nextSibling.firstChild.firstChild;

		offsetSupport = {
			doesNotAddBorder: ( inner.offsetTop !== 5 ),
			doesAddBorderForTableAndCells: ( td.offsetTop === 5 )
		};

		inner.style.position = "fixed";
		inner.style.top = "20px";

		offsetSupport.fixedPosition = ( inner.offsetTop === 20 || inner.offsetTop === 15 );
		inner.style.position = inner.style.top = "";

		outer.style.overflow = "hidden";
		outer.style.position = "relative";

		offsetSupport.subtractsBorderForOverflowNotVisible = ( inner.offsetTop === -5 );
		offsetSupport.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== conMarginTop );

		body.removeChild( container );
		div  = container = null;

		jQuery.extend( support, offsetSupport );
	});

	return support;
})();




var rbrace = /^(?:\{.*\}|\[.*\])$/,
	rmultiDash = /([A-Z])/g;

jQuery.extend({
	cache: {},

	uuid: 0,

	expando: "jQuery" + ( jQuery.fn.jquery + Math.random() ).replace( /\D/g, "" ),

	noData: {
		"embed": true,
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		"applet": true
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var privateCache, thisCache, ret,
			internalKey = jQuery.expando,
			getByName = typeof name === "string",

			isNode = elem.nodeType,

			cache = isNode ? jQuery.cache : elem,

			id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey,
			isEvents = name === "events";

		if ( (!id || !cache[id] || (!isEvents && !pvt && !cache[id].data)) && getByName && data === undefined ) {
			return;
		}

		if ( !id ) {
			if ( isNode ) {
				elem[ internalKey ] = id = ++jQuery.uuid;
			} else {
				id = internalKey;
			}
		}

		if ( !cache[ id ] ) {
			cache[ id ] = {};

			if ( !isNode ) {
				cache[ id ].toJSON = jQuery.noop;
			}
		}

		if ( typeof name === "object" || typeof name === "function" ) {
			if ( pvt ) {
				cache[ id ] = jQuery.extend( cache[ id ], name );
			} else {
				cache[ id ].data = jQuery.extend( cache[ id ].data, name );
			}
		}

		privateCache = thisCache = cache[ id ];

		if ( !pvt ) {
			if ( !thisCache.data ) {
				thisCache.data = {};
			}

			thisCache = thisCache.data;
		}

		if ( data !== undefined ) {
			thisCache[ jQuery.camelCase( name ) ] = data;
		}

		if ( isEvents && !thisCache[ name ] ) {
			return privateCache.events;
		}

		if ( getByName ) {

			ret = thisCache[ name ];

			if ( ret == null ) {

				ret = thisCache[ jQuery.camelCase( name ) ];
			}
		} else {
			ret = thisCache;
		}

		return ret;
	},

	removeData: function( elem, name, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var thisCache, i, l,

			internalKey = jQuery.expando,

			isNode = elem.nodeType,

			cache = isNode ? jQuery.cache : elem,

			id = isNode ? elem[ internalKey ] : internalKey;

		if ( !cache[ id ] ) {
			return;
		}

		if ( name ) {

			thisCache = pvt ? cache[ id ] : cache[ id ].data;

			if ( thisCache ) {

				if ( !jQuery.isArray( name ) ) {

					if ( name in thisCache ) {
						name = [ name ];
					} else {

						name = jQuery.camelCase( name );
						if ( name in thisCache ) {
							name = [ name ];
						} else {
							name = name.split( " " );
						}
					}
				}

				for ( i = 0, l = name.length; i < l; i++ ) {
					delete thisCache[ name[i] ];
				}

				if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
					return;
				}
			}
		}

		if ( !pvt ) {
			delete cache[ id ].data;

			if ( !isEmptyDataObject(cache[ id ]) ) {
				return;
			}
		}

		if ( jQuery.support.deleteExpando || !cache.setInterval ) {
			delete cache[ id ];
		} else {
			cache[ id ] = null;
		}

		if ( isNode ) {
			if ( jQuery.support.deleteExpando ) {
				delete elem[ internalKey ];
			} else if ( elem.removeAttribute ) {
				elem.removeAttribute( internalKey );
			} else {
				elem[ internalKey ] = null;
			}
		}
	},

	_data: function( elem, name, data ) {
		return jQuery.data( elem, name, data, true );
	},

	acceptData: function( elem ) {
		if ( elem.nodeName ) {
			var match = jQuery.noData[ elem.nodeName.toLowerCase() ];

			if ( match ) {
				return !(match === true || elem.getAttribute("classid") !== match);
			}
		}

		return true;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var parts, attr, name,
			data = null;

		if ( typeof key === "undefined" ) {
			if ( this.length ) {
				data = jQuery.data( this[0] );

				if ( this[0].nodeType === 1 && !jQuery._data( this[0], "parsedAttrs" ) ) {
					attr = this[0].attributes;
					for ( var i = 0, l = attr.length; i < l; i++ ) {
						name = attr[i].name;

						if ( name.indexOf( "data-" ) === 0 ) {
							name = jQuery.camelCase( name.substring(5) );

							dataAttr( this[0], name, data[ name ] );
						}
					}
					jQuery._data( this[0], "parsedAttrs", true );
				}
			}

			return data;

		} else if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		parts = key.split(".");
		parts[1] = parts[1] ? "." + parts[1] : "";

		if ( value === undefined ) {
			data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]);

			if ( data === undefined && this.length ) {
				data = jQuery.data( this[0], key );
				data = dataAttr( this[0], key, data );
			}

			return data === undefined && parts[1] ?
				this.data( parts[0] ) :
				data;

		} else {
			return this.each(function() {
				var self = jQuery( this ),
					args = [ parts[0], value ];

				self.triggerHandler( "setData" + parts[1] + "!", args );
				jQuery.data( this, key, value );
				self.triggerHandler( "changeData" + parts[1] + "!", args );
			});
		}
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
				data === "false" ? false :
				data === "null" ? null :
				jQuery.isNumeric( data ) ? parseFloat( data ) :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

function isEmptyDataObject( obj ) {
	for ( var name in obj ) {

		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}




function handleQueueMarkDefer( elem, type, src ) {
	var deferDataKey = type + "defer",
		queueDataKey = type + "queue",
		markDataKey = type + "mark",
		defer = jQuery._data( elem, deferDataKey );
	if ( defer &&
		( src === "queue" || !jQuery._data(elem, queueDataKey) ) &&
		( src === "mark" || !jQuery._data(elem, markDataKey) ) ) {
		setTimeout( function() {
			if ( !jQuery._data( elem, queueDataKey ) &&
				!jQuery._data( elem, markDataKey ) ) {
				jQuery.removeData( elem, deferDataKey, true );
				defer.fire();
			}
		}, 0 );
	}
}

jQuery.extend({

	_mark: function( elem, type ) {
		if ( elem ) {
			type = ( type || "fx" ) + "mark";
			jQuery._data( elem, type, (jQuery._data( elem, type ) || 0) + 1 );
		}
	},

	_unmark: function( force, elem, type ) {
		if ( force !== true ) {
			type = elem;
			elem = force;
			force = false;
		}
		if ( elem ) {
			type = type || "fx";
			var key = type + "mark",
				count = force ? 0 : ( (jQuery._data( elem, key ) || 1) - 1 );
			if ( count ) {
				jQuery._data( elem, key, count );
			} else {
				jQuery.removeData( elem, key, true );
				handleQueueMarkDefer( elem, type, "mark" );
			}
		}
	},

	queue: function( elem, type, data ) {
		var q;
		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			q = jQuery._data( elem, type );

			if ( data ) {
				if ( !q || jQuery.isArray(data) ) {
					q = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					q.push( data );
				}
			}
			return q || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			fn = queue.shift(),
			hooks = {};

		if ( fn === "inprogress" ) {
			fn = queue.shift();
		}

		if ( fn ) {
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			jQuery._data( elem, type + ".run", hooks );
			fn.call( elem, function() {
				jQuery.dequeue( elem, type );
			}, hooks );
		}

		if ( !queue.length ) {
			jQuery.removeData( elem, type + "queue " + type + ".run", true );
			handleQueueMarkDefer( elem, type, "queue" );
		}
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
		}

		if ( data === undefined ) {
			return jQuery.queue( this[0], type );
		}
		return this.each(function() {
			var queue = jQuery.queue( this, type, data );

			if ( type === "fx" && queue[0] !== "inprogress" ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	promise: function( type, object ) {
		if ( typeof type !== "string" ) {
			object = type;
			type = undefined;
		}
		type = type || "fx";
		var defer = jQuery.Deferred(),
			elements = this,
			i = elements.length,
			count = 1,
			deferDataKey = type + "defer",
			queueDataKey = type + "queue",
			markDataKey = type + "mark",
			tmp;
		function resolve() {
			if ( !( --count ) ) {
				defer.resolveWith( elements, [ elements ] );
			}
		}
		while( i-- ) {
			if (( tmp = jQuery.data( elements[ i ], deferDataKey, undefined, true ) ||
					( jQuery.data( elements[ i ], queueDataKey, undefined, true ) ||
						jQuery.data( elements[ i ], markDataKey, undefined, true ) ) &&
					jQuery.data( elements[ i ], deferDataKey, jQuery.Callbacks( "once memory" ), true ) )) {
				count++;
				tmp.add( resolve );
			}
		}
		resolve();
		return defer.promise();
	}
});




var rclass = /[\n\t\r]/g,
	rspace = /\s+/,
	rreturn = /\r/g,
	rtype = /^(?:button|input)$/i,
	rfocusable = /^(?:button|input|object|select|textarea)$/i,
	rclickable = /^a(?:rea)?$/i,
	rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
	getSetAttribute = jQuery.support.getSetAttribute,
	nodeHook, boolHook, fixSpecified;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, name, value, true, jQuery.attr );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, name, value, true, jQuery.prop );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	},

	addClass: function( value ) {
		var classNames, i, l, elem,
			setClass, c, cl;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call(this, j, this.className) );
			});
		}

		if ( value && typeof value === "string" ) {
			classNames = value.split( rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];

				if ( elem.nodeType === 1 ) {
					if ( !elem.className && classNames.length === 1 ) {
						elem.className = value;

					} else {
						setClass = " " + elem.className + " ";

						for ( c = 0, cl = classNames.length; c < cl; c++ ) {
							if ( !~setClass.indexOf( " " + classNames[ c ] + " " ) ) {
								setClass += classNames[ c ] + " ";
							}
						}
						elem.className = jQuery.trim( setClass );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classNames, i, l, elem, className, c, cl;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call(this, j, this.className) );
			});
		}

		if ( (value && typeof value === "string") || value === undefined ) {
			classNames = ( value || "" ).split( rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];

				if ( elem.nodeType === 1 && elem.className ) {
					if ( value ) {
						className = (" " + elem.className + " ").replace( rclass, " " );
						for ( c = 0, cl = classNames.length; c < cl; c++ ) {
							className = className.replace(" " + classNames[ c ] + " ", " ");
						}
						elem.className = jQuery.trim( className );

					} else {
						elem.className = "";
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				var className,
					i = 0,
					self = jQuery( this ),
					state = stateVal,
					classNames = value.split( rspace );

				while ( (className = classNames[ i++ ]) ) {
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			} else if ( type === "undefined" || type === "boolean" ) {
				if ( this.className ) {
					jQuery._data( this, "__className__", this.className );
				}

				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.nodeName.toLowerCase() ] || jQuery.valHooks[ elem.type ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					ret.replace(rreturn, "") :
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var self = jQuery(this), val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, self.val() );
			} else {
				val = value;
			}

			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.nodeName.toLowerCase() ] || jQuery.valHooks[ this.type ];

			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, i, max, option,
					index = elem.selectedIndex,
					values = [],
					options = elem.options,
					one = elem.type === "select-one";

				if ( index < 0 ) {
					return null;
				}

				i = one ? index : 0;
				max = one ? index + 1 : options.length;
				for ( ; i < max; i++ ) {
					option = options[ i ];

					if ( option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
							(!option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" )) ) {

						value = jQuery( option ).val();

						if ( one ) {
							return value;
						}

						values.push( value );
					}
				}

				if ( one && !values.length && options.length ) {
					return jQuery( options[ index ] ).val();
				}

				return values;
			},

			set: function( elem, value ) {
				var values = jQuery.makeArray( value );

				jQuery(elem).find("option").each(function() {
					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
				});

				if ( !values.length ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	attrFn: {
		val: true,
		css: true,
		html: true,
		text: true,
		data: true,
		width: true,
		height: true,
		offset: true
	},

	attr: function( elem, name, value, pass ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( pass && name in jQuery.attrFn ) {
			return jQuery( elem )[ name ]( value );
		}

		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;

			} else if ( hooks && "set" in hooks && notxml && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, "" + value );
				return value;
			}

		} else if ( hooks && "get" in hooks && notxml && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {

			ret = elem.getAttribute( name );

			return ret === null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var propName, attrNames, name, l,
			i = 0;

		if ( value && elem.nodeType === 1 ) {
			attrNames = value.toLowerCase().split( rspace );
			l = attrNames.length;

			for ( ; i < l; i++ ) {
				name = attrNames[ i ];

				if ( name ) {
					propName = jQuery.propFix[ name ] || name;

					jQuery.attr( elem, name, "" );
					elem.removeAttribute( getSetAttribute ? name : propName );

					if ( rboolean.test( name ) && propName in elem ) {
						elem[ propName ] = false;
					}
				}
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( rtype.test( elem.nodeName ) && elem.parentNode ) {
					jQuery.error( "type property can't be changed" );
				} else if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		},
		value: {
			get: function( elem, name ) {
				if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
					return nodeHook.get( elem, name );
				}
				return name in elem ?
					elem.value :
					null;
			},
			set: function( elem, value, name ) {
				if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
					return nodeHook.set( elem, value, name );
				}
				elem.value = value;
			}
		}
	},

	propFix: {
		tabindex: "tabIndex",
		readonly: "readOnly",
		"for": "htmlFor",
		"class": "className",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		cellpadding: "cellPadding",
		rowspan: "rowSpan",
		colspan: "colSpan",
		usemap: "useMap",
		frameborder: "frameBorder",
		contenteditable: "contentEditable"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				return ( elem[ name ] = value );
			}

		} else {
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				return elem[ name ];
			}
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				var attributeNode = elem.getAttributeNode("tabindex");

				return attributeNode && attributeNode.specified ?
					parseInt( attributeNode.value, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						undefined;
			}
		}
	}
});

jQuery.attrHooks.tabindex = jQuery.propHooks.tabIndex;

boolHook = {
	get: function( elem, name ) {
		var attrNode,
			property = jQuery.prop( elem, name );
		return property === true || typeof property !== "boolean" && ( attrNode = elem.getAttributeNode(name) ) && attrNode.nodeValue !== false ?
			name.toLowerCase() :
			undefined;
	},
	set: function( elem, value, name ) {
		var propName;
		if ( value === false ) {
			jQuery.removeAttr( elem, name );
		} else {
			propName = jQuery.propFix[ name ] || name;
			if ( propName in elem ) {
				elem[ propName ] = true;
			}

			elem.setAttribute( name, name.toLowerCase() );
		}
		return name;
	}
};

if ( !getSetAttribute ) {

	fixSpecified = {
		name: true,
		id: true
	};

	nodeHook = jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret;
			ret = elem.getAttributeNode( name );
			return ret && ( fixSpecified[ name ] ? ret.nodeValue !== "" : ret.specified ) ?
				ret.nodeValue :
				undefined;
		},
		set: function( elem, value, name ) {
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				ret = document.createAttribute( name );
				elem.setAttributeNode( ret );
			}
			return ( ret.nodeValue = value + "" );
		}
	};

	jQuery.attrHooks.tabindex.set = nodeHook.set;

	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		});
	});

	jQuery.attrHooks.contenteditable = {
		get: nodeHook.get,
		set: function( elem, value, name ) {
			if ( value === "" ) {
				value = "false";
			}
			nodeHook.set( elem, value, name );
		}
	};
}


if ( !jQuery.support.hrefNormalized ) {
	jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			get: function( elem ) {
				var ret = elem.getAttribute( name, 2 );
				return ret === null ? undefined : ret;
			}
		});
	});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			return elem.style.cssText.toLowerCase() || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = "" + value );
		}
	};
}

if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	});
}

if ( !jQuery.support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}

if ( !jQuery.support.checkOn ) {
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			get: function( elem ) {
				return elem.getAttribute("value") === null ? "on" : elem.value;
			}
		};
	});
}
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	});
});




var rformElems = /^(?:textarea|input|select)$/i,
	rtypenamespace = /^([^\.]*)?(?:\.(.+))?$/,
	rhoverHack = /\bhover(\.\S+)?\b/,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rquickIs = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
	quickParse = function( selector ) {
		var quick = rquickIs.exec( selector );
		if ( quick ) {
			quick[1] = ( quick[1] || "" ).toLowerCase();
			quick[3] = quick[3] && new RegExp( "(?:^|\\s)" + quick[3] + "(?:\\s|$)" );
		}
		return quick;
	},
	quickIs = function( elem, m ) {
		var attrs = elem.attributes || {};
		return (
			(!m[1] || elem.nodeName.toLowerCase() === m[1]) &&
			(!m[2] || (attrs.id || {}).value === m[2]) &&
			(!m[3] || m[3].test( (attrs[ "class" ] || {}).value ))
		);
	},
	hoverHack = function( events ) {
		return jQuery.event.special.hover ? events : events.replace( rhoverHack, "mouseenter$1 mouseleave$1" );
	};

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	add: function( elem, types, handler, data, selector ) {

		var elemData, eventHandle, events,
			t, tns, type, namespaces, handleObj,
			handleObjIn, quick, handlers, special;

		if ( elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data( elem )) ) {
			return;
		}

		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
		}

		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		events = elemData.events;
		if ( !events ) {
			elemData.events = events = {};
		}
		eventHandle = elemData.handle;
		if ( !eventHandle ) {
			elemData.handle = eventHandle = function( e ) {
				return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			eventHandle.elem = elem;
		}

		types = jQuery.trim( hoverHack(types) ).split( " " );
		for ( t = 0; t < types.length; t++ ) {

			tns = rtypenamespace.exec( types[t] ) || [];
			type = tns[1];
			namespaces = ( tns[2] || "" ).split( "." ).sort();

			special = jQuery.event.special[ type ] || {};

			type = ( selector ? special.delegateType : special.bindType ) || type;

			special = jQuery.event.special[ type ] || {};

			handleObj = jQuery.extend({
				type: type,
				origType: tns[1],
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				quick: quickParse( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			handlers = events[ type ];
			if ( !handlers ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			jQuery.event.global[ type ] = true;
		}

		elem = null;
	},

	global: {},

	remove: function( elem, types, handler, selector, mappedTypes ) {

		var elemData = jQuery.hasData( elem ) && jQuery._data( elem ),
			t, tns, type, origType, namespaces, origCount,
			j, events, special, handle, eventType, handleObj;

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		types = jQuery.trim( hoverHack( types || "" ) ).split(" ");
		for ( t = 0; t < types.length; t++ ) {
			tns = rtypenamespace.exec( types[t] ) || [];
			type = origType = tns[1];
			namespaces = tns[2];

			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector? special.delegateType : special.bindType ) || type;
			eventType = events[ type ] || [];
			origCount = eventType.length;
			namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;

			for ( j = 0; j < eventType.length; j++ ) {
				handleObj = eventType[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					 ( !handler || handler.guid === handleObj.guid ) &&
					 ( !namespaces || namespaces.test( handleObj.namespace ) ) &&
					 ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					eventType.splice( j--, 1 );

					if ( handleObj.selector ) {
						eventType.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			if ( eventType.length === 0 && origCount !== eventType.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		if ( jQuery.isEmptyObject( events ) ) {
			handle = elemData.handle;
			if ( handle ) {
				handle.elem = null;
			}

			jQuery.removeData( elem, [ "events", "handle" ], true );
		}
	},

	customEvent: {
		"getData": true,
		"setData": true,
		"changeData": true
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		if ( elem && (elem.nodeType === 3 || elem.nodeType === 8) ) {
			return;
		}

		var type = event.type || event,
			namespaces = [],
			cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType;

		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "!" ) >= 0 ) {
			type = type.slice(0, -1);
			exclusive = true;
		}

		if ( type.indexOf( "." ) >= 0 ) {
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}

		if ( (!elem || jQuery.event.customEvent[ type ]) && !jQuery.event.global[ type ] ) {
			return;
		}

		event = typeof event === "object" ?
			event[ jQuery.expando ] ? event :
			new jQuery.Event( type, event ) :
			new jQuery.Event( type );

		event.type = type;
		event.isTrigger = true;
		event.exclusive = exclusive;
		event.namespace = namespaces.join( "." );
		event.namespace_re = event.namespace? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
		ontype = type.indexOf( ":" ) < 0 ? "on" + type : "";

		if ( !elem ) {

			cache = jQuery.cache;
			for ( i in cache ) {
				if ( cache[ i ].events && cache[ i ].events[ type ] ) {
					jQuery.event.trigger( event, data, cache[ i ].handle.elem, true );
				}
			}
			return;
		}

		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		data = data != null ? jQuery.makeArray( data ) : [];
		data.unshift( event );

		special = jQuery.event.special[ type ] || {};
		if ( special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		eventPath = [[ elem, special.bindType || type ]];
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			cur = rfocusMorph.test( bubbleType + type ) ? elem : elem.parentNode;
			old = null;
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push([ cur, bubbleType ]);
				old = cur;
			}

			if ( old && old === elem.ownerDocument ) {
				eventPath.push([ old.defaultView || old.parentWindow || window, bubbleType ]);
			}
		}

		for ( i = 0; i < eventPath.length && !event.isPropagationStopped(); i++ ) {

			cur = eventPath[i][0];
			event.type = eventPath[i][1];

			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
				!(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

				if ( ontype && elem[ type ] && ((type !== "focus" && type !== "blur") || event.target.offsetWidth !== 0) && !jQuery.isWindow( elem ) ) {

					old = elem[ ontype ];

					if ( old ) {
						elem[ ontype ] = null;
					}

					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( old ) {
						elem[ ontype ] = old;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		event = jQuery.event.fix( event || window.event );

		var handlers = ( (jQuery._data( this, "events" ) || {} )[ event.type ] || []),
			delegateCount = handlers.delegateCount,
			args = [].slice.call( arguments, 0 ),
			run_all = !event.exclusive && !event.namespace,
			handlerQueue = [],
			i, j, cur, jqcur, ret, selMatch, matched, matches, handleObj, sel, related;

		args[0] = event;
		event.delegateTarget = this;

		if ( delegateCount && !event.target.disabled && !(event.button && event.type === "click") ) {

			jqcur = jQuery(this);
			jqcur.context = this.ownerDocument || this;

			for ( cur = event.target; cur != this; cur = cur.parentNode || this ) {
				selMatch = {};
				matches = [];
				jqcur[0] = cur;
				for ( i = 0; i < delegateCount; i++ ) {
					handleObj = handlers[ i ];
					sel = handleObj.selector;

					if ( selMatch[ sel ] === undefined ) {
						selMatch[ sel ] = (
							handleObj.quick ? quickIs( cur, handleObj.quick ) : jqcur.is( sel )
						);
					}
					if ( selMatch[ sel ] ) {
						matches.push( handleObj );
					}
				}
				if ( matches.length ) {
					handlerQueue.push({ elem: cur, matches: matches });
				}
			}
		}

		if ( handlers.length > delegateCount ) {
			handlerQueue.push({ elem: this, matches: handlers.slice( delegateCount ) });
		}

		for ( i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++ ) {
			matched = handlerQueue[ i ];
			event.currentTarget = matched.elem;

			for ( j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++ ) {
				handleObj = matched.matches[ j ];

				if ( run_all || (!event.namespace && !handleObj.namespace) || event.namespace_re && event.namespace_re.test( handleObj.namespace ) ) {

					event.data = handleObj.data;
					event.handleObj = handleObj;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						event.result = ret;
						if ( ret === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		return event.result;
	},

	props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button,
				fromElement = original.fromElement;

			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		var i, prop,
			originalEvent = event,
			fixHook = jQuery.event.fixHooks[ event.type ] || {},
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = jQuery.Event( originalEvent );

		for ( i = copy.length; i; ) {
			prop = copy[ --i ];
			event[ prop ] = originalEvent[ prop ];
		}

		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		if ( event.metaKey === undefined ) {
			event.metaKey = event.ctrlKey;
		}

		return fixHook.filter? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		ready: {
			setup: jQuery.bindReady
		},

		load: {
			noBubble: true
		},

		focus: {
			delegateType: "focusin"
		},
		blur: {
			delegateType: "focusout"
		},

		beforeunload: {
			setup: function( data, namespaces, eventHandle ) {
				if ( jQuery.isWindow( this ) ) {
					this.onbeforeunload = eventHandle;
				}
			},

			teardown: function( namespaces, eventHandle ) {
				if ( this.onbeforeunload === eventHandle ) {
					this.onbeforeunload = null;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{ type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.event.handle = jQuery.event.dispatch;

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		if ( elem.detachEvent ) {
			elem.detachEvent( "on" + type, handle );
		}
	};

jQuery.Event = function( src, props ) {
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	} else {
		this.type = src;
	}

	if ( props ) {
		jQuery.extend( this, props );
	}

	this.timeStamp = src && src.timeStamp || jQuery.now();

	this[ jQuery.expando ] = true;
};

function returnFalse() {
	return false;
}
function returnTrue() {
	return true;
}

jQuery.Event.prototype = {
	preventDefault: function() {
		this.isDefaultPrevented = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}

		if ( e.preventDefault ) {
			e.preventDefault();

		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		this.isPropagationStopped = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	},
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse
};

jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj,
				selector = handleObj.selector,
				ret;

			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !form._submit_attached ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						if ( this.parentNode && !event.isTrigger ) {
							jQuery.event.simulate( "submit", this.parentNode, event, true );
						}
					});
					form._submit_attached = true;
				}
			});
		},

		teardown: function() {
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			jQuery.event.remove( this, "._submit" );
		}
	};
}

if ( !jQuery.support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
							jQuery.event.simulate( "change", this, event, true );
						}
					});
				}
				return false;
			}
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !elem._change_attached ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					elem._change_attached = true;
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return rformElems.test( this.nodeName );
		}
	};
}

if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		if ( typeof types === "object" ) {
			if ( typeof selector !== "string" ) {
				data = selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				fn = data;
				data = undefined;
			} else {
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on.call( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		if ( types && types.preventDefault && types.handleObj ) {
			var handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace? handleObj.type + "." + handleObj.namespace : handleObj.type,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			for ( var type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	live: function( types, data, fn ) {
		jQuery( this.context ).on( types, this.selector, data, fn );
		return this;
	},
	die: function( types, fn ) {
		jQuery( this.context ).off( types, this.selector || "**", fn );
		return this;
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		return arguments.length == 1? this.off( selector, "**" ) : this.off( types, selector, fn );
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		if ( this[0] ) {
			return jQuery.event.trigger( type, data, this[0], true );
		}
	},

	toggle: function( fn ) {
		var args = arguments,
			guid = fn.guid || jQuery.guid++,
			i = 0,
			toggler = function( event ) {
				var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
				jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );

				event.preventDefault();

				return args[ lastToggle ].apply( this, arguments ) || false;
			};

		toggler.guid = guid;
		while ( i < args.length ) {
			args[ i++ ].guid = guid;
		}

		return this.click( toggler );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
});

jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	jQuery.fn[ name ] = function( data, fn ) {
		if ( fn == null ) {
			fn = data;
			data = null;
		}

		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};

	if ( jQuery.attrFn ) {
		jQuery.attrFn[ name ] = true;
	}

	if ( rkeyEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.keyHooks;
	}

	if ( rmouseEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.mouseHooks;
	}
});



/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2011, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){

var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
	expando = "sizcache" + (Math.random() + '').replace('.', ''),
	done = 0,
	toString = Object.prototype.toString,
	hasDuplicate = false,
	baseHasDuplicate = true,
	rBackslash = /\\/g,
	rReturn = /\r\n/g,
	rNonWord = /\W/;

[0, 0].sort(function() {
	baseHasDuplicate = false;
	return 0;
});

var Sizzle = function( selector, context, results, seed ) {
	results = results || [];
	context = context || document;

	var origContext = context;

	if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
		return [];
	}

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	var m, set, checkSet, extra, ret, cur, pop, i,
		prune = true,
		contextXML = Sizzle.isXML( context ),
		parts = [],
		soFar = selector;

	do {
		chunker.exec( "" );
		m = chunker.exec( soFar );

		if ( m ) {
			soFar = m[3];

			parts.push( m[1] );

			if ( m[2] ) {
				extra = m[3];
				break;
			}
		}
	} while ( m );

	if ( parts.length > 1 && origPOS.exec( selector ) ) {

		if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
			set = posProcess( parts[0] + parts[1], context, seed );

		} else {
			set = Expr.relative[ parts[0] ] ?
				[ context ] :
				Sizzle( parts.shift(), context );

			while ( parts.length ) {
				selector = parts.shift();

				if ( Expr.relative[ selector ] ) {
					selector += parts.shift();
				}

				set = posProcess( selector, set, seed );
			}
		}

	} else {
		if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
				Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {

			ret = Sizzle.find( parts.shift(), context, contextXML );
			context = ret.expr ?
				Sizzle.filter( ret.expr, ret.set )[0] :
				ret.set[0];
		}

		if ( context ) {
			ret = seed ?
				{ expr: parts.pop(), set: makeArray(seed) } :
				Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );

			set = ret.expr ?
				Sizzle.filter( ret.expr, ret.set ) :
				ret.set;

			if ( parts.length > 0 ) {
				checkSet = makeArray( set );

			} else {
				prune = false;
			}

			while ( parts.length ) {
				cur = parts.pop();
				pop = cur;

				if ( !Expr.relative[ cur ] ) {
					cur = "";
				} else {
					pop = parts.pop();
				}

				if ( pop == null ) {
					pop = context;
				}

				Expr.relative[ cur ]( checkSet, pop, contextXML );
			}

		} else {
			checkSet = parts = [];
		}
	}

	if ( !checkSet ) {
		checkSet = set;
	}

	if ( !checkSet ) {
		Sizzle.error( cur || selector );
	}

	if ( toString.call(checkSet) === "[object Array]" ) {
		if ( !prune ) {
			results.push.apply( results, checkSet );

		} else if ( context && context.nodeType === 1 ) {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i])) ) {
					results.push( set[i] );
				}
			}

		} else {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
					results.push( set[i] );
				}
			}
		}

	} else {
		makeArray( checkSet, results );
	}

	if ( extra ) {
		Sizzle( extra, origContext, results, seed );
		Sizzle.uniqueSort( results );
	}

	return results;
};

Sizzle.uniqueSort = function( results ) {
	if ( sortOrder ) {
		hasDuplicate = baseHasDuplicate;
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			for ( var i = 1; i < results.length; i++ ) {
				if ( results[i] === results[ i - 1 ] ) {
					results.splice( i--, 1 );
				}
			}
		}
	}

	return results;
};

Sizzle.matches = function( expr, set ) {
	return Sizzle( expr, null, null, set );
};

Sizzle.matchesSelector = function( node, expr ) {
	return Sizzle( expr, null, null, [node] ).length > 0;
};

Sizzle.find = function( expr, context, isXML ) {
	var set, i, len, match, type, left;

	if ( !expr ) {
		return [];
	}

	for ( i = 0, len = Expr.order.length; i < len; i++ ) {
		type = Expr.order[i];

		if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {
			left = match[1];
			match.splice( 1, 1 );

			if ( left.substr( left.length - 1 ) !== "\\" ) {
				match[1] = (match[1] || "").replace( rBackslash, "" );
				set = Expr.find[ type ]( match, context, isXML );

				if ( set != null ) {
					expr = expr.replace( Expr.match[ type ], "" );
					break;
				}
			}
		}
	}

	if ( !set ) {
		set = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( "*" ) :
			[];
	}

	return { set: set, expr: expr };
};

Sizzle.filter = function( expr, set, inplace, not ) {
	var match, anyFound,
		type, found, item, filter, left,
		i, pass,
		old = expr,
		result = [],
		curLoop = set,
		isXMLFilter = set && set[0] && Sizzle.isXML( set[0] );

	while ( expr && set.length ) {
		for ( type in Expr.filter ) {
			if ( (match = Expr.leftMatch[ type ].exec( expr )) != null && match[2] ) {
				filter = Expr.filter[ type ];
				left = match[1];

				anyFound = false;

				match.splice(1,1);

				if ( left.substr( left.length - 1 ) === "\\" ) {
					continue;
				}

				if ( curLoop === result ) {
					result = [];
				}

				if ( Expr.preFilter[ type ] ) {
					match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

					if ( !match ) {
						anyFound = found = true;

					} else if ( match === true ) {
						continue;
					}
				}

				if ( match ) {
					for ( i = 0; (item = curLoop[i]) != null; i++ ) {
						if ( item ) {
							found = filter( item, match, i, curLoop );
							pass = not ^ found;

							if ( inplace && found != null ) {
								if ( pass ) {
									anyFound = true;

								} else {
									curLoop[i] = false;
								}

							} else if ( pass ) {
								result.push( item );
								anyFound = true;
							}
						}
					}
				}

				if ( found !== undefined ) {
					if ( !inplace ) {
						curLoop = result;
					}

					expr = expr.replace( Expr.match[ type ], "" );

					if ( !anyFound ) {
						return [];
					}

					break;
				}
			}
		}

		if ( expr === old ) {
			if ( anyFound == null ) {
				Sizzle.error( expr );

			} else {
				break;
			}
		}

		old = expr;
	}

	return curLoop;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Utility function for retreiving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
var getText = Sizzle.getText = function( elem ) {
    var i, node,
		nodeType = elem.nodeType,
		ret = "";

	if ( nodeType ) {
		if ( nodeType === 1 || nodeType === 9 ) {
			if ( typeof elem.textContent === 'string' ) {
				return elem.textContent;
			} else if ( typeof elem.innerText === 'string' ) {
				return elem.innerText.replace( rReturn, '' );
			} else {
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
	} else {

		for ( i = 0; (node = elem[i]); i++ ) {
			if ( node.nodeType !== 8 ) {
				ret += getText( node );
			}
		}
	}
	return ret;
};

var Expr = Sizzle.selectors = {
	order: [ "ID", "NAME", "TAG" ],

	match: {
		ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
		ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
		TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
		CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
		POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
		PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
	},

	leftMatch: {},

	attrMap: {
		"class": "className",
		"for": "htmlFor"
	},

	attrHandle: {
		href: function( elem ) {
			return elem.getAttribute( "href" );
		},
		type: function( elem ) {
			return elem.getAttribute( "type" );
		}
	},

	relative: {
		"+": function(checkSet, part){
			var isPartStr = typeof part === "string",
				isTag = isPartStr && !rNonWord.test( part ),
				isPartStrNotTag = isPartStr && !isTag;

			if ( isTag ) {
				part = part.toLowerCase();
			}

			for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
				if ( (elem = checkSet[i]) ) {
					while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

					checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?
						elem || false :
						elem === part;
				}
			}

			if ( isPartStrNotTag ) {
				Sizzle.filter( part, checkSet, true );
			}
		},

		">": function( checkSet, part ) {
			var elem,
				isPartStr = typeof part === "string",
				i = 0,
				l = checkSet.length;

			if ( isPartStr && !rNonWord.test( part ) ) {
				part = part.toLowerCase();

				for ( ; i < l; i++ ) {
					elem = checkSet[i];

					if ( elem ) {
						var parent = elem.parentNode;
						checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
					}
				}

			} else {
				for ( ; i < l; i++ ) {
					elem = checkSet[i];

					if ( elem ) {
						checkSet[i] = isPartStr ?
							elem.parentNode :
							elem.parentNode === part;
					}
				}

				if ( isPartStr ) {
					Sizzle.filter( part, checkSet, true );
				}
			}
		},

		"": function(checkSet, part, isXML){
			var nodeCheck,
				doneName = done++,
				checkFn = dirCheck;

			if ( typeof part === "string" && !rNonWord.test( part ) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn( "parentNode", part, doneName, checkSet, nodeCheck, isXML );
		},

		"~": function( checkSet, part, isXML ) {
			var nodeCheck,
				doneName = done++,
				checkFn = dirCheck;

			if ( typeof part === "string" && !rNonWord.test( part ) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn( "previousSibling", part, doneName, checkSet, nodeCheck, isXML );
		}
	},

	find: {
		ID: function( match, context, isXML ) {
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				return m && m.parentNode ? [m] : [];
			}
		},

		NAME: function( match, context ) {
			if ( typeof context.getElementsByName !== "undefined" ) {
				var ret = [],
					results = context.getElementsByName( match[1] );

				for ( var i = 0, l = results.length; i < l; i++ ) {
					if ( results[i].getAttribute("name") === match[1] ) {
						ret.push( results[i] );
					}
				}

				return ret.length === 0 ? null : ret;
			}
		},

		TAG: function( match, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( match[1] );
			}
		}
	},
	preFilter: {
		CLASS: function( match, curLoop, inplace, result, not, isXML ) {
			match = " " + match[1].replace( rBackslash, "" ) + " ";

			if ( isXML ) {
				return match;
			}

			for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
				if ( elem ) {
					if ( not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n\r]/g, " ").indexOf(match) >= 0) ) {
						if ( !inplace ) {
							result.push( elem );
						}

					} else if ( inplace ) {
						curLoop[i] = false;
					}
				}
			}

			return false;
		},

		ID: function( match ) {
			return match[1].replace( rBackslash, "" );
		},

		TAG: function( match, curLoop ) {
			return match[1].replace( rBackslash, "" ).toLowerCase();
		},

		CHILD: function( match ) {
			if ( match[1] === "nth" ) {
				if ( !match[2] ) {
					Sizzle.error( match[0] );
				}

				match[2] = match[2].replace(/^\+|\s*/g, '');

				var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(
					match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
					!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

				match[2] = (test[1] + (test[2] || 1)) - 0;
				match[3] = test[3] - 0;
			}
			else if ( match[2] ) {
				Sizzle.error( match[0] );
			}

			match[0] = done++;

			return match;
		},

		ATTR: function( match, curLoop, inplace, result, not, isXML ) {
			var name = match[1] = match[1].replace( rBackslash, "" );

			if ( !isXML && Expr.attrMap[name] ) {
				match[1] = Expr.attrMap[name];
			}

			match[4] = ( match[4] || match[5] || "" ).replace( rBackslash, "" );

			if ( match[2] === "~=" ) {
				match[4] = " " + match[4] + " ";
			}

			return match;
		},

		PSEUDO: function( match, curLoop, inplace, result, not ) {
			if ( match[1] === "not" ) {
				if ( ( chunker.exec(match[3]) || "" ).length > 1 || /^\w/.test(match[3]) ) {
					match[3] = Sizzle(match[3], null, null, curLoop);

				} else {
					var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);

					if ( !inplace ) {
						result.push.apply( result, ret );
					}

					return false;
				}

			} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
				return true;
			}

			return match;
		},

		POS: function( match ) {
			match.unshift( true );

			return match;
		}
	},

	filters: {
		enabled: function( elem ) {
			return elem.disabled === false && elem.type !== "hidden";
		},

		disabled: function( elem ) {
			return elem.disabled === true;
		},

		checked: function( elem ) {
			return elem.checked === true;
		},

		selected: function( elem ) {
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		parent: function( elem ) {
			return !!elem.firstChild;
		},

		empty: function( elem ) {
			return !elem.firstChild;
		},

		has: function( elem, i, match ) {
			return !!Sizzle( match[3], elem ).length;
		},

		header: function( elem ) {
			return (/h\d/i).test( elem.nodeName );
		},

		text: function( elem ) {
			var attr = elem.getAttribute( "type" ), type = elem.type;
			return elem.nodeName.toLowerCase() === "input" && "text" === type && ( attr === type || attr === null );
		},

		radio: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "radio" === elem.type;
		},

		checkbox: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "checkbox" === elem.type;
		},

		file: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "file" === elem.type;
		},

		password: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "password" === elem.type;
		},

		submit: function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && "submit" === elem.type;
		},

		image: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "image" === elem.type;
		},

		reset: function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && "reset" === elem.type;
		},

		button: function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && "button" === elem.type || name === "button";
		},

		input: function( elem ) {
			return (/input|select|textarea|button/i).test( elem.nodeName );
		},

		focus: function( elem ) {
			return elem === elem.ownerDocument.activeElement;
		}
	},
	setFilters: {
		first: function( elem, i ) {
			return i === 0;
		},

		last: function( elem, i, match, array ) {
			return i === array.length - 1;
		},

		even: function( elem, i ) {
			return i % 2 === 0;
		},

		odd: function( elem, i ) {
			return i % 2 === 1;
		},

		lt: function( elem, i, match ) {
			return i < match[3] - 0;
		},

		gt: function( elem, i, match ) {
			return i > match[3] - 0;
		},

		nth: function( elem, i, match ) {
			return match[3] - 0 === i;
		},

		eq: function( elem, i, match ) {
			return match[3] - 0 === i;
		}
	},
	filter: {
		PSEUDO: function( elem, match, i, array ) {
			var name = match[1],
				filter = Expr.filters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );

			} else if ( name === "contains" ) {
				return (elem.textContent || elem.innerText || getText([ elem ]) || "").indexOf(match[3]) >= 0;

			} else if ( name === "not" ) {
				var not = match[3];

				for ( var j = 0, l = not.length; j < l; j++ ) {
					if ( not[j] === elem ) {
						return false;
					}
				}

				return true;

			} else {
				Sizzle.error( name );
			}
		},

		CHILD: function( elem, match ) {
			var first, last,
				doneName, parent, cache,
				count, diff,
				type = match[1],
				node = elem;

			switch ( type ) {
				case "only":
				case "first":
					while ( (node = node.previousSibling) )	 {
						if ( node.nodeType === 1 ) {
							return false;
						}
					}

					if ( type === "first" ) {
						return true;
					}

					node = elem;

				case "last":
					while ( (node = node.nextSibling) )	 {
						if ( node.nodeType === 1 ) {
							return false;
						}
					}

					return true;

				case "nth":
					first = match[2];
					last = match[3];

					if ( first === 1 && last === 0 ) {
						return true;
					}

					doneName = match[0];
					parent = elem.parentNode;

					if ( parent && (parent[ expando ] !== doneName || !elem.nodeIndex) ) {
						count = 0;

						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.nodeIndex = ++count;
							}
						}

						parent[ expando ] = doneName;
					}

					diff = elem.nodeIndex - last;

					if ( first === 0 ) {
						return diff === 0;

					} else {
						return ( diff % first === 0 && diff / first >= 0 );
					}
			}
		},

		ID: function( elem, match ) {
			return elem.nodeType === 1 && elem.getAttribute("id") === match;
		},

		TAG: function( elem, match ) {
			return (match === "*" && elem.nodeType === 1) || !!elem.nodeName && elem.nodeName.toLowerCase() === match;
		},

		CLASS: function( elem, match ) {
			return (" " + (elem.className || elem.getAttribute("class")) + " ")
				.indexOf( match ) > -1;
		},

		ATTR: function( elem, match ) {
			var name = match[1],
				result = Sizzle.attr ?
					Sizzle.attr( elem, name ) :
					Expr.attrHandle[ name ] ?
					Expr.attrHandle[ name ]( elem ) :
					elem[ name ] != null ?
						elem[ name ] :
						elem.getAttribute( name ),
				value = result + "",
				type = match[2],
				check = match[4];

			return result == null ?
				type === "!=" :
				!type && Sizzle.attr ?
				result != null :
				type === "=" ?
				value === check :
				type === "*=" ?
				value.indexOf(check) >= 0 :
				type === "~=" ?
				(" " + value + " ").indexOf(check) >= 0 :
				!check ?
				value && result !== false :
				type === "!=" ?
				value !== check :
				type === "^=" ?
				value.indexOf(check) === 0 :
				type === "$=" ?
				value.substr(value.length - check.length) === check :
				type === "|=" ?
				value === check || value.substr(0, check.length + 1) === check + "-" :
				false;
		},

		POS: function( elem, match, i, array ) {
			var name = match[2],
				filter = Expr.setFilters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			}
		}
	}
};

var origPOS = Expr.match.POS,
	fescape = function(all, num){
		return "\\" + (num - 0 + 1);
	};

for ( var type in Expr.match ) {
	Expr.match[ type ] = new RegExp( Expr.match[ type ].source + (/(?![^\[]*\])(?![^\(]*\))/.source) );
	Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\r|\n)*?)/.source + Expr.match[ type ].source.replace(/\\(\d+)/g, fescape) );
}

var makeArray = function( array, results ) {
	array = Array.prototype.slice.call( array, 0 );

	if ( results ) {
		results.push.apply( results, array );
		return results;
	}

	return array;
};

try {
	Array.prototype.slice.call( document.documentElement.childNodes, 0 )[0].nodeType;

} catch( e ) {
	makeArray = function( array, results ) {
		var i = 0,
			ret = results || [];

		if ( toString.call(array) === "[object Array]" ) {
			Array.prototype.push.apply( ret, array );

		} else {
			if ( typeof array.length === "number" ) {
				for ( var l = array.length; i < l; i++ ) {
					ret.push( array[i] );
				}

			} else {
				for ( ; array[i]; i++ ) {
					ret.push( array[i] );
				}
			}
		}

		return ret;
	};
}

var sortOrder, siblingCheck;

if ( document.documentElement.compareDocumentPosition ) {
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
			return a.compareDocumentPosition ? -1 : 1;
		}

		return a.compareDocumentPosition(b) & 4 ? -1 : 1;
	};

} else {
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		} else if ( a.sourceIndex && b.sourceIndex ) {
			return a.sourceIndex - b.sourceIndex;
		}

		var al, bl,
			ap = [],
			bp = [],
			aup = a.parentNode,
			bup = b.parentNode,
			cur = aup;

		if ( aup === bup ) {
			return siblingCheck( a, b );

		} else if ( !aup ) {
			return -1;

		} else if ( !bup ) {
			return 1;
		}

		while ( cur ) {
			ap.unshift( cur );
			cur = cur.parentNode;
		}

		cur = bup;

		while ( cur ) {
			bp.unshift( cur );
			cur = cur.parentNode;
		}

		al = ap.length;
		bl = bp.length;

		for ( var i = 0; i < al && i < bl; i++ ) {
			if ( ap[i] !== bp[i] ) {
				return siblingCheck( ap[i], bp[i] );
			}
		}

		return i === al ?
			siblingCheck( a, bp[i], -1 ) :
			siblingCheck( ap[i], b, 1 );
	};

	siblingCheck = function( a, b, ret ) {
		if ( a === b ) {
			return ret;
		}

		var cur = a.nextSibling;

		while ( cur ) {
			if ( cur === b ) {
				return -1;
			}

			cur = cur.nextSibling;
		}

		return 1;
	};
}

(function(){
	var form = document.createElement("div"),
		id = "script" + (new Date()).getTime(),
		root = document.documentElement;

	form.innerHTML = "<a name='" + id + "'/>";

	root.insertBefore( form, root.firstChild );

	if ( document.getElementById( id ) ) {
		Expr.find.ID = function( match, context, isXML ) {
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);

				return m ?
					m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ?
						[m] :
						undefined :
					[];
			}
		};

		Expr.filter.ID = function( elem, match ) {
			var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");

			return elem.nodeType === 1 && node && node.nodeValue === match;
		};
	}

	root.removeChild( form );

	root = form = null;
})();

(function(){

	var div = document.createElement("div");
	div.appendChild( document.createComment("") );

	if ( div.getElementsByTagName("*").length > 0 ) {
		Expr.find.TAG = function( match, context ) {
			var results = context.getElementsByTagName( match[1] );

			if ( match[1] === "*" ) {
				var tmp = [];

				for ( var i = 0; results[i]; i++ ) {
					if ( results[i].nodeType === 1 ) {
						tmp.push( results[i] );
					}
				}

				results = tmp;
			}

			return results;
		};
	}

	div.innerHTML = "<a href='#'></a>";

	if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
			div.firstChild.getAttribute("href") !== "#" ) {

		Expr.attrHandle.href = function( elem ) {
			return elem.getAttribute( "href", 2 );
		};
	}

	div = null;
})();

if ( document.querySelectorAll ) {
	(function(){
		var oldSizzle = Sizzle,
			div = document.createElement("div"),
			id = "__sizzle__";

		div.innerHTML = "<p class='TEST'></p>";

		if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
			return;
		}

		Sizzle = function( query, context, extra, seed ) {
			context = context || document;

			if ( !seed && !Sizzle.isXML(context) ) {
				var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec( query );

				if ( match && (context.nodeType === 1 || context.nodeType === 9) ) {
					if ( match[1] ) {
						return makeArray( context.getElementsByTagName( query ), extra );

					} else if ( match[2] && Expr.find.CLASS && context.getElementsByClassName ) {
						return makeArray( context.getElementsByClassName( match[2] ), extra );
					}
				}

				if ( context.nodeType === 9 ) {
					if ( query === "body" && context.body ) {
						return makeArray( [ context.body ], extra );

					} else if ( match && match[3] ) {
						var elem = context.getElementById( match[3] );

						if ( elem && elem.parentNode ) {
							if ( elem.id === match[3] ) {
								return makeArray( [ elem ], extra );
							}

						} else {
							return makeArray( [], extra );
						}
					}

					try {
						return makeArray( context.querySelectorAll(query), extra );
					} catch(qsaError) {}

				} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					var oldContext = context,
						old = context.getAttribute( "id" ),
						nid = old || id,
						hasParent = context.parentNode,
						relativeHierarchySelector = /^\s*[+~]/.test( query );

					if ( !old ) {
						context.setAttribute( "id", nid );
					} else {
						nid = nid.replace( /'/g, "\\$&" );
					}
					if ( relativeHierarchySelector && hasParent ) {
						context = context.parentNode;
					}

					try {
						if ( !relativeHierarchySelector || hasParent ) {
							return makeArray( context.querySelectorAll( "[id='" + nid + "'] " + query ), extra );
						}

					} catch(pseudoError) {
					} finally {
						if ( !old ) {
							oldContext.removeAttribute( "id" );
						}
					}
				}
			}

			return oldSizzle(query, context, extra, seed);
		};

		for ( var prop in oldSizzle ) {
			Sizzle[ prop ] = oldSizzle[ prop ];
		}

		div = null;
	})();
}

(function(){
	var html = document.documentElement,
		matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector;

	if ( matches ) {
		var disconnectedMatch = !matches.call( document.createElement( "div" ), "div" ),
			pseudoWorks = false;

		try {
			matches.call( document.documentElement, "[test!='']:sizzle" );

		} catch( pseudoError ) {
			pseudoWorks = true;
		}

		Sizzle.matchesSelector = function( node, expr ) {
			expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");

			if ( !Sizzle.isXML( node ) ) {
				try {
					if ( pseudoWorks || !Expr.match.PSEUDO.test( expr ) && !/!=/.test( expr ) ) {
						var ret = matches.call( node, expr );

						if ( ret || !disconnectedMatch ||
								node.document && node.document.nodeType !== 11 ) {
							return ret;
						}
					}
				} catch(e) {}
			}

			return Sizzle(expr, null, null, [node]).length > 0;
		};
	}
})();

(function(){
	var div = document.createElement("div");

	div.innerHTML = "<div class='test e'></div><div class='test'></div>";

	if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
		return;
	}

	div.lastChild.className = "e";

	if ( div.getElementsByClassName("e").length === 1 ) {
		return;
	}

	Expr.order.splice(1, 0, "CLASS");
	Expr.find.CLASS = function( match, context, isXML ) {
		if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
			return context.getElementsByClassName(match[1]);
		}
	};

	div = null;
})();

function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];

		if ( elem ) {
			var match = false;

			elem = elem[dir];

			while ( elem ) {
				if ( elem[ expando ] === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 && !isXML ){
					elem[ expando ] = doneName;
					elem.sizset = i;
				}

				if ( elem.nodeName.toLowerCase() === cur ) {
					match = elem;
					break;
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];

		if ( elem ) {
			var match = false;

			elem = elem[dir];

			while ( elem ) {
				if ( elem[ expando ] === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 ) {
					if ( !isXML ) {
						elem[ expando ] = doneName;
						elem.sizset = i;
					}

					if ( typeof cur !== "string" ) {
						if ( elem === cur ) {
							match = true;
							break;
						}

					} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
						match = elem;
						break;
					}
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

if ( document.documentElement.contains ) {
	Sizzle.contains = function( a, b ) {
		return a !== b && (a.contains ? a.contains(b) : true);
	};

} else if ( document.documentElement.compareDocumentPosition ) {
	Sizzle.contains = function( a, b ) {
		return !!(a.compareDocumentPosition(b) & 16);
	};

} else {
	Sizzle.contains = function() {
		return false;
	};
}

Sizzle.isXML = function( elem ) {
	var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;

	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

var posProcess = function( selector, context, seed ) {
	var match,
		tmpSet = [],
		later = "",
		root = context.nodeType ? [context] : context;

	while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
		later += match[0];
		selector = selector.replace( Expr.match.PSEUDO, "" );
	}

	selector = Expr.relative[selector] ? selector + "*" : selector;

	for ( var i = 0, l = root.length; i < l; i++ ) {
		Sizzle( selector, root[i], tmpSet, seed );
	}

	return Sizzle.filter( later, tmpSet );
};

Sizzle.attr = jQuery.attr;
Sizzle.selectors.attrMap = {};
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.filters;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})();


var runtil = /Until$/,
	rparentsprev = /^(?:parents|prevUntil|prevAll)/,
	rmultiselector = /,/,
	isSimple = /^.[^:#\[\.,]*$/,
	slice = Array.prototype.slice,
	POS = jQuery.expr.match.POS,
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var self = this,
			i, l;

		if ( typeof selector !== "string" ) {
			return jQuery( selector ).filter(function() {
				for ( i = 0, l = self.length; i < l; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			});
		}

		var ret = this.pushStack( "", "find", selector ),
			length, n, r;

		for ( i = 0, l = this.length; i < l; i++ ) {
			length = ret.length;
			jQuery.find( selector, this[i], ret );

			if ( i > 0 ) {
				for ( n = length; n < ret.length; n++ ) {
					for ( r = 0; r < length; r++ ) {
						if ( ret[r] === ret[n] ) {
							ret.splice(n--, 1);
							break;
						}
					}
				}
			}
		}

		return ret;
	},

	has: function( target ) {
		var targets = jQuery( target );
		return this.filter(function() {
			for ( var i = 0, l = targets.length; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector, false), "not", selector);
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector, true), "filter", selector );
	},

	is: function( selector ) {
		return !!selector && (
			typeof selector === "string" ?
				POS.test( selector ) ?
					jQuery( selector, this.context ).index( this[0] ) >= 0 :
					jQuery.filter( selector, this ).length > 0 :
				this.filter( selector ).length > 0 );
	},

	closest: function( selectors, context ) {
		var ret = [], i, l, cur = this[0];

		if ( jQuery.isArray( selectors ) ) {
			var level = 1;

			while ( cur && cur.ownerDocument && cur !== context ) {
				for ( i = 0; i < selectors.length; i++ ) {

					if ( jQuery( cur ).is( selectors[ i ] ) ) {
						ret.push({ selector: selectors[ i ], elem: cur, level: level });
					}
				}

				cur = cur.parentNode;
				level++;
			}

			return ret;
		}

		var pos = POS.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( i = 0, l = this.length; i < l; i++ ) {
			cur = this[i];

			while ( cur ) {
				if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
					ret.push( cur );
					break;

				} else {
					cur = cur.parentNode;
					if ( !cur || !cur.ownerDocument || cur === context || cur.nodeType === 11 ) {
						break;
					}
				}
			}
		}

		ret = ret.length > 1 ? jQuery.unique( ret ) : ret;

		return this.pushStack( ret, "closest", selectors );
	},

	index: function( elem ) {

		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.prevAll().length : -1;
		}

		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		return jQuery.inArray(
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?
			all :
			jQuery.unique( all ) );
	},

	andSelf: function() {
		return this.add( this.prevObject );
	}
});

function isDisconnected( node ) {
	return !node || !node.parentNode || node.parentNode.nodeType === 11;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return jQuery.nth( elem, 2, "nextSibling" );
	},
	prev: function( elem ) {
		return jQuery.nth( elem, 2, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( elem.parentNode.firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.makeArray( elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( !runtil.test( name ) ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

		if ( (this.length > 1 || rmultiselector.test( selector )) && rparentsprev.test( name ) ) {
			ret = ret.reverse();
		}

		return this.pushStack( ret, name, slice.call( arguments ).join(",") );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 ?
			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
			jQuery.find.matches(expr, elems);
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	nth: function( cur, result, dir, elem ) {
		result = result || 1;
		var num = 0;

		for ( ; cur; cur = cur[dir] ) {
			if ( cur.nodeType === 1 && ++num === result ) {
				break;
			}
		}

		return cur;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

function winnow( elements, qualifier, keep ) {

	qualifier = qualifier || 0;

	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep(elements, function( elem, i ) {
			var retVal = !!qualifier.call( elem, i, elem );
			return retVal === keep;
		});

	} else if ( qualifier.nodeType ) {
		return jQuery.grep(elements, function( elem, i ) {
			return ( elem === qualifier ) === keep;
		});

	} else if ( typeof qualifier === "string" ) {
		var filtered = jQuery.grep(elements, function( elem ) {
			return elem.nodeType === 1;
		});

		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter(qualifier, filtered, !keep);
		} else {
			qualifier = jQuery.filter( qualifier, filtered );
		}
	}

	return jQuery.grep(elements, function( elem, i ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;
	});
}




function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
	safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:\d+|null)"/g,
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style)/i,
	rnocache = /<(?:script|object|embed|option|style)/i,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")", "i"),
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /\/(java|ecma)script/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)/,
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		area: [ 1, "<map>", "</map>" ],
		_default: [ 0, "", "" ]
	},
	safeFragment = createSafeFragment( document );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

if ( !jQuery.support.htmlSerialize ) {
	wrapMap._default = [ 1, "div<div>", "</div>" ];
}

jQuery.fn.extend({
	text: function( text ) {
		if ( jQuery.isFunction(text) ) {
			return this.each(function(i) {
				var self = jQuery( this );

				self.text( text.call(this, i, self.text()) );
			});
		}

		if ( typeof text !== "object" && text !== undefined ) {
			return this.empty().append( (this[0] && this[0].ownerDocument || document).createTextNode( text ) );
		}

		return jQuery.text( this );
	},

	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	},

	append: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 ) {
				this.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 ) {
				this.insertBefore( elem, this.firstChild );
			}
		});
	},

	before: function() {
		if ( this[0] && this[0].parentNode ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this );
			});
		} else if ( arguments.length ) {
			var set = jQuery.clean( arguments );
			set.push.apply( set, this.toArray() );
			return this.pushStack( set, "before", arguments );
		}
	},

	after: function() {
		if ( this[0] && this[0].parentNode ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			});
		} else if ( arguments.length ) {
			var set = this.pushStack( this, "after", arguments );
			set.push.apply( set, jQuery.clean(arguments) );
			return set;
		}
	},

	remove: function( selector, keepData ) {
		for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
			if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( elem.getElementsByTagName("*") );
					jQuery.cleanData( [ elem ] );
				}

				if ( elem.parentNode ) {
					elem.parentNode.removeChild( elem );
				}
			}
		}

		return this;
	},

	empty: function() {
		for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( elem.getElementsByTagName("*") );
			}

			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		if ( value === undefined ) {
			return this[0] && this[0].nodeType === 1 ?
				this[0].innerHTML.replace(rinlinejQuery, "") :
				null;

		} else if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
			(jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value )) &&
			!wrapMap[ (rtagName.exec( value ) || ["", ""])[1].toLowerCase() ] ) {

			value = value.replace(rxhtmlTag, "<$1></$2>");

			try {
				for ( var i = 0, l = this.length; i < l; i++ ) {
					if ( this[i].nodeType === 1 ) {
						jQuery.cleanData( this[i].getElementsByTagName("*") );
						this[i].innerHTML = value;
					}
				}

			} catch(e) {
				this.empty().append( value );
			}

		} else if ( jQuery.isFunction( value ) ) {
			this.each(function(i){
				var self = jQuery( this );

				self.html( value.call(this, i, self.html()) );
			});

		} else {
			this.empty().append( value );
		}

		return this;
	},

	replaceWith: function( value ) {
		if ( this[0] && this[0].parentNode ) {
			if ( jQuery.isFunction( value ) ) {
				return this.each(function(i) {
					var self = jQuery(this), old = self.html();
					self.replaceWith( value.call( this, i, old ) );
				});
			}

			if ( typeof value !== "string" ) {
				value = jQuery( value ).detach();
			}

			return this.each(function() {
				var next = this.nextSibling,
					parent = this.parentNode;

				jQuery( this ).remove();

				if ( next ) {
					jQuery(next).before( value );
				} else {
					jQuery(parent).append( value );
				}
			});
		} else {
			return this.length ?
				this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value ) :
				this;
		}
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, table, callback ) {
		var results, first, fragment, parent,
			value = args[0],
			scripts = [];

		if ( !jQuery.support.checkClone && arguments.length === 3 && typeof value === "string" && rchecked.test( value ) ) {
			return this.each(function() {
				jQuery(this).domManip( args, table, callback, true );
			});
		}

		if ( jQuery.isFunction(value) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				args[0] = value.call(this, i, table ? self.html() : undefined);
				self.domManip( args, table, callback );
			});
		}

		if ( this[0] ) {
			parent = value && value.parentNode;

			if ( jQuery.support.parentNode && parent && parent.nodeType === 11 && parent.childNodes.length === this.length ) {
				results = { fragment: parent };

			} else {
				results = jQuery.buildFragment( args, this, scripts );
			}

			fragment = results.fragment;

			if ( fragment.childNodes.length === 1 ) {
				first = fragment = fragment.firstChild;
			} else {
				first = fragment.firstChild;
			}

			if ( first ) {
				table = table && jQuery.nodeName( first, "tr" );

				for ( var i = 0, l = this.length, lastIndex = l - 1; i < l; i++ ) {
					callback.call(
						table ?
							root(this[i], first) :
							this[i],
						results.cacheable || ( l > 1 && i < lastIndex ) ?
							jQuery.clone( fragment, true, true ) :
							fragment
					);
				}
			}

			if ( scripts.length ) {
				jQuery.each( scripts, evalScript );
			}
		}

		return this;
	}
});

function root( elem, cur ) {
	return jQuery.nodeName(elem, "table") ?
		(elem.getElementsByTagName("tbody")[0] ||
		elem.appendChild(elem.ownerDocument.createElement("tbody"))) :
		elem;
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type + ( events[ type ][ i ].namespace ? "." : "" ) + events[ type ][ i ].namespace, events[ type ][ i ], events[ type ][ i ].data );
			}
		}
	}

	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function cloneFixAttributes( src, dest ) {
	var nodeName;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	if ( dest.clearAttributes ) {
		dest.clearAttributes();
	}

	if ( dest.mergeAttributes ) {
		dest.mergeAttributes( src );
	}

	nodeName = dest.nodeName.toLowerCase();

	if ( nodeName === "object" ) {
		dest.outerHTML = src.outerHTML;

	} else if ( nodeName === "input" && (src.type === "checkbox" || src.type === "radio") ) {
		if ( src.checked ) {
			dest.defaultChecked = dest.checked = src.checked;
		}

		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	} else if ( nodeName === "option" ) {
		dest.selected = src.defaultSelected;

	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}

	dest.removeAttribute( jQuery.expando );
}

jQuery.buildFragment = function( args, nodes, scripts ) {
	var fragment, cacheable, cacheresults, doc,
	first = args[ 0 ];

	if ( nodes && nodes[0] ) {
		doc = nodes[0].ownerDocument || nodes[0];
	}

	if ( !doc.createDocumentFragment ) {
		doc = document;
	}

	if ( args.length === 1 && typeof first === "string" && first.length < 512 && doc === document &&
		first.charAt(0) === "<" && !rnocache.test( first ) &&
		(jQuery.support.checkClone || !rchecked.test( first )) &&
		(jQuery.support.html5Clone || !rnoshimcache.test( first )) ) {

		cacheable = true;

		cacheresults = jQuery.fragments[ first ];
		if ( cacheresults && cacheresults !== 1 ) {
			fragment = cacheresults;
		}
	}

	if ( !fragment ) {
		fragment = doc.createDocumentFragment();
		jQuery.clean( args, doc, fragment, scripts );
	}

	if ( cacheable ) {
		jQuery.fragments[ first ] = cacheresults ? fragment : 1;
	}

	return { fragment: fragment, cacheable: cacheable };
};

jQuery.fragments = {};

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var ret = [],
			insert = jQuery( selector ),
			parent = this.length === 1 && this[0].parentNode;

		if ( parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1 ) {
			insert[ original ]( this[0] );
			return this;

		} else {
			for ( var i = 0, l = insert.length; i < l; i++ ) {
				var elems = ( i > 0 ? this.clone(true) : this ).get();
				jQuery( insert[i] )[ original ]( elems );
				ret = ret.concat( elems );
			}

			return this.pushStack( ret, name, insert.selector );
		}
	};
});

function getAll( elem ) {
	if ( typeof elem.getElementsByTagName !== "undefined" ) {
		return elem.getElementsByTagName( "*" );

	} else if ( typeof elem.querySelectorAll !== "undefined" ) {
		return elem.querySelectorAll( "*" );

	} else {
		return [];
	}
}

function fixDefaultChecked( elem ) {
	if ( elem.type === "checkbox" || elem.type === "radio" ) {
		elem.defaultChecked = elem.checked;
	}
}
function findInputs( elem ) {
	var nodeName = ( elem.nodeName || "" ).toLowerCase();
	if ( nodeName === "input" ) {
		fixDefaultChecked( elem );
	} else if ( nodeName !== "script" && typeof elem.getElementsByTagName !== "undefined" ) {
		jQuery.grep( elem.getElementsByTagName("input"), fixDefaultChecked );
	}
}

function shimCloneNode( elem ) {
	var div = document.createElement( "div" );
	safeFragment.appendChild( div );

	div.innerHTML = elem.outerHTML;
	return div.firstChild;
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var srcElements,
			destElements,
			i,
			clone = jQuery.support.html5Clone || !rnoshimcache.test( "<" + elem.nodeName ) ?
				elem.cloneNode( true ) :
				shimCloneNode( elem );

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			cloneFixAttributes( elem, clone );

			srcElements = getAll( elem );
			destElements = getAll( clone );

			for ( i = 0; srcElements[i]; ++i ) {
				if ( destElements[i] ) {
					cloneFixAttributes( srcElements[i], destElements[i] );
				}
			}
		}

		if ( dataAndEvents ) {
			cloneCopyEvent( elem, clone );

			if ( deepDataAndEvents ) {
				srcElements = getAll( elem );
				destElements = getAll( clone );

				for ( i = 0; srcElements[i]; ++i ) {
					cloneCopyEvent( srcElements[i], destElements[i] );
				}
			}
		}

		srcElements = destElements = null;

		return clone;
	},

	clean: function( elems, context, fragment, scripts ) {
		var checkScriptType;

		context = context || document;

		if ( typeof context.createElement === "undefined" ) {
			context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
		}

		var ret = [], j;

		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			if ( typeof elem === "number" ) {
				elem += "";
			}

			if ( !elem ) {
				continue;
			}

			if ( typeof elem === "string" ) {
				if ( !rhtml.test( elem ) ) {
					elem = context.createTextNode( elem );
				} else {
					elem = elem.replace(rxhtmlTag, "<$1></$2>");

					var tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase(),
						wrap = wrapMap[ tag ] || wrapMap._default,
						depth = wrap[0],
						div = context.createElement("div");

					if ( context === document ) {
						safeFragment.appendChild( div );
					} else {
						createSafeFragment( context ).appendChild( div );
					}

					div.innerHTML = wrap[1] + elem + wrap[2];

					while ( depth-- ) {
						div = div.lastChild;
					}

					if ( !jQuery.support.tbody ) {

						var hasBody = rtbody.test(elem),
							tbody = tag === "table" && !hasBody ?
								div.firstChild && div.firstChild.childNodes :

								wrap[1] === "<table>" && !hasBody ?
									div.childNodes :
									[];

						for ( j = tbody.length - 1; j >= 0 ; --j ) {
							if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length ) {
								tbody[ j ].parentNode.removeChild( tbody[ j ] );
							}
						}
					}

					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );
					}

					elem = div.childNodes;
				}
			}

			var len;
			if ( !jQuery.support.appendChecked ) {
				if ( elem[0] && typeof (len = elem.length) === "number" ) {
					for ( j = 0; j < len; j++ ) {
						findInputs( elem[j] );
					}
				} else {
					findInputs( elem );
				}
			}

			if ( elem.nodeType ) {
				ret.push( elem );
			} else {
				ret = jQuery.merge( ret, elem );
			}
		}

		if ( fragment ) {
			checkScriptType = function( elem ) {
				return !elem.type || rscriptType.test( elem.type );
			};
			for ( i = 0; ret[i]; i++ ) {
				if ( scripts && jQuery.nodeName( ret[i], "script" ) && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript") ) {
					scripts.push( ret[i].parentNode ? ret[i].parentNode.removeChild( ret[i] ) : ret[i] );

				} else {
					if ( ret[i].nodeType === 1 ) {
						var jsTags = jQuery.grep( ret[i].getElementsByTagName( "script" ), checkScriptType );

						ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );
					}
					fragment.appendChild( ret[i] );
				}
			}
		}

		return ret;
	},

	cleanData: function( elems ) {
		var data, id,
			cache = jQuery.cache,
			special = jQuery.event.special,
			deleteExpando = jQuery.support.deleteExpando;

		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			if ( elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()] ) {
				continue;
			}

			id = elem[ jQuery.expando ];

			if ( id ) {
				data = cache[ id ];

				if ( data && data.events ) {
					for ( var type in data.events ) {
						if ( special[ type ] ) {
							jQuery.event.remove( elem, type );

						} else {
							jQuery.removeEvent( elem, type, data.handle );
						}
					}

					if ( data.handle ) {
						data.handle.elem = null;
					}
				}

				if ( deleteExpando ) {
					delete elem[ jQuery.expando ];

				} else if ( elem.removeAttribute ) {
					elem.removeAttribute( jQuery.expando );
				}

				delete cache[ id ];
			}
		}
	}
});

function evalScript( i, elem ) {
	if ( elem.src ) {
		jQuery.ajax({
			url: elem.src,
			async: false,
			dataType: "script"
		});
	} else {
		jQuery.globalEval( ( elem.text || elem.textContent || elem.innerHTML || "" ).replace( rcleanScript, "/*$0*/" ) );
	}

	if ( elem.parentNode ) {
		elem.parentNode.removeChild( elem );
	}
}




var ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity=([^)]*)/,
	rupper = /([A-Z]|^ms)/g,
	rnumpx = /^-?\d+(?:px)?$/i,
	rnum = /^-?\d/,
	rrelNum = /^([\-+])=([\-+.\de]+)/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssWidth = [ "Left", "Right" ],
	cssHeight = [ "Top", "Bottom" ],
	curCSS,

	getComputedStyle,
	currentStyle;

jQuery.fn.css = function( name, value ) {
	if ( arguments.length === 2 && value === undefined ) {
		return this;
	}

	return jQuery.access( this, name, value, true, function( elem, name, value ) {
		return value !== undefined ?
			jQuery.style( elem, name, value ) :
			jQuery.css( elem, name );
	});
};

jQuery.extend({
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					var ret = curCSS( elem, "opacity", "opacity" );
					return ret === "" ? "1" : ret;

				} else {
					return elem.style.opacity;
				}
			}
		}
	},

	cssNumber: {
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	cssProps: {
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	style: function( elem, name, value, extra ) {
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		var ret, type, origName = jQuery.camelCase( name ),
			style = elem.style, hooks = jQuery.cssHooks[ origName ];

		name = jQuery.cssProps[ origName ] || origName;

		if ( value !== undefined ) {
			type = typeof value;

			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( +( ret[1] + 1) * +ret[2] ) + parseFloat( jQuery.css( elem, name ) );
				type = "number";
			}

			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value )) !== undefined ) {
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			return style[ name ];
		}
	},

	css: function( elem, name, extra ) {
		var ret, hooks;

		name = jQuery.camelCase( name );
		hooks = jQuery.cssHooks[ name ];
		name = jQuery.cssProps[ name ] || name;

		if ( name === "cssFloat" ) {
			name = "float";
		}

		if ( hooks && "get" in hooks && (ret = hooks.get( elem, true, extra )) !== undefined ) {
			return ret;

		} else if ( curCSS ) {
			return curCSS( elem, name );
		}
	},

	swap: function( elem, options, callback ) {
		var old = {};

		for ( var name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		callback.call( elem );

		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}
	}
});

jQuery.curCSS = jQuery.css;

jQuery.each(["height", "width"], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			var val;

			if ( computed ) {
				if ( elem.offsetWidth !== 0 ) {
					return getWH( elem, name, extra );
				} else {
					jQuery.swap( elem, cssShow, function() {
						val = getWH( elem, name, extra );
					});
				}

				return val;
			}
		},

		set: function( elem, value ) {
			if ( rnumpx.test( value ) ) {
				value = parseFloat( value );

				if ( value >= 0 ) {
					return value + "px";
				}

			} else {
				return value;
			}
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( parseFloat( RegExp.$1 ) / 100 ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			style.zoom = 1;

			if ( value >= 1 && jQuery.trim( filter.replace( ralpha, "" ) ) === "" ) {

				style.removeAttribute( "filter" );

				if ( currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery(function() {
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				var ret;
				jQuery.swap( elem, { "display": "inline-block" }, function() {
					if ( computed ) {
						ret = curCSS( elem, "margin-right", "marginRight" );
					} else {
						ret = elem.style.marginRight;
					}
				});
				return ret;
			}
		};
	}
});

if ( document.defaultView && document.defaultView.getComputedStyle ) {
	getComputedStyle = function( elem, name ) {
		var ret, defaultView, computedStyle;

		name = name.replace( rupper, "-$1" ).toLowerCase();

		if ( (defaultView = elem.ownerDocument.defaultView) &&
				(computedStyle = defaultView.getComputedStyle( elem, null )) ) {
			ret = computedStyle.getPropertyValue( name );
			if ( ret === "" && !jQuery.contains( elem.ownerDocument.documentElement, elem ) ) {
				ret = jQuery.style( elem, name );
			}
		}

		return ret;
	};
}

if ( document.documentElement.currentStyle ) {
	currentStyle = function( elem, name ) {
		var left, rsLeft, uncomputed,
			ret = elem.currentStyle && elem.currentStyle[ name ],
			style = elem.style;

		if ( ret === null && style && (uncomputed = style[ name ]) ) {
			ret = uncomputed;
		}


		if ( !rnumpx.test( ret ) && rnum.test( ret ) ) {

			left = style.left;
			rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;

			if ( rsLeft ) {
				elem.runtimeStyle.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ( ret || 0 );
			ret = style.pixelLeft + "px";

			style.left = left;
			if ( rsLeft ) {
				elem.runtimeStyle.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

curCSS = getComputedStyle || currentStyle;

function getWH( elem, name, extra ) {

	var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		which = name === "width" ? cssWidth : cssHeight,
		i = 0,
		len = which.length;

	if ( val > 0 ) {
		if ( extra !== "border" ) {
			for ( ; i < len; i++ ) {
				if ( !extra ) {
					val -= parseFloat( jQuery.css( elem, "padding" + which[ i ] ) ) || 0;
				}
				if ( extra === "margin" ) {
					val += parseFloat( jQuery.css( elem, extra + which[ i ] ) ) || 0;
				} else {
					val -= parseFloat( jQuery.css( elem, "border" + which[ i ] + "Width" ) ) || 0;
				}
			}
		}

		return val + "px";
	}

	val = curCSS( elem, name, name );
	if ( val < 0 || val == null ) {
		val = elem.style[ name ] || 0;
	}
	val = parseFloat( val ) || 0;

	if ( extra ) {
		for ( ; i < len; i++ ) {
			val += parseFloat( jQuery.css( elem, "padding" + which[ i ] ) ) || 0;
			if ( extra !== "padding" ) {
				val += parseFloat( jQuery.css( elem, "border" + which[ i ] + "Width" ) ) || 0;
			}
			if ( extra === "margin" ) {
				val += parseFloat( jQuery.css( elem, extra + which[ i ] ) ) || 0;
			}
		}
	}

	return val + "px";
}

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		var width = elem.offsetWidth,
			height = elem.offsetHeight;

		return ( width === 0 && height === 0 ) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rhash = /#.*$/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
	rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rquery = /\?/,
	rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	rselectTextarea = /^(?:select|textarea)/i,
	rspacesAjax = /\s+/,
	rts = /([?&])_=[^&]*/,
	rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,

	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	ajaxLocation,

	ajaxLocParts,

	allTypes = ["*/"] + ["*"];

try {
	ajaxLocation = location.href;
} catch( e ) {
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

function addToPrefiltersOrTransports( structure ) {

	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		if ( jQuery.isFunction( func ) ) {
			var dataTypes = dataTypeExpression.toLowerCase().split( rspacesAjax ),
				i = 0,
				length = dataTypes.length,
				dataType,
				list,
				placeBefore;

			for ( ; i < length; i++ ) {
				dataType = dataTypes[ i ];
				placeBefore = /^\+/.test( dataType );
				if ( placeBefore ) {
					dataType = dataType.substr( 1 ) || "*";
				}
				list = structure[ dataType ] = structure[ dataType ] || [];
				list[ placeBefore ? "unshift" : "push" ]( func );
			}
		}
	};
}

function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR,
		dataType /* internal */, inspected /* internal */ ) {

	dataType = dataType || options.dataTypes[ 0 ];
	inspected = inspected || {};

	inspected[ dataType ] = true;

	var list = structure[ dataType ],
		i = 0,
		length = list ? list.length : 0,
		executeOnly = ( structure === prefilters ),
		selection;

	for ( ; i < length && ( executeOnly || !selection ); i++ ) {
		selection = list[ i ]( options, originalOptions, jqXHR );
		if ( typeof selection === "string" ) {
			if ( !executeOnly || inspected[ selection ] ) {
				selection = undefined;
			} else {
				options.dataTypes.unshift( selection );
				selection = inspectPrefiltersOrTransports(
						structure, options, originalOptions, jqXHR, selection, inspected );
			}
		}
	}
	if ( ( executeOnly || !selection ) && !inspected[ "*" ] ) {
		selection = inspectPrefiltersOrTransports(
				structure, options, originalOptions, jqXHR, "*", inspected );
	}
	return selection;
}

function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};
	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}
}

jQuery.fn.extend({
	load: function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );

		} else if ( !this.length ) {
			return this;
		}

		var off = url.indexOf( " " );
		if ( off >= 0 ) {
			var selector = url.slice( off, url.length );
			url = url.slice( 0, off );
		}

		var type = "GET";

		if ( params ) {
			if ( jQuery.isFunction( params ) ) {
				callback = params;
				params = undefined;

			} else if ( typeof params === "object" ) {
				params = jQuery.param( params, jQuery.ajaxSettings.traditional );
				type = "POST";
			}
		}

		var self = this;

		jQuery.ajax({
			url: url,
			type: type,
			dataType: "html",
			data: params,
			complete: function( jqXHR, status, responseText ) {
				responseText = jqXHR.responseText;
				if ( jqXHR.isResolved() ) {
					jqXHR.done(function( r ) {
						responseText = r;
					});
					self.html( selector ?
						jQuery("<div>")
							.append(responseText.replace(rscript, ""))

							.find(selector) :

						responseText );
				}

				if ( callback ) {
					self.each( callback, [ responseText, status, jqXHR ] );
				}
			}
		});

		return this;
	},

	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},

	serializeArray: function() {
		return this.map(function(){
			return this.elements ? jQuery.makeArray( this.elements ) : this;
		})
		.filter(function(){
			return this.name && !this.disabled &&
				( this.checked || rselectTextarea.test( this.nodeName ) ||
					rinput.test( this.type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val, i ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

jQuery.each( "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split( " " ), function( i, o ){
	jQuery.fn[ o ] = function( f ){
		return this.on( o, f );
	};
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			type: method,
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	};
});

jQuery.extend({

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	ajaxSetup: function( target, settings ) {
		if ( settings ) {
			ajaxExtend( target, jQuery.ajaxSettings );
		} else {
			settings = target;
			target = jQuery.ajaxSettings;
		}
		ajaxExtend( target, settings );
		return target;
	},

	ajaxSettings: {
		url: ajaxLocation,
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		type: "GET",
		contentType: "application/x-www-form-urlencoded",
		processData: true,
		async: true,
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		traditional: false,
		headers: {},
		*/

		accepts: {
			xml: "application/xml, text/xml",
			html: "text/html",
			text: "text/plain",
			json: "application/json, text/javascript",
			"*": allTypes
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText"
		},

		converters: {

			"* text": window.String,

			"text html": true,

			"text json": jQuery.parseJSON,

			"text xml": jQuery.parseXML
		},

		flatOptions: {
			context: true,
			url: true
		}
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	ajax: function( url, options ) {

		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		options = options || {};

		var // Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			callbackContext = s.context || s,
			globalEventContext = callbackContext !== s &&
				( callbackContext.nodeType || callbackContext instanceof jQuery ) ?
						jQuery( callbackContext ) : jQuery.event,
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),
			statusCode = s.statusCode || {},
			ifModifiedKey,
			requestHeaders = {},
			requestHeadersNames = {},
			responseHeadersString,
			responseHeaders,
			transport,
			timeoutTimer,
			parts,
			state = 0,
			fireGlobals,
			i,
			jqXHR = {

				readyState: 0,

				setRequestHeader: function( name, value ) {
					if ( !state ) {
						var lname = name.toLowerCase();
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match === undefined ? null : match;
				},

				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				abort: function( statusText ) {
					statusText = statusText || "abort";
					if ( transport ) {
						transport.abort( statusText );
					}
					done( 0, statusText );
					return this;
				}
			};

		function done( status, nativeStatusText, responses, headers ) {

			if ( state === 2 ) {
				return;
			}

			state = 2;

			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			transport = undefined;

			responseHeadersString = headers || "";

			jqXHR.readyState = status > 0 ? 4 : 0;

			var isSuccess,
				success,
				error,
				statusText = nativeStatusText,
				response = responses ? ajaxHandleResponses( s, jqXHR, responses ) : undefined,
				lastModified,
				etag;

			if ( status >= 200 && status < 300 || status === 304 ) {

				if ( s.ifModified ) {

					if ( ( lastModified = jqXHR.getResponseHeader( "Last-Modified" ) ) ) {
						jQuery.lastModified[ ifModifiedKey ] = lastModified;
					}
					if ( ( etag = jqXHR.getResponseHeader( "Etag" ) ) ) {
						jQuery.etag[ ifModifiedKey ] = etag;
					}
				}

				if ( status === 304 ) {

					statusText = "notmodified";
					isSuccess = true;

				} else {

					try {
						success = ajaxConvert( s, response );
						statusText = "success";
						isSuccess = true;
					} catch(e) {
						statusText = "parsererror";
						error = e;
					}
				}
			} else {
				error = statusText;
				if ( !statusText || status ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			jqXHR.status = status;
			jqXHR.statusText = "" + ( nativeStatusText || statusText );

			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajax" + ( isSuccess ? "Success" : "Error" ),
						[ jqXHR, s, isSuccess ? success : error ] );
			}

			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		deferred.promise( jqXHR );
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;
		jqXHR.complete = completeDeferred.add;

		jqXHR.statusCode = function( map ) {
			if ( map ) {
				var tmp;
				if ( state < 2 ) {
					for ( tmp in map ) {
						statusCode[ tmp ] = [ statusCode[tmp], map[tmp] ];
					}
				} else {
					tmp = map[ jqXHR.status ];
					jqXHR.then( tmp, tmp );
				}
			}
			return this;
		};

		s.url = ( ( url || s.url ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().split( rspacesAjax );

		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] != ajaxLocParts[ 1 ] || parts[ 2 ] != ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
			);
		}

		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		if ( state === 2 ) {
			return false;
		}

		fireGlobals = s.global;

		s.type = s.type.toUpperCase();

		s.hasContent = !rnoContent.test( s.type );

		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		if ( !s.hasContent ) {

			if ( s.data ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.data;
				delete s.data;
			}

			ifModifiedKey = s.url;

			if ( s.cache === false ) {

				var ts = jQuery.now(),
					ret = s.url.replace( rts, "$1_=" + ts );

				s.url = ret + ( ( ret === s.url ) ? ( rquery.test( s.url ) ? "&" : "?" ) + "_=" + ts : "" );
			}
		}

		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		if ( s.ifModified ) {
			ifModifiedKey = ifModifiedKey || s.url;
			if ( jQuery.lastModified[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ ifModifiedKey ] );
			}
			if ( jQuery.etag[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ ifModifiedKey ] );
			}
		}

		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				jqXHR.abort();
				return false;

		}

		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout( function(){
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch (e) {
				if ( state < 2 ) {
					done( -1, e );
				} else {
					throw e;
				}
			}
		}

		return jqXHR;
	},

	param: function( a, traditional ) {
		var s = [],
			add = function( key, value ) {
				value = jQuery.isFunction( value ) ? value() : value;
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};

		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings.traditional;
		}

		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
			jQuery.each( a, function() {
				add( this.name, this.value );
			});

		} else {
			for ( var prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		return s.join( "&" ).replace( r20, "+" );
	}
});

function buildParams( prefix, obj, traditional, add ) {
	if ( jQuery.isArray( obj ) ) {
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				add( prefix, v );

			} else {
				buildParams( prefix + "[" + ( typeof v === "object" || jQuery.isArray(v) ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && obj != null && typeof obj === "object" ) {
		for ( var name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		add( prefix, obj );
	}
}

jQuery.extend({

	active: 0,

	lastModified: {},
	etag: {}

});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var contents = s.contents,
		dataTypes = s.dataTypes,
		responseFields = s.responseFields,
		ct,
		type,
		finalDataType,
		firstDataType;

	for ( type in responseFields ) {
		if ( type in responses ) {
			jqXHR[ responseFields[type] ] = responses[ type ];
		}
	}

	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "content-type" );
		}
	}

	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		finalDataType = finalDataType || firstDataType;
	}

	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

function ajaxConvert( s, response ) {

	if ( s.dataFilter ) {
		response = s.dataFilter( response, s.dataType );
	}

	var dataTypes = s.dataTypes,
		converters = {},
		i,
		key,
		length = dataTypes.length,
		tmp,
		current = dataTypes[ 0 ],
		prev,
		conversion,
		conv,
		conv1,
		conv2;

	for ( i = 1; i < length; i++ ) {

		if ( i === 1 ) {
			for ( key in s.converters ) {
				if ( typeof key === "string" ) {
					converters[ key.toLowerCase() ] = s.converters[ key ];
				}
			}
		}

		prev = current;
		current = dataTypes[ i ];

		if ( current === "*" ) {
			current = prev;
		} else if ( prev !== "*" && prev !== current ) {

			conversion = prev + " " + current;
			conv = converters[ conversion ] || converters[ "* " + current ];

			if ( !conv ) {
				conv2 = undefined;
				for ( conv1 in converters ) {
					tmp = conv1.split( " " );
					if ( tmp[ 0 ] === prev || tmp[ 0 ] === "*" ) {
						conv2 = converters[ tmp[1] + " " + current ];
						if ( conv2 ) {
							conv1 = converters[ conv1 ];
							if ( conv1 === true ) {
								conv = conv2;
							} else if ( conv2 === true ) {
								conv = conv1;
							}
							break;
						}
					}
				}
			}
			if ( !( conv || conv2 ) ) {
				jQuery.error( "No conversion from " + conversion.replace(" "," to ") );
			}
			if ( conv !== true ) {
				response = conv ? conv( response ) : conv2( conv1(response) );
			}
		}
	}
	return response;
}




var jsc = jQuery.now(),
	jsre = /(\=)\?(&|$)|\?\?/i;

jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		return jQuery.expando + "_" + ( jsc++ );
	}
});

jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var inspectData = s.contentType === "application/x-www-form-urlencoded" &&
		( typeof s.data === "string" );

	if ( s.dataTypes[ 0 ] === "jsonp" ||
		s.jsonp !== false && ( jsre.test( s.url ) ||
				inspectData && jsre.test( s.data ) ) ) {

		var responseContainer,
			jsonpCallback = s.jsonpCallback =
				jQuery.isFunction( s.jsonpCallback ) ? s.jsonpCallback() : s.jsonpCallback,
			previous = window[ jsonpCallback ],
			url = s.url,
			data = s.data,
			replace = "$1" + jsonpCallback + "$2";

		if ( s.jsonp !== false ) {
			url = url.replace( jsre, replace );
			if ( s.url === url ) {
				if ( inspectData ) {
					data = data.replace( jsre, replace );
				}
				if ( s.data === data ) {
					url += (/\?/.test( url ) ? "&" : "?") + s.jsonp + "=" + jsonpCallback;
				}
			}
		}

		s.url = url;
		s.data = data;

		window[ jsonpCallback ] = function( response ) {
			responseContainer = [ response ];
		};

		jqXHR.always(function() {
			window[ jsonpCallback ] = previous;
			if ( responseContainer && jQuery.isFunction( previous ) ) {
				window[ jsonpCallback ]( responseContainer[ 0 ] );
			}
		});

		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( jsonpCallback + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		s.dataTypes[ 0 ] = "json";

		return "script";
	}
});




jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /javascript|ecmascript/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

jQuery.ajaxTransport( "script", function(s) {

	if ( s.crossDomain ) {

		var script,
			head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = "async";

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						script.onload = script.onreadystatechange = null;

						if ( head && script.parentNode ) {
							head.removeChild( script );
						}

						script = undefined;

						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( 0, 1 );
				}
			}
		};
	}
});




var // #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject ? function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( 0, 1 );
		}
	} : false,
	xhrId = 0,
	xhrCallbacks;

function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}

jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	createStandardXHR;

(function( xhr ) {
	jQuery.extend( jQuery.support, {
		ajax: !!xhr,
		cors: !!xhr && ( "withCredentials" in xhr )
	});
})( jQuery.ajaxSettings.xhr() );

if ( jQuery.support.ajax ) {

	jQuery.ajaxTransport(function( s ) {
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					var xhr = s.xhr(),
						handle,
						i;

					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( _ ) {}

					xhr.send( ( s.hasContent && s.data ) || null );

					callback = function( _, isAbort ) {

						var status,
							statusText,
							responseHeaders,
							responses,
							xml;

						try {

							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								callback = undefined;

								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								if ( isAbort ) {
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									status = xhr.status;
									responseHeaders = xhr.getAllResponseHeaders();
									responses = {};
									xml = xhr.responseXML;

									if ( xml && xml.documentElement /* #4958 */ ) {
										responses.xml = xml;
									}
									responses.text = xhr.responseText;

									try {
										statusText = xhr.statusText;
									} catch( e ) {
										statusText = "";
									}


									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					if ( !s.async || xhr.readyState === 4 ) {
						callback();
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback(0,1);
					}
				}
			};
		}
	});
}




var elemdisplay = {},
	iframe, iframeDoc,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
	timerId,
	fxAttrs = [
		[ "height", "marginTop", "marginBottom", "paddingTop", "paddingBottom" ],
		[ "width", "marginLeft", "marginRight", "paddingLeft", "paddingRight" ],
		[ "opacity" ]
	],
	fxNow;

jQuery.fn.extend({
	show: function( speed, easing, callback ) {
		var elem, display;

		if ( speed || speed === 0 ) {
			return this.animate( genFx("show", 3), speed, easing, callback );

		} else {
			for ( var i = 0, j = this.length; i < j; i++ ) {
				elem = this[ i ];

				if ( elem.style ) {
					display = elem.style.display;

					if ( !jQuery._data(elem, "olddisplay") && display === "none" ) {
						display = elem.style.display = "";
					}

					if ( display === "" && jQuery.css(elem, "display") === "none" ) {
						jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
					}
				}
			}

			for ( i = 0; i < j; i++ ) {
				elem = this[ i ];

				if ( elem.style ) {
					display = elem.style.display;

					if ( display === "" || display === "none" ) {
						elem.style.display = jQuery._data( elem, "olddisplay" ) || "";
					}
				}
			}

			return this;
		}
	},

	hide: function( speed, easing, callback ) {
		if ( speed || speed === 0 ) {
			return this.animate( genFx("hide", 3), speed, easing, callback);

		} else {
			var elem, display,
				i = 0,
				j = this.length;

			for ( ; i < j; i++ ) {
				elem = this[i];
				if ( elem.style ) {
					display = jQuery.css( elem, "display" );

					if ( display !== "none" && !jQuery._data( elem, "olddisplay" ) ) {
						jQuery._data( elem, "olddisplay", display );
					}
				}
			}

			for ( i = 0; i < j; i++ ) {
				if ( this[i].style ) {
					this[i].style.display = "none";
				}
			}

			return this;
		}
	},

	_toggle: jQuery.fn.toggle,

	toggle: function( fn, fn2, callback ) {
		var bool = typeof fn === "boolean";

		if ( jQuery.isFunction(fn) && jQuery.isFunction(fn2) ) {
			this._toggle.apply( this, arguments );

		} else if ( fn == null || bool ) {
			this.each(function() {
				var state = bool ? fn : jQuery(this).is(":hidden");
				jQuery(this)[ state ? "show" : "hide" ]();
			});

		} else {
			this.animate(genFx("toggle", 3), fn, fn2, callback);
		}

		return this;
	},

	fadeTo: function( speed, to, easing, callback ) {
		return this.filter(":hidden").css("opacity", 0).show().end()
					.animate({opacity: to}, speed, easing, callback);
	},

	animate: function( prop, speed, easing, callback ) {
		var optall = jQuery.speed( speed, easing, callback );

		if ( jQuery.isEmptyObject( prop ) ) {
			return this.each( optall.complete, [ false ] );
		}

		prop = jQuery.extend( {}, prop );

		function doAnimation() {

			if ( optall.queue === false ) {
				jQuery._mark( this );
			}

			var opt = jQuery.extend( {}, optall ),
				isElement = this.nodeType === 1,
				hidden = isElement && jQuery(this).is(":hidden"),
				name, val, p, e,
				parts, start, end, unit,
				method;

			opt.animatedProperties = {};

			for ( p in prop ) {

				name = jQuery.camelCase( p );
				if ( p !== name ) {
					prop[ name ] = prop[ p ];
					delete prop[ p ];
				}

				val = prop[ name ];

				if ( jQuery.isArray( val ) ) {
					opt.animatedProperties[ name ] = val[ 1 ];
					val = prop[ name ] = val[ 0 ];
				} else {
					opt.animatedProperties[ name ] = opt.specialEasing && opt.specialEasing[ name ] || opt.easing || 'swing';
				}

				if ( val === "hide" && hidden || val === "show" && !hidden ) {
					return opt.complete.call( this );
				}

				if ( isElement && ( name === "height" || name === "width" ) ) {
					opt.overflow = [ this.style.overflow, this.style.overflowX, this.style.overflowY ];

					if ( jQuery.css( this, "display" ) === "inline" &&
							jQuery.css( this, "float" ) === "none" ) {

						if ( !jQuery.support.inlineBlockNeedsLayout || defaultDisplay( this.nodeName ) === "inline" ) {
							this.style.display = "inline-block";

						} else {
							this.style.zoom = 1;
						}
					}
				}
			}

			if ( opt.overflow != null ) {
				this.style.overflow = "hidden";
			}

			for ( p in prop ) {
				e = new jQuery.fx( this, opt, p );
				val = prop[ p ];

				if ( rfxtypes.test( val ) ) {

					method = jQuery._data( this, "toggle" + p ) || ( val === "toggle" ? hidden ? "show" : "hide" : 0 );
					if ( method ) {
						jQuery._data( this, "toggle" + p, method === "show" ? "hide" : "show" );
						e[ method ]();
					} else {
						e[ val ]();
					}

				} else {
					parts = rfxnum.exec( val );
					start = e.cur();

					if ( parts ) {
						end = parseFloat( parts[2] );
						unit = parts[3] || ( jQuery.cssNumber[ p ] ? "" : "px" );

						if ( unit !== "px" ) {
							jQuery.style( this, p, (end || 1) + unit);
							start = ( (end || 1) / e.cur() ) * start;
							jQuery.style( this, p, start + unit);
						}

						if ( parts[1] ) {
							end = ( (parts[ 1 ] === "-=" ? -1 : 1) * end ) + start;
						}

						e.custom( start, end, unit );

					} else {
						e.custom( start, val, "" );
					}
				}
			}

			return true;
		}

		return optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},

	stop: function( type, clearQueue, gotoEnd ) {
		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var index,
				hadTimers = false,
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( !gotoEnd ) {
				jQuery._unmark( true, this );
			}

			function stopQueue( elem, data, index ) {
				var hooks = data[ index ];
				jQuery.removeData( elem, index, true );
				hooks.stop( gotoEnd );
			}

			if ( type == null ) {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && index.indexOf(".run") === index.length - 4 ) {
						stopQueue( this, data, index );
					}
				}
			} else if ( data[ index = type + ".run" ] && data[ index ].stop ){
				stopQueue( this, data, index );
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					if ( gotoEnd ) {

						timers[ index ]( true );
					} else {
						timers[ index ].saveState();
					}
					hadTimers = true;
					timers.splice( index, 1 );
				}
			}

			if ( !( gotoEnd && hadTimers ) ) {
				jQuery.dequeue( this, type );
			}
		});
	}

});

function createFxNow() {
	setTimeout( clearFxNow, 0 );
	return ( fxNow = jQuery.now() );
}

function clearFxNow() {
	fxNow = undefined;
}

function genFx( type, num ) {
	var obj = {};

	jQuery.each( fxAttrs.concat.apply([], fxAttrs.slice( 0, num )), function() {
		obj[ this ] = type;
	});

	return obj;
}

jQuery.each({
	slideDown: genFx( "show", 1 ),
	slideUp: genFx( "hide", 1 ),
	slideToggle: genFx( "toggle", 1 ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.extend({
	speed: function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		opt.old = opt.complete;

		opt.complete = function( noUnmark ) {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			} else if ( noUnmark !== false ) {
				jQuery._unmark( this );
			}
		};

		return opt;
	},

	easing: {
		linear: function( p, n, firstNum, diff ) {
			return firstNum + diff * p;
		},
		swing: function( p, n, firstNum, diff ) {
			return ( ( -Math.cos( p*Math.PI ) / 2 ) + 0.5 ) * diff + firstNum;
		}
	},

	timers: [],

	fx: function( elem, options, prop ) {
		this.options = options;
		this.elem = elem;
		this.prop = prop;

		options.orig = options.orig || {};
	}

});

jQuery.fx.prototype = {
	update: function() {
		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		( jQuery.fx.step[ this.prop ] || jQuery.fx.step._default )( this );
	},

	cur: function() {
		if ( this.elem[ this.prop ] != null && (!this.elem.style || this.elem.style[ this.prop ] == null) ) {
			return this.elem[ this.prop ];
		}

		var parsed,
			r = jQuery.css( this.elem, this.prop );
		return isNaN( parsed = parseFloat( r ) ) ? !r || r === "auto" ? 0 : r : parsed;
	},

	custom: function( from, to, unit ) {
		var self = this,
			fx = jQuery.fx;

		this.startTime = fxNow || createFxNow();
		this.end = to;
		this.now = this.start = from;
		this.pos = this.state = 0;
		this.unit = unit || this.unit || ( jQuery.cssNumber[ this.prop ] ? "" : "px" );

		function t( gotoEnd ) {
			return self.step( gotoEnd );
		}

		t.queue = this.options.queue;
		t.elem = this.elem;
		t.saveState = function() {
			if ( self.options.hide && jQuery._data( self.elem, "fxshow" + self.prop ) === undefined ) {
				jQuery._data( self.elem, "fxshow" + self.prop, self.start );
			}
		};

		if ( t() && jQuery.timers.push(t) && !timerId ) {
			timerId = setInterval( fx.tick, fx.interval );
		}
	},

	show: function() {
		var dataShow = jQuery._data( this.elem, "fxshow" + this.prop );

		this.options.orig[ this.prop ] = dataShow || jQuery.style( this.elem, this.prop );
		this.options.show = true;

		if ( dataShow !== undefined ) {
			this.custom( this.cur(), dataShow );
		} else {
			this.custom( this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur() );
		}

		jQuery( this.elem ).show();
	},

	hide: function() {
		this.options.orig[ this.prop ] = jQuery._data( this.elem, "fxshow" + this.prop ) || jQuery.style( this.elem, this.prop );
		this.options.hide = true;

		this.custom( this.cur(), 0 );
	},

	step: function( gotoEnd ) {
		var p, n, complete,
			t = fxNow || createFxNow(),
			done = true,
			elem = this.elem,
			options = this.options;

		if ( gotoEnd || t >= options.duration + this.startTime ) {
			this.now = this.end;
			this.pos = this.state = 1;
			this.update();

			options.animatedProperties[ this.prop ] = true;

			for ( p in options.animatedProperties ) {
				if ( options.animatedProperties[ p ] !== true ) {
					done = false;
				}
			}

			if ( done ) {
				if ( options.overflow != null && !jQuery.support.shrinkWrapBlocks ) {

					jQuery.each( [ "", "X", "Y" ], function( index, value ) {
						elem.style[ "overflow" + value ] = options.overflow[ index ];
					});
				}

				if ( options.hide ) {
					jQuery( elem ).hide();
				}

				if ( options.hide || options.show ) {
					for ( p in options.animatedProperties ) {
						jQuery.style( elem, p, options.orig[ p ] );
						jQuery.removeData( elem, "fxshow" + p, true );
						jQuery.removeData( elem, "toggle" + p, true );
					}
				}


				complete = options.complete;
				if ( complete ) {

					options.complete = false;
					complete.call( elem );
				}
			}

			return false;

		} else {
			if ( options.duration == Infinity ) {
				this.now = t;
			} else {
				n = t - this.startTime;
				this.state = n / options.duration;

				this.pos = jQuery.easing[ options.animatedProperties[this.prop] ]( this.state, n, 0, 1, options.duration );
				this.now = this.start + ( (this.end - this.start) * this.pos );
			}
			this.update();
		}

		return true;
	}
};

jQuery.extend( jQuery.fx, {
	tick: function() {
		var timer,
			timers = jQuery.timers,
			i = 0;

		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
	},

	interval: 13,

	stop: function() {
		clearInterval( timerId );
		timerId = null;
	},

	speeds: {
		slow: 600,
		fast: 200,
		_default: 400
	},

	step: {
		opacity: function( fx ) {
			jQuery.style( fx.elem, "opacity", fx.now );
		},

		_default: function( fx ) {
			if ( fx.elem.style && fx.elem.style[ fx.prop ] != null ) {
				fx.elem.style[ fx.prop ] = fx.now + fx.unit;
			} else {
				fx.elem[ fx.prop ] = fx.now;
			}
		}
	}
});

jQuery.each([ "width", "height" ], function( i, prop ) {
	jQuery.fx.step[ prop ] = function( fx ) {
		jQuery.style( fx.elem, prop, Math.max(0, fx.now) + fx.unit );
	};
});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}

function defaultDisplay( nodeName ) {

	if ( !elemdisplay[ nodeName ] ) {

		var body = document.body,
			elem = jQuery( "<" + nodeName + ">" ).appendTo( body ),
			display = elem.css( "display" );
		elem.remove();

		if ( display === "none" || display === "" ) {
			if ( !iframe ) {
				iframe = document.createElement( "iframe" );
				iframe.frameBorder = iframe.width = iframe.height = 0;
			}

			body.appendChild( iframe );

			if ( !iframeDoc || !iframe.createElement ) {
				iframeDoc = ( iframe.contentWindow || iframe.contentDocument ).document;
				iframeDoc.write( ( document.compatMode === "CSS1Compat" ? "<!doctype html>" : "" ) + "<html><body>" );
				iframeDoc.close();
			}

			elem = iframeDoc.createElement( nodeName );

			iframeDoc.body.appendChild( elem );

			display = jQuery.css( elem, "display" );
			body.removeChild( iframe );
		}

		elemdisplay[ nodeName ] = display;
	}

	return elemdisplay[ nodeName ];
}




var rtable = /^t(?:able|d|h)$/i,
	rroot = /^(?:body|html)$/i;

if ( "getBoundingClientRect" in document.documentElement ) {
	jQuery.fn.offset = function( options ) {
		var elem = this[0], box;

		if ( options ) {
			return this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
		}

		if ( !elem || !elem.ownerDocument ) {
			return null;
		}

		if ( elem === elem.ownerDocument.body ) {
			return jQuery.offset.bodyOffset( elem );
		}

		try {
			box = elem.getBoundingClientRect();
		} catch(e) {}

		var doc = elem.ownerDocument,
			docElem = doc.documentElement;

		if ( !box || !jQuery.contains( docElem, elem ) ) {
			return box ? { top: box.top, left: box.left } : { top: 0, left: 0 };
		}

		var body = doc.body,
			win = getWindow(doc),
			clientTop  = docElem.clientTop  || body.clientTop  || 0,
			clientLeft = docElem.clientLeft || body.clientLeft || 0,
			scrollTop  = win.pageYOffset || jQuery.support.boxModel && docElem.scrollTop  || body.scrollTop,
			scrollLeft = win.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft,
			top  = box.top  + scrollTop  - clientTop,
			left = box.left + scrollLeft - clientLeft;

		return { top: top, left: left };
	};

} else {
	jQuery.fn.offset = function( options ) {
		var elem = this[0];

		if ( options ) {
			return this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
		}

		if ( !elem || !elem.ownerDocument ) {
			return null;
		}

		if ( elem === elem.ownerDocument.body ) {
			return jQuery.offset.bodyOffset( elem );
		}

		var computedStyle,
			offsetParent = elem.offsetParent,
			prevOffsetParent = elem,
			doc = elem.ownerDocument,
			docElem = doc.documentElement,
			body = doc.body,
			defaultView = doc.defaultView,
			prevComputedStyle = defaultView ? defaultView.getComputedStyle( elem, null ) : elem.currentStyle,
			top = elem.offsetTop,
			left = elem.offsetLeft;

		while ( (elem = elem.parentNode) && elem !== body && elem !== docElem ) {
			if ( jQuery.support.fixedPosition && prevComputedStyle.position === "fixed" ) {
				break;
			}

			computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
			top  -= elem.scrollTop;
			left -= elem.scrollLeft;

			if ( elem === offsetParent ) {
				top  += elem.offsetTop;
				left += elem.offsetLeft;

				if ( jQuery.support.doesNotAddBorder && !(jQuery.support.doesAddBorderForTableAndCells && rtable.test(elem.nodeName)) ) {
					top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
					left += parseFloat( computedStyle.borderLeftWidth ) || 0;
				}

				prevOffsetParent = offsetParent;
				offsetParent = elem.offsetParent;
			}

			if ( jQuery.support.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible" ) {
				top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
				left += parseFloat( computedStyle.borderLeftWidth ) || 0;
			}

			prevComputedStyle = computedStyle;
		}

		if ( prevComputedStyle.position === "relative" || prevComputedStyle.position === "static" ) {
			top  += body.offsetTop;
			left += body.offsetLeft;
		}

		if ( jQuery.support.fixedPosition && prevComputedStyle.position === "fixed" ) {
			top  += Math.max( docElem.scrollTop, body.scrollTop );
			left += Math.max( docElem.scrollLeft, body.scrollLeft );
		}

		return { top: top, left: left };
	};
}

jQuery.offset = {

	bodyOffset: function( body ) {
		var top = body.offsetTop,
			left = body.offsetLeft;

		if ( jQuery.support.doesNotIncludeMarginInBodyOffset ) {
			top  += parseFloat( jQuery.css(body, "marginTop") ) || 0;
			left += parseFloat( jQuery.css(body, "marginLeft") ) || 0;
		}

		return { top: top, left: left };
	},

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[0] ) {
			return null;
		}

		var elem = this[0],

		offsetParent = this.offsetParent(),

		offset       = this.offset(),
		parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

		offset.top  -= parseFloat( jQuery.css(elem, "marginTop") ) || 0;
		offset.left -= parseFloat( jQuery.css(elem, "marginLeft") ) || 0;

		parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], "borderTopWidth") ) || 0;
		parentOffset.left += parseFloat( jQuery.css(offsetParent[0], "borderLeftWidth") ) || 0;

		return {
			top:  offset.top  - parentOffset.top,
			left: offset.left - parentOffset.left
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.body;
			while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static") ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent;
		});
	}
});


jQuery.each( ["Left", "Top"], function( i, name ) {
	var method = "scroll" + name;

	jQuery.fn[ method ] = function( val ) {
		var elem, win;

		if ( val === undefined ) {
			elem = this[ 0 ];

			if ( !elem ) {
				return null;
			}

			win = getWindow( elem );

			return win ? ("pageXOffset" in win) ? win[ i ? "pageYOffset" : "pageXOffset" ] :
				jQuery.support.boxModel && win.document.documentElement[ method ] ||
					win.document.body[ method ] :
				elem[ method ];
		}

		return this.each(function() {
			win = getWindow( this );

			if ( win ) {
				win.scrollTo(
					!i ? val : jQuery( win ).scrollLeft(),
					 i ? val : jQuery( win ).scrollTop()
				);

			} else {
				this[ method ] = val;
			}
		});
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}




jQuery.each([ "Height", "Width" ], function( i, name ) {

	var type = name.toLowerCase();

	jQuery.fn[ "inner" + name ] = function() {
		var elem = this[0];
		return elem ?
			elem.style ?
			parseFloat( jQuery.css( elem, type, "padding" ) ) :
			this[ type ]() :
			null;
	};

	jQuery.fn[ "outer" + name ] = function( margin ) {
		var elem = this[0];
		return elem ?
			elem.style ?
			parseFloat( jQuery.css( elem, type, margin ? "margin" : "border" ) ) :
			this[ type ]() :
			null;
	};

	jQuery.fn[ type ] = function( size ) {
		var elem = this[0];
		if ( !elem ) {
			return size == null ? null : this;
		}

		if ( jQuery.isFunction( size ) ) {
			return this.each(function( i ) {
				var self = jQuery( this );
				self[ type ]( size.call( this, i, self[ type ]() ) );
			});
		}

		if ( jQuery.isWindow( elem ) ) {
			var docElemProp = elem.document.documentElement[ "client" + name ],
				body = elem.document.body;
			return elem.document.compatMode === "CSS1Compat" && docElemProp ||
				body && body[ "client" + name ] || docElemProp;

		} else if ( elem.nodeType === 9 ) {
			return Math.max(
				elem.documentElement["client" + name],
				elem.body["scroll" + name], elem.documentElement["scroll" + name],
				elem.body["offset" + name], elem.documentElement["offset" + name]
			);

		} else if ( size === undefined ) {
			var orig = jQuery.css( elem, type ),
				ret = parseFloat( orig );

			return jQuery.isNumeric( ret ) ? ret : orig;

		} else {
			return this.css( type, typeof size === "string" ? size : size + "px" );
		}
	};

});




window.jQuery = window.$ = jQuery;

if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
	define( "jquery", [], function () { return jQuery; } );
}



})( window );
/*!
 * jQuery UI 1.8.18
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function( $, undefined ) {

$.ui = $.ui || {};
if ( $.ui.version ) {
	return;
}

$.extend( $.ui, {
	version: "1.8.18",

	keyCode: {
		ALT: 18,
		BACKSPACE: 8,
		CAPS_LOCK: 20,
		COMMA: 188,
		COMMAND: 91,
		COMMAND_LEFT: 91, // COMMAND
		COMMAND_RIGHT: 93,
		CONTROL: 17,
		DELETE: 46,
		DOWN: 40,
		END: 35,
		ENTER: 13,
		ESCAPE: 27,
		HOME: 36,
		INSERT: 45,
		LEFT: 37,
		MENU: 93, // COMMAND_RIGHT
		NUMPAD_ADD: 107,
		NUMPAD_DECIMAL: 110,
		NUMPAD_DIVIDE: 111,
		NUMPAD_ENTER: 108,
		NUMPAD_MULTIPLY: 106,
		NUMPAD_SUBTRACT: 109,
		PAGE_DOWN: 34,
		PAGE_UP: 33,
		PERIOD: 190,
		RIGHT: 39,
		SHIFT: 16,
		SPACE: 32,
		TAB: 9,
		UP: 38,
		WINDOWS: 91 // COMMAND
	}
});

$.fn.extend({
	propAttr: $.fn.prop || $.fn.attr,

	_focus: $.fn.focus,
	focus: function( delay, fn ) {
		return typeof delay === "number" ?
			this.each(function() {
				var elem = this;
				setTimeout(function() {
					$( elem ).focus();
					if ( fn ) {
						fn.call( elem );
					}
				}, delay );
			}) :
			this._focus.apply( this, arguments );
	},

	scrollParent: function() {
		var scrollParent;
		if (($.browser.msie && (/(static|relative)/).test(this.css('position'))) || (/absolute/).test(this.css('position'))) {
			scrollParent = this.parents().filter(function() {
				return (/(relative|absolute|fixed)/).test($.curCSS(this,'position',1)) && (/(auto|scroll)/).test($.curCSS(this,'overflow',1)+$.curCSS(this,'overflow-y',1)+$.curCSS(this,'overflow-x',1));
			}).eq(0);
		} else {
			scrollParent = this.parents().filter(function() {
				return (/(auto|scroll)/).test($.curCSS(this,'overflow',1)+$.curCSS(this,'overflow-y',1)+$.curCSS(this,'overflow-x',1));
			}).eq(0);
		}

		return (/fixed/).test(this.css('position')) || !scrollParent.length ? $(document) : scrollParent;
	},

	zIndex: function( zIndex ) {
		if ( zIndex !== undefined ) {
			return this.css( "zIndex", zIndex );
		}

		if ( this.length ) {
			var elem = $( this[ 0 ] ), position, value;
			while ( elem.length && elem[ 0 ] !== document ) {
				position = elem.css( "position" );
				if ( position === "absolute" || position === "relative" || position === "fixed" ) {
					value = parseInt( elem.css( "zIndex" ), 10 );
					if ( !isNaN( value ) && value !== 0 ) {
						return value;
					}
				}
				elem = elem.parent();
			}
		}

		return 0;
	},

	disableSelection: function() {
		return this.bind( ( $.support.selectstart ? "selectstart" : "mousedown" ) +
			".ui-disableSelection", function( event ) {
				event.preventDefault();
			});
	},

	enableSelection: function() {
		return this.unbind( ".ui-disableSelection" );
	}
});

$.each( [ "Width", "Height" ], function( i, name ) {
	var side = name === "Width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ],
		type = name.toLowerCase(),
		orig = {
			innerWidth: $.fn.innerWidth,
			innerHeight: $.fn.innerHeight,
			outerWidth: $.fn.outerWidth,
			outerHeight: $.fn.outerHeight
		};

	function reduce( elem, size, border, margin ) {
		$.each( side, function() {
			size -= parseFloat( $.curCSS( elem, "padding" + this, true) ) || 0;
			if ( border ) {
				size -= parseFloat( $.curCSS( elem, "border" + this + "Width", true) ) || 0;
			}
			if ( margin ) {
				size -= parseFloat( $.curCSS( elem, "margin" + this, true) ) || 0;
			}
		});
		return size;
	}

	$.fn[ "inner" + name ] = function( size ) {
		if ( size === undefined ) {
			return orig[ "inner" + name ].call( this );
		}

		return this.each(function() {
			$( this ).css( type, reduce( this, size ) + "px" );
		});
	};

	$.fn[ "outer" + name] = function( size, margin ) {
		if ( typeof size !== "number" ) {
			return orig[ "outer" + name ].call( this, size );
		}

		return this.each(function() {
			$( this).css( type, reduce( this, size, true, margin ) + "px" );
		});
	};
});

function focusable( element, isTabIndexNotNaN ) {
	var nodeName = element.nodeName.toLowerCase();
	if ( "area" === nodeName ) {
		var map = element.parentNode,
			mapName = map.name,
			img;
		if ( !element.href || !mapName || map.nodeName.toLowerCase() !== "map" ) {
			return false;
		}
		img = $( "img[usemap=#" + mapName + "]" )[0];
		return !!img && visible( img );
	}
	return ( /input|select|textarea|button|object/.test( nodeName )
		? !element.disabled
		: "a" == nodeName
			? element.href || isTabIndexNotNaN
			: isTabIndexNotNaN)
		&& visible( element );
}

function visible( element ) {
	return !$( element ).parents().andSelf().filter(function() {
		return $.curCSS( this, "visibility" ) === "hidden" ||
			$.expr.filters.hidden( this );
	}).length;
}

$.extend( $.expr[ ":" ], {
	data: function( elem, i, match ) {
		return !!$.data( elem, match[ 3 ] );
	},

	focusable: function( element ) {
		return focusable( element, !isNaN( $.attr( element, "tabindex" ) ) );
	},

	tabbable: function( element ) {
		var tabIndex = $.attr( element, "tabindex" ),
			isTabIndexNaN = isNaN( tabIndex );
		return ( isTabIndexNaN || tabIndex >= 0 ) && focusable( element, !isTabIndexNaN );
	}
});

$(function() {
	var body = document.body,
		div = body.appendChild( div = document.createElement( "div" ) );

	div.offsetHeight;

	$.extend( div.style, {
		minHeight: "100px",
		height: "auto",
		padding: 0,
		borderWidth: 0
	});

	$.support.minHeight = div.offsetHeight === 100;
	$.support.selectstart = "onselectstart" in div;

	body.removeChild( div ).style.display = "none";
});





$.extend( $.ui, {
	plugin: {
		add: function( module, option, set ) {
			var proto = $.ui[ module ].prototype;
			for ( var i in set ) {
				proto.plugins[ i ] = proto.plugins[ i ] || [];
				proto.plugins[ i ].push( [ option, set[ i ] ] );
			}
		},
		call: function( instance, name, args ) {
			var set = instance.plugins[ name ];
			if ( !set || !instance.element[ 0 ].parentNode ) {
				return;
			}

			for ( var i = 0; i < set.length; i++ ) {
				if ( instance.options[ set[ i ][ 0 ] ] ) {
					set[ i ][ 1 ].apply( instance.element, args );
				}
			}
		}
	},

	contains: function( a, b ) {
		return document.compareDocumentPosition ?
			a.compareDocumentPosition( b ) & 16 :
			a !== b && a.contains( b );
	},

	hasScroll: function( el, a ) {

		if ( $( el ).css( "overflow" ) === "hidden") {
			return false;
		}

		var scroll = ( a && a === "left" ) ? "scrollLeft" : "scrollTop",
			has = false;

		if ( el[ scroll ] > 0 ) {
			return true;
		}

		el[ scroll ] = 1;
		has = ( el[ scroll ] > 0 );
		el[ scroll ] = 0;
		return has;
	},

	isOverAxis: function( x, reference, size ) {
		return ( x > reference ) && ( x < ( reference + size ) );
	},
	isOver: function( y, x, top, left, height, width ) {
		return $.ui.isOverAxis( y, top, height ) && $.ui.isOverAxis( x, left, width );
	}
});

})( jQuery );
/*!
 * jQuery UI Widget 1.8.18
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
(function( $, undefined ) {

if ( $.cleanData ) {
	var _cleanData = $.cleanData;
	$.cleanData = function( elems ) {
		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			try {
				$( elem ).triggerHandler( "remove" );
			} catch( e ) {}
		}
		_cleanData( elems );
	};
} else {
	var _remove = $.fn.remove;
	$.fn.remove = function( selector, keepData ) {
		return this.each(function() {
			if ( !keepData ) {
				if ( !selector || $.filter( selector, [ this ] ).length ) {
					$( "*", this ).add( [ this ] ).each(function() {
						try {
							$( this ).triggerHandler( "remove" );
						} catch( e ) {}
					});
				}
			}
			return _remove.call( $(this), selector, keepData );
		});
	};
}

$.widget = function( name, base, prototype ) {
	var namespace = name.split( "." )[ 0 ],
		fullName;
	name = name.split( "." )[ 1 ];
	fullName = namespace + "-" + name;

	if ( !prototype ) {
		prototype = base;
		base = $.Widget;
	}

	$.expr[ ":" ][ fullName ] = function( elem ) {
		return !!$.data( elem, name );
	};

	$[ namespace ] = $[ namespace ] || {};
	$[ namespace ][ name ] = function( options, element ) {
		if ( arguments.length ) {
			this._createWidget( options, element );
		}
	};

	var basePrototype = new base();
	basePrototype.options = $.extend( true, {}, basePrototype.options );
	$[ namespace ][ name ].prototype = $.extend( true, basePrototype, {
		namespace: namespace,
		widgetName: name,
		widgetEventPrefix: $[ namespace ][ name ].prototype.widgetEventPrefix || name,
		widgetBaseClass: fullName
	}, prototype );

	$.widget.bridge( name, $[ namespace ][ name ] );
};

$.widget.bridge = function( name, object ) {
	$.fn[ name ] = function( options ) {
		var isMethodCall = typeof options === "string",
			args = Array.prototype.slice.call( arguments, 1 ),
			returnValue = this;

		options = !isMethodCall && args.length ?
			$.extend.apply( null, [ true, options ].concat(args) ) :
			options;

		if ( isMethodCall && options.charAt( 0 ) === "_" ) {
			return returnValue;
		}

		if ( isMethodCall ) {
			this.each(function() {
				var instance = $.data( this, name ),
					methodValue = instance && $.isFunction( instance[options] ) ?
						instance[ options ].apply( instance, args ) :
						instance;
				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue;
					return false;
				}
			});
		} else {
			this.each(function() {
				var instance = $.data( this, name );
				if ( instance ) {
					instance.option( options || {} )._init();
				} else {
					$.data( this, name, new object( options, this ) );
				}
			});
		}

		return returnValue;
	};
};

$.Widget = function( options, element ) {
	if ( arguments.length ) {
		this._createWidget( options, element );
	}
};

$.Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	options: {
		disabled: false
	},
	_createWidget: function( options, element ) {
		$.data( element, this.widgetName, this );
		this.element = $( element );
		this.options = $.extend( true, {},
			this.options,
			this._getCreateOptions(),
			options );

		var self = this;
		this.element.bind( "remove." + this.widgetName, function() {
			self.destroy();
		});

		this._create();
		this._trigger( "create" );
		this._init();
	},
	_getCreateOptions: function() {
		return $.metadata && $.metadata.get( this.element[0] )[ this.widgetName ];
	},
	_create: function() {},
	_init: function() {},

	destroy: function() {
		this.element
			.unbind( "." + this.widgetName )
			.removeData( this.widgetName );
		this.widget()
			.unbind( "." + this.widgetName )
			.removeAttr( "aria-disabled" )
			.removeClass(
				this.widgetBaseClass + "-disabled " +
				"ui-state-disabled" );
	},

	widget: function() {
		return this.element;
	},

	option: function( key, value ) {
		var options = key;

		if ( arguments.length === 0 ) {
			return $.extend( {}, this.options );
		}

		if  (typeof key === "string" ) {
			if ( value === undefined ) {
				return this.options[ key ];
			}
			options = {};
			options[ key ] = value;
		}

		this._setOptions( options );

		return this;
	},
	_setOptions: function( options ) {
		var self = this;
		$.each( options, function( key, value ) {
			self._setOption( key, value );
		});

		return this;
	},
	_setOption: function( key, value ) {
		this.options[ key ] = value;

		if ( key === "disabled" ) {
			this.widget()
				[ value ? "addClass" : "removeClass"](
					this.widgetBaseClass + "-disabled" + " " +
					"ui-state-disabled" )
				.attr( "aria-disabled", value );
		}

		return this;
	},

	enable: function() {
		return this._setOption( "disabled", false );
	},
	disable: function() {
		return this._setOption( "disabled", true );
	},

	_trigger: function( type, event, data ) {
		var prop, orig,
			callback = this.options[ type ];

		data = data || {};
		event = $.Event( event );
		event.type = ( type === this.widgetEventPrefix ?
			type :
			this.widgetEventPrefix + type ).toLowerCase();
		event.target = this.element[ 0 ];

		orig = event.originalEvent;
		if ( orig ) {
			for ( prop in orig ) {
				if ( !( prop in event ) ) {
					event[ prop ] = orig[ prop ];
				}
			}
		}

		this.element.trigger( event, data );

		return !( $.isFunction(callback) &&
			callback.call( this.element[0], event, data ) === false ||
			event.isDefaultPrevented() );
	}
};

})( jQuery );
/*!
 * jQuery UI Mouse 1.8.18
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function( $, undefined ) {

var mouseHandled = false;
$( document ).mouseup( function( e ) {
	mouseHandled = false;
});

$.widget("ui.mouse", {
	options: {
		cancel: ':input,option',
		distance: 1,
		delay: 0
	},
	_mouseInit: function() {
		var self = this;

		this.element
			.bind('mousedown.'+this.widgetName, function(event) {
				return self._mouseDown(event);
			})
			.bind('click.'+this.widgetName, function(event) {
				if (true === $.data(event.target, self.widgetName + '.preventClickEvent')) {
				    $.removeData(event.target, self.widgetName + '.preventClickEvent');
					event.stopImmediatePropagation();
					return false;
				}
			});

		this.started = false;
	},

	_mouseDestroy: function() {
		this.element.unbind('.'+this.widgetName);
	},

	_mouseDown: function(event) {
		if( mouseHandled ) { return };

		(this._mouseStarted && this._mouseUp(event));

		this._mouseDownEvent = event;

		var self = this,
			btnIsLeft = (event.which == 1),
			elIsCancel = (typeof this.options.cancel == "string" && event.target.nodeName ? $(event.target).closest(this.options.cancel).length : false);
		if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
			return true;
		}

		this.mouseDelayMet = !this.options.delay;
		if (!this.mouseDelayMet) {
			this._mouseDelayTimer = setTimeout(function() {
				self.mouseDelayMet = true;
			}, this.options.delay);
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted = (this._mouseStart(event) !== false);
			if (!this._mouseStarted) {
				event.preventDefault();
				return true;
			}
		}

		if (true === $.data(event.target, this.widgetName + '.preventClickEvent')) {
			$.removeData(event.target, this.widgetName + '.preventClickEvent');
		}

		this._mouseMoveDelegate = function(event) {
			return self._mouseMove(event);
		};
		this._mouseUpDelegate = function(event) {
			return self._mouseUp(event);
		};
		$(document)
			.bind('mousemove.'+this.widgetName, this._mouseMoveDelegate)
			.bind('mouseup.'+this.widgetName, this._mouseUpDelegate);

		event.preventDefault();

		mouseHandled = true;
		return true;
	},

	_mouseMove: function(event) {
		if ($.browser.msie && !(document.documentMode >= 9) && !event.button) {
			return this._mouseUp(event);
		}

		if (this._mouseStarted) {
			this._mouseDrag(event);
			return event.preventDefault();
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted =
				(this._mouseStart(this._mouseDownEvent, event) !== false);
			(this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event));
		}

		return !this._mouseStarted;
	},

	_mouseUp: function(event) {
		$(document)
			.unbind('mousemove.'+this.widgetName, this._mouseMoveDelegate)
			.unbind('mouseup.'+this.widgetName, this._mouseUpDelegate);

		if (this._mouseStarted) {
			this._mouseStarted = false;

			if (event.target == this._mouseDownEvent.target) {
			    $.data(event.target, this.widgetName + '.preventClickEvent', true);
			}

			this._mouseStop(event);
		}

		return false;
	},

	_mouseDistanceMet: function(event) {
		return (Math.max(
				Math.abs(this._mouseDownEvent.pageX - event.pageX),
				Math.abs(this._mouseDownEvent.pageY - event.pageY)
			) >= this.options.distance
		);
	},

	_mouseDelayMet: function(event) {
		return this.mouseDelayMet;
	},

	_mouseStart: function(event) {},
	_mouseDrag: function(event) {},
	_mouseStop: function(event) {},
	_mouseCapture: function(event) { return true; }
});

})(jQuery);
/*
 * jQuery UI Position 1.8.18
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Position
 */
(function( $, undefined ) {

$.ui = $.ui || {};

var horizontalPositions = /left|center|right/,
	verticalPositions = /top|center|bottom/,
	center = "center",
	support = {},
	_position = $.fn.position,
	_offset = $.fn.offset;

$.fn.position = function( options ) {
	if ( !options || !options.of ) {
		return _position.apply( this, arguments );
	}

	options = $.extend( {}, options );

	var target = $( options.of ),
		targetElem = target[0],
		collision = ( options.collision || "flip" ).split( " " ),
		offset = options.offset ? options.offset.split( " " ) : [ 0, 0 ],
		targetWidth,
		targetHeight,
		basePosition;

	if ( targetElem.nodeType === 9 ) {
		targetWidth = target.width();
		targetHeight = target.height();
		basePosition = { top: 0, left: 0 };
	} else if ( targetElem.setTimeout ) {
		targetWidth = target.width();
		targetHeight = target.height();
		basePosition = { top: target.scrollTop(), left: target.scrollLeft() };
	} else if ( targetElem.preventDefault ) {
		options.at = "left top";
		targetWidth = targetHeight = 0;
		basePosition = { top: options.of.pageY, left: options.of.pageX };
	} else {
		targetWidth = target.outerWidth();
		targetHeight = target.outerHeight();
		basePosition = target.offset();
	}

	$.each( [ "my", "at" ], function() {
		var pos = ( options[this] || "" ).split( " " );
		if ( pos.length === 1) {
			pos = horizontalPositions.test( pos[0] ) ?
				pos.concat( [center] ) :
				verticalPositions.test( pos[0] ) ?
					[ center ].concat( pos ) :
					[ center, center ];
		}
		pos[ 0 ] = horizontalPositions.test( pos[0] ) ? pos[ 0 ] : center;
		pos[ 1 ] = verticalPositions.test( pos[1] ) ? pos[ 1 ] : center;
		options[ this ] = pos;
	});

	if ( collision.length === 1 ) {
		collision[ 1 ] = collision[ 0 ];
	}

	offset[ 0 ] = parseInt( offset[0], 10 ) || 0;
	if ( offset.length === 1 ) {
		offset[ 1 ] = offset[ 0 ];
	}
	offset[ 1 ] = parseInt( offset[1], 10 ) || 0;

	if ( options.at[0] === "right" ) {
		basePosition.left += targetWidth;
	} else if ( options.at[0] === center ) {
		basePosition.left += targetWidth / 2;
	}

	if ( options.at[1] === "bottom" ) {
		basePosition.top += targetHeight;
	} else if ( options.at[1] === center ) {
		basePosition.top += targetHeight / 2;
	}

	basePosition.left += offset[ 0 ];
	basePosition.top += offset[ 1 ];

	return this.each(function() {
		var elem = $( this ),
			elemWidth = elem.outerWidth(),
			elemHeight = elem.outerHeight(),
			marginLeft = parseInt( $.curCSS( this, "marginLeft", true ) ) || 0,
			marginTop = parseInt( $.curCSS( this, "marginTop", true ) ) || 0,
			collisionWidth = elemWidth + marginLeft +
				( parseInt( $.curCSS( this, "marginRight", true ) ) || 0 ),
			collisionHeight = elemHeight + marginTop +
				( parseInt( $.curCSS( this, "marginBottom", true ) ) || 0 ),
			position = $.extend( {}, basePosition ),
			collisionPosition;

		if ( options.my[0] === "right" ) {
			position.left -= elemWidth;
		} else if ( options.my[0] === center ) {
			position.left -= elemWidth / 2;
		}

		if ( options.my[1] === "bottom" ) {
			position.top -= elemHeight;
		} else if ( options.my[1] === center ) {
			position.top -= elemHeight / 2;
		}

		if ( !support.fractions ) {
			position.left = Math.round( position.left );
			position.top = Math.round( position.top );
		}

		collisionPosition = {
			left: position.left - marginLeft,
			top: position.top - marginTop
		};

		$.each( [ "left", "top" ], function( i, dir ) {
			if ( $.ui.position[ collision[i] ] ) {
				$.ui.position[ collision[i] ][ dir ]( position, {
					targetWidth: targetWidth,
					targetHeight: targetHeight,
					elemWidth: elemWidth,
					elemHeight: elemHeight,
					collisionPosition: collisionPosition,
					collisionWidth: collisionWidth,
					collisionHeight: collisionHeight,
					offset: offset,
					my: options.my,
					at: options.at
				});
			}
		});

		if ( $.fn.bgiframe ) {
			elem.bgiframe();
		}
		elem.offset( $.extend( position, { using: options.using } ) );
	});
};

$.ui.position = {
	fit: {
		left: function( position, data ) {
			var win = $( window ),
				over = data.collisionPosition.left + data.collisionWidth - win.width() - win.scrollLeft();
			position.left = over > 0 ? position.left - over : Math.max( position.left - data.collisionPosition.left, position.left );
		},
		top: function( position, data ) {
			var win = $( window ),
				over = data.collisionPosition.top + data.collisionHeight - win.height() - win.scrollTop();
			position.top = over > 0 ? position.top - over : Math.max( position.top - data.collisionPosition.top, position.top );
		}
	},

	flip: {
		left: function( position, data ) {
			if ( data.at[0] === center ) {
				return;
			}
			var win = $( window ),
				over = data.collisionPosition.left + data.collisionWidth - win.width() - win.scrollLeft(),
				myOffset = data.my[ 0 ] === "left" ?
					-data.elemWidth :
					data.my[ 0 ] === "right" ?
						data.elemWidth :
						0,
				atOffset = data.at[ 0 ] === "left" ?
					data.targetWidth :
					-data.targetWidth,
				offset = -2 * data.offset[ 0 ];
			position.left += data.collisionPosition.left < 0 ?
				myOffset + atOffset + offset :
				over > 0 ?
					myOffset + atOffset + offset :
					0;
		},
		top: function( position, data ) {
			if ( data.at[1] === center ) {
				return;
			}
			var win = $( window ),
				over = data.collisionPosition.top + data.collisionHeight - win.height() - win.scrollTop(),
				myOffset = data.my[ 1 ] === "top" ?
					-data.elemHeight :
					data.my[ 1 ] === "bottom" ?
						data.elemHeight :
						0,
				atOffset = data.at[ 1 ] === "top" ?
					data.targetHeight :
					-data.targetHeight,
				offset = -2 * data.offset[ 1 ];
			position.top += data.collisionPosition.top < 0 ?
				myOffset + atOffset + offset :
				over > 0 ?
					myOffset + atOffset + offset :
					0;
		}
	}
};

if ( !$.offset.setOffset ) {
	$.offset.setOffset = function( elem, options ) {
		if ( /static/.test( $.curCSS( elem, "position" ) ) ) {
			elem.style.position = "relative";
		}
		var curElem   = $( elem ),
			curOffset = curElem.offset(),
			curTop    = parseInt( $.curCSS( elem, "top",  true ), 10 ) || 0,
			curLeft   = parseInt( $.curCSS( elem, "left", true ), 10)  || 0,
			props     = {
				top:  (options.top  - curOffset.top)  + curTop,
				left: (options.left - curOffset.left) + curLeft
			};

		if ( 'using' in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	};

	$.fn.offset = function( options ) {
		var elem = this[ 0 ];
		if ( !elem || !elem.ownerDocument ) { return null; }
		if ( options ) {
			return this.each(function() {
				$.offset.setOffset( this, options );
			});
		}
		return _offset.call( this );
	};
}

(function () {
	var body = document.getElementsByTagName( "body" )[ 0 ],
		div = document.createElement( "div" ),
		testElement, testElementParent, testElementStyle, offset, offsetTotal;

	testElement = document.createElement( body ? "div" : "body" );
	testElementStyle = {
		visibility: "hidden",
		width: 0,
		height: 0,
		border: 0,
		margin: 0,
		background: "none"
	};
	if ( body ) {
		$.extend( testElementStyle, {
			position: "absolute",
			left: "-1000px",
			top: "-1000px"
		});
	}
	for ( var i in testElementStyle ) {
		testElement.style[ i ] = testElementStyle[ i ];
	}
	testElement.appendChild( div );
	testElementParent = body || document.documentElement;
	testElementParent.insertBefore( testElement, testElementParent.firstChild );

	div.style.cssText = "position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;";

	offset = $( div ).offset( function( _, offset ) {
		return offset;
	}).offset();

	testElement.innerHTML = "";
	testElementParent.removeChild( testElement );

	offsetTotal = offset.top + offset.left + ( body ? 2000 : 0 );
	support.fractions = offsetTotal > 21 && offsetTotal < 22;
})();

}( jQuery ));
/*
 * jQuery UI Sortable 1.8.18
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Sortables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function( $, undefined ) {

$.widget("ui.sortable", $.ui.mouse, {
	widgetEventPrefix: "sort",
	ready: false,
	options: {
		appendTo: "parent",
		axis: false,
		connectWith: false,
		containment: false,
		cursor: 'auto',
		cursorAt: false,
		dropOnEmpty: true,
		forcePlaceholderSize: false,
		forceHelperSize: false,
		grid: false,
		handle: false,
		helper: "original",
		items: '> *',
		opacity: false,
		placeholder: false,
		revert: false,
		scroll: true,
		scrollSensitivity: 20,
		scrollSpeed: 20,
		scope: "default",
		tolerance: "intersect",
		zIndex: 1000
	},
	_create: function() {

		var o = this.options;
		this.containerCache = {};
		this.element.addClass("ui-sortable");

		this.refresh();

		this.floating = this.items.length ? o.axis === 'x' || (/left|right/).test(this.items[0].item.css('float')) || (/inline|table-cell/).test(this.items[0].item.css('display')) : false;

		this.offset = this.element.offset();

		this._mouseInit();

		this.ready = true

	},

	destroy: function() {
		$.Widget.prototype.destroy.call( this );
		this.element
			.removeClass("ui-sortable ui-sortable-disabled");
		this._mouseDestroy();

		for ( var i = this.items.length - 1; i >= 0; i-- )
			this.items[i].item.removeData(this.widgetName + "-item");

		return this;
	},

	_setOption: function(key, value){
		if ( key === "disabled" ) {
			this.options[ key ] = value;

			this.widget()
				[ value ? "addClass" : "removeClass"]( "ui-sortable-disabled" );
		} else {
			$.Widget.prototype._setOption.apply(this, arguments);
		}
	},

	_mouseCapture: function(event, overrideHandle) {
		var that = this;

		if (this.reverting) {
			return false;
		}

		if(this.options.disabled || this.options.type == 'static') return false;

		this._refreshItems(event);

		var currentItem = null, self = this, nodes = $(event.target).parents().each(function() {
			if($.data(this, that.widgetName + '-item') == self) {
				currentItem = $(this);
				return false;
			}
		});
		if($.data(event.target, that.widgetName + '-item') == self) currentItem = $(event.target);

		if(!currentItem) return false;
		if(this.options.handle && !overrideHandle) {
			var validHandle = false;

			$(this.options.handle, currentItem).find("*").andSelf().each(function() { if(this == event.target) validHandle = true; });
			if(!validHandle) return false;
		}

		this.currentItem = currentItem;
		this._removeCurrentsFromItems();
		return true;

	},

	_mouseStart: function(event, overrideHandle, noActivation) {

		var o = this.options, self = this;
		this.currentContainer = this;

		this.refreshPositions();

		this.helper = this._createHelper(event);

		this._cacheHelperProportions();

		/*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */

		this._cacheMargins();

		this.scrollParent = this.helper.scrollParent();

		this.offset = this.currentItem.offset();
		this.offset = {
			top: this.offset.top - this.margins.top,
			left: this.offset.left - this.margins.left
		};

		this.helper.css("position", "absolute");
		this.cssPosition = this.helper.css("position");

		$.extend(this.offset, {
			click: { //Where the click happened, relative to the element
				left: event.pageX - this.offset.left,
				top: event.pageY - this.offset.top
			},
			parent: this._getParentOffset(),
			relative: this._getRelativeOffset() //This is a relative to absolute position minus the actual position calculation - only used for relative positioned helper
		});

		this.originalPosition = this._generatePosition(event);
		this.originalPageX = event.pageX;
		this.originalPageY = event.pageY;

		(o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt));

		this.domPosition = { prev: this.currentItem.prev()[0], parent: this.currentItem.parent()[0] };

		if(this.helper[0] != this.currentItem[0]) {
			this.currentItem.hide();
		}

		this._createPlaceholder();

		if(o.containment)
			this._setContainment();

		if(o.cursor) { // cursor option
			if ($('body').css("cursor")) this._storedCursor = $('body').css("cursor");
			$('body').css("cursor", o.cursor);
		}

		if(o.opacity) { // opacity option
			if (this.helper.css("opacity")) this._storedOpacity = this.helper.css("opacity");
			this.helper.css("opacity", o.opacity);
		}

		if(o.zIndex) { // zIndex option
			if (this.helper.css("zIndex")) this._storedZIndex = this.helper.css("zIndex");
			this.helper.css("zIndex", o.zIndex);
		}

		if(this.scrollParent[0] != document && this.scrollParent[0].tagName != 'HTML')
			this.overflowOffset = this.scrollParent.offset();

		this._trigger("start", event, this._uiHash());

		if(!this._preserveHelperProportions)
			this._cacheHelperProportions();


		if(!noActivation) {
			 for (var i = this.containers.length - 1; i >= 0; i--) { this.containers[i]._trigger("activate", event, self._uiHash(this)); }
		}

		if($.ui.ddmanager)
			$.ui.ddmanager.current = this;

		if ($.ui.ddmanager && !o.dropBehaviour)
			$.ui.ddmanager.prepareOffsets(this, event);

		this.dragging = true;

		this.helper.addClass("ui-sortable-helper");
		this._mouseDrag(event); //Execute the drag once - this causes the helper not to be visible before getting its correct position
		return true;

	},

	_mouseDrag: function(event) {

		this.position = this._generatePosition(event);
		this.positionAbs = this._convertPositionTo("absolute");

		if (!this.lastPositionAbs) {
			this.lastPositionAbs = this.positionAbs;
		}

		if(this.options.scroll) {
			var o = this.options, scrolled = false;
			if(this.scrollParent[0] != document && this.scrollParent[0].tagName != 'HTML') {

				if((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - event.pageY < o.scrollSensitivity)
					this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop + o.scrollSpeed;
				else if(event.pageY - this.overflowOffset.top < o.scrollSensitivity)
					this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop - o.scrollSpeed;

				if((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - event.pageX < o.scrollSensitivity)
					this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft + o.scrollSpeed;
				else if(event.pageX - this.overflowOffset.left < o.scrollSensitivity)
					this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft - o.scrollSpeed;

			} else {

				if(event.pageY - $(document).scrollTop() < o.scrollSensitivity)
					scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
				else if($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity)
					scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);

				if(event.pageX - $(document).scrollLeft() < o.scrollSensitivity)
					scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
				else if($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity)
					scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);

			}

			if(scrolled !== false && $.ui.ddmanager && !o.dropBehaviour)
				$.ui.ddmanager.prepareOffsets(this, event);
		}

		this.positionAbs = this._convertPositionTo("absolute");

		if(!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left+'px';
		if(!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top+'px';

		for (var i = this.items.length - 1; i >= 0; i--) {

			var item = this.items[i], itemElement = item.item[0], intersection = this._intersectsWithPointer(item);
			if (!intersection) continue;

			if(itemElement != this.currentItem[0] //cannot intersect with itself
				&&	this.placeholder[intersection == 1 ? "next" : "prev"]()[0] != itemElement //no useless actions that have been done before
				&&	!$.ui.contains(this.placeholder[0], itemElement) //no action if the item moved is the parent of the item checked
				&& (this.options.type == 'semi-dynamic' ? !$.ui.contains(this.element[0], itemElement) : true)
			) {

				this.direction = intersection == 1 ? "down" : "up";

				if (this.options.tolerance == "pointer" || this._intersectsWithSides(item)) {
					this._rearrange(event, item);
				} else {
					break;
				}

				this._trigger("change", event, this._uiHash());
				break;
			}
		}

		this._contactContainers(event);

		if($.ui.ddmanager) $.ui.ddmanager.drag(this, event);

		this._trigger('sort', event, this._uiHash());

		this.lastPositionAbs = this.positionAbs;
		return false;

	},

	_mouseStop: function(event, noPropagation) {

		if(!event) return;

		if ($.ui.ddmanager && !this.options.dropBehaviour)
			$.ui.ddmanager.drop(this, event);

		if(this.options.revert) {
			var self = this;
			var cur = self.placeholder.offset();

			self.reverting = true;

			$(this.helper).animate({
				left: cur.left - this.offset.parent.left - self.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
				top: cur.top - this.offset.parent.top - self.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
			}, parseInt(this.options.revert, 10) || 500, function() {
				self._clear(event);
			});
		} else {
			this._clear(event, noPropagation);
		}

		return false;

	},

	cancel: function() {

		var self = this;

		if(this.dragging) {

			this._mouseUp({ target: null });

			if(this.options.helper == "original")
				this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
			else
				this.currentItem.show();

			for (var i = this.containers.length - 1; i >= 0; i--){
				this.containers[i]._trigger("deactivate", null, self._uiHash(this));
				if(this.containers[i].containerCache.over) {
					this.containers[i]._trigger("out", null, self._uiHash(this));
					this.containers[i].containerCache.over = 0;
				}
			}

		}

		if (this.placeholder) {
			if(this.placeholder[0].parentNode) this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
			if(this.options.helper != "original" && this.helper && this.helper[0].parentNode) this.helper.remove();

			$.extend(this, {
				helper: null,
				dragging: false,
				reverting: false,
				_noFinalSort: null
			});

			if(this.domPosition.prev) {
				$(this.domPosition.prev).after(this.currentItem);
			} else {
				$(this.domPosition.parent).prepend(this.currentItem);
			}
		}

		return this;

	},

	serialize: function(o) {

		var items = this._getItemsAsjQuery(o && o.connected);
		var str = []; o = o || {};

		$(items).each(function() {
			var res = ($(o.item || this).attr(o.attribute || 'id') || '').match(o.expression || (/(.+)[-=_](.+)/));
			if(res) str.push((o.key || res[1]+'[]')+'='+(o.key && o.expression ? res[1] : res[2]));
		});

		if(!str.length && o.key) {
			str.push(o.key + '=');
		}

		return str.join('&');

	},

	toArray: function(o) {

		var items = this._getItemsAsjQuery(o && o.connected);
		var ret = []; o = o || {};

		items.each(function() { ret.push($(o.item || this).attr(o.attribute || 'id') || ''); });
		return ret;

	},

	/* Be careful with the following core functions */
	_intersectsWith: function(item) {

		var x1 = this.positionAbs.left,
			x2 = x1 + this.helperProportions.width,
			y1 = this.positionAbs.top,
			y2 = y1 + this.helperProportions.height;

		var l = item.left,
			r = l + item.width,
			t = item.top,
			b = t + item.height;

		var dyClick = this.offset.click.top,
			dxClick = this.offset.click.left;

		var isOverElement = (y1 + dyClick) > t && (y1 + dyClick) < b && (x1 + dxClick) > l && (x1 + dxClick) < r;

		if(	   this.options.tolerance == "pointer"
			|| this.options.forcePointerForContainers
			|| (this.options.tolerance != "pointer" && this.helperProportions[this.floating ? 'width' : 'height'] > item[this.floating ? 'width' : 'height'])
		) {
			return isOverElement;
		} else {

			return (l < x1 + (this.helperProportions.width / 2) // Right Half
				&& x2 - (this.helperProportions.width / 2) < r // Left Half
				&& t < y1 + (this.helperProportions.height / 2) // Bottom Half
				&& y2 - (this.helperProportions.height / 2) < b ); // Top Half

		}
	},

	_intersectsWithPointer: function(item) {

		var isOverElementHeight = $.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, item.top, item.height),
			isOverElementWidth = $.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, item.left, item.width),
			isOverElement = isOverElementHeight && isOverElementWidth,
			verticalDirection = this._getDragVerticalDirection(),
			horizontalDirection = this._getDragHorizontalDirection();

		if (!isOverElement)
			return false;

		return this.floating ?
			( ((horizontalDirection && horizontalDirection == "right") || verticalDirection == "down") ? 2 : 1 )
			: ( verticalDirection && (verticalDirection == "down" ? 2 : 1) );

	},

	_intersectsWithSides: function(item) {

		var isOverBottomHalf = $.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, item.top + (item.height/2), item.height),
			isOverRightHalf = $.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, item.left + (item.width/2), item.width),
			verticalDirection = this._getDragVerticalDirection(),
			horizontalDirection = this._getDragHorizontalDirection();

		if (this.floating && horizontalDirection) {
			return ((horizontalDirection == "right" && isOverRightHalf) || (horizontalDirection == "left" && !isOverRightHalf));
		} else {
			return verticalDirection && ((verticalDirection == "down" && isOverBottomHalf) || (verticalDirection == "up" && !isOverBottomHalf));
		}

	},

	_getDragVerticalDirection: function() {
		var delta = this.positionAbs.top - this.lastPositionAbs.top;
		return delta != 0 && (delta > 0 ? "down" : "up");
	},

	_getDragHorizontalDirection: function() {
		var delta = this.positionAbs.left - this.lastPositionAbs.left;
		return delta != 0 && (delta > 0 ? "right" : "left");
	},

	refresh: function(event) {
		this._refreshItems(event);
		this.refreshPositions();
		return this;
	},

	_connectWith: function() {
		var options = this.options;
		return options.connectWith.constructor == String
			? [options.connectWith]
			: options.connectWith;
	},

	_getItemsAsjQuery: function(connected) {

		var self = this;
		var items = [];
		var queries = [];
		var connectWith = this._connectWith();

		if(connectWith && connected) {
			for (var i = connectWith.length - 1; i >= 0; i--){
				var cur = $(connectWith[i]);
				for (var j = cur.length - 1; j >= 0; j--){
					var inst = $.data(cur[j], this.widgetName);
					if(inst && inst != this && !inst.options.disabled) {
						queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element) : $(inst.options.items, inst.element).not(".ui-sortable-helper").not('.ui-sortable-placeholder'), inst]);
					}
				};
			};
		}

		queries.push([$.isFunction(this.options.items) ? this.options.items.call(this.element, null, { options: this.options, item: this.currentItem }) : $(this.options.items, this.element).not(".ui-sortable-helper").not('.ui-sortable-placeholder'), this]);

		for (var i = queries.length - 1; i >= 0; i--){
			queries[i][0].each(function() {
				items.push(this);
			});
		};

		return $(items);

	},

	_removeCurrentsFromItems: function() {

		var list = this.currentItem.find(":data(" + this.widgetName + "-item)");

		for (var i=0; i < this.items.length; i++) {

			for (var j=0; j < list.length; j++) {
				if(list[j] == this.items[i].item[0])
					this.items.splice(i,1);
			};

		};

	},

	_refreshItems: function(event) {

		this.items = [];
		this.containers = [this];
		var items = this.items;
		var self = this;
		var queries = [[$.isFunction(this.options.items) ? this.options.items.call(this.element[0], event, { item: this.currentItem }) : $(this.options.items, this.element), this]];
		var connectWith = this._connectWith();

		if(connectWith && this.ready) { //Shouldn't be run the first time through due to massive slow-down
			for (var i = connectWith.length - 1; i >= 0; i--){
				var cur = $(connectWith[i]);
				for (var j = cur.length - 1; j >= 0; j--){
					var inst = $.data(cur[j], this.widgetName);
					if(inst && inst != this && !inst.options.disabled) {
						queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element[0], event, { item: this.currentItem }) : $(inst.options.items, inst.element), inst]);
						this.containers.push(inst);
					}
				};
			};
		}

		for (var i = queries.length - 1; i >= 0; i--) {
			var targetData = queries[i][1];
			var _queries = queries[i][0];

			for (var j=0, queriesLength = _queries.length; j < queriesLength; j++) {
				var item = $(_queries[j]);

				item.data(this.widgetName + '-item', targetData); // Data for target checking (mouse manager)

				items.push({
					item: item,
					instance: targetData,
					width: 0, height: 0,
					left: 0, top: 0
				});
			};
		};

	},

	refreshPositions: function(fast) {

		if(this.offsetParent && this.helper) {
			this.offset.parent = this._getParentOffset();
		}

		for (var i = this.items.length - 1; i >= 0; i--){
			var item = this.items[i];

			if(item.instance != this.currentContainer && this.currentContainer && item.item[0] != this.currentItem[0])
				continue;

			var t = this.options.toleranceElement ? $(this.options.toleranceElement, item.item) : item.item;

			if (!fast) {
				item.width = t.outerWidth();
				item.height = t.outerHeight();
			}

			var p = t.offset();
			item.left = p.left;
			item.top = p.top;
		};

		if(this.options.custom && this.options.custom.refreshContainers) {
			this.options.custom.refreshContainers.call(this);
		} else {
			for (var i = this.containers.length - 1; i >= 0; i--){
				var p = this.containers[i].element.offset();
				this.containers[i].containerCache.left = p.left;
				this.containers[i].containerCache.top = p.top;
				this.containers[i].containerCache.width	= this.containers[i].element.outerWidth();
				this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
			};
		}

		return this;
	},

	_createPlaceholder: function(that) {

		var self = that || this, o = self.options;

		if(!o.placeholder || o.placeholder.constructor == String) {
			var className = o.placeholder;
			o.placeholder = {
				element: function() {

					var el = $(document.createElement(self.currentItem[0].nodeName))
						.addClass(className || self.currentItem[0].className+" ui-sortable-placeholder")
						.removeClass("ui-sortable-helper")[0];

					if(!className)
						el.style.visibility = "hidden";

					return el;
				},
				update: function(container, p) {

					if(className && !o.forcePlaceholderSize) return;

					if(!p.height()) { p.height(self.currentItem.innerHeight() - parseInt(self.currentItem.css('paddingTop')||0, 10) - parseInt(self.currentItem.css('paddingBottom')||0, 10)); };
					if(!p.width()) { p.width(self.currentItem.innerWidth() - parseInt(self.currentItem.css('paddingLeft')||0, 10) - parseInt(self.currentItem.css('paddingRight')||0, 10)); };
				}
			};
		}

		self.placeholder = $(o.placeholder.element.call(self.element, self.currentItem));

		self.currentItem.after(self.placeholder);

		o.placeholder.update(self, self.placeholder);

	},

	_contactContainers: function(event) {

		var innermostContainer = null, innermostIndex = null;


		for (var i = this.containers.length - 1; i >= 0; i--){

			if($.ui.contains(this.currentItem[0], this.containers[i].element[0]))
				continue;

			if(this._intersectsWith(this.containers[i].containerCache)) {

				if(innermostContainer && $.ui.contains(this.containers[i].element[0], innermostContainer.element[0]))
					continue;

				innermostContainer = this.containers[i];
				innermostIndex = i;

			} else {
				if(this.containers[i].containerCache.over) {
					this.containers[i]._trigger("out", event, this._uiHash(this));
					this.containers[i].containerCache.over = 0;
				}
			}

		}

		if(!innermostContainer) return;

		if(this.containers.length === 1) {
			this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
			this.containers[innermostIndex].containerCache.over = 1;
		} else if(this.currentContainer != this.containers[innermostIndex]) {

			var dist = 10000; var itemWithLeastDistance = null; var base = this.positionAbs[this.containers[innermostIndex].floating ? 'left' : 'top'];
			for (var j = this.items.length - 1; j >= 0; j--) {
				if(!$.ui.contains(this.containers[innermostIndex].element[0], this.items[j].item[0])) continue;
				var cur = this.items[j][this.containers[innermostIndex].floating ? 'left' : 'top'];
				if(Math.abs(cur - base) < dist) {
					dist = Math.abs(cur - base); itemWithLeastDistance = this.items[j];
				}
			}

			if(!itemWithLeastDistance && !this.options.dropOnEmpty) //Check if dropOnEmpty is enabled
				return;

			this.currentContainer = this.containers[innermostIndex];
			itemWithLeastDistance ? this._rearrange(event, itemWithLeastDistance, null, true) : this._rearrange(event, null, this.containers[innermostIndex].element, true);
			this._trigger("change", event, this._uiHash());
			this.containers[innermostIndex]._trigger("change", event, this._uiHash(this));

			this.options.placeholder.update(this.currentContainer, this.placeholder);

			this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
			this.containers[innermostIndex].containerCache.over = 1;
		}


	},

	_createHelper: function(event) {

		var o = this.options;
		var helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event, this.currentItem])) : (o.helper == 'clone' ? this.currentItem.clone() : this.currentItem);

		if(!helper.parents('body').length) //Add the helper to the DOM if that didn't happen already
			$(o.appendTo != 'parent' ? o.appendTo : this.currentItem[0].parentNode)[0].appendChild(helper[0]);

		if(helper[0] == this.currentItem[0])
			this._storedCSS = { width: this.currentItem[0].style.width, height: this.currentItem[0].style.height, position: this.currentItem.css("position"), top: this.currentItem.css("top"), left: this.currentItem.css("left") };

		if(helper[0].style.width == '' || o.forceHelperSize) helper.width(this.currentItem.width());
		if(helper[0].style.height == '' || o.forceHelperSize) helper.height(this.currentItem.height());

		return helper;

	},

	_adjustOffsetFromHelper: function(obj) {
		if (typeof obj == 'string') {
			obj = obj.split(' ');
		}
		if ($.isArray(obj)) {
			obj = {left: +obj[0], top: +obj[1] || 0};
		}
		if ('left' in obj) {
			this.offset.click.left = obj.left + this.margins.left;
		}
		if ('right' in obj) {
			this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
		}
		if ('top' in obj) {
			this.offset.click.top = obj.top + this.margins.top;
		}
		if ('bottom' in obj) {
			this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
		}
	},

	_getParentOffset: function() {


		this.offsetParent = this.helper.offsetParent();
		var po = this.offsetParent.offset();

		if(this.cssPosition == 'absolute' && this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
			po.left += this.scrollParent.scrollLeft();
			po.top += this.scrollParent.scrollTop();
		}

		if((this.offsetParent[0] == document.body) //This needs to be actually done for all browsers, since pageX/pageY includes this information
		|| (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == 'html' && $.browser.msie)) //Ugly IE fix
			po = { top: 0, left: 0 };

		return {
			top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"),10) || 0),
			left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"),10) || 0)
		};

	},

	_getRelativeOffset: function() {

		if(this.cssPosition == "relative") {
			var p = this.currentItem.position();
			return {
				top: p.top - (parseInt(this.helper.css("top"),10) || 0) + this.scrollParent.scrollTop(),
				left: p.left - (parseInt(this.helper.css("left"),10) || 0) + this.scrollParent.scrollLeft()
			};
		} else {
			return { top: 0, left: 0 };
		}

	},

	_cacheMargins: function() {
		this.margins = {
			left: (parseInt(this.currentItem.css("marginLeft"),10) || 0),
			top: (parseInt(this.currentItem.css("marginTop"),10) || 0)
		};
	},

	_cacheHelperProportions: function() {
		this.helperProportions = {
			width: this.helper.outerWidth(),
			height: this.helper.outerHeight()
		};
	},

	_setContainment: function() {

		var o = this.options;
		if(o.containment == 'parent') o.containment = this.helper[0].parentNode;
		if(o.containment == 'document' || o.containment == 'window') this.containment = [
			0 - this.offset.relative.left - this.offset.parent.left,
			0 - this.offset.relative.top - this.offset.parent.top,
			$(o.containment == 'document' ? document : window).width() - this.helperProportions.width - this.margins.left,
			($(o.containment == 'document' ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
		];

		if(!(/^(document|window|parent)$/).test(o.containment)) {
			var ce = $(o.containment)[0];
			var co = $(o.containment).offset();
			var over = ($(ce).css("overflow") != 'hidden');

			this.containment = [
				co.left + (parseInt($(ce).css("borderLeftWidth"),10) || 0) + (parseInt($(ce).css("paddingLeft"),10) || 0) - this.margins.left,
				co.top + (parseInt($(ce).css("borderTopWidth"),10) || 0) + (parseInt($(ce).css("paddingTop"),10) || 0) - this.margins.top,
				co.left+(over ? Math.max(ce.scrollWidth,ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"),10) || 0) - (parseInt($(ce).css("paddingRight"),10) || 0) - this.helperProportions.width - this.margins.left,
				co.top+(over ? Math.max(ce.scrollHeight,ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"),10) || 0) - (parseInt($(ce).css("paddingBottom"),10) || 0) - this.helperProportions.height - this.margins.top
			];
		}

	},

	_convertPositionTo: function(d, pos) {

		if(!pos) pos = this.position;
		var mod = d == "absolute" ? 1 : -1;
		var o = this.options, scroll = this.cssPosition == 'absolute' && !(this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);

		return {
			top: (
				pos.top																	// The absolute mouse position
				+ this.offset.relative.top * mod										// Only for relative positioned nodes: Relative offset from element to offset parent
				+ this.offset.parent.top * mod											// The offsetParent's offset without borders (offset + border)
				- ($.browser.safari && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ) * mod)
			),
			left: (
				pos.left																// The absolute mouse position
				+ this.offset.relative.left * mod										// Only for relative positioned nodes: Relative offset from element to offset parent
				+ this.offset.parent.left * mod											// The offsetParent's offset without borders (offset + border)
				- ($.browser.safari && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ) * mod)
			)
		};

	},

	_generatePosition: function(event) {

		var o = this.options, scroll = this.cssPosition == 'absolute' && !(this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);

		if(this.cssPosition == 'relative' && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) {
			this.offset.relative = this._getRelativeOffset();
		}

		var pageX = event.pageX;
		var pageY = event.pageY;

		/*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */

		if(this.originalPosition) { //If we are not dragging yet, we won't check for options

			if(this.containment) {
				if(event.pageX - this.offset.click.left < this.containment[0]) pageX = this.containment[0] + this.offset.click.left;
				if(event.pageY - this.offset.click.top < this.containment[1]) pageY = this.containment[1] + this.offset.click.top;
				if(event.pageX - this.offset.click.left > this.containment[2]) pageX = this.containment[2] + this.offset.click.left;
				if(event.pageY - this.offset.click.top > this.containment[3]) pageY = this.containment[3] + this.offset.click.top;
			}

			if(o.grid) {
				var top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];
				pageY = this.containment ? (!(top - this.offset.click.top < this.containment[1] || top - this.offset.click.top > this.containment[3]) ? top : (!(top - this.offset.click.top < this.containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;

				var left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];
				pageX = this.containment ? (!(left - this.offset.click.left < this.containment[0] || left - this.offset.click.left > this.containment[2]) ? left : (!(left - this.offset.click.left < this.containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
			}

		}

		return {
			top: (
				pageY																// The absolute mouse position
				- this.offset.click.top													// Click offset (relative to the element)
				- this.offset.relative.top												// Only for relative positioned nodes: Relative offset from element to offset parent
				- this.offset.parent.top												// The offsetParent's offset without borders (offset + border)
				+ ($.browser.safari && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ))
			),
			left: (
				pageX																// The absolute mouse position
				- this.offset.click.left												// Click offset (relative to the element)
				- this.offset.relative.left												// Only for relative positioned nodes: Relative offset from element to offset parent
				- this.offset.parent.left												// The offsetParent's offset without borders (offset + border)
				+ ($.browser.safari && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ))
			)
		};

	},

	_rearrange: function(event, i, a, hardRefresh) {

		a ? a[0].appendChild(this.placeholder[0]) : i.item[0].parentNode.insertBefore(this.placeholder[0], (this.direction == 'down' ? i.item[0] : i.item[0].nextSibling));

		this.counter = this.counter ? ++this.counter : 1;
		var self = this, counter = this.counter;

		window.setTimeout(function() {
			if(counter == self.counter) self.refreshPositions(!hardRefresh); //Precompute after each DOM insertion, NOT on mousemove
		},0);

	},

	_clear: function(event, noPropagation) {

		this.reverting = false;
		var delayedTriggers = [], self = this;

		if(!this._noFinalSort && this.currentItem.parent().length) this.placeholder.before(this.currentItem);
		this._noFinalSort = null;

		if(this.helper[0] == this.currentItem[0]) {
			for(var i in this._storedCSS) {
				if(this._storedCSS[i] == 'auto' || this._storedCSS[i] == 'static') this._storedCSS[i] = '';
			}
			this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
		} else {
			this.currentItem.show();
		}

		if(this.fromOutside && !noPropagation) delayedTriggers.push(function(event) { this._trigger("receive", event, this._uiHash(this.fromOutside)); });
		if((this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !noPropagation) delayedTriggers.push(function(event) { this._trigger("update", event, this._uiHash()); }); //Trigger update callback if the DOM position has changed
		if(!$.ui.contains(this.element[0], this.currentItem[0])) { //Node was moved out of the current element
			if(!noPropagation) delayedTriggers.push(function(event) { this._trigger("remove", event, this._uiHash()); });
			for (var i = this.containers.length - 1; i >= 0; i--){
				if($.ui.contains(this.containers[i].element[0], this.currentItem[0]) && !noPropagation) {
					delayedTriggers.push((function(c) { return function(event) { c._trigger("receive", event, this._uiHash(this)); };  }).call(this, this.containers[i]));
					delayedTriggers.push((function(c) { return function(event) { c._trigger("update", event, this._uiHash(this));  }; }).call(this, this.containers[i]));
				}
			};
		};

		for (var i = this.containers.length - 1; i >= 0; i--){
			if(!noPropagation) delayedTriggers.push((function(c) { return function(event) { c._trigger("deactivate", event, this._uiHash(this)); };  }).call(this, this.containers[i]));
			if(this.containers[i].containerCache.over) {
				delayedTriggers.push((function(c) { return function(event) { c._trigger("out", event, this._uiHash(this)); };  }).call(this, this.containers[i]));
				this.containers[i].containerCache.over = 0;
			}
		}

		if(this._storedCursor) $('body').css("cursor", this._storedCursor); //Reset cursor
		if(this._storedOpacity) this.helper.css("opacity", this._storedOpacity); //Reset opacity
		if(this._storedZIndex) this.helper.css("zIndex", this._storedZIndex == 'auto' ? '' : this._storedZIndex); //Reset z-index

		this.dragging = false;
		if(this.cancelHelperRemoval) {
			if(!noPropagation) {
				this._trigger("beforeStop", event, this._uiHash());
				for (var i=0; i < delayedTriggers.length; i++) { delayedTriggers[i].call(this, event); }; //Trigger all delayed events
				this._trigger("stop", event, this._uiHash());
			}
			return false;
		}

		if(!noPropagation) this._trigger("beforeStop", event, this._uiHash());

		this.placeholder[0].parentNode.removeChild(this.placeholder[0]);

		if(this.helper[0] != this.currentItem[0]) this.helper.remove(); this.helper = null;

		if(!noPropagation) {
			for (var i=0; i < delayedTriggers.length; i++) { delayedTriggers[i].call(this, event); }; //Trigger all delayed events
			this._trigger("stop", event, this._uiHash());
		}

		this.fromOutside = false;
		return true;

	},

	_trigger: function() {
		if ($.Widget.prototype._trigger.apply(this, arguments) === false) {
			this.cancel();
		}
	},

	_uiHash: function(inst) {
		var self = inst || this;
		return {
			helper: self.helper,
			placeholder: self.placeholder || $([]),
			position: self.position,
			originalPosition: self.originalPosition,
			offset: self.positionAbs,
			item: self.currentItem,
			sender: inst ? inst.element : null
		};
	}

});

$.extend($.ui.sortable, {
	version: "1.8.18"
});

})(jQuery);
/*
 * jQuery UI Accordion 1.8.18
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Accordion
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function( $, undefined ) {

$.widget( "ui.accordion", {
	options: {
		active: 0,
		animated: "slide",
		autoHeight: true,
		clearStyle: false,
		collapsible: false,
		event: "click",
		fillSpace: false,
		header: "> li > :first-child,> :not(li):even",
		icons: {
			header: "ui-icon-triangle-1-e",
			headerSelected: "ui-icon-triangle-1-s"
		},
		navigation: false,
		navigationFilter: function() {
			return this.href.toLowerCase() === location.href.toLowerCase();
		}
	},

	_create: function() {
		var self = this,
			options = self.options;

		self.running = 0;

		self.element
			.addClass( "ui-accordion ui-widget ui-helper-reset" )
			.children( "li" )
				.addClass( "ui-accordion-li-fix" );

		self.headers = self.element.find( options.header )
			.addClass( "ui-accordion-header ui-helper-reset ui-state-default ui-corner-all" )
			.bind( "mouseenter.accordion", function() {
				if ( options.disabled ) {
					return;
				}
				$( this ).addClass( "ui-state-hover" );
			})
			.bind( "mouseleave.accordion", function() {
				if ( options.disabled ) {
					return;
				}
				$( this ).removeClass( "ui-state-hover" );
			})
			.bind( "focus.accordion", function() {
				if ( options.disabled ) {
					return;
				}
				$( this ).addClass( "ui-state-focus" );
			})
			.bind( "blur.accordion", function() {
				if ( options.disabled ) {
					return;
				}
				$( this ).removeClass( "ui-state-focus" );
			});

		self.headers.next()
			.addClass( "ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" );

		if ( options.navigation ) {
			var current = self.element.find( "a" ).filter( options.navigationFilter ).eq( 0 );
			if ( current.length ) {
				var header = current.closest( ".ui-accordion-header" );
				if ( header.length ) {
					self.active = header;
				} else {
					self.active = current.closest( ".ui-accordion-content" ).prev();
				}
			}
		}

		self.active = self._findActive( self.active || options.active )
			.addClass( "ui-state-default ui-state-active" )
			.toggleClass( "ui-corner-all" )
			.toggleClass( "ui-corner-top" );
		self.active.next().addClass( "ui-accordion-content-active" );

		self._createIcons();
		self.resize();

		self.element.attr( "role", "tablist" );

		self.headers
			.attr( "role", "tab" )
			.bind( "keydown.accordion", function( event ) {
				return self._keydown( event );
			})
			.next()
				.attr( "role", "tabpanel" );

		self.headers
			.not( self.active || "" )
			.attr({
				"aria-expanded": "false",
				"aria-selected": "false",
				tabIndex: -1
			})
			.next()
				.hide();

		if ( !self.active.length ) {
			self.headers.eq( 0 ).attr( "tabIndex", 0 );
		} else {
			self.active
				.attr({
					"aria-expanded": "true",
					"aria-selected": "true",
					tabIndex: 0
				});
		}

		if ( !$.browser.safari ) {
			self.headers.find( "a" ).attr( "tabIndex", -1 );
		}

		if ( options.event ) {
			self.headers.bind( options.event.split(" ").join(".accordion ") + ".accordion", function(event) {
				self._clickHandler.call( self, event, this );
				event.preventDefault();
			});
		}
	},

	_createIcons: function() {
		var options = this.options;
		if ( options.icons ) {
			$( "<span></span>" )
				.addClass( "ui-icon " + options.icons.header )
				.prependTo( this.headers );
			this.active.children( ".ui-icon" )
				.toggleClass(options.icons.header)
				.toggleClass(options.icons.headerSelected);
			this.element.addClass( "ui-accordion-icons" );
		}
	},

	_destroyIcons: function() {
		this.headers.children( ".ui-icon" ).remove();
		this.element.removeClass( "ui-accordion-icons" );
	},

	destroy: function() {
		var options = this.options;

		this.element
			.removeClass( "ui-accordion ui-widget ui-helper-reset" )
			.removeAttr( "role" );

		this.headers
			.unbind( ".accordion" )
			.removeClass( "ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top" )
			.removeAttr( "role" )
			.removeAttr( "aria-expanded" )
			.removeAttr( "aria-selected" )
			.removeAttr( "tabIndex" );

		this.headers.find( "a" ).removeAttr( "tabIndex" );
		this._destroyIcons();
		var contents = this.headers.next()
			.css( "display", "" )
			.removeAttr( "role" )
			.removeClass( "ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled" );
		if ( options.autoHeight || options.fillHeight ) {
			contents.css( "height", "" );
		}

		return $.Widget.prototype.destroy.call( this );
	},

	_setOption: function( key, value ) {
		$.Widget.prototype._setOption.apply( this, arguments );

		if ( key == "active" ) {
			this.activate( value );
		}
		if ( key == "icons" ) {
			this._destroyIcons();
			if ( value ) {
				this._createIcons();
			}
		}
		if ( key == "disabled" ) {
			this.headers.add(this.headers.next())
				[ value ? "addClass" : "removeClass" ](
					"ui-accordion-disabled ui-state-disabled" );
		}
	},

	_keydown: function( event ) {
		if ( this.options.disabled || event.altKey || event.ctrlKey ) {
			return;
		}

		var keyCode = $.ui.keyCode,
			length = this.headers.length,
			currentIndex = this.headers.index( event.target ),
			toFocus = false;

		switch ( event.keyCode ) {
			case keyCode.RIGHT:
			case keyCode.DOWN:
				toFocus = this.headers[ ( currentIndex + 1 ) % length ];
				break;
			case keyCode.LEFT:
			case keyCode.UP:
				toFocus = this.headers[ ( currentIndex - 1 + length ) % length ];
				break;
			case keyCode.SPACE:
			case keyCode.ENTER:
				this._clickHandler( { target: event.target }, event.target );
				event.preventDefault();
		}

		if ( toFocus ) {
			$( event.target ).attr( "tabIndex", -1 );
			$( toFocus ).attr( "tabIndex", 0 );
			toFocus.focus();
			return false;
		}

		return true;
	},

	resize: function() {
		var options = this.options,
			maxHeight;

		if ( options.fillSpace ) {
			if ( $.browser.msie ) {
				var defOverflow = this.element.parent().css( "overflow" );
				this.element.parent().css( "overflow", "hidden");
			}
			maxHeight = this.element.parent().height();
			if ($.browser.msie) {
				this.element.parent().css( "overflow", defOverflow );
			}

			this.headers.each(function() {
				maxHeight -= $( this ).outerHeight( true );
			});

			this.headers.next()
				.each(function() {
					$( this ).height( Math.max( 0, maxHeight -
						$( this ).innerHeight() + $( this ).height() ) );
				})
				.css( "overflow", "auto" );
		} else if ( options.autoHeight ) {
			maxHeight = 0;
			this.headers.next()
				.each(function() {
					maxHeight = Math.max( maxHeight, $( this ).height( "" ).height() );
				})
				.height( maxHeight );
		}

		return this;
	},

	activate: function( index ) {
		this.options.active = index;
		var active = this._findActive( index )[ 0 ];
		this._clickHandler( { target: active }, active );

		return this;
	},

	_findActive: function( selector ) {
		return selector
			? typeof selector === "number"
				? this.headers.filter( ":eq(" + selector + ")" )
				: this.headers.not( this.headers.not( selector ) )
			: selector === false
				? $( [] )
				: this.headers.filter( ":eq(0)" );
	},

	_clickHandler: function( event, target ) {
		var options = this.options;
		if ( options.disabled ) {
			return;
		}

		if ( !event.target ) {
			if ( !options.collapsible ) {
				return;
			}
			this.active
				.removeClass( "ui-state-active ui-corner-top" )
				.addClass( "ui-state-default ui-corner-all" )
				.children( ".ui-icon" )
					.removeClass( options.icons.headerSelected )
					.addClass( options.icons.header );
			this.active.next().addClass( "ui-accordion-content-active" );
			var toHide = this.active.next(),
				data = {
					options: options,
					newHeader: $( [] ),
					oldHeader: options.active,
					newContent: $( [] ),
					oldContent: toHide
				},
				toShow = ( this.active = $( [] ) );
			this._toggle( toShow, toHide, data );
			return;
		}

		var clicked = $( event.currentTarget || target ),
			clickedIsActive = clicked[0] === this.active[0];

		options.active = options.collapsible && clickedIsActive ?
			false :
			this.headers.index( clicked );

		if ( this.running || ( !options.collapsible && clickedIsActive ) ) {
			return;
		}

		var active = this.active,
			toShow = clicked.next(),
			toHide = this.active.next(),
			data = {
				options: options,
				newHeader: clickedIsActive && options.collapsible ? $([]) : clicked,
				oldHeader: this.active,
				newContent: clickedIsActive && options.collapsible ? $([]) : toShow,
				oldContent: toHide
			},
			down = this.headers.index( this.active[0] ) > this.headers.index( clicked[0] );

		this.active = clickedIsActive ? $([]) : clicked;
		this._toggle( toShow, toHide, data, clickedIsActive, down );

		active
			.removeClass( "ui-state-active ui-corner-top" )
			.addClass( "ui-state-default ui-corner-all" )
			.children( ".ui-icon" )
				.removeClass( options.icons.headerSelected )
				.addClass( options.icons.header );
		if ( !clickedIsActive ) {
			clicked
				.removeClass( "ui-state-default ui-corner-all" )
				.addClass( "ui-state-active ui-corner-top" )
				.children( ".ui-icon" )
					.removeClass( options.icons.header )
					.addClass( options.icons.headerSelected );
			clicked
				.next()
				.addClass( "ui-accordion-content-active" );
		}

		return;
	},

	_toggle: function( toShow, toHide, data, clickedIsActive, down ) {
		var self = this,
			options = self.options;

		self.toShow = toShow;
		self.toHide = toHide;
		self.data = data;

		var complete = function() {
			if ( !self ) {
				return;
			}
			return self._completed.apply( self, arguments );
		};

		self._trigger( "changestart", null, self.data );

		self.running = toHide.size() === 0 ? toShow.size() : toHide.size();

		if ( options.animated ) {
			var animOptions = {};

			if ( options.collapsible && clickedIsActive ) {
				animOptions = {
					toShow: $( [] ),
					toHide: toHide,
					complete: complete,
					down: down,
					autoHeight: options.autoHeight || options.fillSpace
				};
			} else {
				animOptions = {
					toShow: toShow,
					toHide: toHide,
					complete: complete,
					down: down,
					autoHeight: options.autoHeight || options.fillSpace
				};
			}

			if ( !options.proxied ) {
				options.proxied = options.animated;
			}

			if ( !options.proxiedDuration ) {
				options.proxiedDuration = options.duration;
			}

			options.animated = $.isFunction( options.proxied ) ?
				options.proxied( animOptions ) :
				options.proxied;

			options.duration = $.isFunction( options.proxiedDuration ) ?
				options.proxiedDuration( animOptions ) :
				options.proxiedDuration;

			var animations = $.ui.accordion.animations,
				duration = options.duration,
				easing = options.animated;

			if ( easing && !animations[ easing ] && !$.easing[ easing ] ) {
				easing = "slide";
			}
			if ( !animations[ easing ] ) {
				animations[ easing ] = function( options ) {
					this.slide( options, {
						easing: easing,
						duration: duration || 700
					});
				};
			}

			animations[ easing ]( animOptions );
		} else {
			if ( options.collapsible && clickedIsActive ) {
				toShow.toggle();
			} else {
				toHide.hide();
				toShow.show();
			}

			complete( true );
		}

		toHide.prev()
			.attr({
				"aria-expanded": "false",
				"aria-selected": "false",
				tabIndex: -1
			})
			.blur();
		toShow.prev()
			.attr({
				"aria-expanded": "true",
				"aria-selected": "true",
				tabIndex: 0
			})
			.focus();
	},

	_completed: function( cancel ) {
		this.running = cancel ? 0 : --this.running;
		if ( this.running ) {
			return;
		}

		if ( this.options.clearStyle ) {
			this.toShow.add( this.toHide ).css({
				height: "",
				overflow: ""
			});
		}

		this.toHide.removeClass( "ui-accordion-content-active" );
		if ( this.toHide.length ) {
			this.toHide.parent()[0].className = this.toHide.parent()[0].className;
		}

		this._trigger( "change", null, this.data );
	}
});

$.extend( $.ui.accordion, {
	version: "1.8.18",
	animations: {
		slide: function( options, additions ) {
			options = $.extend({
				easing: "swing",
				duration: 300
			}, options, additions );
			if ( !options.toHide.size() ) {
				options.toShow.animate({
					height: "show",
					paddingTop: "show",
					paddingBottom: "show"
				}, options );
				return;
			}
			if ( !options.toShow.size() ) {
				options.toHide.animate({
					height: "hide",
					paddingTop: "hide",
					paddingBottom: "hide"
				}, options );
				return;
			}
			var overflow = options.toShow.css( "overflow" ),
				percentDone = 0,
				showProps = {},
				hideProps = {},
				fxAttrs = [ "height", "paddingTop", "paddingBottom" ],
				originalWidth;
			var s = options.toShow;
			originalWidth = s[0].style.width;
			s.width( s.parent().width()
				- parseFloat( s.css( "paddingLeft" ) )
				- parseFloat( s.css( "paddingRight" ) )
				- ( parseFloat( s.css( "borderLeftWidth" ) ) || 0 )
				- ( parseFloat( s.css( "borderRightWidth" ) ) || 0 ) );

			$.each( fxAttrs, function( i, prop ) {
				hideProps[ prop ] = "hide";

				var parts = ( "" + $.css( options.toShow[0], prop ) ).match( /^([\d+-.]+)(.*)$/ );
				showProps[ prop ] = {
					value: parts[ 1 ],
					unit: parts[ 2 ] || "px"
				};
			});
			options.toShow.css({ height: 0, overflow: "hidden" }).show();
			options.toHide
				.filter( ":hidden" )
					.each( options.complete )
				.end()
				.filter( ":visible" )
				.animate( hideProps, {
				step: function( now, settings ) {
					if ( settings.prop == "height" ) {
						percentDone = ( settings.end - settings.start === 0 ) ? 0 :
							( settings.now - settings.start ) / ( settings.end - settings.start );
					}

					options.toShow[ 0 ].style[ settings.prop ] =
						( percentDone * showProps[ settings.prop ].value )
						+ showProps[ settings.prop ].unit;
				},
				duration: options.duration,
				easing: options.easing,
				complete: function() {
					if ( !options.autoHeight ) {
						options.toShow.css( "height", "" );
					}
					options.toShow.css({
						width: originalWidth,
						overflow: overflow
					});
					options.complete();
				}
			});
		},
		bounceslide: function( options ) {
			this.slide( options, {
				easing: options.down ? "easeOutBounce" : "swing",
				duration: options.down ? 1000 : 200
			});
		}
	}
});

})( jQuery );
/*
 * jQuery UI Autocomplete 1.8.18
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Autocomplete
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.position.js
 */
(function( $, undefined ) {

var requestIndex = 0;

$.widget( "ui.autocomplete", {
	options: {
		appendTo: "body",
		autoFocus: false,
		delay: 300,
		minLength: 1,
		position: {
			my: "left top",
			at: "left bottom",
			collision: "none"
		},
		source: null
	},

	pending: 0,

	_create: function() {
		var self = this,
			doc = this.element[ 0 ].ownerDocument,
			suppressKeyPress;

		this.element
			.addClass( "ui-autocomplete-input" )
			.attr( "autocomplete", "off" )
			.attr({
				role: "textbox",
				"aria-autocomplete": "list",
				"aria-haspopup": "true"
			})
			.bind( "keydown.autocomplete", function( event ) {
				if ( self.options.disabled || self.element.propAttr( "readOnly" ) ) {
					return;
				}

				suppressKeyPress = false;
				var keyCode = $.ui.keyCode;
				switch( event.keyCode ) {
				case keyCode.PAGE_UP:
					self._move( "previousPage", event );
					break;
				case keyCode.PAGE_DOWN:
					self._move( "nextPage", event );
					break;
				case keyCode.UP:
					self._move( "previous", event );
					event.preventDefault();
					break;
				case keyCode.DOWN:
					self._move( "next", event );
					event.preventDefault();
					break;
				case keyCode.ENTER:
				case keyCode.NUMPAD_ENTER:
					if ( self.menu.active ) {
						suppressKeyPress = true;
						event.preventDefault();
					}
				case keyCode.TAB:
					if ( !self.menu.active ) {
						return;
					}
					self.menu.select( event );
					break;
				case keyCode.ESCAPE:
					self.element.val( self.term );
					self.close( event );
					break;
				default:
					clearTimeout( self.searching );
					self.searching = setTimeout(function() {
						if ( self.term != self.element.val() ) {
							self.selectedItem = null;
							self.search( null, event );
						}
					}, self.options.delay );
					break;
				}
			})
			.bind( "keypress.autocomplete", function( event ) {
				if ( suppressKeyPress ) {
					suppressKeyPress = false;
					event.preventDefault();
				}
			})
			.bind( "focus.autocomplete", function() {
				if ( self.options.disabled ) {
					return;
				}

				self.selectedItem = null;
				self.previous = self.element.val();
			})
			.bind( "blur.autocomplete", function( event ) {
				if ( self.options.disabled ) {
					return;
				}

				clearTimeout( self.searching );
				self.closing = setTimeout(function() {
					self.close( event );
					self._change( event );
				}, 150 );
			});
		this._initSource();
		this.response = function() {
			return self._response.apply( self, arguments );
		};
		this.menu = $( "<ul></ul>" )
			.addClass( "ui-autocomplete" )
			.appendTo( $( this.options.appendTo || "body", doc )[0] )
			.mousedown(function( event ) {
				var menuElement = self.menu.element[ 0 ];
				if ( !$( event.target ).closest( ".ui-menu-item" ).length ) {
					setTimeout(function() {
						$( document ).one( 'mousedown', function( event ) {
							if ( event.target !== self.element[ 0 ] &&
								event.target !== menuElement &&
								!$.ui.contains( menuElement, event.target ) ) {
								self.close();
							}
						});
					}, 1 );
				}

				setTimeout(function() {
					clearTimeout( self.closing );
				}, 13);
			})
			.menu({
				focus: function( event, ui ) {
					var item = ui.item.data( "item.autocomplete" );
					if ( false !== self._trigger( "focus", event, { item: item } ) ) {
						if ( /^key/.test(event.originalEvent.type) ) {
							self.element.val( item.value );
						}
					}
				},
				selected: function( event, ui ) {
					var item = ui.item.data( "item.autocomplete" ),
						previous = self.previous;

					if ( self.element[0] !== doc.activeElement ) {
						self.element.focus();
						self.previous = previous;
						setTimeout(function() {
							self.previous = previous;
							self.selectedItem = item;
						}, 1);
					}

					if ( false !== self._trigger( "select", event, { item: item } ) ) {
						self.element.val( item.value );
					}
					self.term = self.element.val();

					self.close( event );
					self.selectedItem = item;
				},
				blur: function( event, ui ) {
					if ( self.menu.element.is(":visible") &&
						( self.element.val() !== self.term ) ) {
						self.element.val( self.term );
					}
				}
			})
			.zIndex( this.element.zIndex() + 1 )
			.css({ top: 0, left: 0 })
			.hide()
			.data( "menu" );
		if ( $.fn.bgiframe ) {
			 this.menu.element.bgiframe();
		}
		self.beforeunloadHandler = function() {
			self.element.removeAttr( "autocomplete" );
		};
		$( window ).bind( "beforeunload", self.beforeunloadHandler );
	},

	destroy: function() {
		this.element
			.removeClass( "ui-autocomplete-input" )
			.removeAttr( "autocomplete" )
			.removeAttr( "role" )
			.removeAttr( "aria-autocomplete" )
			.removeAttr( "aria-haspopup" );
		this.menu.element.remove();
		$( window ).unbind( "beforeunload", this.beforeunloadHandler );
		$.Widget.prototype.destroy.call( this );
	},

	_setOption: function( key, value ) {
		$.Widget.prototype._setOption.apply( this, arguments );
		if ( key === "source" ) {
			this._initSource();
		}
		if ( key === "appendTo" ) {
			this.menu.element.appendTo( $( value || "body", this.element[0].ownerDocument )[0] )
		}
		if ( key === "disabled" && value && this.xhr ) {
			this.xhr.abort();
		}
	},

	_initSource: function() {
		var self = this,
			array,
			url;
		if ( $.isArray(this.options.source) ) {
			array = this.options.source;
			this.source = function( request, response ) {
				response( $.ui.autocomplete.filter(array, request.term) );
			};
		} else if ( typeof this.options.source === "string" ) {
			url = this.options.source;
			this.source = function( request, response ) {
				if ( self.xhr ) {
					self.xhr.abort();
				}
				self.xhr = $.ajax({
					url: url,
					data: request,
					dataType: "json",
					context: {
						autocompleteRequest: ++requestIndex
					},
					success: function( data, status ) {
						if ( this.autocompleteRequest === requestIndex ) {
							response( data );
						}
					},
					error: function() {
						if ( this.autocompleteRequest === requestIndex ) {
							response( [] );
						}
					}
				});
			};
		} else {
			this.source = this.options.source;
		}
	},

	search: function( value, event ) {
		value = value != null ? value : this.element.val();

		this.term = this.element.val();

		if ( value.length < this.options.minLength ) {
			return this.close( event );
		}

		clearTimeout( this.closing );
		if ( this._trigger( "search", event ) === false ) {
			return;
		}

		return this._search( value );
	},

	_search: function( value ) {
		this.pending++;
		this.element.addClass( "ui-autocomplete-loading" );

		this.source( { term: value }, this.response );
	},

	_response: function( content ) {
		if ( !this.options.disabled && content && content.length ) {
			content = this._normalize( content );
			this._suggest( content );
			this._trigger( "open" );
		} else {
			this.close();
		}
		this.pending--;
		if ( !this.pending ) {
			this.element.removeClass( "ui-autocomplete-loading" );
		}
	},

	close: function( event ) {
		clearTimeout( this.closing );
		if ( this.menu.element.is(":visible") ) {
			this.menu.element.hide();
			this.menu.deactivate();
			this._trigger( "close", event );
		}
	},

	_change: function( event ) {
		if ( this.previous !== this.element.val() ) {
			this._trigger( "change", event, { item: this.selectedItem } );
		}
	},

	_normalize: function( items ) {
		if ( items.length && items[0].label && items[0].value ) {
			return items;
		}
		return $.map( items, function(item) {
			if ( typeof item === "string" ) {
				return {
					label: item,
					value: item
				};
			}
			return $.extend({
				label: item.label || item.value,
				value: item.value || item.label
			}, item );
		});
	},

	_suggest: function( items ) {
		var ul = this.menu.element
			.empty()
			.zIndex( this.element.zIndex() + 1 );
		this._renderMenu( ul, items );
		this.menu.deactivate();
		this.menu.refresh();

		ul.show();
		this._resizeMenu();
		ul.position( $.extend({
			of: this.element
		}, this.options.position ));

		if ( this.options.autoFocus ) {
			this.menu.next( new $.Event("mouseover") );
		}
	},

	_resizeMenu: function() {
		var ul = this.menu.element;
		ul.outerWidth( Math.max(
			ul.width( "" ).outerWidth() + 1,
			this.element.outerWidth()
		) );
	},

	_renderMenu: function( ul, items ) {
		var self = this;
		$.each( items, function( index, item ) {
			self._renderItem( ul, item );
		});
	},

	_renderItem: function( ul, item) {
		return $( "<li></li>" )
			.data( "item.autocomplete", item )
			.append( $( "<a></a>" ).text( item.label ) )
			.appendTo( ul );
	},

	_move: function( direction, event ) {
		if ( !this.menu.element.is(":visible") ) {
			this.search( null, event );
			return;
		}
		if ( this.menu.first() && /^previous/.test(direction) ||
				this.menu.last() && /^next/.test(direction) ) {
			this.element.val( this.term );
			this.menu.deactivate();
			return;
		}
		this.menu[ direction ]( event );
	},

	widget: function() {
		return this.menu.element;
	}
});

$.extend( $.ui.autocomplete, {
	escapeRegex: function( value ) {
		return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	},
	filter: function(array, term) {
		var matcher = new RegExp( $.ui.autocomplete.escapeRegex(term), "i" );
		return $.grep( array, function(value) {
			return matcher.test( value.label || value.value || value );
		});
	}
});

}( jQuery ));

/*
 * jQuery UI Menu (not officially released)
 *
 * This widget isn't yet finished and the API is subject to change. We plan to finish
 * it for the next release. You're welcome to give it a try anyway and give us feedback,
 * as long as you're okay with migrating your code later on. We can help with that, too.
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Menu
 *
 * Depends:
 *	jquery.ui.core.js
 *  jquery.ui.widget.js
 */
(function($) {

$.widget("ui.menu", {
	_create: function() {
		var self = this;
		this.element
			.addClass("ui-menu ui-widget ui-widget-content ui-corner-all")
			.attr({
				role: "listbox",
				"aria-activedescendant": "ui-active-menuitem"
			})
			.click(function( event ) {
				if ( !$( event.target ).closest( ".ui-menu-item a" ).length ) {
					return;
				}
				event.preventDefault();
				self.select( event );
			});
		this.refresh();
	},

	refresh: function() {
		var self = this;

		var items = this.element.children("li:not(.ui-menu-item):has(a)")
			.addClass("ui-menu-item")
			.attr("role", "menuitem");

		items.children("a")
			.addClass("ui-corner-all")
			.attr("tabindex", -1)
			.mouseenter(function( event ) {
				self.activate( event, $(this).parent() );
			})
			.mouseleave(function() {
				self.deactivate();
			});
	},

	activate: function( event, item ) {
		this.deactivate();
		if (this.hasScroll()) {
			var offset = item.offset().top - this.element.offset().top,
				scroll = this.element.scrollTop(),
				elementHeight = this.element.height();
			if (offset < 0) {
				this.element.scrollTop( scroll + offset);
			} else if (offset >= elementHeight) {
				this.element.scrollTop( scroll + offset - elementHeight + item.height());
			}
		}
		this.active = item.eq(0)
			.children("a")
				.addClass("ui-state-hover")
				.attr("id", "ui-active-menuitem")
			.end();
		this._trigger("focus", event, { item: item });
	},

	deactivate: function() {
		if (!this.active) { return; }

		this.active.children("a")
			.removeClass("ui-state-hover")
			.removeAttr("id");
		this._trigger("blur");
		this.active = null;
	},

	next: function(event) {
		this.move("next", ".ui-menu-item:first", event);
	},

	previous: function(event) {
		this.move("prev", ".ui-menu-item:last", event);
	},

	first: function() {
		return this.active && !this.active.prevAll(".ui-menu-item").length;
	},

	last: function() {
		return this.active && !this.active.nextAll(".ui-menu-item").length;
	},

	move: function(direction, edge, event) {
		if (!this.active) {
			this.activate(event, this.element.children(edge));
			return;
		}
		var next = this.active[direction + "All"](".ui-menu-item").eq(0);
		if (next.length) {
			this.activate(event, next);
		} else {
			this.activate(event, this.element.children(edge));
		}
	},

	nextPage: function(event) {
		if (this.hasScroll()) {
			if (!this.active || this.last()) {
				this.activate(event, this.element.children(".ui-menu-item:first"));
				return;
			}
			var base = this.active.offset().top,
				height = this.element.height(),
				result = this.element.children(".ui-menu-item").filter(function() {
					var close = $(this).offset().top - base - height + $(this).height();
					return close < 10 && close > -10;
				});

			if (!result.length) {
				result = this.element.children(".ui-menu-item:last");
			}
			this.activate(event, result);
		} else {
			this.activate(event, this.element.children(".ui-menu-item")
				.filter(!this.active || this.last() ? ":first" : ":last"));
		}
	},

	previousPage: function(event) {
		if (this.hasScroll()) {
			if (!this.active || this.first()) {
				this.activate(event, this.element.children(".ui-menu-item:last"));
				return;
			}

			var base = this.active.offset().top,
				height = this.element.height();
				result = this.element.children(".ui-menu-item").filter(function() {
					var close = $(this).offset().top - base + height - $(this).height();
					return close < 10 && close > -10;
				});

			if (!result.length) {
				result = this.element.children(".ui-menu-item:first");
			}
			this.activate(event, result);
		} else {
			this.activate(event, this.element.children(".ui-menu-item")
				.filter(!this.active || this.first() ? ":last" : ":first"));
		}
	},

	hasScroll: function() {
		return this.element.height() < this.element[ $.fn.prop ? "prop" : "attr" ]("scrollHeight");
	},

	select: function( event ) {
		this._trigger("selected", event, { item: this.active });
	}
});

}(jQuery));
/*
 * jQuery UI Dialog 1.8.18
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Dialog
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *  jquery.ui.button.js
 *	jquery.ui.draggable.js
 *	jquery.ui.mouse.js
 *	jquery.ui.position.js
 *	jquery.ui.resizable.js
 */
(function( $, undefined ) {

var uiDialogClasses =
		'ui-dialog ' +
		'ui-widget ' +
		'ui-widget-content ' +
		'ui-corner-all ',
	sizeRelatedOptions = {
		buttons: true,
		height: true,
		maxHeight: true,
		maxWidth: true,
		minHeight: true,
		minWidth: true,
		width: true
	},
	resizableRelatedOptions = {
		maxHeight: true,
		maxWidth: true,
		minHeight: true,
		minWidth: true
	},
	attrFn = $.attrFn || {
		val: true,
		css: true,
		html: true,
		text: true,
		data: true,
		width: true,
		height: true,
		offset: true,
		click: true
	};

$.widget("ui.dialog", {
	options: {
		autoOpen: true,
		buttons: {},
		closeOnEscape: true,
		closeText: 'close',
		dialogClass: '',
		draggable: true,
		hide: null,
		height: 'auto',
		maxHeight: false,
		maxWidth: false,
		minHeight: 150,
		minWidth: 150,
		modal: false,
		position: {
			my: 'center',
			at: 'center',
			collision: 'fit',
			using: function(pos) {
				var topOffset = $(this).css(pos).offset().top;
				if (topOffset < 0) {
					$(this).css('top', pos.top - topOffset);
				}
			}
		},
		resizable: true,
		show: null,
		stack: true,
		title: '',
		width: 300,
		zIndex: 1000
	},

	_create: function() {
		this.originalTitle = this.element.attr('title');
		if ( typeof this.originalTitle !== "string" ) {
			this.originalTitle = "";
		}

		this.options.title = this.options.title || this.originalTitle;
		var self = this,
			options = self.options,

			title = options.title || '&#160;',
			titleId = $.ui.dialog.getTitleId(self.element),

			uiDialog = (self.uiDialog = $('<div></div>'))
				.appendTo(document.body)
				.hide()
				.addClass(uiDialogClasses + options.dialogClass)
				.css({
					zIndex: options.zIndex
				})
				.attr('tabIndex', -1).css('outline', 0).keydown(function(event) {
					if (options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode &&
						event.keyCode === $.ui.keyCode.ESCAPE) {

						self.close(event);
						event.preventDefault();
					}
				})
				.attr({
					role: 'dialog',
					'aria-labelledby': titleId
				})
				.mousedown(function(event) {
					self.moveToTop(false, event);
				}),

			uiDialogContent = self.element
				.show()
				.removeAttr('title')
				.addClass(
					'ui-dialog-content ' +
					'ui-widget-content')
				.appendTo(uiDialog),

			uiDialogTitlebar = (self.uiDialogTitlebar = $('<div></div>'))
				.addClass(
					'ui-dialog-titlebar ' +
					'ui-widget-header ' +
					'ui-corner-all ' +
					'ui-helper-clearfix'
				)
				.prependTo(uiDialog),

			uiDialogTitlebarClose = $('<a href="#"></a>')
				.addClass(
					'ui-dialog-titlebar-close ' +
					'ui-corner-all'
				)
				.attr('role', 'button')
				.hover(
					function() {
						uiDialogTitlebarClose.addClass('ui-state-hover');
					},
					function() {
						uiDialogTitlebarClose.removeClass('ui-state-hover');
					}
				)
				.focus(function() {
					uiDialogTitlebarClose.addClass('ui-state-focus');
				})
				.blur(function() {
					uiDialogTitlebarClose.removeClass('ui-state-focus');
				})
				.click(function(event) {
					self.close(event);
					return false;
				})
				.appendTo(uiDialogTitlebar),

			uiDialogTitlebarCloseText = (self.uiDialogTitlebarCloseText = $('<span></span>'))
				.addClass(
					'ui-icon ' +
					'ui-icon-closethick'
				)
				.text(options.closeText)
				.appendTo(uiDialogTitlebarClose),

			uiDialogTitle = $('<span></span>')
				.addClass('ui-dialog-title')
				.attr('id', titleId)
				.html(title)
				.prependTo(uiDialogTitlebar);

		if ($.isFunction(options.beforeclose) && !$.isFunction(options.beforeClose)) {
			options.beforeClose = options.beforeclose;
		}

		uiDialogTitlebar.find("*").add(uiDialogTitlebar).disableSelection();

		if (options.draggable && $.fn.draggable) {
			self._makeDraggable();
		}
		if (options.resizable && $.fn.resizable) {
			self._makeResizable();
		}

		self._createButtons(options.buttons);
		self._isOpen = false;

		if ($.fn.bgiframe) {
			uiDialog.bgiframe();
		}
	},

	_init: function() {
		if ( this.options.autoOpen ) {
			this.open();
		}
	},

	destroy: function() {
		var self = this;

		if (self.overlay) {
			self.overlay.destroy();
		}
		self.uiDialog.hide();
		self.element
			.unbind('.dialog')
			.removeData('dialog')
			.removeClass('ui-dialog-content ui-widget-content')
			.hide().appendTo('body');
		self.uiDialog.remove();

		if (self.originalTitle) {
			self.element.attr('title', self.originalTitle);
		}

		return self;
	},

	widget: function() {
		return this.uiDialog;
	},

	close: function(event) {
		var self = this,
			maxZ, thisZ;

		if (false === self._trigger('beforeClose', event)) {
			return;
		}

		if (self.overlay) {
			self.overlay.destroy();
		}
		self.uiDialog.unbind('keypress.ui-dialog');

		self._isOpen = false;

		if (self.options.hide) {
			self.uiDialog.hide(self.options.hide, function() {
				self._trigger('close', event);
			});
		} else {
			self.uiDialog.hide();
			self._trigger('close', event);
		}

		$.ui.dialog.overlay.resize();

		if (self.options.modal) {
			maxZ = 0;
			$('.ui-dialog').each(function() {
				if (this !== self.uiDialog[0]) {
					thisZ = $(this).css('z-index');
					if(!isNaN(thisZ)) {
						maxZ = Math.max(maxZ, thisZ);
					}
				}
			});
			$.ui.dialog.maxZ = maxZ;
		}

		return self;
	},

	isOpen: function() {
		return this._isOpen;
	},

	moveToTop: function(force, event) {
		var self = this,
			options = self.options,
			saveScroll;

		if ((options.modal && !force) ||
			(!options.stack && !options.modal)) {
			return self._trigger('focus', event);
		}

		if (options.zIndex > $.ui.dialog.maxZ) {
			$.ui.dialog.maxZ = options.zIndex;
		}
		if (self.overlay) {
			$.ui.dialog.maxZ += 1;
			self.overlay.$el.css('z-index', $.ui.dialog.overlay.maxZ = $.ui.dialog.maxZ);
		}

		saveScroll = { scrollTop: self.element.scrollTop(), scrollLeft: self.element.scrollLeft() };
		$.ui.dialog.maxZ += 1;
		self.uiDialog.css('z-index', $.ui.dialog.maxZ);
		self.element.attr(saveScroll);
		self._trigger('focus', event);

		return self;
	},

	open: function() {
		if (this._isOpen) { return; }

		var self = this,
			options = self.options,
			uiDialog = self.uiDialog;

		self.overlay = options.modal ? new $.ui.dialog.overlay(self) : null;
		self._size();
		self._position(options.position);
		uiDialog.show(options.show);
		self.moveToTop(true);

		if ( options.modal ) {
			uiDialog.bind( "keydown.ui-dialog", function( event ) {
				if ( event.keyCode !== $.ui.keyCode.TAB ) {
					return;
				}

				var tabbables = $(':tabbable', this),
					first = tabbables.filter(':first'),
					last  = tabbables.filter(':last');

				if (event.target === last[0] && !event.shiftKey) {
					first.focus(1);
					return false;
				} else if (event.target === first[0] && event.shiftKey) {
					last.focus(1);
					return false;
				}
			});
		}

		$(self.element.find(':tabbable').get().concat(
			uiDialog.find('.ui-dialog-buttonpane :tabbable').get().concat(
				uiDialog.get()))).eq(0).focus();

		self._isOpen = true;
		self._trigger('open');

		return self;
	},

	_createButtons: function(buttons) {
		var self = this,
			hasButtons = false,
			uiDialogButtonPane = $('<div></div>')
				.addClass(
					'ui-dialog-buttonpane ' +
					'ui-widget-content ' +
					'ui-helper-clearfix'
				),
			uiButtonSet = $( "<div></div>" )
				.addClass( "ui-dialog-buttonset" )
				.appendTo( uiDialogButtonPane );

		self.uiDialog.find('.ui-dialog-buttonpane').remove();

		if (typeof buttons === 'object' && buttons !== null) {
			$.each(buttons, function() {
				return !(hasButtons = true);
			});
		}
		if (hasButtons) {
			$.each(buttons, function(name, props) {
				props = $.isFunction( props ) ?
					{ click: props, text: name } :
					props;
				var button = $('<button type="button"></button>')
					.click(function() {
						props.click.apply(self.element[0], arguments);
					})
					.appendTo(uiButtonSet);
				$.each( props, function( key, value ) {
					if ( key === "click" ) {
						return;
					}
					if ( key in attrFn ) {
						button[ key ]( value );
					} else {
						button.attr( key, value );
					}
				});
				if ($.fn.button) {
					button.button();
				}
			});
			uiDialogButtonPane.appendTo(self.uiDialog);
		}
	},

	_makeDraggable: function() {
		var self = this,
			options = self.options,
			doc = $(document),
			heightBeforeDrag;

		function filteredUi(ui) {
			return {
				position: ui.position,
				offset: ui.offset
			};
		}

		self.uiDialog.draggable({
			cancel: '.ui-dialog-content, .ui-dialog-titlebar-close',
			handle: '.ui-dialog-titlebar',
			containment: 'document',
			start: function(event, ui) {
				heightBeforeDrag = options.height === "auto" ? "auto" : $(this).height();
				$(this).height($(this).height()).addClass("ui-dialog-dragging");
				self._trigger('dragStart', event, filteredUi(ui));
			},
			drag: function(event, ui) {
				self._trigger('drag', event, filteredUi(ui));
			},
			stop: function(event, ui) {
				options.position = [ui.position.left - doc.scrollLeft(),
					ui.position.top - doc.scrollTop()];
				$(this).removeClass("ui-dialog-dragging").height(heightBeforeDrag);
				self._trigger('dragStop', event, filteredUi(ui));
				$.ui.dialog.overlay.resize();
			}
		});
	},

	_makeResizable: function(handles) {
		handles = (handles === undefined ? this.options.resizable : handles);
		var self = this,
			options = self.options,
			position = self.uiDialog.css('position'),
			resizeHandles = (typeof handles === 'string' ?
				handles	:
				'n,e,s,w,se,sw,ne,nw'
			);

		function filteredUi(ui) {
			return {
				originalPosition: ui.originalPosition,
				originalSize: ui.originalSize,
				position: ui.position,
				size: ui.size
			};
		}

		self.uiDialog.resizable({
			cancel: '.ui-dialog-content',
			containment: 'document',
			alsoResize: self.element,
			maxWidth: options.maxWidth,
			maxHeight: options.maxHeight,
			minWidth: options.minWidth,
			minHeight: self._minHeight(),
			handles: resizeHandles,
			start: function(event, ui) {
				$(this).addClass("ui-dialog-resizing");
				self._trigger('resizeStart', event, filteredUi(ui));
			},
			resize: function(event, ui) {
				self._trigger('resize', event, filteredUi(ui));
			},
			stop: function(event, ui) {
				$(this).removeClass("ui-dialog-resizing");
				options.height = $(this).height();
				options.width = $(this).width();
				self._trigger('resizeStop', event, filteredUi(ui));
				$.ui.dialog.overlay.resize();
			}
		})
		.css('position', position)
		.find('.ui-resizable-se').addClass('ui-icon ui-icon-grip-diagonal-se');
	},

	_minHeight: function() {
		var options = this.options;

		if (options.height === 'auto') {
			return options.minHeight;
		} else {
			return Math.min(options.minHeight, options.height);
		}
	},

	_position: function(position) {
		var myAt = [],
			offset = [0, 0],
			isVisible;

		if (position) {

			if (typeof position === 'string' || (typeof position === 'object' && '0' in position)) {
				myAt = position.split ? position.split(' ') : [position[0], position[1]];
				if (myAt.length === 1) {
					myAt[1] = myAt[0];
				}

				$.each(['left', 'top'], function(i, offsetPosition) {
					if (+myAt[i] === myAt[i]) {
						offset[i] = myAt[i];
						myAt[i] = offsetPosition;
					}
				});

				position = {
					my: myAt.join(" "),
					at: myAt.join(" "),
					offset: offset.join(" ")
				};
			}

			position = $.extend({}, $.ui.dialog.prototype.options.position, position);
		} else {
			position = $.ui.dialog.prototype.options.position;
		}

		isVisible = this.uiDialog.is(':visible');
		if (!isVisible) {
			this.uiDialog.show();
		}
		this.uiDialog
			.css({ top: 0, left: 0 })
			.position($.extend({ of: window }, position));
		if (!isVisible) {
			this.uiDialog.hide();
		}
	},

	_setOptions: function( options ) {
		var self = this,
			resizableOptions = {},
			resize = false;

		$.each( options, function( key, value ) {
			self._setOption( key, value );

			if ( key in sizeRelatedOptions ) {
				resize = true;
			}
			if ( key in resizableRelatedOptions ) {
				resizableOptions[ key ] = value;
			}
		});

		if ( resize ) {
			this._size();
		}
		if ( this.uiDialog.is( ":data(resizable)" ) ) {
			this.uiDialog.resizable( "option", resizableOptions );
		}
	},

	_setOption: function(key, value){
		var self = this,
			uiDialog = self.uiDialog;

		switch (key) {
			case "beforeclose":
				key = "beforeClose";
				break;
			case "buttons":
				self._createButtons(value);
				break;
			case "closeText":
				self.uiDialogTitlebarCloseText.text("" + value);
				break;
			case "dialogClass":
				uiDialog
					.removeClass(self.options.dialogClass)
					.addClass(uiDialogClasses + value);
				break;
			case "disabled":
				if (value) {
					uiDialog.addClass('ui-dialog-disabled');
				} else {
					uiDialog.removeClass('ui-dialog-disabled');
				}
				break;
			case "draggable":
				var isDraggable = uiDialog.is( ":data(draggable)" );
				if ( isDraggable && !value ) {
					uiDialog.draggable( "destroy" );
				}

				if ( !isDraggable && value ) {
					self._makeDraggable();
				}
				break;
			case "position":
				self._position(value);
				break;
			case "resizable":
				var isResizable = uiDialog.is( ":data(resizable)" );
				if (isResizable && !value) {
					uiDialog.resizable('destroy');
				}

				if (isResizable && typeof value === 'string') {
					uiDialog.resizable('option', 'handles', value);
				}

				if (!isResizable && value !== false) {
					self._makeResizable(value);
				}
				break;
			case "title":
				$(".ui-dialog-title", self.uiDialogTitlebar).html("" + (value || '&#160;'));
				break;
		}

		$.Widget.prototype._setOption.apply(self, arguments);
	},

	_size: function() {
		/* If the user has resized the dialog, the .ui-dialog and .ui-dialog-content
		 * divs will both have width and height set, so we need to reset them
		 */
		var options = this.options,
			nonContentHeight,
			minContentHeight,
			isVisible = this.uiDialog.is( ":visible" );

		this.element.show().css({
			width: 'auto',
			minHeight: 0,
			height: 0
		});

		if (options.minWidth > options.width) {
			options.width = options.minWidth;
		}

		nonContentHeight = this.uiDialog.css({
				height: 'auto',
				width: options.width
			})
			.height();
		minContentHeight = Math.max( 0, options.minHeight - nonContentHeight );

		if ( options.height === "auto" ) {
			if ( $.support.minHeight ) {
				this.element.css({
					minHeight: minContentHeight,
					height: "auto"
				});
			} else {
				this.uiDialog.show();
				var autoHeight = this.element.css( "height", "auto" ).height();
				if ( !isVisible ) {
					this.uiDialog.hide();
				}
				this.element.height( Math.max( autoHeight, minContentHeight ) );
			}
		} else {
			this.element.height( Math.max( options.height - nonContentHeight, 0 ) );
		}

		if (this.uiDialog.is(':data(resizable)')) {
			this.uiDialog.resizable('option', 'minHeight', this._minHeight());
		}
	}
});

$.extend($.ui.dialog, {
	version: "1.8.18",

	uuid: 0,
	maxZ: 0,

	getTitleId: function($el) {
		var id = $el.attr('id');
		if (!id) {
			this.uuid += 1;
			id = this.uuid;
		}
		return 'ui-dialog-title-' + id;
	},

	overlay: function(dialog) {
		this.$el = $.ui.dialog.overlay.create(dialog);
	}
});

$.extend($.ui.dialog.overlay, {
	instances: [],
	oldInstances: [],
	maxZ: 0,
	events: $.map('focus,mousedown,mouseup,keydown,keypress,click'.split(','),
		function(event) { return event + '.dialog-overlay'; }).join(' '),
	create: function(dialog) {
		if (this.instances.length === 0) {
			setTimeout(function() {
				if ($.ui.dialog.overlay.instances.length) {
					$(document).bind($.ui.dialog.overlay.events, function(event) {
						if ($(event.target).zIndex() < $.ui.dialog.overlay.maxZ) {
							return false;
						}
					});
				}
			}, 1);

			$(document).bind('keydown.dialog-overlay', function(event) {
				if (dialog.options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode &&
					event.keyCode === $.ui.keyCode.ESCAPE) {

					dialog.close(event);
					event.preventDefault();
				}
			});

			$(window).bind('resize.dialog-overlay', $.ui.dialog.overlay.resize);
		}

		var $el = (this.oldInstances.pop() || $('<div></div>').addClass('ui-widget-overlay'))
			.appendTo(document.body)
			.css({
				width: this.width(),
				height: this.height()
			});

		if ($.fn.bgiframe) {
			$el.bgiframe();
		}

		this.instances.push($el);
		return $el;
	},

	destroy: function($el) {
		var indexOf = $.inArray($el, this.instances);
		if (indexOf != -1){
			this.oldInstances.push(this.instances.splice(indexOf, 1)[0]);
		}

		if (this.instances.length === 0) {
			$([document, window]).unbind('.dialog-overlay');
		}

		$el.remove();

		var maxZ = 0;
		$.each(this.instances, function() {
			maxZ = Math.max(maxZ, this.css('z-index'));
		});
		this.maxZ = maxZ;
	},

	height: function() {
		var scrollHeight,
			offsetHeight;
		if ($.browser.msie && $.browser.version < 7) {
			scrollHeight = Math.max(
				document.documentElement.scrollHeight,
				document.body.scrollHeight
			);
			offsetHeight = Math.max(
				document.documentElement.offsetHeight,
				document.body.offsetHeight
			);

			if (scrollHeight < offsetHeight) {
				return $(window).height() + 'px';
			} else {
				return scrollHeight + 'px';
			}
		} else {
			return $(document).height() + 'px';
		}
	},

	width: function() {
		var scrollWidth,
			offsetWidth;
		if ( $.browser.msie ) {
			scrollWidth = Math.max(
				document.documentElement.scrollWidth,
				document.body.scrollWidth
			);
			offsetWidth = Math.max(
				document.documentElement.offsetWidth,
				document.body.offsetWidth
			);

			if (scrollWidth < offsetWidth) {
				return $(window).width() + 'px';
			} else {
				return scrollWidth + 'px';
			}
		} else {
			return $(document).width() + 'px';
		}
	},

	resize: function() {
		/* If the dialog is draggable and the user drags it past the
		 * right edge of the window, the document becomes wider so we
		 * need to stretch the overlay. If the user then drags the
		 * dialog back to the left, the document will become narrower,
		 * so we need to shrink the overlay to the appropriate size.
		 * This is handled by shrinking the overlay before setting it
		 * to the full document size.
		 */
		var $overlays = $([]);
		$.each($.ui.dialog.overlay.instances, function() {
			$overlays = $overlays.add(this);
		});

		$overlays.css({
			width: 0,
			height: 0
		}).css({
			width: $.ui.dialog.overlay.width(),
			height: $.ui.dialog.overlay.height()
		});
	}
});

$.extend($.ui.dialog.overlay.prototype, {
	destroy: function() {
		$.ui.dialog.overlay.destroy(this.$el);
	}
});

}(jQuery));
/*
 * jQuery UI Tabs 1.8.18
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Tabs
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function( $, undefined ) {

var tabId = 0,
	listId = 0;

function getNextTabId() {
	return ++tabId;
}

function getNextListId() {
	return ++listId;
}

$.widget( "ui.tabs", {
	options: {
		add: null,
		ajaxOptions: null,
		cache: false,
		cookie: null, // e.g. { expires: 7, path: '/', domain: 'jquery.com', secure: true }
		collapsible: false,
		disable: null,
		disabled: [],
		enable: null,
		event: "click",
		fx: null, // e.g. { height: 'toggle', opacity: 'toggle', duration: 200 }
		idPrefix: "ui-tabs-",
		load: null,
		panelTemplate: "<div></div>",
		remove: null,
		select: null,
		show: null,
		spinner: "<em>Loading&#8230;</em>",
		tabTemplate: "<li><a href='#{href}'><span>#{label}</span></a></li>"
	},

	_create: function() {
		this._tabify( true );
	},

	_setOption: function( key, value ) {
		if ( key == "selected" ) {
			if (this.options.collapsible && value == this.options.selected ) {
				return;
			}
			this.select( value );
		} else {
			this.options[ key ] = value;
			this._tabify();
		}
	},

	_tabId: function( a ) {
		return a.title && a.title.replace( /\s/g, "_" ).replace( /[^\w\u00c0-\uFFFF-]/g, "" ) ||
			this.options.idPrefix + getNextTabId();
	},

	_sanitizeSelector: function( hash ) {
		return hash.replace( /:/g, "\\:" );
	},

	_cookie: function() {
		var cookie = this.cookie ||
			( this.cookie = this.options.cookie.name || "ui-tabs-" + getNextListId() );
		return $.cookie.apply( null, [ cookie ].concat( $.makeArray( arguments ) ) );
	},

	_ui: function( tab, panel ) {
		return {
			tab: tab,
			panel: panel,
			index: this.anchors.index( tab )
		};
	},

	_cleanup: function() {
		this.lis.filter( ".ui-state-processing" )
			.removeClass( "ui-state-processing" )
			.find( "span:data(label.tabs)" )
				.each(function() {
					var el = $( this );
					el.html( el.data( "label.tabs" ) ).removeData( "label.tabs" );
				});
	},

	_tabify: function( init ) {
		var self = this,
			o = this.options,
			fragmentId = /^#.+/; // Safari 2 reports '#' for an empty hash

		this.list = this.element.find( "ol,ul" ).eq( 0 );
		this.lis = $( " > li:has(a[href])", this.list );
		this.anchors = this.lis.map(function() {
			return $( "a", this )[ 0 ];
		});
		this.panels = $( [] );

		this.anchors.each(function( i, a ) {
			var href = $( a ).attr( "href" );
			var hrefBase = href.split( "#" )[ 0 ],
				baseEl;
			if ( hrefBase && ( hrefBase === location.toString().split( "#" )[ 0 ] ||
					( baseEl = $( "base" )[ 0 ]) && hrefBase === baseEl.href ) ) {
				href = a.hash;
				a.href = href;
			}

			if ( fragmentId.test( href ) ) {
				self.panels = self.panels.add( self.element.find( self._sanitizeSelector( href ) ) );
			} else if ( href && href !== "#" ) {
				$.data( a, "href.tabs", href );

				$.data( a, "load.tabs", href.replace( /#.*$/, "" ) );

				var id = self._tabId( a );
				a.href = "#" + id;
				var $panel = self.element.find( "#" + id );
				if ( !$panel.length ) {
					$panel = $( o.panelTemplate )
						.attr( "id", id )
						.addClass( "ui-tabs-panel ui-widget-content ui-corner-bottom" )
						.insertAfter( self.panels[ i - 1 ] || self.list );
					$panel.data( "destroy.tabs", true );
				}
				self.panels = self.panels.add( $panel );
			} else {
				o.disabled.push( i );
			}
		});

		if ( init ) {
			this.element.addClass( "ui-tabs ui-widget ui-widget-content ui-corner-all" );
			this.list.addClass( "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" );
			this.lis.addClass( "ui-state-default ui-corner-top" );
			this.panels.addClass( "ui-tabs-panel ui-widget-content ui-corner-bottom" );

			if ( o.selected === undefined ) {
				if ( location.hash ) {
					this.anchors.each(function( i, a ) {
						if ( a.hash == location.hash ) {
							o.selected = i;
							return false;
						}
					});
				}
				if ( typeof o.selected !== "number" && o.cookie ) {
					o.selected = parseInt( self._cookie(), 10 );
				}
				if ( typeof o.selected !== "number" && this.lis.filter( ".ui-tabs-selected" ).length ) {
					o.selected = this.lis.index( this.lis.filter( ".ui-tabs-selected" ) );
				}
				o.selected = o.selected || ( this.lis.length ? 0 : -1 );
			} else if ( o.selected === null ) { // usage of null is deprecated, TODO remove in next release
				o.selected = -1;
			}

			o.selected = ( ( o.selected >= 0 && this.anchors[ o.selected ] ) || o.selected < 0 )
				? o.selected
				: 0;

			o.disabled = $.unique( o.disabled.concat(
				$.map( this.lis.filter( ".ui-state-disabled" ), function( n, i ) {
					return self.lis.index( n );
				})
			) ).sort();

			if ( $.inArray( o.selected, o.disabled ) != -1 ) {
				o.disabled.splice( $.inArray( o.selected, o.disabled ), 1 );
			}

			this.panels.addClass( "ui-tabs-hide" );
			this.lis.removeClass( "ui-tabs-selected ui-state-active" );
			if ( o.selected >= 0 && this.anchors.length ) {
				self.element.find( self._sanitizeSelector( self.anchors[ o.selected ].hash ) ).removeClass( "ui-tabs-hide" );
				this.lis.eq( o.selected ).addClass( "ui-tabs-selected ui-state-active" );

				self.element.queue( "tabs", function() {
					self._trigger( "show", null,
						self._ui( self.anchors[ o.selected ], self.element.find( self._sanitizeSelector( self.anchors[ o.selected ].hash ) )[ 0 ] ) );
				});

				this.load( o.selected );
			}

			$( window ).bind( "unload", function() {
				self.lis.add( self.anchors ).unbind( ".tabs" );
				self.lis = self.anchors = self.panels = null;
			});
		} else {
			o.selected = this.lis.index( this.lis.filter( ".ui-tabs-selected" ) );
		}

		this.element[ o.collapsible ? "addClass" : "removeClass" ]( "ui-tabs-collapsible" );

		if ( o.cookie ) {
			this._cookie( o.selected, o.cookie );
		}

		for ( var i = 0, li; ( li = this.lis[ i ] ); i++ ) {
			$( li )[ $.inArray( i, o.disabled ) != -1 &&
				!$( li ).hasClass( "ui-tabs-selected" ) ? "addClass" : "removeClass" ]( "ui-state-disabled" );
		}

		if ( o.cache === false ) {
			this.anchors.removeData( "cache.tabs" );
		}

		this.lis.add( this.anchors ).unbind( ".tabs" );

		if ( o.event !== "mouseover" ) {
			var addState = function( state, el ) {
				if ( el.is( ":not(.ui-state-disabled)" ) ) {
					el.addClass( "ui-state-" + state );
				}
			};
			var removeState = function( state, el ) {
				el.removeClass( "ui-state-" + state );
			};
			this.lis.bind( "mouseover.tabs" , function() {
				addState( "hover", $( this ) );
			});
			this.lis.bind( "mouseout.tabs", function() {
				removeState( "hover", $( this ) );
			});
			this.anchors.bind( "focus.tabs", function() {
				addState( "focus", $( this ).closest( "li" ) );
			});
			this.anchors.bind( "blur.tabs", function() {
				removeState( "focus", $( this ).closest( "li" ) );
			});
		}

		var hideFx, showFx;
		if ( o.fx ) {
			if ( $.isArray( o.fx ) ) {
				hideFx = o.fx[ 0 ];
				showFx = o.fx[ 1 ];
			} else {
				hideFx = showFx = o.fx;
			}
		}

		function resetStyle( $el, fx ) {
			$el.css( "display", "" );
			if ( !$.support.opacity && fx.opacity ) {
				$el[ 0 ].style.removeAttribute( "filter" );
			}
		}

		var showTab = showFx
			? function( clicked, $show ) {
				$( clicked ).closest( "li" ).addClass( "ui-tabs-selected ui-state-active" );
				$show.hide().removeClass( "ui-tabs-hide" ) // avoid flicker that way
					.animate( showFx, showFx.duration || "normal", function() {
						resetStyle( $show, showFx );
						self._trigger( "show", null, self._ui( clicked, $show[ 0 ] ) );
					});
			}
			: function( clicked, $show ) {
				$( clicked ).closest( "li" ).addClass( "ui-tabs-selected ui-state-active" );
				$show.removeClass( "ui-tabs-hide" );
				self._trigger( "show", null, self._ui( clicked, $show[ 0 ] ) );
			};

		var hideTab = hideFx
			? function( clicked, $hide ) {
				$hide.animate( hideFx, hideFx.duration || "normal", function() {
					self.lis.removeClass( "ui-tabs-selected ui-state-active" );
					$hide.addClass( "ui-tabs-hide" );
					resetStyle( $hide, hideFx );
					self.element.dequeue( "tabs" );
				});
			}
			: function( clicked, $hide, $show ) {
				self.lis.removeClass( "ui-tabs-selected ui-state-active" );
				$hide.addClass( "ui-tabs-hide" );
				self.element.dequeue( "tabs" );
			};

		this.anchors.bind( o.event + ".tabs", function() {
			var el = this,
				$li = $(el).closest( "li" ),
				$hide = self.panels.filter( ":not(.ui-tabs-hide)" ),
				$show = self.element.find( self._sanitizeSelector( el.hash ) );

			if ( ( $li.hasClass( "ui-tabs-selected" ) && !o.collapsible) ||
				$li.hasClass( "ui-state-disabled" ) ||
				$li.hasClass( "ui-state-processing" ) ||
				self.panels.filter( ":animated" ).length ||
				self._trigger( "select", null, self._ui( this, $show[ 0 ] ) ) === false ) {
				this.blur();
				return false;
			}

			o.selected = self.anchors.index( this );

			self.abort();

			if ( o.collapsible ) {
				if ( $li.hasClass( "ui-tabs-selected" ) ) {
					o.selected = -1;

					if ( o.cookie ) {
						self._cookie( o.selected, o.cookie );
					}

					self.element.queue( "tabs", function() {
						hideTab( el, $hide );
					}).dequeue( "tabs" );

					this.blur();
					return false;
				} else if ( !$hide.length ) {
					if ( o.cookie ) {
						self._cookie( o.selected, o.cookie );
					}

					self.element.queue( "tabs", function() {
						showTab( el, $show );
					});

					self.load( self.anchors.index( this ) );

					this.blur();
					return false;
				}
			}

			if ( o.cookie ) {
				self._cookie( o.selected, o.cookie );
			}

			if ( $show.length ) {
				if ( $hide.length ) {
					self.element.queue( "tabs", function() {
						hideTab( el, $hide );
					});
				}
				self.element.queue( "tabs", function() {
					showTab( el, $show );
				});

				self.load( self.anchors.index( this ) );
			} else {
				throw "jQuery UI Tabs: Mismatching fragment identifier.";
			}

			if ( $.browser.msie ) {
				this.blur();
			}
		});

		this.anchors.bind( "click.tabs", function(){
			return false;
		});
	},

    _getIndex: function( index ) {
		if ( typeof index == "string" ) {
			index = this.anchors.index( this.anchors.filter( "[href$=" + index + "]" ) );
		}

		return index;
	},

	destroy: function() {
		var o = this.options;

		this.abort();

		this.element
			.unbind( ".tabs" )
			.removeClass( "ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible" )
			.removeData( "tabs" );

		this.list.removeClass( "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" );

		this.anchors.each(function() {
			var href = $.data( this, "href.tabs" );
			if ( href ) {
				this.href = href;
			}
			var $this = $( this ).unbind( ".tabs" );
			$.each( [ "href", "load", "cache" ], function( i, prefix ) {
				$this.removeData( prefix + ".tabs" );
			});
		});

		this.lis.unbind( ".tabs" ).add( this.panels ).each(function() {
			if ( $.data( this, "destroy.tabs" ) ) {
				$( this ).remove();
			} else {
				$( this ).removeClass([
					"ui-state-default",
					"ui-corner-top",
					"ui-tabs-selected",
					"ui-state-active",
					"ui-state-hover",
					"ui-state-focus",
					"ui-state-disabled",
					"ui-tabs-panel",
					"ui-widget-content",
					"ui-corner-bottom",
					"ui-tabs-hide"
				].join( " " ) );
			}
		});

		if ( o.cookie ) {
			this._cookie( null, o.cookie );
		}

		return this;
	},

	add: function( url, label, index ) {
		if ( index === undefined ) {
			index = this.anchors.length;
		}

		var self = this,
			o = this.options,
			$li = $( o.tabTemplate.replace( /#\{href\}/g, url ).replace( /#\{label\}/g, label ) ),
			id = !url.indexOf( "#" ) ? url.replace( "#", "" ) : this._tabId( $( "a", $li )[ 0 ] );

		$li.addClass( "ui-state-default ui-corner-top" ).data( "destroy.tabs", true );

		var $panel = self.element.find( "#" + id );
		if ( !$panel.length ) {
			$panel = $( o.panelTemplate )
				.attr( "id", id )
				.data( "destroy.tabs", true );
		}
		$panel.addClass( "ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide" );

		if ( index >= this.lis.length ) {
			$li.appendTo( this.list );
			$panel.appendTo( this.list[ 0 ].parentNode );
		} else {
			$li.insertBefore( this.lis[ index ] );
			$panel.insertBefore( this.panels[ index ] );
		}

		o.disabled = $.map( o.disabled, function( n, i ) {
			return n >= index ? ++n : n;
		});

		this._tabify();

		if ( this.anchors.length == 1 ) {
			o.selected = 0;
			$li.addClass( "ui-tabs-selected ui-state-active" );
			$panel.removeClass( "ui-tabs-hide" );
			this.element.queue( "tabs", function() {
				self._trigger( "show", null, self._ui( self.anchors[ 0 ], self.panels[ 0 ] ) );
			});

			this.load( 0 );
		}

		this._trigger( "add", null, this._ui( this.anchors[ index ], this.panels[ index ] ) );
		return this;
	},

	remove: function( index ) {
		index = this._getIndex( index );
		var o = this.options,
			$li = this.lis.eq( index ).remove(),
			$panel = this.panels.eq( index ).remove();

		if ( $li.hasClass( "ui-tabs-selected" ) && this.anchors.length > 1) {
			this.select( index + ( index + 1 < this.anchors.length ? 1 : -1 ) );
		}

		o.disabled = $.map(
			$.grep( o.disabled, function(n, i) {
				return n != index;
			}),
			function( n, i ) {
				return n >= index ? --n : n;
			});

		this._tabify();

		this._trigger( "remove", null, this._ui( $li.find( "a" )[ 0 ], $panel[ 0 ] ) );
		return this;
	},

	enable: function( index ) {
		index = this._getIndex( index );
		var o = this.options;
		if ( $.inArray( index, o.disabled ) == -1 ) {
			return;
		}

		this.lis.eq( index ).removeClass( "ui-state-disabled" );
		o.disabled = $.grep( o.disabled, function( n, i ) {
			return n != index;
		});

		this._trigger( "enable", null, this._ui( this.anchors[ index ], this.panels[ index ] ) );
		return this;
	},

	disable: function( index ) {
		index = this._getIndex( index );
		var self = this, o = this.options;
		if ( index != o.selected ) {
			this.lis.eq( index ).addClass( "ui-state-disabled" );

			o.disabled.push( index );
			o.disabled.sort();

			this._trigger( "disable", null, this._ui( this.anchors[ index ], this.panels[ index ] ) );
		}

		return this;
	},

	select: function( index ) {
		index = this._getIndex( index );
		if ( index == -1 ) {
			if ( this.options.collapsible && this.options.selected != -1 ) {
				index = this.options.selected;
			} else {
				return this;
			}
		}
		this.anchors.eq( index ).trigger( this.options.event + ".tabs" );
		return this;
	},

	load: function( index ) {
		index = this._getIndex( index );
		var self = this,
			o = this.options,
			a = this.anchors.eq( index )[ 0 ],
			url = $.data( a, "load.tabs" );

		this.abort();

		if ( !url || this.element.queue( "tabs" ).length !== 0 && $.data( a, "cache.tabs" ) ) {
			this.element.dequeue( "tabs" );
			return;
		}

		this.lis.eq( index ).addClass( "ui-state-processing" );

		if ( o.spinner ) {
			var span = $( "span", a );
			span.data( "label.tabs", span.html() ).html( o.spinner );
		}

		this.xhr = $.ajax( $.extend( {}, o.ajaxOptions, {
			url: url,
			success: function( r, s ) {
				self.element.find( self._sanitizeSelector( a.hash ) ).html( r );

				self._cleanup();

				if ( o.cache ) {
					$.data( a, "cache.tabs", true );
				}

				self._trigger( "load", null, self._ui( self.anchors[ index ], self.panels[ index ] ) );
				try {
					o.ajaxOptions.success( r, s );
				}
				catch ( e ) {}
			},
			error: function( xhr, s, e ) {
				self._cleanup();

				self._trigger( "load", null, self._ui( self.anchors[ index ], self.panels[ index ] ) );
				try {
					o.ajaxOptions.error( xhr, s, index, a );
				}
				catch ( e ) {}
			}
		} ) );

		self.element.dequeue( "tabs" );

		return this;
	},

	abort: function() {
		this.element.queue( [] );
		this.panels.stop( false, true );

		this.element.queue( "tabs", this.element.queue( "tabs" ).splice( -2, 2 ) );

		if ( this.xhr ) {
			this.xhr.abort();
			delete this.xhr;
		}

		this._cleanup();
		return this;
	},

	url: function( index, url ) {
		this.anchors.eq( index ).removeData( "cache.tabs" ).data( "load.tabs", url );
		return this;
	},

	length: function() {
		return this.anchors.length;
	}
});

$.extend( $.ui.tabs, {
	version: "1.8.18"
});

/*
 * Tabs Extensions
 */

/*
 * Rotate
 */
$.extend( $.ui.tabs.prototype, {
	rotation: null,
	rotate: function( ms, continuing ) {
		var self = this,
			o = this.options;

		var rotate = self._rotate || ( self._rotate = function( e ) {
			clearTimeout( self.rotation );
			self.rotation = setTimeout(function() {
				var t = o.selected;
				self.select( ++t < self.anchors.length ? t : 0 );
			}, ms );

			if ( e ) {
				e.stopPropagation();
			}
		});

		var stop = self._unrotate || ( self._unrotate = !continuing
			? function(e) {
				if (e.clientX) { // in case of a true click
					self.rotate(null);
				}
			}
			: function( e ) {
				t = o.selected;
				rotate();
			});

		if ( ms ) {
			this.element.bind( "tabsshow", rotate );
			this.anchors.bind( o.event + ".tabs", stop );
			rotate();
		} else {
			clearTimeout( self.rotation );
			this.element.unbind( "tabsshow", rotate );
			this.anchors.unbind( o.event + ".tabs", stop );
			delete this._rotate;
			delete this._unrotate;
		}

		return this;
	}
});

})( jQuery );
/*
 * jQuery UI Datepicker 1.8.18
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Datepicker
 *
 * Depends:
 *	jquery.ui.core.js
 */
(function( $, undefined ) {

$.extend($.ui, { datepicker: { version: "1.8.18" } });

var PROP_NAME = 'datepicker';
var dpuuid = new Date().getTime();
var instActive;

/* Date picker manager.
   Use the singleton instance of this class, $.datepicker, to interact with the date picker.
   Settings for (groups of) date pickers are maintained in an instance object,
   allowing multiple different settings on the same page. */

function Datepicker() {
	this.debug = false; // Change this to true to start debugging
	this._curInst = null; // The current instance in use
	this._keyEvent = false; // If the last event was a key event
	this._disabledInputs = []; // List of date picker inputs that have been disabled
	this._datepickerShowing = false; // True if the popup picker is showing , false if not
	this._inDialog = false; // True if showing within a "dialog", false if not
	this._mainDivId = 'ui-datepicker-div'; // The ID of the main datepicker division
	this._inlineClass = 'ui-datepicker-inline'; // The name of the inline marker class
	this._appendClass = 'ui-datepicker-append'; // The name of the append marker class
	this._triggerClass = 'ui-datepicker-trigger'; // The name of the trigger marker class
	this._dialogClass = 'ui-datepicker-dialog'; // The name of the dialog marker class
	this._disableClass = 'ui-datepicker-disabled'; // The name of the disabled covering marker class
	this._unselectableClass = 'ui-datepicker-unselectable'; // The name of the unselectable cell marker class
	this._currentClass = 'ui-datepicker-current-day'; // The name of the current day marker class
	this._dayOverClass = 'ui-datepicker-days-cell-over'; // The name of the day hover marker class
	this.regional = []; // Available regional settings, indexed by language code
	this.regional[''] = { // Default regional settings
		closeText: 'Done', // Display text for close link
		prevText: 'Prev', // Display text for previous month link
		nextText: 'Next', // Display text for next month link
		currentText: 'Today', // Display text for current month link
		monthNames: ['January','February','March','April','May','June',
			'July','August','September','October','November','December'], // Names of months for drop-down and formatting
		monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // For formatting
		dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], // For formatting
		dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // For formatting
		dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'], // Column headings for days starting at Sunday
		weekHeader: 'Wk', // Column header for week of the year
		dateFormat: 'mm/dd/yy', // See format options on parseDate
		firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
		isRTL: false, // True if right-to-left language, false if left-to-right
		showMonthAfterYear: false, // True if the year select precedes month, false for month then year
		yearSuffix: '' // Additional text to append to the year in the month headers
	};
	this._defaults = { // Global defaults for all the date picker instances
		showOn: 'focus', // 'focus' for popup on focus,
		showAnim: 'fadeIn', // Name of jQuery animation for popup
		showOptions: {}, // Options for enhanced animations
		defaultDate: null, // Used when field is blank: actual date,
		appendText: '', // Display text following the input box, e.g. showing the format
		buttonText: '...', // Text for trigger button
		buttonImage: '', // URL for trigger button image
		buttonImageOnly: false, // True if the image appears alone, false if it appears on a button
		hideIfNoPrevNext: false, // True to hide next/previous month links
		navigationAsDateFormat: false, // True if date formatting applied to prev/today/next links
		gotoCurrent: false, // True if today link goes back to current selection instead
		changeMonth: false, // True if month can be selected directly, false if only prev/next
		changeYear: false, // True if year can be selected directly, false if only prev/next
		yearRange: 'c-10:c+10', // Range of years to display in drop-down,
		showOtherMonths: false, // True to show dates in other months, false to leave blank
		selectOtherMonths: false, // True to allow selection of dates in other months, false for unselectable
		showWeek: false, // True to show week of the year, false to not show it
		calculateWeek: this.iso8601Week, // How to calculate the week of the year,
		shortYearCutoff: '+10', // Short year values < this are in the current century,
		minDate: null, // The earliest selectable date, or null for no limit
		maxDate: null, // The latest selectable date, or null for no limit
		duration: 'fast', // Duration of display/closure
		beforeShowDay: null, // Function that takes a date and returns an array with
		beforeShow: null, // Function that takes an input field and
		onSelect: null, // Define a callback function when a date is selected
		onChangeMonthYear: null, // Define a callback function when the month or year is changed
		onClose: null, // Define a callback function when the datepicker is closed
		numberOfMonths: 1, // Number of months to show at a time
		showCurrentAtPos: 0, // The position in multipe months at which to show the current month (starting at 0)
		stepMonths: 1, // Number of months to step back/forward
		stepBigMonths: 12, // Number of months to step back/forward for the big links
		altField: '', // Selector for an alternate field to store selected dates into
		altFormat: '', // The date format to use for the alternate field
		constrainInput: true, // The input is constrained by the current date format
		showButtonPanel: false, // True to show button panel, false to not show it
		autoSize: false, // True to size the input for the date format, false to leave as is
		disabled: false // The initial disabled state
	};
	$.extend(this._defaults, this.regional['']);
	this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'));
}

$.extend(Datepicker.prototype, {
	/* Class name added to elements to indicate already configured with a date picker. */
	markerClassName: 'hasDatepicker',

	maxRows: 4,

	/* Debug logging (if enabled). */
	log: function () {
		if (this.debug)
			console.log.apply('', arguments);
	},

	_widgetDatepicker: function() {
		return this.dpDiv;
	},

	/* Override the default settings for all instances of the date picker.
	   @param  settings  object - the new settings to use as defaults (anonymous object)
	   @return the manager object */
	setDefaults: function(settings) {
		extendRemove(this._defaults, settings || {});
		return this;
	},

	/* Attach the date picker to a jQuery selection.
	   @param  target    element - the target input field or division or span
	   @param  settings  object - the new settings to use for this date picker instance (anonymous) */
	_attachDatepicker: function(target, settings) {
		var inlineSettings = null;
		for (var attrName in this._defaults) {
			var attrValue = target.getAttribute('date:' + attrName);
			if (attrValue) {
				inlineSettings = inlineSettings || {};
				try {
					inlineSettings[attrName] = eval(attrValue);
				} catch (err) {
					inlineSettings[attrName] = attrValue;
				}
			}
		}
		var nodeName = target.nodeName.toLowerCase();
		var inline = (nodeName == 'div' || nodeName == 'span');
		if (!target.id) {
			this.uuid += 1;
			target.id = 'dp' + this.uuid;
		}
		var inst = this._newInst($(target), inline);
		inst.settings = $.extend({}, settings || {}, inlineSettings || {});
		if (nodeName == 'input') {
			this._connectDatepicker(target, inst);
		} else if (inline) {
			this._inlineDatepicker(target, inst);
		}
	},

	/* Create a new instance object. */
	_newInst: function(target, inline) {
		var id = target[0].id.replace(/([^A-Za-z0-9_-])/g, '\\\\$1'); // escape jQuery meta chars
		return {id: id, input: target, // associated target
			selectedDay: 0, selectedMonth: 0, selectedYear: 0, // current selection
			drawMonth: 0, drawYear: 0, // month being drawn
			inline: inline, // is datepicker inline or not
			dpDiv: (!inline ? this.dpDiv : // presentation div
			bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')))};
	},

	/* Attach the date picker to an input field. */
	_connectDatepicker: function(target, inst) {
		var input = $(target);
		inst.append = $([]);
		inst.trigger = $([]);
		if (input.hasClass(this.markerClassName))
			return;
		this._attachments(input, inst);
		input.addClass(this.markerClassName).keydown(this._doKeyDown).
			keypress(this._doKeyPress).keyup(this._doKeyUp).
			bind("setData.datepicker", function(event, key, value) {
				inst.settings[key] = value;
			}).bind("getData.datepicker", function(event, key) {
				return this._get(inst, key);
			});
		this._autoSize(inst);
		$.data(target, PROP_NAME, inst);
		if( inst.settings.disabled ) {
			this._disableDatepicker( target );
		}
	},

	/* Make attachments based on settings. */
	_attachments: function(input, inst) {
		var appendText = this._get(inst, 'appendText');
		var isRTL = this._get(inst, 'isRTL');
		if (inst.append)
			inst.append.remove();
		if (appendText) {
			inst.append = $('<span class="' + this._appendClass + '">' + appendText + '</span>');
			input[isRTL ? 'before' : 'after'](inst.append);
		}
		input.unbind('focus', this._showDatepicker);
		if (inst.trigger)
			inst.trigger.remove();
		var showOn = this._get(inst, 'showOn');
		if (showOn == 'focus' || showOn == 'both') // pop-up date picker when in the marked field
			input.focus(this._showDatepicker);
		if (showOn == 'button' || showOn == 'both') { // pop-up date picker when button clicked
			var buttonText = this._get(inst, 'buttonText');
			var buttonImage = this._get(inst, 'buttonImage');
			inst.trigger = $(this._get(inst, 'buttonImageOnly') ?
				$('<img/>').addClass(this._triggerClass).
					attr({ src: buttonImage, alt: buttonText, title: buttonText }) :
				$('<button type="button"></button>').addClass(this._triggerClass).
					html(buttonImage == '' ? buttonText : $('<img/>').attr(
					{ src:buttonImage, alt:buttonText, title:buttonText })));
			input[isRTL ? 'before' : 'after'](inst.trigger);
			inst.trigger.click(function() {
				if ($.datepicker._datepickerShowing && $.datepicker._lastInput == input[0])
					$.datepicker._hideDatepicker();
				else if ($.datepicker._datepickerShowing && $.datepicker._lastInput != input[0]) {
					$.datepicker._hideDatepicker();
					$.datepicker._showDatepicker(input[0]);
				} else
					$.datepicker._showDatepicker(input[0]);
				return false;
			});
		}
	},

	/* Apply the maximum length for the date format. */
	_autoSize: function(inst) {
		if (this._get(inst, 'autoSize') && !inst.inline) {
			var date = new Date(2009, 12 - 1, 20); // Ensure double digits
			var dateFormat = this._get(inst, 'dateFormat');
			if (dateFormat.match(/[DM]/)) {
				var findMax = function(names) {
					var max = 0;
					var maxI = 0;
					for (var i = 0; i < names.length; i++) {
						if (names[i].length > max) {
							max = names[i].length;
							maxI = i;
						}
					}
					return maxI;
				};
				date.setMonth(findMax(this._get(inst, (dateFormat.match(/MM/) ?
					'monthNames' : 'monthNamesShort'))));
				date.setDate(findMax(this._get(inst, (dateFormat.match(/DD/) ?
					'dayNames' : 'dayNamesShort'))) + 20 - date.getDay());
			}
			inst.input.attr('size', this._formatDate(inst, date).length);
		}
	},

	/* Attach an inline date picker to a div. */
	_inlineDatepicker: function(target, inst) {
		var divSpan = $(target);
		if (divSpan.hasClass(this.markerClassName))
			return;
		divSpan.addClass(this.markerClassName).append(inst.dpDiv).
			bind("setData.datepicker", function(event, key, value){
				inst.settings[key] = value;
			}).bind("getData.datepicker", function(event, key){
				return this._get(inst, key);
			});
		$.data(target, PROP_NAME, inst);
		this._setDate(inst, this._getDefaultDate(inst), true);
		this._updateDatepicker(inst);
		this._updateAlternate(inst);
		if( inst.settings.disabled ) {
			this._disableDatepicker( target );
		}
		inst.dpDiv.css( "display", "block" );
	},

	/* Pop-up the date picker in a "dialog" box.
	   @param  input     element - ignored
	   @param  date      string or Date - the initial date to display
	   @param  onSelect  function - the function to call when a date is selected
	   @param  settings  object - update the dialog date picker instance's settings (anonymous object)
	   @param  pos       int[2] - coordinates for the dialog's position within the screen or
	                     event - with x/y coordinates or
	                     leave empty for default (screen centre)
	   @return the manager object */
	_dialogDatepicker: function(input, date, onSelect, settings, pos) {
		var inst = this._dialogInst; // internal instance
		if (!inst) {
			this.uuid += 1;
			var id = 'dp' + this.uuid;
			this._dialogInput = $('<input type="text" id="' + id +
				'" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');
			this._dialogInput.keydown(this._doKeyDown);
			$('body').append(this._dialogInput);
			inst = this._dialogInst = this._newInst(this._dialogInput, false);
			inst.settings = {};
			$.data(this._dialogInput[0], PROP_NAME, inst);
		}
		extendRemove(inst.settings, settings || {});
		date = (date && date.constructor == Date ? this._formatDate(inst, date) : date);
		this._dialogInput.val(date);

		this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
		if (!this._pos) {
			var browserWidth = document.documentElement.clientWidth;
			var browserHeight = document.documentElement.clientHeight;
			var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
			var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
			this._pos = // should use actual width/height below
				[(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY];
		}

		this._dialogInput.css('left', (this._pos[0] + 20) + 'px').css('top', this._pos[1] + 'px');
		inst.settings.onSelect = onSelect;
		this._inDialog = true;
		this.dpDiv.addClass(this._dialogClass);
		this._showDatepicker(this._dialogInput[0]);
		if ($.blockUI)
			$.blockUI(this.dpDiv);
		$.data(this._dialogInput[0], PROP_NAME, inst);
		return this;
	},

	/* Detach a datepicker from its control.
	   @param  target    element - the target input field or division or span */
	_destroyDatepicker: function(target) {
		var $target = $(target);
		var inst = $.data(target, PROP_NAME);
		if (!$target.hasClass(this.markerClassName)) {
			return;
		}
		var nodeName = target.nodeName.toLowerCase();
		$.removeData(target, PROP_NAME);
		if (nodeName == 'input') {
			inst.append.remove();
			inst.trigger.remove();
			$target.removeClass(this.markerClassName).
				unbind('focus', this._showDatepicker).
				unbind('keydown', this._doKeyDown).
				unbind('keypress', this._doKeyPress).
				unbind('keyup', this._doKeyUp);
		} else if (nodeName == 'div' || nodeName == 'span')
			$target.removeClass(this.markerClassName).empty();
	},

	/* Enable the date picker to a jQuery selection.
	   @param  target    element - the target input field or division or span */
	_enableDatepicker: function(target) {
		var $target = $(target);
		var inst = $.data(target, PROP_NAME);
		if (!$target.hasClass(this.markerClassName)) {
			return;
		}
		var nodeName = target.nodeName.toLowerCase();
		if (nodeName == 'input') {
			target.disabled = false;
			inst.trigger.filter('button').
				each(function() { this.disabled = false; }).end().
				filter('img').css({opacity: '1.0', cursor: ''});
		}
		else if (nodeName == 'div' || nodeName == 'span') {
			var inline = $target.children('.' + this._inlineClass);
			inline.children().removeClass('ui-state-disabled');
			inline.find("select.ui-datepicker-month, select.ui-datepicker-year").
				removeAttr("disabled");
		}
		this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value == target ? null : value); }); // delete entry
	},

	/* Disable the date picker to a jQuery selection.
	   @param  target    element - the target input field or division or span */
	_disableDatepicker: function(target) {
		var $target = $(target);
		var inst = $.data(target, PROP_NAME);
		if (!$target.hasClass(this.markerClassName)) {
			return;
		}
		var nodeName = target.nodeName.toLowerCase();
		if (nodeName == 'input') {
			target.disabled = true;
			inst.trigger.filter('button').
				each(function() { this.disabled = true; }).end().
				filter('img').css({opacity: '0.5', cursor: 'default'});
		}
		else if (nodeName == 'div' || nodeName == 'span') {
			var inline = $target.children('.' + this._inlineClass);
			inline.children().addClass('ui-state-disabled');
			inline.find("select.ui-datepicker-month, select.ui-datepicker-year").
				attr("disabled", "disabled");
		}
		this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value == target ? null : value); }); // delete entry
		this._disabledInputs[this._disabledInputs.length] = target;
	},

	/* Is the first field in a jQuery collection disabled as a datepicker?
	   @param  target    element - the target input field or division or span
	   @return boolean - true if disabled, false if enabled */
	_isDisabledDatepicker: function(target) {
		if (!target) {
			return false;
		}
		for (var i = 0; i < this._disabledInputs.length; i++) {
			if (this._disabledInputs[i] == target)
				return true;
		}
		return false;
	},

	/* Retrieve the instance data for the target control.
	   @param  target  element - the target input field or division or span
	   @return  object - the associated instance data
	   @throws  error if a jQuery problem getting data */
	_getInst: function(target) {
		try {
			return $.data(target, PROP_NAME);
		}
		catch (err) {
			throw 'Missing instance data for this datepicker';
		}
	},

	/* Update or retrieve the settings for a date picker attached to an input field or division.
	   @param  target  element - the target input field or division or span
	   @param  name    object - the new settings to update or
	                   string - the name of the setting to change or retrieve,
	                   when retrieving also 'all' for all instance settings or
	                   'defaults' for all global defaults
	   @param  value   any - the new value for the setting
	                   (omit if above is an object or to retrieve a value) */
	_optionDatepicker: function(target, name, value) {
		var inst = this._getInst(target);
		if (arguments.length == 2 && typeof name == 'string') {
			return (name == 'defaults' ? $.extend({}, $.datepicker._defaults) :
				(inst ? (name == 'all' ? $.extend({}, inst.settings) :
				this._get(inst, name)) : null));
		}
		var settings = name || {};
		if (typeof name == 'string') {
			settings = {};
			settings[name] = value;
		}
		if (inst) {
			if (this._curInst == inst) {
				this._hideDatepicker();
			}
			var date = this._getDateDatepicker(target, true);
			var minDate = this._getMinMaxDate(inst, 'min');
			var maxDate = this._getMinMaxDate(inst, 'max');
			extendRemove(inst.settings, settings);
			if (minDate !== null && settings['dateFormat'] !== undefined && settings['minDate'] === undefined)
				inst.settings.minDate = this._formatDate(inst, minDate);
			if (maxDate !== null && settings['dateFormat'] !== undefined && settings['maxDate'] === undefined)
				inst.settings.maxDate = this._formatDate(inst, maxDate);
			this._attachments($(target), inst);
			this._autoSize(inst);
			this._setDate(inst, date);
			this._updateAlternate(inst);
			this._updateDatepicker(inst);
		}
	},

	_changeDatepicker: function(target, name, value) {
		this._optionDatepicker(target, name, value);
	},

	/* Redraw the date picker attached to an input field or division.
	   @param  target  element - the target input field or division or span */
	_refreshDatepicker: function(target) {
		var inst = this._getInst(target);
		if (inst) {
			this._updateDatepicker(inst);
		}
	},

	/* Set the dates for a jQuery selection.
	   @param  target   element - the target input field or division or span
	   @param  date     Date - the new date */
	_setDateDatepicker: function(target, date) {
		var inst = this._getInst(target);
		if (inst) {
			this._setDate(inst, date);
			this._updateDatepicker(inst);
			this._updateAlternate(inst);
		}
	},

	/* Get the date(s) for the first entry in a jQuery selection.
	   @param  target     element - the target input field or division or span
	   @param  noDefault  boolean - true if no default date is to be used
	   @return Date - the current date */
	_getDateDatepicker: function(target, noDefault) {
		var inst = this._getInst(target);
		if (inst && !inst.inline)
			this._setDateFromField(inst, noDefault);
		return (inst ? this._getDate(inst) : null);
	},

	/* Handle keystrokes. */
	_doKeyDown: function(event) {
		var inst = $.datepicker._getInst(event.target);
		var handled = true;
		var isRTL = inst.dpDiv.is('.ui-datepicker-rtl');
		inst._keyEvent = true;
		if ($.datepicker._datepickerShowing)
			switch (event.keyCode) {
				case 9: $.datepicker._hideDatepicker();
						handled = false;
						break; // hide on tab out
				case 13: var sel = $('td.' + $.datepicker._dayOverClass + ':not(.' +
									$.datepicker._currentClass + ')', inst.dpDiv);
						if (sel[0])
							$.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
							var onSelect = $.datepicker._get(inst, 'onSelect');
							if (onSelect) {
								var dateStr = $.datepicker._formatDate(inst);

								onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);
							}
						else
							$.datepicker._hideDatepicker();
						return false; // don't submit the form
						break; // select the value on enter
				case 27: $.datepicker._hideDatepicker();
						break; // hide on escape
				case 33: $.datepicker._adjustDate(event.target, (event.ctrlKey ?
							-$.datepicker._get(inst, 'stepBigMonths') :
							-$.datepicker._get(inst, 'stepMonths')), 'M');
						break; // previous month/year on page up/+ ctrl
				case 34: $.datepicker._adjustDate(event.target, (event.ctrlKey ?
							+$.datepicker._get(inst, 'stepBigMonths') :
							+$.datepicker._get(inst, 'stepMonths')), 'M');
						break; // next month/year on page down/+ ctrl
				case 35: if (event.ctrlKey || event.metaKey) $.datepicker._clearDate(event.target);
						handled = event.ctrlKey || event.metaKey;
						break; // clear on ctrl or command +end
				case 36: if (event.ctrlKey || event.metaKey) $.datepicker._gotoToday(event.target);
						handled = event.ctrlKey || event.metaKey;
						break; // current on ctrl or command +home
				case 37: if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), 'D');
						handled = event.ctrlKey || event.metaKey;
						if (event.originalEvent.altKey) $.datepicker._adjustDate(event.target, (event.ctrlKey ?
									-$.datepicker._get(inst, 'stepBigMonths') :
									-$.datepicker._get(inst, 'stepMonths')), 'M');
						break;
				case 38: if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, -7, 'D');
						handled = event.ctrlKey || event.metaKey;
						break; // -1 week on ctrl or command +up
				case 39: if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), 'D');
						handled = event.ctrlKey || event.metaKey;
						if (event.originalEvent.altKey) $.datepicker._adjustDate(event.target, (event.ctrlKey ?
									+$.datepicker._get(inst, 'stepBigMonths') :
									+$.datepicker._get(inst, 'stepMonths')), 'M');
						break;
				case 40: if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, +7, 'D');
						handled = event.ctrlKey || event.metaKey;
						break; // +1 week on ctrl or command +down
				default: handled = false;
			}
		else if (event.keyCode == 36 && event.ctrlKey) // display the date picker on ctrl+home
			$.datepicker._showDatepicker(this);
		else {
			handled = false;
		}
		if (handled) {
			event.preventDefault();
			event.stopPropagation();
		}
	},

	/* Filter entered characters - based on date format. */
	_doKeyPress: function(event) {
		var inst = $.datepicker._getInst(event.target);
		if ($.datepicker._get(inst, 'constrainInput')) {
			var chars = $.datepicker._possibleChars($.datepicker._get(inst, 'dateFormat'));
			var chr = String.fromCharCode(event.charCode == undefined ? event.keyCode : event.charCode);
			return event.ctrlKey || event.metaKey || (chr < ' ' || !chars || chars.indexOf(chr) > -1);
		}
	},

	/* Synchronise manual entry and field/alternate field. */
	_doKeyUp: function(event) {
		var inst = $.datepicker._getInst(event.target);
		if (inst.input.val() != inst.lastVal) {
			try {
				var date = $.datepicker.parseDate($.datepicker._get(inst, 'dateFormat'),
					(inst.input ? inst.input.val() : null),
					$.datepicker._getFormatConfig(inst));
				if (date) { // only if valid
					$.datepicker._setDateFromField(inst);
					$.datepicker._updateAlternate(inst);
					$.datepicker._updateDatepicker(inst);
				}
			}
			catch (event) {
				$.datepicker.log(event);
			}
		}
		return true;
	},

	/* Pop-up the date picker for a given input field.
       If false returned from beforeShow event handler do not show.
	   @param  input  element - the input field attached to the date picker or
	                  event - if triggered by focus */
	_showDatepicker: function(input) {
		input = input.target || input;
		if (input.nodeName.toLowerCase() != 'input') // find from button/image trigger
			input = $('input', input.parentNode)[0];
		if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput == input) // already here
			return;
		var inst = $.datepicker._getInst(input);
		if ($.datepicker._curInst && $.datepicker._curInst != inst) {
			$.datepicker._curInst.dpDiv.stop(true, true);
			if ( inst && $.datepicker._datepickerShowing ) {
				$.datepicker._hideDatepicker( $.datepicker._curInst.input[0] );
			}
		}
		var beforeShow = $.datepicker._get(inst, 'beforeShow');
		var beforeShowSettings = beforeShow ? beforeShow.apply(input, [input, inst]) : {};
		if(beforeShowSettings === false){
			return;
		}
		extendRemove(inst.settings, beforeShowSettings);
		inst.lastVal = null;
		$.datepicker._lastInput = input;
		$.datepicker._setDateFromField(inst);
		if ($.datepicker._inDialog) // hide cursor
			input.value = '';
		if (!$.datepicker._pos) { // position below input
			$.datepicker._pos = $.datepicker._findPos(input);
			$.datepicker._pos[1] += input.offsetHeight; // add the height
		}
		var isFixed = false;
		$(input).parents().each(function() {
			isFixed |= $(this).css('position') == 'fixed';
			return !isFixed;
		});
		if (isFixed && $.browser.opera) { // correction for Opera when fixed and scrolled
			$.datepicker._pos[0] -= document.documentElement.scrollLeft;
			$.datepicker._pos[1] -= document.documentElement.scrollTop;
		}
		var offset = {left: $.datepicker._pos[0], top: $.datepicker._pos[1]};
		$.datepicker._pos = null;
		inst.dpDiv.empty();
		inst.dpDiv.css({position: 'absolute', display: 'block', top: '-1000px'});
		$.datepicker._updateDatepicker(inst);
		offset = $.datepicker._checkOffset(inst, offset, isFixed);
		inst.dpDiv.css({position: ($.datepicker._inDialog && $.blockUI ?
			'static' : (isFixed ? 'fixed' : 'absolute')), display: 'none',
			left: offset.left + 'px', top: offset.top + 'px'});
		if (!inst.inline) {
			var showAnim = $.datepicker._get(inst, 'showAnim');
			var duration = $.datepicker._get(inst, 'duration');
			var postProcess = function() {
				var cover = inst.dpDiv.find('iframe.ui-datepicker-cover'); // IE6- only
				if( !! cover.length ){
					var borders = $.datepicker._getBorders(inst.dpDiv);
					cover.css({left: -borders[0], top: -borders[1],
						width: inst.dpDiv.outerWidth(), height: inst.dpDiv.outerHeight()});
				}
			};
			inst.dpDiv.zIndex($(input).zIndex()+1);
			$.datepicker._datepickerShowing = true;
			if ($.effects && $.effects[showAnim])
				inst.dpDiv.show(showAnim, $.datepicker._get(inst, 'showOptions'), duration, postProcess);
			else
				inst.dpDiv[showAnim || 'show']((showAnim ? duration : null), postProcess);
			if (!showAnim || !duration)
				postProcess();
			if (inst.input.is(':visible') && !inst.input.is(':disabled'))
				inst.input.focus();
			$.datepicker._curInst = inst;
		}
	},

	/* Generate the date picker content. */
	_updateDatepicker: function(inst) {
		var self = this;
		self.maxRows = 4; //Reset the max number of rows being displayed (see #7043)
		var borders = $.datepicker._getBorders(inst.dpDiv);
		instActive = inst; // for delegate hover events
		inst.dpDiv.empty().append(this._generateHTML(inst));
		var cover = inst.dpDiv.find('iframe.ui-datepicker-cover'); // IE6- only
		if( !!cover.length ){ //avoid call to outerXXXX() when not in IE6
			cover.css({left: -borders[0], top: -borders[1], width: inst.dpDiv.outerWidth(), height: inst.dpDiv.outerHeight()})
		}
		inst.dpDiv.find('.' + this._dayOverClass + ' a').mouseover();
		var numMonths = this._getNumberOfMonths(inst);
		var cols = numMonths[1];
		var width = 17;
		inst.dpDiv.removeClass('ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4').width('');
		if (cols > 1)
			inst.dpDiv.addClass('ui-datepicker-multi-' + cols).css('width', (width * cols) + 'em');
		inst.dpDiv[(numMonths[0] != 1 || numMonths[1] != 1 ? 'add' : 'remove') +
			'Class']('ui-datepicker-multi');
		inst.dpDiv[(this._get(inst, 'isRTL') ? 'add' : 'remove') +
			'Class']('ui-datepicker-rtl');
		if (inst == $.datepicker._curInst && $.datepicker._datepickerShowing && inst.input &&
				inst.input.is(':visible') && !inst.input.is(':disabled') && inst.input[0] != document.activeElement)
			inst.input.focus();
		if( inst.yearshtml ){
			var origyearshtml = inst.yearshtml;
			setTimeout(function(){
				if( origyearshtml === inst.yearshtml && inst.yearshtml ){
					inst.dpDiv.find('select.ui-datepicker-year:first').replaceWith(inst.yearshtml);
				}
				origyearshtml = inst.yearshtml = null;
			}, 0);
		}
	},

	/* Retrieve the size of left and top borders for an element.
	   @param  elem  (jQuery object) the element of interest
	   @return  (number[2]) the left and top borders */
	_getBorders: function(elem) {
		var convert = function(value) {
			return {thin: 1, medium: 2, thick: 3}[value] || value;
		};
		return [parseFloat(convert(elem.css('border-left-width'))),
			parseFloat(convert(elem.css('border-top-width')))];
	},

	/* Check positioning to remain on screen. */
	_checkOffset: function(inst, offset, isFixed) {
		var dpWidth = inst.dpDiv.outerWidth();
		var dpHeight = inst.dpDiv.outerHeight();
		var inputWidth = inst.input ? inst.input.outerWidth() : 0;
		var inputHeight = inst.input ? inst.input.outerHeight() : 0;
		var viewWidth = document.documentElement.clientWidth + $(document).scrollLeft();
		var viewHeight = document.documentElement.clientHeight + $(document).scrollTop();

		offset.left -= (this._get(inst, 'isRTL') ? (dpWidth - inputWidth) : 0);
		offset.left -= (isFixed && offset.left == inst.input.offset().left) ? $(document).scrollLeft() : 0;
		offset.top -= (isFixed && offset.top == (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;

		offset.left -= Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ?
			Math.abs(offset.left + dpWidth - viewWidth) : 0);
		offset.top -= Math.min(offset.top, (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ?
			Math.abs(dpHeight + inputHeight) : 0);

		return offset;
	},

	/* Find an object's position on the screen. */
	_findPos: function(obj) {
		var inst = this._getInst(obj);
		var isRTL = this._get(inst, 'isRTL');
        while (obj && (obj.type == 'hidden' || obj.nodeType != 1 || $.expr.filters.hidden(obj))) {
            obj = obj[isRTL ? 'previousSibling' : 'nextSibling'];
        }
        var position = $(obj).offset();
	    return [position.left, position.top];
	},

	/* Hide the date picker from view.
	   @param  input  element - the input field attached to the date picker */
	_hideDatepicker: function(input) {
		var inst = this._curInst;
		if (!inst || (input && inst != $.data(input, PROP_NAME)))
			return;
		if (this._datepickerShowing) {
			var showAnim = this._get(inst, 'showAnim');
			var duration = this._get(inst, 'duration');
			var self = this;
			var postProcess = function() {
				$.datepicker._tidyDialog(inst);
				self._curInst = null;
			};
			if ($.effects && $.effects[showAnim])
				inst.dpDiv.hide(showAnim, $.datepicker._get(inst, 'showOptions'), duration, postProcess);
			else
				inst.dpDiv[(showAnim == 'slideDown' ? 'slideUp' :
					(showAnim == 'fadeIn' ? 'fadeOut' : 'hide'))]((showAnim ? duration : null), postProcess);
			if (!showAnim)
				postProcess();
			this._datepickerShowing = false;
			var onClose = this._get(inst, 'onClose');
			if (onClose)
				onClose.apply((inst.input ? inst.input[0] : null),
					[(inst.input ? inst.input.val() : ''), inst]);
			this._lastInput = null;
			if (this._inDialog) {
				this._dialogInput.css({ position: 'absolute', left: '0', top: '-100px' });
				if ($.blockUI) {
					$.unblockUI();
					$('body').append(this.dpDiv);
				}
			}
			this._inDialog = false;
		}
	},

	/* Tidy up after a dialog display. */
	_tidyDialog: function(inst) {
		inst.dpDiv.removeClass(this._dialogClass).unbind('.ui-datepicker-calendar');
	},

	/* Close date picker if clicked elsewhere. */
	_checkExternalClick: function(event) {
		if (!$.datepicker._curInst)
			return;

		var $target = $(event.target),
			inst = $.datepicker._getInst($target[0]);

		if ( ( ( $target[0].id != $.datepicker._mainDivId &&
				$target.parents('#' + $.datepicker._mainDivId).length == 0 &&
				!$target.hasClass($.datepicker.markerClassName) &&
				!$target.closest("." + $.datepicker._triggerClass).length &&
				$.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI) ) ) ||
			( $target.hasClass($.datepicker.markerClassName) && $.datepicker._curInst != inst ) )
			$.datepicker._hideDatepicker();
	},

	/* Adjust one of the date sub-fields. */
	_adjustDate: function(id, offset, period) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		if (this._isDisabledDatepicker(target[0])) {
			return;
		}
		this._adjustInstDate(inst, offset +
			(period == 'M' ? this._get(inst, 'showCurrentAtPos') : 0), // undo positioning
			period);
		this._updateDatepicker(inst);
	},

	/* Action for current link. */
	_gotoToday: function(id) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		if (this._get(inst, 'gotoCurrent') && inst.currentDay) {
			inst.selectedDay = inst.currentDay;
			inst.drawMonth = inst.selectedMonth = inst.currentMonth;
			inst.drawYear = inst.selectedYear = inst.currentYear;
		}
		else {
			var date = new Date();
			inst.selectedDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = date.getFullYear();
		}
		this._notifyChange(inst);
		this._adjustDate(target);
	},

	/* Action for selecting a new month/year. */
	_selectMonthYear: function(id, select, period) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		inst['selected' + (period == 'M' ? 'Month' : 'Year')] =
		inst['draw' + (period == 'M' ? 'Month' : 'Year')] =
			parseInt(select.options[select.selectedIndex].value,10);
		this._notifyChange(inst);
		this._adjustDate(target);
	},

	/* Action for selecting a day. */
	_selectDay: function(id, month, year, td) {
		var target = $(id);
		if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
			return;
		}
		var inst = this._getInst(target[0]);
		inst.selectedDay = inst.currentDay = $('a', td).html();
		inst.selectedMonth = inst.currentMonth = month;
		inst.selectedYear = inst.currentYear = year;
		this._selectDate(id, this._formatDate(inst,
			inst.currentDay, inst.currentMonth, inst.currentYear));
	},

	/* Erase the input field and hide the date picker. */
	_clearDate: function(id) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		this._selectDate(target, '');
	},

	/* Update the input field with the selected date. */
	_selectDate: function(id, dateStr) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
		if (inst.input)
			inst.input.val(dateStr);
		this._updateAlternate(inst);
		var onSelect = this._get(inst, 'onSelect');
		if (onSelect)
			onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);  // trigger custom callback
		else if (inst.input)
			inst.input.trigger('change'); // fire the change event
		if (inst.inline)
			this._updateDatepicker(inst);
		else {
			this._hideDatepicker();
			this._lastInput = inst.input[0];
			if (typeof(inst.input[0]) != 'object')
				inst.input.focus(); // restore focus
			this._lastInput = null;
		}
	},

	/* Update any alternate field to synchronise with the main field. */
	_updateAlternate: function(inst) {
		var altField = this._get(inst, 'altField');
		if (altField) { // update alternate field too
			var altFormat = this._get(inst, 'altFormat') || this._get(inst, 'dateFormat');
			var date = this._getDate(inst);
			var dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
			$(altField).each(function() { $(this).val(dateStr); });
		}
	},

	/* Set as beforeShowDay function to prevent selection of weekends.
	   @param  date  Date - the date to customise
	   @return [boolean, string] - is this date selectable?, what is its CSS class? */
	noWeekends: function(date) {
		var day = date.getDay();
		return [(day > 0 && day < 6), ''];
	},

	/* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
	   @param  date  Date - the date to get the week for
	   @return  number - the number of the week within the year that contains this date */
	iso8601Week: function(date) {
		var checkDate = new Date(date.getTime());
		checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
		var time = checkDate.getTime();
		checkDate.setMonth(0); // Compare with Jan 1
		checkDate.setDate(1);
		return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
	},

	/* Parse a string value into a date object.
	   See formatDate below for the possible formats.

	   @param  format    string - the expected format of the date
	   @param  value     string - the date in the above format
	   @param  settings  Object - attributes include:
	                     shortYearCutoff  number - the cutoff year for determining the century (optional)
	                     dayNamesShort    string[7] - abbreviated names of the days from Sunday (optional)
	                     dayNames         string[7] - names of the days from Sunday (optional)
	                     monthNamesShort  string[12] - abbreviated names of the months (optional)
	                     monthNames       string[12] - names of the months (optional)
	   @return  Date - the extracted date value or null if value is blank */
	parseDate: function (format, value, settings) {
		if (format == null || value == null)
			throw 'Invalid arguments';
		value = (typeof value == 'object' ? value.toString() : value + '');
		if (value == '')
			return null;
		var shortYearCutoff = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff;
		shortYearCutoff = (typeof shortYearCutoff != 'string' ? shortYearCutoff :
				new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
		var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
		var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
		var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
		var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
		var year = -1;
		var month = -1;
		var day = -1;
		var doy = -1;
		var literal = false;
		var lookAhead = function(match) {
			var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
			if (matches)
				iFormat++;
			return matches;
		};
		var getNumber = function(match) {
			var isDoubled = lookAhead(match);
			var size = (match == '@' ? 14 : (match == '!' ? 20 :
				(match == 'y' && isDoubled ? 4 : (match == 'o' ? 3 : 2))));
			var digits = new RegExp('^\\d{1,' + size + '}');
			var num = value.substring(iValue).match(digits);
			if (!num)
				throw 'Missing number at position ' + iValue;
			iValue += num[0].length;
			return parseInt(num[0], 10);
		};
		var getName = function(match, shortNames, longNames) {
			var names = $.map(lookAhead(match) ? longNames : shortNames, function (v, k) {
				return [ [k, v] ];
			}).sort(function (a, b) {
				return -(a[1].length - b[1].length);
			});
			var index = -1;
			$.each(names, function (i, pair) {
				var name = pair[1];
				if (value.substr(iValue, name.length).toLowerCase() == name.toLowerCase()) {
					index = pair[0];
					iValue += name.length;
					return false;
				}
			});
			if (index != -1)
				return index + 1;
			else
				throw 'Unknown name at position ' + iValue;
		};
		var checkLiteral = function() {
			if (value.charAt(iValue) != format.charAt(iFormat))
				throw 'Unexpected literal at position ' + iValue;
			iValue++;
		};
		var iValue = 0;
		for (var iFormat = 0; iFormat < format.length; iFormat++) {
			if (literal)
				if (format.charAt(iFormat) == "'" && !lookAhead("'"))
					literal = false;
				else
					checkLiteral();
			else
				switch (format.charAt(iFormat)) {
					case 'd':
						day = getNumber('d');
						break;
					case 'D':
						getName('D', dayNamesShort, dayNames);
						break;
					case 'o':
						doy = getNumber('o');
						break;
					case 'm':
						month = getNumber('m');
						break;
					case 'M':
						month = getName('M', monthNamesShort, monthNames);
						break;
					case 'y':
						year = getNumber('y');
						break;
					case '@':
						var date = new Date(getNumber('@'));
						year = date.getFullYear();
						month = date.getMonth() + 1;
						day = date.getDate();
						break;
					case '!':
						var date = new Date((getNumber('!') - this._ticksTo1970) / 10000);
						year = date.getFullYear();
						month = date.getMonth() + 1;
						day = date.getDate();
						break;
					case "'":
						if (lookAhead("'"))
							checkLiteral();
						else
							literal = true;
						break;
					default:
						checkLiteral();
				}
		}
		if (iValue < value.length){
			throw "Extra/unparsed characters found in date: " + value.substring(iValue);
		}
		if (year == -1)
			year = new Date().getFullYear();
		else if (year < 100)
			year += new Date().getFullYear() - new Date().getFullYear() % 100 +
				(year <= shortYearCutoff ? 0 : -100);
		if (doy > -1) {
			month = 1;
			day = doy;
			do {
				var dim = this._getDaysInMonth(year, month - 1);
				if (day <= dim)
					break;
				month++;
				day -= dim;
			} while (true);
		}
		var date = this._daylightSavingAdjust(new Date(year, month - 1, day));
		if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day)
			throw 'Invalid date'; // E.g. 31/02/00
		return date;
	},

	/* Standard date formats. */
	ATOM: 'yy-mm-dd', // RFC 3339 (ISO 8601)
	COOKIE: 'D, dd M yy',
	ISO_8601: 'yy-mm-dd',
	RFC_822: 'D, d M y',
	RFC_850: 'DD, dd-M-y',
	RFC_1036: 'D, d M y',
	RFC_1123: 'D, d M yy',
	RFC_2822: 'D, d M yy',
	RSS: 'D, d M y', // RFC 822
	TICKS: '!',
	TIMESTAMP: '@',
	W3C: 'yy-mm-dd', // ISO 8601

	_ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) +
		Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),

	/* Format a date object into a string value.
	   The format can be combinations of the following:
	   d  - day of month (no leading zero)
	   dd - day of month (two digit)
	   o  - day of year (no leading zeros)
	   oo - day of year (three digit)
	   D  - day name short
	   DD - day name long
	   m  - month of year (no leading zero)
	   mm - month of year (two digit)
	   M  - month name short
	   MM - month name long
	   y  - year (two digit)
	   yy - year (four digit)
	   @ - Unix timestamp (ms since 01/01/1970)
	   ! - Windows ticks (100ns since 01/01/0001)
	   '...' - literal text
	   '' - single quote

	   @param  format    string - the desired format of the date
	   @param  date      Date - the date value to format
	   @param  settings  Object - attributes include:
	                     dayNamesShort    string[7] - abbreviated names of the days from Sunday (optional)
	                     dayNames         string[7] - names of the days from Sunday (optional)
	                     monthNamesShort  string[12] - abbreviated names of the months (optional)
	                     monthNames       string[12] - names of the months (optional)
	   @return  string - the date in the above format */
	formatDate: function (format, date, settings) {
		if (!date)
			return '';
		var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
		var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
		var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
		var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
		var lookAhead = function(match) {
			var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
			if (matches)
				iFormat++;
			return matches;
		};
		var formatNumber = function(match, value, len) {
			var num = '' + value;
			if (lookAhead(match))
				while (num.length < len)
					num = '0' + num;
			return num;
		};
		var formatName = function(match, value, shortNames, longNames) {
			return (lookAhead(match) ? longNames[value] : shortNames[value]);
		};
		var output = '';
		var literal = false;
		if (date)
			for (var iFormat = 0; iFormat < format.length; iFormat++) {
				if (literal)
					if (format.charAt(iFormat) == "'" && !lookAhead("'"))
						literal = false;
					else
						output += format.charAt(iFormat);
				else
					switch (format.charAt(iFormat)) {
						case 'd':
							output += formatNumber('d', date.getDate(), 2);
							break;
						case 'D':
							output += formatName('D', date.getDay(), dayNamesShort, dayNames);
							break;
						case 'o':
							output += formatNumber('o',
								Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
							break;
						case 'm':
							output += formatNumber('m', date.getMonth() + 1, 2);
							break;
						case 'M':
							output += formatName('M', date.getMonth(), monthNamesShort, monthNames);
							break;
						case 'y':
							output += (lookAhead('y') ? date.getFullYear() :
								(date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100);
							break;
						case '@':
							output += date.getTime();
							break;
						case '!':
							output += date.getTime() * 10000 + this._ticksTo1970;
							break;
						case "'":
							if (lookAhead("'"))
								output += "'";
							else
								literal = true;
							break;
						default:
							output += format.charAt(iFormat);
					}
			}
		return output;
	},

	/* Extract all possible characters from the date format. */
	_possibleChars: function (format) {
		var chars = '';
		var literal = false;
		var lookAhead = function(match) {
			var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
			if (matches)
				iFormat++;
			return matches;
		};
		for (var iFormat = 0; iFormat < format.length; iFormat++)
			if (literal)
				if (format.charAt(iFormat) == "'" && !lookAhead("'"))
					literal = false;
				else
					chars += format.charAt(iFormat);
			else
				switch (format.charAt(iFormat)) {
					case 'd': case 'm': case 'y': case '@':
						chars += '0123456789';
						break;
					case 'D': case 'M':
						return null; // Accept anything
					case "'":
						if (lookAhead("'"))
							chars += "'";
						else
							literal = true;
						break;
					default:
						chars += format.charAt(iFormat);
				}
		return chars;
	},

	/* Get a setting value, defaulting if necessary. */
	_get: function(inst, name) {
		return inst.settings[name] !== undefined ?
			inst.settings[name] : this._defaults[name];
	},

	/* Parse existing date and initialise date picker. */
	_setDateFromField: function(inst, noDefault) {
		if (inst.input.val() == inst.lastVal) {
			return;
		}
		var dateFormat = this._get(inst, 'dateFormat');
		var dates = inst.lastVal = inst.input ? inst.input.val() : null;
		var date, defaultDate;
		date = defaultDate = this._getDefaultDate(inst);
		var settings = this._getFormatConfig(inst);
		try {
			date = this.parseDate(dateFormat, dates, settings) || defaultDate;
		} catch (event) {
			this.log(event);
			dates = (noDefault ? '' : dates);
		}
		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		inst.currentDay = (dates ? date.getDate() : 0);
		inst.currentMonth = (dates ? date.getMonth() : 0);
		inst.currentYear = (dates ? date.getFullYear() : 0);
		this._adjustInstDate(inst);
	},

	/* Retrieve the default date shown on opening. */
	_getDefaultDate: function(inst) {
		return this._restrictMinMax(inst,
			this._determineDate(inst, this._get(inst, 'defaultDate'), new Date()));
	},

	/* A date may be specified as an exact value or a relative one. */
	_determineDate: function(inst, date, defaultDate) {
		var offsetNumeric = function(offset) {
			var date = new Date();
			date.setDate(date.getDate() + offset);
			return date;
		};
		var offsetString = function(offset) {
			try {
				return $.datepicker.parseDate($.datepicker._get(inst, 'dateFormat'),
					offset, $.datepicker._getFormatConfig(inst));
			}
			catch (e) {
			}
			var date = (offset.toLowerCase().match(/^c/) ?
				$.datepicker._getDate(inst) : null) || new Date();
			var year = date.getFullYear();
			var month = date.getMonth();
			var day = date.getDate();
			var pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
			var matches = pattern.exec(offset);
			while (matches) {
				switch (matches[2] || 'd') {
					case 'd' : case 'D' :
						day += parseInt(matches[1],10); break;
					case 'w' : case 'W' :
						day += parseInt(matches[1],10) * 7; break;
					case 'm' : case 'M' :
						month += parseInt(matches[1],10);
						day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
						break;
					case 'y': case 'Y' :
						year += parseInt(matches[1],10);
						day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
						break;
				}
				matches = pattern.exec(offset);
			}
			return new Date(year, month, day);
		};
		var newDate = (date == null || date === '' ? defaultDate : (typeof date == 'string' ? offsetString(date) :
			(typeof date == 'number' ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : new Date(date.getTime()))));
		newDate = (newDate && newDate.toString() == 'Invalid Date' ? defaultDate : newDate);
		if (newDate) {
			newDate.setHours(0);
			newDate.setMinutes(0);
			newDate.setSeconds(0);
			newDate.setMilliseconds(0);
		}
		return this._daylightSavingAdjust(newDate);
	},

	/* Handle switch to/from daylight saving.
	   Hours may be non-zero on daylight saving cut-over:
	   > 12 when midnight changeover, but then cannot generate
	   midnight datetime, so jump to 1AM, otherwise reset.
	   @param  date  (Date) the date to check
	   @return  (Date) the corrected date */
	_daylightSavingAdjust: function(date) {
		if (!date) return null;
		date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
		return date;
	},

	/* Set the date(s) directly. */
	_setDate: function(inst, date, noChange) {
		var clear = !date;
		var origMonth = inst.selectedMonth;
		var origYear = inst.selectedYear;
		var newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));
		inst.selectedDay = inst.currentDay = newDate.getDate();
		inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();
		inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();
		if ((origMonth != inst.selectedMonth || origYear != inst.selectedYear) && !noChange)
			this._notifyChange(inst);
		this._adjustInstDate(inst);
		if (inst.input) {
			inst.input.val(clear ? '' : this._formatDate(inst));
		}
	},

	/* Retrieve the date(s) directly. */
	_getDate: function(inst) {
		var startDate = (!inst.currentYear || (inst.input && inst.input.val() == '') ? null :
			this._daylightSavingAdjust(new Date(
			inst.currentYear, inst.currentMonth, inst.currentDay)));
			return startDate;
	},

	/* Generate the HTML for the current state of the date picker. */
	_generateHTML: function(inst) {
		var today = new Date();
		today = this._daylightSavingAdjust(
			new Date(today.getFullYear(), today.getMonth(), today.getDate())); // clear time
		var isRTL = this._get(inst, 'isRTL');
		var showButtonPanel = this._get(inst, 'showButtonPanel');
		var hideIfNoPrevNext = this._get(inst, 'hideIfNoPrevNext');
		var navigationAsDateFormat = this._get(inst, 'navigationAsDateFormat');
		var numMonths = this._getNumberOfMonths(inst);
		var showCurrentAtPos = this._get(inst, 'showCurrentAtPos');
		var stepMonths = this._get(inst, 'stepMonths');
		var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
		var currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) :
			new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
		var minDate = this._getMinMaxDate(inst, 'min');
		var maxDate = this._getMinMaxDate(inst, 'max');
		var drawMonth = inst.drawMonth - showCurrentAtPos;
		var drawYear = inst.drawYear;
		if (drawMonth < 0) {
			drawMonth += 12;
			drawYear--;
		}
		if (maxDate) {
			var maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(),
				maxDate.getMonth() - (numMonths[0] * numMonths[1]) + 1, maxDate.getDate()));
			maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
			while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
				drawMonth--;
				if (drawMonth < 0) {
					drawMonth = 11;
					drawYear--;
				}
			}
		}
		inst.drawMonth = drawMonth;
		inst.drawYear = drawYear;
		var prevText = this._get(inst, 'prevText');
		prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText,
			this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)),
			this._getFormatConfig(inst)));
		var prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ?
			'<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_' + dpuuid +
			'.datepicker._adjustDate(\'#' + inst.id + '\', -' + stepMonths + ', \'M\');"' +
			' title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'e' : 'w') + '">' + prevText + '</span></a>' :
			(hideIfNoPrevNext ? '' : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+ prevText +'"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'e' : 'w') + '">' + prevText + '</span></a>'));
		var nextText = this._get(inst, 'nextText');
		nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText,
			this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)),
			this._getFormatConfig(inst)));
		var next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ?
			'<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_' + dpuuid +
			'.datepicker._adjustDate(\'#' + inst.id + '\', +' + stepMonths + ', \'M\');"' +
			' title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'w' : 'e') + '">' + nextText + '</span></a>' :
			(hideIfNoPrevNext ? '' : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+ nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'w' : 'e') + '">' + nextText + '</span></a>'));
		var currentText = this._get(inst, 'currentText');
		var gotoDate = (this._get(inst, 'gotoCurrent') && inst.currentDay ? currentDate : today);
		currentText = (!navigationAsDateFormat ? currentText :
			this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));
		var controls = (!inst.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_' + dpuuid +
			'.datepicker._hideDatepicker();">' + this._get(inst, 'closeText') + '</button>' : '');
		var buttonPanel = (showButtonPanel) ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (isRTL ? controls : '') +
			(this._isInRange(inst, gotoDate) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_' + dpuuid +
			'.datepicker._gotoToday(\'#' + inst.id + '\');"' +
			'>' + currentText + '</button>' : '') + (isRTL ? '' : controls) + '</div>' : '';
		var firstDay = parseInt(this._get(inst, 'firstDay'),10);
		firstDay = (isNaN(firstDay) ? 0 : firstDay);
		var showWeek = this._get(inst, 'showWeek');
		var dayNames = this._get(inst, 'dayNames');
		var dayNamesShort = this._get(inst, 'dayNamesShort');
		var dayNamesMin = this._get(inst, 'dayNamesMin');
		var monthNames = this._get(inst, 'monthNames');
		var monthNamesShort = this._get(inst, 'monthNamesShort');
		var beforeShowDay = this._get(inst, 'beforeShowDay');
		var showOtherMonths = this._get(inst, 'showOtherMonths');
		var selectOtherMonths = this._get(inst, 'selectOtherMonths');
		var calculateWeek = this._get(inst, 'calculateWeek') || this.iso8601Week;
		var defaultDate = this._getDefaultDate(inst);
		var html = '';
		for (var row = 0; row < numMonths[0]; row++) {
			var group = '';
			this.maxRows = 4;
			for (var col = 0; col < numMonths[1]; col++) {
				var selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
				var cornerClass = ' ui-corner-all';
				var calender = '';
				if (isMultiMonth) {
					calender += '<div class="ui-datepicker-group';
					if (numMonths[1] > 1)
						switch (col) {
							case 0: calender += ' ui-datepicker-group-first';
								cornerClass = ' ui-corner-' + (isRTL ? 'right' : 'left'); break;
							case numMonths[1]-1: calender += ' ui-datepicker-group-last';
								cornerClass = ' ui-corner-' + (isRTL ? 'left' : 'right'); break;
							default: calender += ' ui-datepicker-group-middle'; cornerClass = ''; break;
						}
					calender += '">';
				}
				calender += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '">' +
					(/all|left/.test(cornerClass) && row == 0 ? (isRTL ? next : prev) : '') +
					(/all|right/.test(cornerClass) && row == 0 ? (isRTL ? prev : next) : '') +
					this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate,
					row > 0 || col > 0, monthNames, monthNamesShort) + // draw month headers
					'</div><table class="ui-datepicker-calendar"><thead>' +
					'<tr>';
				var thead = (showWeek ? '<th class="ui-datepicker-week-col">' + this._get(inst, 'weekHeader') + '</th>' : '');
				for (var dow = 0; dow < 7; dow++) { // days of the week
					var day = (dow + firstDay) % 7;
					thead += '<th' + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : '') + '>' +
						'<span title="' + dayNames[day] + '">' + dayNamesMin[day] + '</span></th>';
				}
				calender += thead + '</tr></thead><tbody>';
				var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
				if (drawYear == inst.selectedYear && drawMonth == inst.selectedMonth)
					inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
				var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
				var curRows = Math.ceil((leadDays + daysInMonth) / 7); // calculate the number of rows to generate
				var numRows = (isMultiMonth ? this.maxRows > curRows ? this.maxRows : curRows : curRows); //If multiple months, use the higher number of rows (see #7043)
				this.maxRows = numRows;
				var printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
				for (var dRow = 0; dRow < numRows; dRow++) { // create date picker rows
					calender += '<tr>';
					var tbody = (!showWeek ? '' : '<td class="ui-datepicker-week-col">' +
						this._get(inst, 'calculateWeek')(printDate) + '</td>');
					for (var dow = 0; dow < 7; dow++) { // create date picker days
						var daySettings = (beforeShowDay ?
							beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, '']);
						var otherMonth = (printDate.getMonth() != drawMonth);
						var unselectable = (otherMonth && !selectOtherMonths) || !daySettings[0] ||
							(minDate && printDate < minDate) || (maxDate && printDate > maxDate);
						tbody += '<td class="' +
							((dow + firstDay + 6) % 7 >= 5 ? ' ui-datepicker-week-end' : '') + // highlight weekends
							(otherMonth ? ' ui-datepicker-other-month' : '') + // highlight days from other months
							((printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth && inst._keyEvent) || // user pressed key
							(defaultDate.getTime() == printDate.getTime() && defaultDate.getTime() == selectedDate.getTime()) ?
							' ' + this._dayOverClass : '') + // highlight selected day
							(unselectable ? ' ' + this._unselectableClass + ' ui-state-disabled': '') +  // highlight unselectable days
							(otherMonth && !showOtherMonths ? '' : ' ' + daySettings[1] + // highlight custom dates
							(printDate.getTime() == currentDate.getTime() ? ' ' + this._currentClass : '') + // highlight selected day
							(printDate.getTime() == today.getTime() ? ' ui-datepicker-today' : '')) + '"' + // highlight today (if different)
							((!otherMonth || showOtherMonths) && daySettings[2] ? ' title="' + daySettings[2] + '"' : '') + // cell title
							(unselectable ? '' : ' onclick="DP_jQuery_' + dpuuid + '.datepicker._selectDay(\'#' +
							inst.id + '\',' + printDate.getMonth() + ',' + printDate.getFullYear() + ', this);return false;"') + '>' + // actions
							(otherMonth && !showOtherMonths ? '&#xa0;' : // display for other months
							(unselectable ? '<span class="ui-state-default">' + printDate.getDate() + '</span>' : '<a class="ui-state-default' +
							(printDate.getTime() == today.getTime() ? ' ui-state-highlight' : '') +
							(printDate.getTime() == currentDate.getTime() ? ' ui-state-active' : '') + // highlight selected day
							(otherMonth ? ' ui-priority-secondary' : '') + // distinguish dates from other months
							'" href="#">' + printDate.getDate() + '</a>')) + '</td>'; // display selectable date
						printDate.setDate(printDate.getDate() + 1);
						printDate = this._daylightSavingAdjust(printDate);
					}
					calender += tbody + '</tr>';
				}
				drawMonth++;
				if (drawMonth > 11) {
					drawMonth = 0;
					drawYear++;
				}
				calender += '</tbody></table>' + (isMultiMonth ? '</div>' +
							((numMonths[0] > 0 && col == numMonths[1]-1) ? '<div class="ui-datepicker-row-break"></div>' : '') : '');
				group += calender;
			}
			html += group;
		}
		html += buttonPanel + ($.browser.msie && parseInt($.browser.version,10) < 7 && !inst.inline ?
			'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : '');
		inst._keyEvent = false;
		return html;
	},

	/* Generate the month and year header. */
	_generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate,
			secondary, monthNames, monthNamesShort) {
		var changeMonth = this._get(inst, 'changeMonth');
		var changeYear = this._get(inst, 'changeYear');
		var showMonthAfterYear = this._get(inst, 'showMonthAfterYear');
		var html = '<div class="ui-datepicker-title">';
		var monthHtml = '';
		if (secondary || !changeMonth)
			monthHtml += '<span class="ui-datepicker-month">' + monthNames[drawMonth] + '</span>';
		else {
			var inMinYear = (minDate && minDate.getFullYear() == drawYear);
			var inMaxYear = (maxDate && maxDate.getFullYear() == drawYear);
			monthHtml += '<select class="ui-datepicker-month" ' +
				'onchange="DP_jQuery_' + dpuuid + '.datepicker._selectMonthYear(\'#' + inst.id + '\', this, \'M\');" ' +
			 	'>';
			for (var month = 0; month < 12; month++) {
				if ((!inMinYear || month >= minDate.getMonth()) &&
						(!inMaxYear || month <= maxDate.getMonth()))
					monthHtml += '<option value="' + month + '"' +
						(month == drawMonth ? ' selected="selected"' : '') +
						'>' + monthNamesShort[month] + '</option>';
			}
			monthHtml += '</select>';
		}
		if (!showMonthAfterYear)
			html += monthHtml + (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '');
		if ( !inst.yearshtml ) {
			inst.yearshtml = '';
			if (secondary || !changeYear)
				html += '<span class="ui-datepicker-year">' + drawYear + '</span>';
			else {
				var years = this._get(inst, 'yearRange').split(':');
				var thisYear = new Date().getFullYear();
				var determineYear = function(value) {
					var year = (value.match(/c[+-].*/) ? drawYear + parseInt(value.substring(1), 10) :
						(value.match(/[+-].*/) ? thisYear + parseInt(value, 10) :
						parseInt(value, 10)));
					return (isNaN(year) ? thisYear : year);
				};
				var year = determineYear(years[0]);
				var endYear = Math.max(year, determineYear(years[1] || ''));
				year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
				endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
				inst.yearshtml += '<select class="ui-datepicker-year" ' +
					'onchange="DP_jQuery_' + dpuuid + '.datepicker._selectMonthYear(\'#' + inst.id + '\', this, \'Y\');" ' +
					'>';
				for (; year <= endYear; year++) {
					inst.yearshtml += '<option value="' + year + '"' +
						(year == drawYear ? ' selected="selected"' : '') +
						'>' + year + '</option>';
				}
				inst.yearshtml += '</select>';

				html += inst.yearshtml;
				inst.yearshtml = null;
			}
		}
		html += this._get(inst, 'yearSuffix');
		if (showMonthAfterYear)
			html += (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '') + monthHtml;
		html += '</div>'; // Close datepicker_header
		return html;
	},

	/* Adjust one of the date sub-fields. */
	_adjustInstDate: function(inst, offset, period) {
		var year = inst.drawYear + (period == 'Y' ? offset : 0);
		var month = inst.drawMonth + (period == 'M' ? offset : 0);
		var day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) +
			(period == 'D' ? offset : 0);
		var date = this._restrictMinMax(inst,
			this._daylightSavingAdjust(new Date(year, month, day)));
		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		if (period == 'M' || period == 'Y')
			this._notifyChange(inst);
	},

	/* Ensure a date is within any min/max bounds. */
	_restrictMinMax: function(inst, date) {
		var minDate = this._getMinMaxDate(inst, 'min');
		var maxDate = this._getMinMaxDate(inst, 'max');
		var newDate = (minDate && date < minDate ? minDate : date);
		newDate = (maxDate && newDate > maxDate ? maxDate : newDate);
		return newDate;
	},

	/* Notify change of month/year. */
	_notifyChange: function(inst) {
		var onChange = this._get(inst, 'onChangeMonthYear');
		if (onChange)
			onChange.apply((inst.input ? inst.input[0] : null),
				[inst.selectedYear, inst.selectedMonth + 1, inst]);
	},

	/* Determine the number of months to show. */
	_getNumberOfMonths: function(inst) {
		var numMonths = this._get(inst, 'numberOfMonths');
		return (numMonths == null ? [1, 1] : (typeof numMonths == 'number' ? [1, numMonths] : numMonths));
	},

	/* Determine the current maximum date - ensure no time components are set. */
	_getMinMaxDate: function(inst, minMax) {
		return this._determineDate(inst, this._get(inst, minMax + 'Date'), null);
	},

	/* Find the number of days in a given month. */
	_getDaysInMonth: function(year, month) {
		return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate();
	},

	/* Find the day of the week of the first of a month. */
	_getFirstDayOfMonth: function(year, month) {
		return new Date(year, month, 1).getDay();
	},

	/* Determines if we should allow a "next/prev" month display change. */
	_canAdjustMonth: function(inst, offset, curYear, curMonth) {
		var numMonths = this._getNumberOfMonths(inst);
		var date = this._daylightSavingAdjust(new Date(curYear,
			curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));
		if (offset < 0)
			date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
		return this._isInRange(inst, date);
	},

	/* Is the given date in the accepted range? */
	_isInRange: function(inst, date) {
		var minDate = this._getMinMaxDate(inst, 'min');
		var maxDate = this._getMinMaxDate(inst, 'max');
		return ((!minDate || date.getTime() >= minDate.getTime()) &&
			(!maxDate || date.getTime() <= maxDate.getTime()));
	},

	/* Provide the configuration settings for formatting/parsing. */
	_getFormatConfig: function(inst) {
		var shortYearCutoff = this._get(inst, 'shortYearCutoff');
		shortYearCutoff = (typeof shortYearCutoff != 'string' ? shortYearCutoff :
			new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
		return {shortYearCutoff: shortYearCutoff,
			dayNamesShort: this._get(inst, 'dayNamesShort'), dayNames: this._get(inst, 'dayNames'),
			monthNamesShort: this._get(inst, 'monthNamesShort'), monthNames: this._get(inst, 'monthNames')};
	},

	/* Format the given date for display. */
	_formatDate: function(inst, day, month, year) {
		if (!day) {
			inst.currentDay = inst.selectedDay;
			inst.currentMonth = inst.selectedMonth;
			inst.currentYear = inst.selectedYear;
		}
		var date = (day ? (typeof day == 'object' ? day :
			this._daylightSavingAdjust(new Date(year, month, day))) :
			this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
		return this.formatDate(this._get(inst, 'dateFormat'), date, this._getFormatConfig(inst));
	}
});

/*
 * Bind hover events for datepicker elements.
 * Done via delegate so the binding only occurs once in the lifetime of the parent div.
 * Global instActive, set by _updateDatepicker allows the handlers to find their way back to the active picker.
 */
function bindHover(dpDiv) {
	var selector = 'button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a';
	return dpDiv.bind('mouseout', function(event) {
			var elem = $( event.target ).closest( selector );
			if ( !elem.length ) {
				return;
			}
			elem.removeClass( "ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover" );
		})
		.bind('mouseover', function(event) {
			var elem = $( event.target ).closest( selector );
			if ($.datepicker._isDisabledDatepicker( instActive.inline ? dpDiv.parent()[0] : instActive.input[0]) ||
					!elem.length ) {
				return;
			}
			elem.parents('.ui-datepicker-calendar').find('a').removeClass('ui-state-hover');
			elem.addClass('ui-state-hover');
			if (elem.hasClass('ui-datepicker-prev')) elem.addClass('ui-datepicker-prev-hover');
			if (elem.hasClass('ui-datepicker-next')) elem.addClass('ui-datepicker-next-hover');
		});
}

/* jQuery extend now ignores nulls! */
function extendRemove(target, props) {
	$.extend(target, props);
	for (var name in props)
		if (props[name] == null || props[name] == undefined)
			target[name] = props[name];
	return target;
};

/* Determine whether an object is an array. */
function isArray(a) {
	return (a && (($.browser.safari && typeof a == 'object' && a.length) ||
		(a.constructor && a.constructor.toString().match(/\Array\(\)/))));
};

/* Invoke the datepicker functionality.
   @param  options  string - a command, optionally followed by additional parameters or
                    Object - settings for attaching new datepicker functionality
   @return  jQuery object */
$.fn.datepicker = function(options){

	/* Verify an empty collection wasn't passed - Fixes #6976 */
	if ( !this.length ) {
		return this;
	}

	/* Initialise the date picker. */
	if (!$.datepicker.initialized) {
		$(document).mousedown($.datepicker._checkExternalClick).
			find('body').append($.datepicker.dpDiv);
		$.datepicker.initialized = true;
	}

	var otherArgs = Array.prototype.slice.call(arguments, 1);
	if (typeof options == 'string' && (options == 'isDisabled' || options == 'getDate' || options == 'widget'))
		return $.datepicker['_' + options + 'Datepicker'].
			apply($.datepicker, [this[0]].concat(otherArgs));
	if (options == 'option' && arguments.length == 2 && typeof arguments[1] == 'string')
		return $.datepicker['_' + options + 'Datepicker'].
			apply($.datepicker, [this[0]].concat(otherArgs));
	return this.each(function() {
		typeof options == 'string' ?
			$.datepicker['_' + options + 'Datepicker'].
				apply($.datepicker, [this].concat(otherArgs)) :
			$.datepicker._attachDatepicker(this, options);
	});
};

$.datepicker = new Datepicker(); // singleton instance
$.datepicker.initialized = false;
$.datepicker.uuid = new Date().getTime();
$.datepicker.version = "1.8.18";

window['DP_jQuery_' + dpuuid] = $;

})(jQuery);
/*
 * jQuery UI Effects 1.8.18
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/
 */
;jQuery.effects || (function($, undefined) {

$.effects = {};




$.each(['backgroundColor', 'borderBottomColor', 'borderLeftColor',
	'borderRightColor', 'borderTopColor', 'borderColor', 'color', 'outlineColor'],
function(i, attr) {
	$.fx.step[attr] = function(fx) {
		if (!fx.colorInit) {
			fx.start = getColor(fx.elem, attr);
			fx.end = getRGB(fx.end);
			fx.colorInit = true;
		}

		fx.elem.style[attr] = 'rgb(' +
			Math.max(Math.min(parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0], 10), 255), 0) + ',' +
			Math.max(Math.min(parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1], 10), 255), 0) + ',' +
			Math.max(Math.min(parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2], 10), 255), 0) + ')';
	};
});


function getRGB(color) {
		var result;

		if ( color && color.constructor == Array && color.length == 3 )
				return color;

		if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
				return [parseInt(result[1],10), parseInt(result[2],10), parseInt(result[3],10)];

		if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
				return [parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55];

		if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
				return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];

		if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
				return [parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16)];

		if (result = /rgba\(0, 0, 0, 0\)/.exec(color))
				return colors['transparent'];

		return colors[$.trim(color).toLowerCase()];
}

function getColor(elem, attr) {
		var color;

		do {
				color = $.curCSS(elem, attr);

				if ( color != '' && color != 'transparent' || $.nodeName(elem, "body") )
						break;

				attr = "backgroundColor";
		} while ( elem = elem.parentNode );

		return getRGB(color);
};


var colors = {
	aqua:[0,255,255],
	azure:[240,255,255],
	beige:[245,245,220],
	black:[0,0,0],
	blue:[0,0,255],
	brown:[165,42,42],
	cyan:[0,255,255],
	darkblue:[0,0,139],
	darkcyan:[0,139,139],
	darkgrey:[169,169,169],
	darkgreen:[0,100,0],
	darkkhaki:[189,183,107],
	darkmagenta:[139,0,139],
	darkolivegreen:[85,107,47],
	darkorange:[255,140,0],
	darkorchid:[153,50,204],
	darkred:[139,0,0],
	darksalmon:[233,150,122],
	darkviolet:[148,0,211],
	fuchsia:[255,0,255],
	gold:[255,215,0],
	green:[0,128,0],
	indigo:[75,0,130],
	khaki:[240,230,140],
	lightblue:[173,216,230],
	lightcyan:[224,255,255],
	lightgreen:[144,238,144],
	lightgrey:[211,211,211],
	lightpink:[255,182,193],
	lightyellow:[255,255,224],
	lime:[0,255,0],
	magenta:[255,0,255],
	maroon:[128,0,0],
	navy:[0,0,128],
	olive:[128,128,0],
	orange:[255,165,0],
	pink:[255,192,203],
	purple:[128,0,128],
	violet:[128,0,128],
	red:[255,0,0],
	silver:[192,192,192],
	white:[255,255,255],
	yellow:[255,255,0],
	transparent: [255,255,255]
};




var classAnimationActions = ['add', 'remove', 'toggle'],
	shorthandStyles = {
		border: 1,
		borderBottom: 1,
		borderColor: 1,
		borderLeft: 1,
		borderRight: 1,
		borderTop: 1,
		borderWidth: 1,
		margin: 1,
		padding: 1
	};

function getElementStyles() {
	var style = document.defaultView
			? document.defaultView.getComputedStyle(this, null)
			: this.currentStyle,
		newStyle = {},
		key,
		camelCase;

	if (style && style.length && style[0] && style[style[0]]) {
		var len = style.length;
		while (len--) {
			key = style[len];
			if (typeof style[key] == 'string') {
				camelCase = key.replace(/\-(\w)/g, function(all, letter){
					return letter.toUpperCase();
				});
				newStyle[camelCase] = style[key];
			}
		}
	} else {
		for (key in style) {
			if (typeof style[key] === 'string') {
				newStyle[key] = style[key];
			}
		}
	}

	return newStyle;
}

function filterStyles(styles) {
	var name, value;
	for (name in styles) {
		value = styles[name];
		if (
			value == null ||
			$.isFunction(value) ||
			name in shorthandStyles ||
			(/scrollbar/).test(name) ||

			(!(/color/i).test(name) && isNaN(parseFloat(value)))
		) {
			delete styles[name];
		}
	}

	return styles;
}

function styleDifference(oldStyle, newStyle) {
	var diff = { _: 0 }, // http://dev.jquery.com/ticket/5459
		name;

	for (name in newStyle) {
		if (oldStyle[name] != newStyle[name]) {
			diff[name] = newStyle[name];
		}
	}

	return diff;
}

$.effects.animateClass = function(value, duration, easing, callback) {
	if ($.isFunction(easing)) {
		callback = easing;
		easing = null;
	}

	return this.queue(function() {
		var that = $(this),
			originalStyleAttr = that.attr('style') || ' ',
			originalStyle = filterStyles(getElementStyles.call(this)),
			newStyle,
			className = that.attr('class');

		$.each(classAnimationActions, function(i, action) {
			if (value[action]) {
				that[action + 'Class'](value[action]);
			}
		});
		newStyle = filterStyles(getElementStyles.call(this));
		that.attr('class', className);

		that.animate(styleDifference(originalStyle, newStyle), {
			queue: false,
			duration: duration,
			easing: easing,
			complete: function() {
				$.each(classAnimationActions, function(i, action) {
					if (value[action]) { that[action + 'Class'](value[action]); }
				});
				if (typeof that.attr('style') == 'object') {
					that.attr('style').cssText = '';
					that.attr('style').cssText = originalStyleAttr;
				} else {
					that.attr('style', originalStyleAttr);
				}
				if (callback) { callback.apply(this, arguments); }
				$.dequeue( this );
			}
		});
	});
};

$.fn.extend({
	_addClass: $.fn.addClass,
	addClass: function(classNames, speed, easing, callback) {
		return speed ? $.effects.animateClass.apply(this, [{ add: classNames },speed,easing,callback]) : this._addClass(classNames);
	},

	_removeClass: $.fn.removeClass,
	removeClass: function(classNames,speed,easing,callback) {
		return speed ? $.effects.animateClass.apply(this, [{ remove: classNames },speed,easing,callback]) : this._removeClass(classNames);
	},

	_toggleClass: $.fn.toggleClass,
	toggleClass: function(classNames, force, speed, easing, callback) {
		if ( typeof force == "boolean" || force === undefined ) {
			if ( !speed ) {
				return this._toggleClass(classNames, force);
			} else {
				return $.effects.animateClass.apply(this, [(force?{add:classNames}:{remove:classNames}),speed,easing,callback]);
			}
		} else {
			return $.effects.animateClass.apply(this, [{ toggle: classNames },force,speed,easing]);
		}
	},

	switchClass: function(remove,add,speed,easing,callback) {
		return $.effects.animateClass.apply(this, [{ add: add, remove: remove },speed,easing,callback]);
	}
});




$.extend($.effects, {
	version: "1.8.18",

	save: function(element, set) {
		for(var i=0; i < set.length; i++) {
			if(set[i] !== null) element.data("ec.storage."+set[i], element[0].style[set[i]]);
		}
	},

	restore: function(element, set) {
		for(var i=0; i < set.length; i++) {
			if(set[i] !== null) element.css(set[i], element.data("ec.storage."+set[i]));
		}
	},

	setMode: function(el, mode) {
		if (mode == 'toggle') mode = el.is(':hidden') ? 'show' : 'hide'; // Set for toggle
		return mode;
	},

	getBaseline: function(origin, original) { // Translates a [top,left] array into a baseline value
		var y, x;
		switch (origin[0]) {
			case 'top': y = 0; break;
			case 'middle': y = 0.5; break;
			case 'bottom': y = 1; break;
			default: y = origin[0] / original.height;
		};
		switch (origin[1]) {
			case 'left': x = 0; break;
			case 'center': x = 0.5; break;
			case 'right': x = 1; break;
			default: x = origin[1] / original.width;
		};
		return {x: x, y: y};
	},

	createWrapper: function(element) {

		if (element.parent().is('.ui-effects-wrapper')) {
			return element.parent();
		}

		var props = {
				width: element.outerWidth(true),
				height: element.outerHeight(true),
				'float': element.css('float')
			},
			wrapper = $('<div></div>')
				.addClass('ui-effects-wrapper')
				.css({
					fontSize: '100%',
					background: 'transparent',
					border: 'none',
					margin: 0,
					padding: 0
				}),
			active = document.activeElement;

		element.wrap(wrapper);

		if ( element[ 0 ] === active || $.contains( element[ 0 ], active ) ) {
			$( active ).focus();
		}

		wrapper = element.parent(); //Hotfix for jQuery 1.4 since some change in wrap() seems to actually loose the reference to the wrapped element

		if (element.css('position') == 'static') {
			wrapper.css({ position: 'relative' });
			element.css({ position: 'relative' });
		} else {
			$.extend(props, {
				position: element.css('position'),
				zIndex: element.css('z-index')
			});
			$.each(['top', 'left', 'bottom', 'right'], function(i, pos) {
				props[pos] = element.css(pos);
				if (isNaN(parseInt(props[pos], 10))) {
					props[pos] = 'auto';
				}
			});
			element.css({position: 'relative', top: 0, left: 0, right: 'auto', bottom: 'auto' });
		}

		return wrapper.css(props).show();
	},

	removeWrapper: function(element) {
		var parent,
			active = document.activeElement;

		if (element.parent().is('.ui-effects-wrapper')) {
			parent = element.parent().replaceWith(element);
			if ( element[ 0 ] === active || $.contains( element[ 0 ], active ) ) {
				$( active ).focus();
			}
			return parent;
		}

		return element;
	},

	setTransition: function(element, list, factor, value) {
		value = value || {};
		$.each(list, function(i, x){
			unit = element.cssUnit(x);
			if (unit[0] > 0) value[x] = unit[0] * factor + unit[1];
		});
		return value;
	}
});


function _normalizeArguments(effect, options, speed, callback) {
	if (typeof effect == 'object') {
		callback = options;
		speed = null;
		options = effect;
		effect = options.effect;
	}
	if ($.isFunction(options)) {
		callback = options;
		speed = null;
		options = {};
	}
        if (typeof options == 'number' || $.fx.speeds[options]) {
		callback = speed;
		speed = options;
		options = {};
	}
	if ($.isFunction(speed)) {
		callback = speed;
		speed = null;
	}

	options = options || {};

	speed = speed || options.duration;
	speed = $.fx.off ? 0 : typeof speed == 'number'
		? speed : speed in $.fx.speeds ? $.fx.speeds[speed] : $.fx.speeds._default;

	callback = callback || options.complete;

	return [effect, options, speed, callback];
}

function standardSpeed( speed ) {
	if ( !speed || typeof speed === "number" || $.fx.speeds[ speed ] ) {
		return true;
	}

	if ( typeof speed === "string" && !$.effects[ speed ] ) {
		return true;
	}

	return false;
}

$.fn.extend({
	effect: function(effect, options, speed, callback) {
		var args = _normalizeArguments.apply(this, arguments),
			args2 = {
				options: args[1],
				duration: args[2],
				callback: args[3]
			},
			mode = args2.options.mode,
			effectMethod = $.effects[effect];

		if ( $.fx.off || !effectMethod ) {
			if ( mode ) {
				return this[ mode ]( args2.duration, args2.callback );
			} else {
				return this.each(function() {
					if ( args2.callback ) {
						args2.callback.call( this );
					}
				});
			}
		}

		return effectMethod.call(this, args2);
	},

	_show: $.fn.show,
	show: function(speed) {
		if ( standardSpeed( speed ) ) {
			return this._show.apply(this, arguments);
		} else {
			var args = _normalizeArguments.apply(this, arguments);
			args[1].mode = 'show';
			return this.effect.apply(this, args);
		}
	},

	_hide: $.fn.hide,
	hide: function(speed) {
		if ( standardSpeed( speed ) ) {
			return this._hide.apply(this, arguments);
		} else {
			var args = _normalizeArguments.apply(this, arguments);
			args[1].mode = 'hide';
			return this.effect.apply(this, args);
		}
	},

	__toggle: $.fn.toggle,
	toggle: function(speed) {
		if ( standardSpeed( speed ) || typeof speed === "boolean" || $.isFunction( speed ) ) {
			return this.__toggle.apply(this, arguments);
		} else {
			var args = _normalizeArguments.apply(this, arguments);
			args[1].mode = 'toggle';
			return this.effect.apply(this, args);
		}
	},

	cssUnit: function(key) {
		var style = this.css(key), val = [];
		$.each( ['em','px','%','pt'], function(i, unit){
			if(style.indexOf(unit) > 0)
				val = [parseFloat(style), unit];
		});
		return val;
	}
});




/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
*/

$.easing.jswing = $.easing.swing;

$.extend($.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		return $.easing[$.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - $.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return $.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return $.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

})(jQuery);
/*
 * jQuery UI Effects Drop 1.8.18
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Drop
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function( $, undefined ) {

$.effects.drop = function(o) {

	return this.queue(function() {

		var el = $(this), props = ['position','top','bottom','left','right','opacity'];

		var mode = $.effects.setMode(el, o.options.mode || 'hide'); // Set Mode
		var direction = o.options.direction || 'left'; // Default Direction

		$.effects.save(el, props); el.show(); // Save & Show
		$.effects.createWrapper(el); // Create Wrapper
		var ref = (direction == 'up' || direction == 'down') ? 'top' : 'left';
		var motion = (direction == 'up' || direction == 'left') ? 'pos' : 'neg';
		var distance = o.options.distance || (ref == 'top' ? el.outerHeight({margin:true}) / 2 : el.outerWidth({margin:true}) / 2);
		if (mode == 'show') el.css('opacity', 0).css(ref, motion == 'pos' ? -distance : distance); // Shift

		var animation = {opacity: mode == 'show' ? 1 : 0};
		animation[ref] = (mode == 'show' ? (motion == 'pos' ? '+=' : '-=') : (motion == 'pos' ? '-=' : '+=')) + distance;

		el.animate(animation, { queue: false, duration: o.duration, easing: o.options.easing, complete: function() {
			if(mode == 'hide') el.hide(); // Hide
			$.effects.restore(el, props); $.effects.removeWrapper(el); // Restore
			if(o.callback) o.callback.apply(this, arguments); // Callback
			el.dequeue();
		}});

	});

};

})(jQuery);
/*
 * jQuery UI Effects Highlight 1.8.18
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Highlight
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function( $, undefined ) {

$.effects.highlight = function(o) {
	return this.queue(function() {
		var elem = $(this),
			props = ['backgroundImage', 'backgroundColor', 'opacity'],
			mode = $.effects.setMode(elem, o.options.mode || 'show'),
			animation = {
				backgroundColor: elem.css('backgroundColor')
			};

		if (mode == 'hide') {
			animation.opacity = 0;
		}

		$.effects.save(elem, props);
		elem
			.show()
			.css({
				backgroundImage: 'none',
				backgroundColor: o.options.color || '#ffff99'
			})
			.animate(animation, {
				queue: false,
				duration: o.duration,
				easing: o.options.easing,
				complete: function() {
					(mode == 'hide' && elem.hide());
					$.effects.restore(elem, props);
					(mode == 'show' && !$.support.opacity && this.style.removeAttribute('filter'));
					(o.callback && o.callback.apply(this, arguments));
					elem.dequeue();
				}
			});
	});
};

})(jQuery);
/*
 * jQuery UI Effects Scale 1.8.18
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Scale
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function( $, undefined ) {

$.effects.puff = function(o) {
	return this.queue(function() {
		var elem = $(this),
			mode = $.effects.setMode(elem, o.options.mode || 'hide'),
			percent = parseInt(o.options.percent, 10) || 150,
			factor = percent / 100,
			original = { height: elem.height(), width: elem.width() };

		$.extend(o.options, {
			fade: true,
			mode: mode,
			percent: mode == 'hide' ? percent : 100,
			from: mode == 'hide'
				? original
				: {
					height: original.height * factor,
					width: original.width * factor
				}
		});

		elem.effect('scale', o.options, o.duration, o.callback);
		elem.dequeue();
	});
};

$.effects.scale = function(o) {

	return this.queue(function() {

		var el = $(this);

		var options = $.extend(true, {}, o.options);
		var mode = $.effects.setMode(el, o.options.mode || 'effect'); // Set Mode
		var percent = parseInt(o.options.percent,10) || (parseInt(o.options.percent,10) == 0 ? 0 : (mode == 'hide' ? 0 : 100)); // Set default scaling percent
		var direction = o.options.direction || 'both'; // Set default axis
		var origin = o.options.origin; // The origin of the scaling
		if (mode != 'effect') { // Set default origin and restore for show/hide
			options.origin = origin || ['middle','center'];
			options.restore = true;
		}
		var original = {height: el.height(), width: el.width()}; // Save original
		el.from = o.options.from || (mode == 'show' ? {height: 0, width: 0} : original); // Default from state

		var factor = { // Set scaling factor
			y: direction != 'horizontal' ? (percent / 100) : 1,
			x: direction != 'vertical' ? (percent / 100) : 1
		};
		el.to = {height: original.height * factor.y, width: original.width * factor.x}; // Set to state

		if (o.options.fade) { // Fade option to support puff
			if (mode == 'show') {el.from.opacity = 0; el.to.opacity = 1;};
			if (mode == 'hide') {el.from.opacity = 1; el.to.opacity = 0;};
		};

		options.from = el.from; options.to = el.to; options.mode = mode;

		el.effect('size', options, o.duration, o.callback);
		el.dequeue();
	});

};

$.effects.size = function(o) {

	return this.queue(function() {

		var el = $(this), props = ['position','top','bottom','left','right','width','height','overflow','opacity'];
		var props1 = ['position','top','bottom','left','right','overflow','opacity']; // Always restore
		var props2 = ['width','height','overflow']; // Copy for children
		var cProps = ['fontSize'];
		var vProps = ['borderTopWidth', 'borderBottomWidth', 'paddingTop', 'paddingBottom'];
		var hProps = ['borderLeftWidth', 'borderRightWidth', 'paddingLeft', 'paddingRight'];

		var mode = $.effects.setMode(el, o.options.mode || 'effect'); // Set Mode
		var restore = o.options.restore || false; // Default restore
		var scale = o.options.scale || 'both'; // Default scale mode
		var origin = o.options.origin; // The origin of the sizing
		var original = {height: el.height(), width: el.width()}; // Save original
		el.from = o.options.from || original; // Default from state
		el.to = o.options.to || original; // Default to state
		if (origin) { // Calculate baseline shifts
			var baseline = $.effects.getBaseline(origin, original);
			el.from.top = (original.height - el.from.height) * baseline.y;
			el.from.left = (original.width - el.from.width) * baseline.x;
			el.to.top = (original.height - el.to.height) * baseline.y;
			el.to.left = (original.width - el.to.width) * baseline.x;
		};
		var factor = { // Set scaling factor
			from: {y: el.from.height / original.height, x: el.from.width / original.width},
			to: {y: el.to.height / original.height, x: el.to.width / original.width}
		};
		if (scale == 'box' || scale == 'both') { // Scale the css box
			if (factor.from.y != factor.to.y) { // Vertical props scaling
				props = props.concat(vProps);
				el.from = $.effects.setTransition(el, vProps, factor.from.y, el.from);
				el.to = $.effects.setTransition(el, vProps, factor.to.y, el.to);
			};
			if (factor.from.x != factor.to.x) { // Horizontal props scaling
				props = props.concat(hProps);
				el.from = $.effects.setTransition(el, hProps, factor.from.x, el.from);
				el.to = $.effects.setTransition(el, hProps, factor.to.x, el.to);
			};
		};
		if (scale == 'content' || scale == 'both') { // Scale the content
			if (factor.from.y != factor.to.y) { // Vertical props scaling
				props = props.concat(cProps);
				el.from = $.effects.setTransition(el, cProps, factor.from.y, el.from);
				el.to = $.effects.setTransition(el, cProps, factor.to.y, el.to);
			};
		};
		$.effects.save(el, restore ? props : props1); el.show(); // Save & Show
		$.effects.createWrapper(el); // Create Wrapper
		el.css('overflow','hidden').css(el.from); // Shift

		if (scale == 'content' || scale == 'both') { // Scale the children
			vProps = vProps.concat(['marginTop','marginBottom']).concat(cProps); // Add margins/font-size
			hProps = hProps.concat(['marginLeft','marginRight']); // Add margins
			props2 = props.concat(vProps).concat(hProps); // Concat
			el.find("*[width]").each(function(){
				child = $(this);
				if (restore) $.effects.save(child, props2);
				var c_original = {height: child.height(), width: child.width()}; // Save original
				child.from = {height: c_original.height * factor.from.y, width: c_original.width * factor.from.x};
				child.to = {height: c_original.height * factor.to.y, width: c_original.width * factor.to.x};
				if (factor.from.y != factor.to.y) { // Vertical props scaling
					child.from = $.effects.setTransition(child, vProps, factor.from.y, child.from);
					child.to = $.effects.setTransition(child, vProps, factor.to.y, child.to);
				};
				if (factor.from.x != factor.to.x) { // Horizontal props scaling
					child.from = $.effects.setTransition(child, hProps, factor.from.x, child.from);
					child.to = $.effects.setTransition(child, hProps, factor.to.x, child.to);
				};
				child.css(child.from); // Shift children
				child.animate(child.to, o.duration, o.options.easing, function(){
					if (restore) $.effects.restore(child, props2); // Restore children
				}); // Animate children
			});
		};

		el.animate(el.to, { queue: false, duration: o.duration, easing: o.options.easing, complete: function() {
			if (el.to.opacity === 0) {
				el.css('opacity', el.from.opacity);
			}
			if(mode == 'hide') el.hide(); // Hide
			$.effects.restore(el, restore ? props : props1); $.effects.removeWrapper(el); // Restore
			if(o.callback) o.callback.apply(this, arguments); // Callback
			el.dequeue();
		}});

	});

};

})(jQuery);
/*
 * jQuery UI Effects Slide 1.8.18
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Slide
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function( $, undefined ) {

$.effects.slide = function(o) {

	return this.queue(function() {

		var el = $(this), props = ['position','top','bottom','left','right'];

		var mode = $.effects.setMode(el, o.options.mode || 'show'); // Set Mode
		var direction = o.options.direction || 'left'; // Default Direction

		$.effects.save(el, props); el.show(); // Save & Show
		$.effects.createWrapper(el).css({overflow:'hidden'}); // Create Wrapper
		var ref = (direction == 'up' || direction == 'down') ? 'top' : 'left';
		var motion = (direction == 'up' || direction == 'left') ? 'pos' : 'neg';
		var distance = o.options.distance || (ref == 'top' ? el.outerHeight({margin:true}) : el.outerWidth({margin:true}));
		if (mode == 'show') el.css(ref, motion == 'pos' ? (isNaN(distance) ? "-" + distance : -distance) : distance); // Shift

		var animation = {};
		animation[ref] = (mode == 'show' ? (motion == 'pos' ? '+=' : '-=') : (motion == 'pos' ? '-=' : '+=')) + distance;

		el.animate(animation, { queue: false, duration: o.duration, easing: o.options.easing, complete: function() {
			if(mode == 'hide') el.hide(); // Hide
			$.effects.restore(el, props); $.effects.removeWrapper(el); // Restore
			if(o.callback) o.callback.apply(this, arguments); // Callback
			el.dequeue();
		}});

	});

};

})(jQuery);
/*
 * jQuery UI custom effect 'flash'  (yellow fade technique)
 *
 * our own version of the 'highlight' effect
 * same signature as jQuery UI 'highlight', but with a "backgroundColor" option
 * (allows you to work around the silliness of fading to white when the original
 * color is not white)
 *
 * Submitting this extra option as a fix to the official jquery-ui project
 * if this is ever released, we can kill 'flash' and just use 'highlight'
 *
 * Depends:
 *	jquery.effects.core.js
 *
 * @author <adamd@meetup.com>
 */
(function( $, undefined ) {

$.effects.flash = function(o) {
	return this.queue(function() {
		var elem = $(this),
			props = ['backgroundImage', 'backgroundColor', 'opacity'],
			mode = $.effects.setMode(elem, o.options.mode || 'show'),
			animation = {
				backgroundColor: o.options.backgroundColor || elem.css('backgroundColor')
			};

		if (mode == 'hide') {
			animation.opacity = 0;
		}

		$.effects.save(elem, props);
		elem
			.show()
			.css({
				backgroundImage: 'none',
				backgroundColor: o.options.color || '#ffff99'
			})
			.animate(animation, {
				queue: false,
				duration: o.duration,
				easing: o.options.easing,
				complete: function() {
					(mode == 'hide' && elem.hide());
					$.effects.restore(elem, props);
					(mode == 'show' && !$.support.opacity && this.style.removeAttribute('filter'));
					(o.callback && o.callback.apply(this, arguments));
					elem.dequeue();
				}
			});
	});
};

})(jQuery);


if(!IS_DEV)var IS_DEV = false;
if(IS_DEV){
	var LOG = {};
	if ("console" in window){
		LOG.info = function(info) { console.info(info); };
		LOG.error = function(err) { console.error(err); };
	}else{
		LOG.info = function() { return; };
		LOG.error = function() { return; };
	}
}

if (typeof(Meetup) == 'undefined') { Meetup = {}; }
if (typeof(Meetup.Data) == 'undefined') { Meetup.Data = {}; }

/**
 * Utilities for layout related things
 * @class
 * @description
 * By default, window.onresize will fire redraw().
 * Also Meetup.onload will fire adjustPageHeight() and redraw() in row.
 */
Meetup.Layout = {};
(function(){
	var self = Meetup.Layout;
	var redrawFuncs= [];
	var positionedElements= [];

	var reposition = function(p){
		var rect = self.getBoundingRect(p.positionBy);

		if (!p.edge) {
			setStyle(p.el, {"top":(rect.y+rect.h+p.offset.y)+"px", "left":(rect.x+p.offset.x)+"px"  });
		} else {
			setEdgeStyle(p.el, rect, p.edge, p.offset);
		}
	};

	var doSameHeight = function(els, now) {
		var heights = [];
		els.each(function(){
			var $el = $(this);
			if ($el.length > 0) {
				$el.css({"min-height":"", "_height": ""});
				heights.push($el.height());
			}
		});
		var tallestH = Math.max.apply(null,heights)
		var doSetHeight = function() {
			els.each(function(){
				var $el = $(this);
				if ($el.length > 0) {
					$el.css({ "min-height":tallestH+"px", "_height":tallestH+"px"});
				}
			});
		};
		if(now){
			doSetHeight();
		}
		else{
			setTimeout(doSetHeight, 1500); //IE sucks, so we need to give it a second to catch up.
		}
	};

	var doSetPageHeight = function() {
		var navEl = $get('C_nav'),
		pageEl = $get('C_context'),
		contentEl = $get("C_document");
		if ( navEl && pageEl ) {
			var n = (navEl) ? navEl.offsetHeight : 0;
			var c = contentEl.offsetHeight;
			var h = Math.max( n, c);
			if(typeof(document.body.style.maxHeight) != 'undefined'){
				pageEl.style.minHeight = h + 'px';
			}
			else{
				pageEl.style.height = h + 'px';
			}
		}
	};

	/**
	 * register callback functions to redraw()
	 * @function
	 * @name Meetup.Layout.registerResizeFunc
	 * @param {function} fn callback function
	 */
	self.registerResizeFunc = function(fn){
		redrawFuncs.push(fn);
	};

	/**
	 * set #C_context height by the height of higer either of #C_nav or #C_document.
	 * @function
	 * @name Meetup.Layout.adjustPageHeight
	 * @param {boolean} now true, if you wanna execute this right now, otherwise
	 * it will be fired .5 sec after
	 */
	self.adjustPageHeight = function(now){
		(now) ? doSetPageHeight() : setTimeout(doSetPageHeight, 500);
	};

	/**
	 * take multiple elements and set the same height among them
	 * @function
	 * @name Meetup.Layout.makeSameHeight
	 * @param {Array} els an array of elements
	 * @description Note1: this will set the callback from draw() to set the same
	 * height again.
	 * Note2: the arguments footprint is different from makeSameWidth()
	 */
	self.makeSameHeight = function(els) {
		if (els.length < 2) {
			LOG.error("makeSameHeight needs at least two elements to compare!!!");
			return;
		}
		doSameHeight(els, true);
		self.registerResizeFunc(partial(doSameHeight, els));
	};

	/**
	 * take multiple elements and set the same width among them.
	 * @function
	 * @name Meetup.Layout.makeSameWidth
	 * @param {DOMElement...} elm1... element to set same width
	 * @description Note1: this will set the callback for draw() to set the same
	 * width again.
	 * Note2: the arguments footprint is different from makeSameHeight()
	 */
	self.makeSameWidth = function(elm1, elm2) {
		var els = flattenArguments( extend(null, arguments, 0) );
		if (els.length < 2) {
			LOG.error("makeSameWidth needs at least two elements to compare!!!");
			return;
		}
		var fn = partial(doSameWidth, els);
		self.registerResizeFunc(fn);
	};

	/**
	 * Like, jQuery.position... But, actually works the way you would expect.
	 * Might want to make this a jQuery plug in...
	 * @function
	 * @name Meetup.Layout.position
	 * @param {DOMElement} elm
	 * @param {DOMElement} offsetElm
	 * @param {object} orientation {x: "left|center|right", y: "top|middle|bottom"}
	 */
	self.position = function(elm, offsetElm, orientation, offset) {

		if (!elm || !offsetElm || elm.length == 0 || offsetElm.length == 0) {
			return;
		}

		if (!orientation) { orientation = {y:"middle", x:"center"}; }
		var coords = offsetElm.offset(),
		offsetWidth = offsetElm.outerWidth(),
		offsetHeight = offsetElm.height(),
		elmWidth = elm.width(),
		elmHeight = elm.height();

		switch(orientation.x) {

			case "right":
				coords.left = coords.left + offsetWidth;
				break;
			case "left":
				coords.left = coords.left - offsetWidth;
				break;
			case "center":
				coords.left = coords.left + (offsetWidth/2) - (elmWidth/2);
				break;
			default:
				LOG.error("orientation.x should have a value of: right, left, or center.");
				break;
		}
		switch(orientation.y) {

			case "top":
				coords.top = coords.top - offsetHeight;
				break;
			case "bottom":
				coords.top = coords.top + offsetHeight;
				break;
			case "middle":
				coords.top = coords.top - (offsetHeight/2);
				break;
			default:
				LOG.error("orientation.y should have a value of: top, bottom, or middle.");
				break;
		}

		if (offset) {
			coords.top = coords.top + offset.top;
			coords.left = coords.left + offset.left;
		}
		elm.css({"top":coords.top, "left":coords.left});

	};

	/**
	 * fire all redraw functions
	 * @function
	 * @name Meetup.Layout.redraw
	 */
	self.redraw = function(){
		$.each( redrawFuncs, function(){
			try {
				this();
			} catch (e) { }

		});
		Meetup.Layout.adjustPageHeight();
	};

})();
$(window).bind("resize", Meetup.Layout.redraw );
$(window).bind("load", function(e) {
		Meetup.Layout.adjustPageHeight(true);
		Meetup.Layout.redraw();
} );
/* }}} */

var setCookie = function ( name, value, expires, path, domain, secure, noEscape ) {
	var today = new Date();
	if ( expires ) {
		expires = expires * 1000 * 60 * 60 * 24;
	}
	var expires_date = new Date( today.getTime() + (expires) );
	var cookieStr = name + "=" + (noEscape ? value : escape( value )) +
		( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
		( ( path ) ? ";path=" + path : "" ) +
		( ( domain ) ? ";domain=" + domain : "" ) +
		( ( secure ) ? ";secure" : "" );
	document.cookie = cookieStr;
	return cookieStr;
};
var removeCookie = function(name, domain, path) {
	if (!domain) domain = (IS_DEV) ? ".dev.meetup.com" : ".meetup.com";
	if (!path) path = "/";
	this.setCookie(name, "", -1, path, domain);
};

var getCookie = function ( name ) {
	var start = document.cookie.indexOf( name + "=" );
	var len = start + name.length + 1;
	if ( ( !start ) && ( name != document.cookie.substring( 0, name.length ) ) ) {
		return null;
	}
	if ( start == -1 ) return null;
	var end = document.cookie.indexOf( ";", len );
	if ( end == -1 ) end = document.cookie.length;
	return unescape( document.cookie.substring( len, end ) );
};

/* Meetup.Global {{{ */

/**
* Global has all global functions and variables
* @constructor
*/

if (typeof Meetup === 'undefined') {
	Meetup = {};
}

Meetup.Global = function(){
	if (typeof(IS_DEV) == 'undefined'){
		this.IS_DEV = false;
	}
	if (typeof(IS_QA) == 'undefined'){
		this.IS_QA = false;
	}
	if (typeof(LOG) == 'undefined'){
		this.LOG = { 'info': function() { return; }, 'error':function() { return; } };
		this.inspect = function(){};
	}
};

/**
 * Not necessarily jQuery-dependent functions,
 * but functions used by jQuery pages and not MochiKit pages
 */

/**
 * Useful querystring stuff from mochikit
 * @function
 * @param {list} lst list of elements
 */
Meetup.Global.prototype.flattenArguments = function (lst/* ...*/) {
	var res = [],
	args = $.extend({}, arguments);
	while (args.length) {

		var o = args.shift();
		if (o && typeof(o) == "object" && typeof(o.length) == "number") {
			for (var i = o.length - 1; i >= 0; i--) {
				args.unshift(o[i]);
			}
		} else {
			res.push(o);
		}
	}
	return res;
};

/**
 * port from MochiKit? construct query string by two arrays
 * @function
 * @param {array} names
 * @param {array} values
 */
Meetup.Global.prototype.queryString = function (names, values) {
	if (arguments.length == 1) {
		if (typeof(names.length) == "number" && names.length == 2) {
			return arguments.callee(names[0], names[1]);
		}
		var o = names;
		names = [];
		values = [];
		for (var k in o) {
			var v = o[k];
			if (typeof(v) == "function" || v == null) {
				continue;
			} else if (typeof(v) != "string" &&
					typeof(v.length) == "number") {
				for (var i = 0; i < v.length; i++) {
					names.push(k);
					values.push(v[i]);
				}
			} else {
				names.push(k);
				values.push(v);
			}
		}
	}
	var rval = [];
	var len = Math.min(names.length, values.length);
	for (var i = 0; i < len; i++) {
		v = values[i];
		if (typeof(v) != 'undefined' && v !== null) {
			rval.push(names[i] + "=" + v);
		}
	}
	return rval.join("&");
};

/**
 * port from MochiKit
 * @function
 * @param {string} encodedString
 * @param {boolean} useArrays [Option]
 */
Meetup.Global.prototype.parseQueryString = function (encodedString, useArrays) {
	var qstr = (encodedString.charAt(0) == "?") ? encodedString.substring(1) : encodedString;
	var pairs = qstr.replace(/\+/g, "%20").split(/(\&amp\;|\&\#38\;|\&#x26;|\&)/);
	var o = {};
	var decode;
	if (typeof(decodeURIComponent) != "undefined") {
		decode = function(uri){
			try {
				return decodeURIComponent(uri);
			} catch(e) {
				return uri;
			}
		};
	} else {
		decode = unescape;
	}
	if (useArrays) {
		for (var i = 0; i < pairs.length; i++) {
			var pair = pairs[i].split("=");
			if (pair.length !== 2) {
				continue;
			}
			var name = decode(pair[0]);
			var arr = o[name];
			if (!(arr instanceof Array)) {
				arr = [];
				o[name] = arr;
			}
			arr.push(decode(pair[1]));
		}
	} else {
		for (i = 0; i < pairs.length; i++) {
			pair = pairs[i].split("=");
			if (pair.length !== 2) {
				continue;
			}
			o[decode(pair[0])] = decode(pair[1]);
		}
	}
	return o;
};

/**
 * no-operation
 * @function
 */
Meetup.Global.prototype.noop = function() { return;};

/**
 * checks if an element is above the page fold
 * @function
 * @param {DOMElement or string} DOMElement or selector
 * @returns {boolean}
 */
Meetup.Global.prototype.isAboveFold = function( el ) {
	var $window = $(window),
		elRegion = this.getRegion($(el));

	if ( elRegion.top < $window.scrollTop() ) {
		return true;
	} else {
		return false;
	}
};

/**
 * checks if any part of an element is below page fold
 * NOTE: using the bottom most extent of el so that it doesn't have to
 * completely be hidden in order to return true
 * @function
 * @param {DOMElement or string} el
 * @returns {boolean}
 */
Meetup.Global.prototype.isBelowFold = function( el ) {
	var $window = $(window),
		fold = $window.scrollTop() + $window.height(),
		elRegion = this.getRegion($(el));

	if ( elRegion.bottom > fold ) {
		return true;
	} else {
		return false;
	}
};

/**
 * submit form
 * @deprecated
 * @param {DOMFormElement} formEl
 */
Meetup.Global.prototype.submitForm = function(formEl){
	var fakeSubmitEl = document.createElement("input");
	fakeSubmitEl.type = "submit";
	$(fakeSubmitEl).css("display","none");
	$(formEl).append(fakeSubmitEl);
	setTimeout(function(){
		$(fakeSubmitEl).click();
		$(fakeSubmitEl).remove();
	}, 1);
};

/**
 * @deprecated
 */
Meetup.Global.prototype.submitOnChange = function (el) {
	connect(el, "onchange", function(e){
		submitForm(el.form);
	});
};

/**
 * backward compatible MochiKit
 * @function
 * @param {DOMElement or string} elm
 * @param {string} ev event type
 * @param {function} func
 */
Meetup.Global.prototype.connect = function(elm, ev, func) {
	if (ev == "onload") {
		$(window).load(func);
	} else {
		$(elm).bind(ev.substr(1), func);
	}
};

/**
 * @deprecated
 */
Meetup.Global.prototype.formatRpcDate = function ( dt ){
	var d = dt ? dt : new Date();
	var pad = function (num){ return (num < 10) ? '0' + num : num; };
	return d.getFullYear() + '-' +
		pad(d.getMonth()+1) + '-' +
		pad(d.getDate()) + ' ' +
		pad(d.getHours()) + ':' +
		pad(d.getMinutes()) + ':' +
		pad(d.getSeconds()) + ' EDT';
};

/**
 * alias to jQuery's $.get()
 * @function
 * @param {string} url
 * @param {object} data
 * @param {function} callback
 */
Meetup.Global.prototype.doAjax = function(url, data, callback) {
	$.get(url, data, callback);
};

/**
 * determines if this is a valid calendar date
 * @param {number} y a year
 * @param {number} m a month
 * @param {number} d a day
 */
Meetup.Global.prototype.isValidDate = function (y,m,d) {
	var dateObj = new Date(y,m-1,d);
	if (dateObj.getMonth() == m-1 && dateObj.getFullYear() == y) {
		if (Object.prototype.toString.call(dateObj) === "[object Date]") {
			return !isNaN(dateObj.getTime());
		}
	}
	return false;
};

/**
 * gives us anything about an element we may need for positioning
 * @function
 * @param {DOMElement or string} el seems to be able to handle a selector, but be very careful.
 * @returns {object} {width, height, top, right, bottom, left, "XY":[x,y] }
 */
Meetup.Global.prototype.getRegion = function(el) {
	var $el = $(el),
		offset = $el.offset(),
		o_width = $el.outerWidth(),
		o_height = $el.outerHeight();

	return {
		width: o_width,
		height: o_height,
		top: offset.top,
		right: offset.left + o_width,
		bottom: offset.top + o_height,
		left: offset.left,
		XY: [ offset.top, offset.left ]
	};
};


/**
 * Used for sort buttons on Member List and threadlist.jsp
 * @function
 */
Meetup.Global.prototype.applySortLinks = function(id) {
	$("a.J_sort", $get(id)).each(function() {
		this.href = this.title;
		this.title = "";
	});
};

/**
 * partial from MochiKit
 * @function
 * @param {function} func
 */
Meetup.Global.prototype.partial = function (func) {
	return bind.apply(this, $.merge([func, undefined], Array.prototype.slice.call(arguments,1)));
};

/**
 * please do investigate
 * @function
 */
Meetup.Global.prototype.bind = function (func, self/* args... */) {
	if (typeof(func) == "string") {
			func = self[func];
	}
	var im_func = func.im_func;
	var im_preargs = func.im_preargs;
	var im_self = func.im_self;
	if (typeof(func) == "function" && typeof(func.apply) == "undefined") {
	}
	if (typeof(im_func) != 'function') {
			im_func = func;
	}
	if (typeof(self) != 'undefined') {
			im_self = self;
	}
	if (typeof(im_preargs) == 'undefined') {
			im_preargs = [];
	} else  {
			im_preargs = im_preargs.slice();
	}
	$.extend(im_preargs, Array.prototype.slice.call(arguments, 2));
	var newfunc = function () {
		var args = arguments;
		var me = arguments.callee;
		if (me.im_preargs.length > 0) {
				args = $.merge(me.im_preargs, args);
		}
		var self = me.im_self;
		if (!self) {
				self = this;
		}
		return me.im_func.apply(self, args);
	};
	newfunc.im_self = im_self;
	newfunc.im_func = im_func;
	newfunc.im_preargs = im_preargs;
	return newfunc;
};

/**
 * Generate trax key from trax process name
 * same as ${mfn:traxKey()}
 * @function
 */
Meetup.Global.prototype.getTraxKey = function( process ){
	return 'trax_' + process;
};

/**
 * check if the browser is capable of sessionStorage
 * @function
 */
Meetup.Global.prototype.isSessionStorageAvailable = function () {
	try {
		return 'sessionStorage' in window && window['sessionStorage'] !== null;
	} catch(e) {
		return false;
	}
};

Meetup.Global.prototype.hideFlashContent = function() {
	if(!$.support.leadingWhitespace){
		$("embed[data-no-flash-hide!='true']").css({"visibility":"hidden"});
		$("iframe[src*='youtube'][data-no-flash-hide!='true']").css({"visibility":"hidden"});
		$("iframe[src*='vimeo'][data-no-flash-hide!='true']").css({"visibility":"hidden"});
	}
};

Meetup.Global.prototype.showFlashContent = function() {
	$("embed").css({"visibility":"visible"});
	$("iframe[src*='youtube']").css({"visibility":"visible"});
	$("iframe[src*='vimeo']").css({"visibility":"visible"});
};

Meetup.Global.prototype.APIURL = "/api/";

/**
 * create name space, object under Meetup object
 * This will NOT wipe out, if the object is already there.
 * And also this will NOT create nested name sapce.
 * @function
 * @param {string} ns name of the new name space.
 */
Meetup.Global.prototype.namespace = function(ns){
	var comps = ns.split(".");
	if (comps.length == 1){
		if (typeof(Meetup[comps[0]]) == 'undefined'){
			Meetup[comps[0]] = {};
		}
	}else{
		LOG.error("Meetup.Global.namespace() inexplicably fails to support nested namespaces. FIXME!");
	}
};

/**
 * alias to document.getElementById. so we don't need to go through jquery
 * @function
 * @param {string} id of DOMElement
 */
Meetup.Global.prototype.$get = function(id) { return document.getElementById(id); };

/**
 * @deprecated
 * used by DomDeco/Dialog.js
 */
Meetup.Global.prototype.inDoc = function(el){
	return every(
		flattenArguments(arguments),
		function(elm){
			return (elm && elm.parentNode);
		}
	);
};

/**
 * @deprecated
 * used by DomDeco/Dialog.js
 */
Meetup.Global.prototype.inFrame = function(){
	var _inFrame = false;
	var topUrl;
	try{
		topUrl = top.location.href;
		if (isUndefinedOrNull(topUrl) ){
			_inFrame = true;
		}
	}catch(e){
		_inFrame = true;
	}
	if ( (!_inFrame) && (window.location.href != topUrl) ){
		_inFrame = true;
	}
	return _inFrame;
};

/**
 * @deprecated
 */
Meetup.Global.prototype.visible = function(el){
	return every(
			flattenArguments(arguments),
			function(elm){
				return (
					elm.style.display != "none" &&
					elm.style.visibility != "hidden" &&
					getNodeAttribute(elm, "type") != "hidden"
				);
			}
	);
};

/**
 * @function
 * @param {DOMElement or string} el1
 * @param {DOMElement or string} el2
 * @returns {boolean}
 */
Meetup.Global.prototype.intersects = function(el1, el2){
	if (!inDoc(arguments)) {
		LOG.error("Meetup.Global.interects(): one or more elements are not in the document");
		return false;
	}
	if (!visible(arguments)) {
		LOG.info("Meetup.Global.intersects() ... one or more elements are not visible");
		return false;
	}
	var getPos = elementPosition,
		getDim = elementDimensions;
	var pos1 = getPos(el1),
		dim1 = getDim(el1),
		pos2 = getPos(el2),
		dim2 = getDim(el2);
	var sign = function(v) {
		if(v > 0) return "+";
		else if(v < 0) return "-";
		else return 0;
	};
	if (pos1 && pos2) {
		return (
			(sign(pos1.y - (pos2.y + dim2.h)) != sign((pos1.y + dim1.h) - pos2.y)) &&
			(sign(pos1.x - (pos2.x + dim2.w)) != sign((pos1.x + dim1.w) - pos2.x))
		);
	} else  {
		LOG.info("Something is weird with el1 or el2 (or both)");
		return false;
	}
};

/**
 * escape html by Regular expression
 * @function
 * @param {string} str
 */
Meetup.Global.prototype.escapeHTML = function(str) {
	if(!str) return;
	return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g, '&quot;');
};

/**
 * unescape html by Regular expression. This function does not have a side effect
 * @function
 * @param {string} str
 */
Meetup.Global.prototype.unescapeHTML = function(str) {
	var reg = new RegExp("&lt;([^&]*)&gt;", "g");
	return str.replace(reg,"<$1>").replace(/&amp;/g, "&");
};

/**
 * unescape html of the given html element
 * @function
 * @param {DOMElement} elm
 */
Meetup.Global.prototype.unescapeElementHTML = function(elm) {
	elm.innerHTML =  unescapeHTML(elm);
};

/**
 * spit out the object property in console
 * @function
 * @param {object} obj
 */
Meetup.Global.prototype.inspect = function (obj){
	for (var um in obj){
		LOG.info( um + ': ' + obj[um] );
	}
};

/**
 * Replaces URLs in a block of text with HTML anchor tags.
 *
 * @param {String} text The text on which to operate.
 * @param {Integer} maxUrlLength Any URLs longer than maxUrlLength will be truncated to truncatedLength chatacters.
 * @param {Integer} truncatedLength Any URLs longer than maxUrlLength will be truncated to truncatedLength chatacters.
 * @return {String} The modified text.
 */
Meetup.Global.prototype.linkify = function(text, maxUrlLength, truncatedLength){
	if (maxUrlLength == null)
		maxUrlLength = 30;
	if (truncatedLength == null)
		truncatedLength = 20;
	if (text == null || text === "")
		return "";

	var urlRegex = /((((ht|f){1}(tp:[/][/]){1}))[-a-zA-Z0-9@:%_\+.~#?&//=]+)/gm,
		createLink = function (href) {
			return '<a href="' + href + '" title="' + href + '">' + (href.length > maxUrlLength ? href.substring(0, truncatedLength) + '&hellip;' : href) + '</a>';
		}

	return text.replace(urlRegex, function (match) {
		return createLink(match);
	});
}

/**
 * @deprecated
 */
Meetup.Global.prototype.hideSelects = function(hide){
	if(hide){
		removeElementClass(document.body, 'hideSelects');
		addElementClass(document.body, 'hideSelects');
	}else{
		removeElementClass(document.body, 'hideSelects');
	}
};

/**
 * Hide just the selects that intersect with elm
 * @deprecated
 */
Meetup.Global.prototype.hideSomeSelects = function(elm, hide) {
	var selects = document.getElementsByTagName("select");
	forEach(selects, function(sel) {
		if (hide) {
			if (intersects(sel, elm) && !isChildNode(sel, elm)){
				addElementClass(sel, "selectHide");
			}
		} else {
			if (hasElementClass(sel, "selectHide")) {
				removeElementClass(sel, "selectHide");
				sel.style.visibility = '';  /* why does IE6 need this???? */
			}
		}
	});
};

/**
 * add adding comma by US oriented way..
 * @deprecated
 */
Meetup.Global.prototype.addCommas = function(numberAsString) {
	numberAsString += ''; //Make sure number is actually a string..
	var sRegExp = new RegExp('(-?[0-9]+)([0-9]{3})');
	while(sRegExp.test(numberAsString)) {
		var commaStr = ',';
		if ( Meetup.Language.substring( 0, 2 ) == "it" )
			commaStr = '.';
		numberAsString = numberAsString.replace(sRegExp, '$1'+commaStr+'$2');
	}
	return numberAsString;
};


/**
 * you should use jQuery and pseudo selector
 * @deprecated
 */
Meetup.Global.prototype.returnFormValue = function(formElm) {
	if (!formElm) return false;
	for (var i=0; i<formElm.length; i++) {
		if (formElm[i].checked) return formElm[i].value;
	}
	return false;
};

/**
 * returns value of selected element in select tag
 * @function
 * @param {DOMSelectElement} select
 */
Meetup.Global.prototype.returnSelectValue = function(select) {
	return select[select.selectedIndex].innerHTML;
};

/**
 * clean up white space
 * but the code is a bit suspicious.
 * @function
 * @param {DOMElement} node
 */
Meetup.Global.prototype.cleanWhitespace = function (node) {
	var notWhitespace = /\S/;
	for (var x = 0; x < node.childNodes.length; x++) {
		var childNode = node.childNodes[x];
		if ((childNode.nodeType == 3)&&(!notWhitespace.test(childNode.nodeValue))) {
			node.removeChild(node.childNodes[x]);
			x--;
		}
		if (childNode.nodeType == 1) {
			cleanWhitespace(childNode);
		}
	}
};

/**
 * don't use this
 * @deprecated
 * @function
 * @param {DOMelement} el
 * @param {string} htmlStr
 */
Meetup.Global.prototype.setHTML = function(el, htmlStr){
	el.innerHTML = htmlStr;
	return el;
};

/**
 * Backwards compatibility for DomTools (no MochiKit)
 * @function
 * @param {object} obj
 * @param {string} evType event type. NOT starting with "on". should be like "click".
 * @param {function} fn
 */
Meetup.Global.prototype.addEvent = function (obj, evType, fn){
	if (obj.addEventListener){
		obj.addEventListener(evType, fn, false);
		return true;
	} else if (obj.attachEvent){
		var r = obj.attachEvent("on"+evType, fn);
		return r;
	} else {
		return false;
	}
};

/**
 * trim heading and trailing white spaces
 * @function
 * @param {string} str
 */
Meetup.Global.prototype.trim = function (str) {
	return str.replace(/^\s+|\s+$/g,"");
};

/**
 * left trim, trim the heading white spaces
 * @function
 * @param {string} str
 */
Meetup.Global.prototype.ltrim = function (str) {
	return str.replace(/^\s+/,"");
};

/**
 * right trim, trim the trailing white spaces
 * @function
 * @param {string} str
 */
Meetup.Global.prototype.rtrim = function (str) {
	return str.replace(/\s+$/,"");
};

/* EXPORT ALL GLOBALS INTO GLOBAL NAMESPACE */
(function(){
	$.extend(window, new Meetup.Global());
})();
/* }}} */

Meetup.DOMReady = {
	"ready" : function(f) { $(document).ready(f); }
}


Meetup.urlify = function(string){
	string = string.replace(/([ \s]{1,})/g, " ");     /* collapse whitespace */
	string = string.replace(/^[ \s]/g, "");   		  /* strip leading whitespace */
	string = string.replace(/[ \s]$/g, "");   		  /* strip trailing whitespace */
	string = string.replace(/[ \s]/g, "-");    		  /* replace spaces, "-" */
	string = string.replace(/[']/g, "");		      /* replace apostrophes, "'" */

	if ( string.match(/[\u00c0-\u00ff]/) ) {
		string = string.replace(/[\u00c0\u00c1\u00c2\u00c3\u00c4\u00c5]/g, "A");
		string = string.replace(/[\u00c6]/g, "AE");
		string = string.replace(/[\u00c7]/g, "C");
		string = string.replace(/[\u00c8\u00c9\u00ca\u00cb\u00d0]/g, "E");
		string = string.replace(/[\u00cc\u00cd\u00ce\u00cf]/g, "I");
		string = string.replace(/[\u00d1]/g, "N");
		string = string.replace(/[\u00d2\u00d3\u00d4\u00d5\u00d6\u00d8]/g, "O");
		string = string.replace(/[\u00d9\u00da\u00db\u00dc]/g, "U");
		string = string.replace(/[\u00dd]/g, "Y");
		string = string.replace(/[\u00df]/g, "ss");
		string = string.replace(/[\u00e0\u00e1\u00e2\u00e3\u00e4\u00e5]/g, "a");
		string = string.replace(/[\u00e6]/g, "ae");
		string = string.replace(/[\u00e7]/g, "c");
		string = string.replace(/[\u00e8\u00e9\u00ea\u00eb\u00f0]/g, "e");
		string = string.replace(/[\u00ec\u00ed\u00ee\u00ef]/g, "i");
		string = string.replace(/[\u00f1]/g, "n");
		string = string.replace(/[\u00f2\u00f3\u00f4\u00f5\u00f6\u00f8]/g, "o");
		string = string.replace(/[\u00f9\u00fa\u00fb\u00fc]/g, "u");
		string = string.replace(/[\u00fd\u00ff]/g, "y");
	}

	string = string.replace(/\\w+/g, "-" ); /* replace non-alphnum, "-" */
	string = string.replace( /-+/g, "-" ); 			  /* strip naked */
	string = string.replace(/^-+/g, "" ); 			  /* strip leading "-" */
	string = string.replace(/-+$/g, "" ); 			  /* strip trailing "-" */
	return string;
}

Meetup.Script = (function() {

	var rId = 0,
		requests = {},
		requested = [],
		loaded = [],
		head = document.getElementsByTagName("head")[0];

	var queue = function(src, fn) {
		if (!src) {
			LOG.info("src is undefined, bailing!");
			return false;
		}

		requests[++rId] = {
			"n": 0,
			"src": (src.constructor == Array) ? src : [src],
			"fn": fn,
			"success": []
		};
		load(rId, requests[rId].src, requests[rId].n);
	}

	var scriptNode = function(src) {

		LOG.info("node: " + src);

		var elm = document.createElement("SCRIPT");
		elm.setAttribute("type", "text/javascript");
		elm.setAttribute("src", src);

		return elm;
	}

	var next = function(id, src, n) {
		if(src[++n]) {
			return load(id, src, n);
		}
		if(requests[id].success.length > 0) {
			if(requests[id].fn) {
				requests[id].fn();
			}
		} else {
			if(requests[id].fn) {
				requests[id].fn();
			}
		}
	}

	var load = function(id, src, n) {
		var url = src[n];
		if(findValue(requested, url) != -1) {
			return next(id, src, n);
		}
		requested.push(url);
		var script = scriptNode(url);
		head.appendChild(script);
		script.onload = script.onreadystatechange = function() {
			 if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
				requests[id].success.push(url);
				loaded.push(url);
				next(id, src, n);
				script.onload = script.onreadystatechange = null;
			}
		}
	}

	var findValue = function(arr, str) {

		var len = arr.length;
		for(var i=0;i<len;i++) {
			if (arr[i] == str) {
				return 1;
			}
		}

		return -1;
	}
	return {
		include: queue
	}

})();

/*
 * Makes remoteAPI calls (everything that goes to /api/ or [urlname]/api
 * @class
 */
Meetup.RemoteApi = (function() {

  var csrf_cookie = "MEETUP_CSRF" + ( IS_DEV ? "_DEV" : "" );
  var defaults = {
    "url": "/api/",
    "success": jQuery.noop,
    "error" : jQuery.noop
  };

  /*
   * Makes a remoteAPI POST. Uses a token to prevent CSRF attacks.
   * @function
   * @param {object} data Data that is passed along to the AJAX call. Must include .method, since remoteAPI requires that.
   * @param {object} options Other options to pass along, such as success, error, URL params.
   */
  var post = function(options) {

    options.type = "POST";
    options = $.extend({}, defaults, options);
    options.data._csrf_token = getCookie(csrf_cookie);

    return jQuery.ajax(options);

  };

  var get = function(options) {

    options.type = "GET";
    options = $.extend({}, defaults, options);

    return jQuery.ajax(options);

  };

  return {
    get : get,
    post : post
  };

})();

/* Meetup.Http {{{ */
Meetup.Http = {};

/**
 * @function rpcURL
 * @param {string} method name of the api method
 * @param {object} args arguments for api method
 * @param {string} context (optional) context to call /api/ from (ie. '/chapter-name/')
 */
Meetup.Http.rpcURL = function(method, args, context){
		return "/api/" +
			(
				(method||args) ? "?" + queryString(
					$.extend({"method":method}, ( args||{} ) )
				):""
			);
};

/* }}} */
(function ($){
jQuery.fn.TextInputTip = function(opts) {
	/**
	 * @config
	 * dontStop {Boolean} if true, TextInputTip avoids preventing the default form submit event
	 *
	 * (NOTE: It's probably best to set 'dontStop' to true for use with Validator, as not to mess with submit bindings too much)
	 * Also, if you're using Birddog formProcessor, definitely set dontStop to true.
	 */
	var config = {
		'dontStop': false,
		dontSubmit: false
	};
	if (opts) $.extend(config, opts);

	return this.each(function() {
		var place_text = this.getAttribute("title"),
		form = $(this.form),
		elm = $(this);
		elm.data('place_text', place_text);


		if (place_text != "" && (elm.val() == "" || elm.val() == place_text)) {
			elm.val(place_text);
			elm.addClass("ghost");

			elm.bind({
				focus : function() {
					elm.removeClass("ghost");
					if (elm.val() == place_text) {
						elm.val("");
						elm.trigger('reset'); // CharCounter
						form.trigger('activate.collapsable'); // $.fn.collapsable
					}

				},
				blur : function() {
					if (elm.val() == "") {
						elm.trigger('resetTip');
					}
				}

			});

			/**
			 * custom event "clearTip" clears the tip if user hasn't entered their own text
			 */
			elm.bind('clearTip', function() {
				if (elm.val() == place_text) { elm.val("")}
			});

			elm.bind('resetTip', function () {
				elm.val(place_text);
				elm.addClass("ghost");
				form.trigger('deactivate.collapsable'); // $.fn.collapsable
			});

			if (!config.dontSubmit) {
				$(form).bind("submit", function(ev) {
					if (elm.val() == place_text) {
						if (!config.dontStop) { ev.preventDefault(); }
						elm.val("");
						if (!config.dontStop) { form.submit(); }
					}
				});
			}
		}
	});
}
})(jQuery);
/* Meetup.LocPicker {{{ */


	if (typeof(Meetup.LocPicker) == 'undefined') {
		Meetup.LocPicker = {};
	}


	Meetup.LocPicker.Location = {
		country: null,
		zip: null,
		set : function(co, zip) {
			this.country = co;
			this.zip = zip;
		},
		hasPostalCodes : function(){ return (this.country == 'us' || this.country == 'ca' || this.country == 'gb') },
		hasStates   : function() { return (this.country == 'it'); },
		getZipLabel    : function(){
			if (this.country == 'us') return Meetup.Copy.locPickerZipCode;
			else if (this.country == 'ca') return Meetup.Copy.locPickerPostalCode;
			else if (this.country == 'gb') return Meetup.Copy.locPickerPostcode;
			else return	Meetup.Copy.locPickerCity;
		},
		getLocZip      : function () { return this.zip; },
		getLocCountry  : function () { return this.country; }
	};


	Meetup.LocPicker.Menu = {
		CONTAINER_ID : "locMenu",
		COUNTRY_MENU_ID : "co",
		ZIP_FIELD_ID : "zip",
		ZIP_LABEL_ID : "zipLabel",
		READY_ID : "ready",
		REF_FIELD_ID : "locationPickerRef",

		INVALID_ID   : "NOTME",

		/* New loc picker stuff */
		POST_DOM : null,
		PROV_DOM : null,
		CITY_DOM : null,

		MAIN_EL_ID : "locPicker",

		ELEM_TAG : "",
		ELEM_CLS : "",

		DOM_ASSOC : { "it" : this.PROV_DOM,
			      "us" : this.POST_DOM,
			      "ca" : this.POST_DOM,
			      "gb" : this.POST_DOM },

		setWaiting : function() {
						document.getElementById(this.CONTAINER_ID).style.cursor = 'wait';
						document.getElementById(this.ZIP_LABEL_ID).innerHTML = Meetup.Copy.locPickerloadingCities;
		},
		setReady  : function() {
				document.getElementById(this.CONTAINER_ID).style.cursor = '';
				document.getElementById(this.ZIP_LABEL_ID).innerHTML = Meetup.LocPicker.Location.getZipLabel();

			Meetup.LocPicker.doLocPickerReadyCallback();//external callback
		},
		showZipField : function(){
			var mainEl = document.getElementById( this.MAIN_EL_ID );

			mainEl.innerHTML = "";
			var clonedEl = mainEl.appendChild( this.POST_DOM.cloneNode( true ) );
			Meetup.LocPicker.Events.findConnectibles();
			if (typeof(MochiKit) != 'undefined') {
				signal(mainEl, "fieldshow");
			}
		},
		showCityMenu : function(){
			var mainEl = document.getElementById( this.MAIN_EL_ID );
			mainEl.innerHTML = "";
			var clonedEl = mainEl.appendChild( this.CITY_DOM.cloneNode( true ) );
			Meetup.LocPicker.Events.findConnectibles();
			if (typeof(MochiKit) != 'undefined') {
				signal(mainEl, "fieldshow");
			}
		},
		showStateMenu : function () {
			var mainEl = document.getElementById( this.MAIN_EL_ID );
			mainEl.innerHTML = "";
			var clonedEl = mainEl.appendChild( this.PROV_DOM.cloneNode( true ) );
			Meetup.LocPicker.Events.findConnectibles();
			if (typeof(MochiKit) != 'undefined') {
				signal(mainEl, "fieldshow");
			}
		},
		rebuildCityMenu : function(cities){
			var P = Meetup.LocPicker;
			this.showCityMenu();
			var citySel = document.getElementById( "locSwitchable" ).getElementsByTagName( "select" )[0];

			/* while( citySel.hasChildNodes() ){ citySel.removeChild( citySel.firstChild ); } */

			for (var i = 0; i < cities.length; i++){
				if (cities[i].code != null ){
					var newOpt = citySel.appendChild ( document.createElement('option') );
					newOpt.setAttribute('value', cities[i].code);
					if( cities[i].code == Meetup.LocPicker.initialZip ) {
						newOpt.selected = "selected";
						newOpt.setAttribute('selected', 'selected');
						P.initialZip = "";  /* only want to do comparison onload */
					}
					newOpt.innerHTML = cities[i].name;
				}
			}
			this.setReady();

			citySel.onchange = Meetup.LocPicker.updateZip;
			Meetup.LocPicker.updateZip();
		},
		rebuildStatesMenu : function( states ) {
			this.showStateMenu();

			var provSel = document.getElementById( "locSwitchable" ).getElementsByTagName( "select" )[0];
			var provCitySel = document.getElementById( "locSwitchable" ).getElementsByTagName( "select" )[1];

			/*
			while( provSel.hasChildNodes() ){ provSel.removeChild( provSel.firstChild ); }
			while( provCitySel.hasChildNodes() ){ provCitySel.removeChild( provCitySel.firstChild ); }
			*/

			var newOpt = provSel.appendChild( document.createElement( "option" ) );
			newOpt.setAttribute( "value", Meetup.LocPicker.Menu.INVALID_ID )
			newOpt.innerHTML = Meetup.Copy.locPickerSelectProvince;

			for (var i = 0; i < states.length; i++){
				if (states[i].code != null ){
					var newOpt = provSel.appendChild ( document.createElement('option') );
					newOpt.setAttribute('value', states[i].code);
					if( states[i].code == Meetup.LocPicker.initialState ) {
						newOpt.selected = "selected";
						newOpt.setAttribute('selected', 'selected');
					}
					newOpt.innerHTML = states[i].name;
				}
			}
			provSel.onchange = Meetup.LocPicker.switchState;
			this.setReady();

			if( Meetup.LocPicker.initialState.length > 0 ) {
				/* if this is the first time, we want to stimulate a state change */
				Meetup.LocPicker.initialState = "";  /* only want to do comparison onload */
				Meetup.LocPicker.switchState();
			}
		},

		rebuildStateCitiesMenu : function ( cities ) {
			var P = Meetup.LocPicker;
			var zipEl = document.getElementById( "locSwitchable" ).getElementsByTagName( "select" )[1];
			var citySel = zipEl.cloneNode( true );
			Meetup.LocPicker.Events.makeConnectible(citySel);

			citySel.innerHTML = "";

			var newOpt = citySel.appendChild( document.createElement( "option" ) );
			newOpt.setAttribute( "value", Meetup.LocPicker.Menu.INVALID_ID )
			newOpt.innerHTML = Meetup.Copy.locPickerSelectCity;

			for (var i = 0; i < cities.length; i++){
				if (cities[i].code != null ){
					var newOpt = document.createElement('option');
					newOpt.setAttribute('value', cities[i].code);
					if( cities[i].code == Meetup.LocPicker.initialZip ) {
						newOpt.selected = "selected";
						newOpt.setAttribute('selected', 'selected');
						P.initialZip = "";  /* only want to do comparison onload */
					}
					newOpt.innerHTML = cities[i].name;
					citySel.appendChild ( newOpt );
				}
			}
			/* need to swap like this for IE6 */
			zipEl.parentNode.replaceChild( citySel, zipEl );

			this.setReady();

			citySel.onchange = Meetup.LocPicker.updateZip;
			Meetup.LocPicker.updateZip();
		},
		getCountry : function(){
			var menu = document.getElementById(this.COUNTRY_MENU_ID);
			return menu[menu.selectedIndex].value;
		 },
		getZip : function(){
			var zipField;
			if( (zipField = document.getElementById(this.ZIP_FIELD_ID )) != null)
			/* if we haven't constructed it yet */
				return zipField.value;
			else
				return Meetup.LocPicker.Location.zip;
		 },
		getLocationDOM : function(){
			if(this.getCountry() == "us"){
				return A({"href":""}, this.getZip() );
			}else{
				return  A({"href":""}, this.getZip(), ", ", this.getCountry() );
			}
		 },
		setZip : function ( z ) {
			document.getElementById(this.ZIP_FIELD_ID ).value = String( z );
		},
		addClass : function ( clsNm, el ) {
			if( el == null ) return;
			el.className = el.className + " " + String( clsNm );
		},
		removeClass : function ( clsNm, el ) {
			if( typeof( el ) == "string" ) el = document.getElementById( el );
			if( el == null ) return;

			var classes = el.className.split(" ");
			var newCls = "";

			for(var i in classes)
				if( classes[i].length > 0 && classes[i] != clsNm )
					newCls += classes[i] + " ";
			el.className = newCls;
		},
		init : function(){

			if( this.ELEM_TAG.length < 1 ) {
				return;
			}

			var mc = Meetup.Copy;
			var html;   /* necessary to correctly construct dom structure; must add all innerHTML at once */
			var initZip = Meetup.LocPicker.initialZip;

			this.POST_DOM = document.createElement( this.ELEM_TAG );
			this.POST_DOM.setAttribute( "id", "locSwitchable" );
			html =  '<span class="label"><label for="zip" id="' + this.ZIP_LABEL_ID + '">' + mc.locPickerCity + '</label></span>';
			html += '<span class="input"><input type="text" id="zip" name="zip" value="'+( (initZip.indexOf("meetup") > -1) ? "":initZip)+'" class="locNameUpdateZip"  /></span>';
			this.POST_DOM.innerHTML = html;

			this.PROV_DOM = document.createElement( this.ELEM_TAG );
			this.PROV_DOM.setAttribute( "id", "locSwitchable" );
			html =  '<div class="pickerUnit"><span class="label"><label for="state">' + mc.locPickerProvince + '</label></span>';
			html += '<span class="input"><select name="state" id="stateSel" class="locNameUpdateState"></select></span></div>';
			html += '<div class="pickerUnit"><span class="label"><label for="city" id="' + this.ZIP_LABEL_ID + '">' + mc.locPickerCity + '</label></span>';
			html += '<span class="input"><select name="zip" id="zip" class="locNameUpdateZip locNameUpdateCity"></select></span></div>';
			this.PROV_DOM.innerHTML = html;

			this.CITY_DOM = document.createElement( this.ELEM_TAG );
			this.CITY_DOM.setAttribute( "id", "locSwitchable" );
			html =  '<span class="label"><label for="zip" id="' + this.ZIP_LABEL_ID + '">' + mc.locPickerCity + '</label></span>';
			html += '<span class="input"><select name="zip" id="zip" class="locNameUpdateZip locNameUpdateCity"></select></span>';
			this.CITY_DOM.innerHTML = html;
		}
	};

	Meetup.LocPicker.doLocPickerReadyCallback = function() {};

	Meetup.LocPicker.Events = {
		evTypes : {"onblur":[], "onfocus":[]},
		connect : function(obj, ev, func){
			if(typeof this.evTypes[ev] == 'undefined'){
				return false;
			}
			this.evTypes[ev].push({'obj':obj, 'func':func});
		},
		makeConnectible : function(el){
			scope = this;
			el.onblur = this.blur;
			el.onfocus = this.focus;
		},
		findConnectibles : function(el){
			obj = this;
			var connectThese = function(els){
				for(i in els){
					obj.makeConnectible(els[i]);
				}
			}
			connectThese(document.getElementById( "locSwitchable" ).getElementsByTagName( "select" ));
			connectThese(document.getElementById( "locSwitchable" ).getElementsByTagName( "input" ));
		},
		blur : function(){
			for(f in scope.evTypes["onblur"]){
				scope.evTypes.onblur[f].func.call(scope.evTypes.onblur[f].obj);
			}
		},
		focus : function(){
			for(f in scope.evTypes["onfocus"]){
				scope.evTypes.onfocus[f].func.call(scope.evTypes.onfocus[f].obj);
			}
		}
	};

	Meetup.LocPicker.DataGetter = {
		doRemote : function(obj, url, success, error){
			if (window.XMLHttpRequest) {
				req = new XMLHttpRequest();
			} else if (window.ActiveXObject) {
				req = new ActiveXObject("Microsoft.XMLHTTP");
			}
			try{
				req.onreadystatechange = function(){
					if (req.readyState == 4) {
						if (req.status == 200) {
							success.call(obj, req);
						} else {
							error.call(obj, req);
						}
					}
				}
				req.open("GET", url, true);
				req.send(null);
			}catch(e){
			}
		}
	};

	Meetup.LocPicker.CityObjectDataGetter = {
		cache : {},
		callbacks : [],
		userActivityHandler : function(){
			var P = Meetup.LocPicker;
			if(this.callbacks.length > 0 && P.Location.country){
				this.getCityObj(P.Location.country, P.Location.zip);
			}
		},
		parseZip : function(co, zip){

			var z = ""+zip;

			if( co == 'us'){
				if( z.length >= 5 ) {
					z = z.substring( 0, 5 );
				}
				else{
					return false;
				}
			}
			else if( co == 'ca' ){
				z = z.replace(/\s/, "");
				if( z.length == 6 && z.indexOf( ' ' ) == -1 ) {
					z = z.substring( 0, 3 ) + ' ' + z.substring( 3 );
				}
				else{
					return false;
				}
			}
			else if( co == 'gb' ){
				z = z.replace(/\s/g, "");
				if( ( z.length == 6 || z.length == 7 ) && z.indexOf( ' ' ) == -1 ) {
					z = z.substring( 0, z.length - 3 ) + ' ' + z.substring( z.length - 3 );
				}
				else{
					return false;
				}
			}
			else if( co == 'it' ){
				if(z == 'NOTME'){
					return false;
				}
			}
			return z;
		},
		addCallback : function(obj, func){
			this.callbacks.push({'obj':obj, 'func':func});
		},
		getCityObj : function (co, zip){
			if (this.cache[zip]){
				Meetup.LocPicker.Menu.rebuildCityMenu(this.cache[co]);
				return;
			}
			var P = Meetup.LocPicker;
			var co = co;
			var zip = this.parseZip(co, zip);
			var url = "/api/?method=getCityName&arg_country=" + co + "&arg_zip=" + zip;
			var success = function(req){
				var city;
				if (req.responseText && (city = eval("("+req.responseText+")"))){

					P.LocaleDataGetter.cache[zip] = city;
					for(c in this.callbacks){
						this.callbacks[c].func.call(this.callbacks[c].obj, city);
					}
				}else{
				}
			}
			var error = function(req){
			}

			if(co && zip){
				Meetup.LocPicker.DataGetter.doRemote(this, url, success, error);
			}
			else if(co){
				var req = "{'country':"+co+"}";
				success(req);
			}
			else{
			}
		}
	}

	Meetup.LocPicker.LocaleDataGetter = {
		cache : {},
		deserialize : function (str){
			var cis = str.split("||");
			var retArray = new Array();
			for (var i = 0; i < cis.length; i++){
				var iCi = cis[i].split("::");
				if (iCi[0] && iCi[1]) retArray[retArray.length] = { name:iCi[0].replace(/^\s*|\s*$/g,""), code:iCi[1].replace(/^\s*|\s*$/g,"") }
			}
			return retArray;
		},
		getCities : function (co){
			if (this.cache[co]){
				Meetup.LocPicker.Menu.rebuildCityMenu(this.cache[co]);
				return;
			}
			var P = Meetup.LocPicker;
			var co = co;
			var url = "/get-loc-data.jsp?co=" + co;
			var success = function(req){
				if (req.responseText){
					var locs = req.responseText;
					if (locs.length < 1){
					}else{
						var cities = P.LocaleDataGetter.deserialize(locs);
						P.LocaleDataGetter.cache[co] = cities;
						P.Menu.rebuildCityMenu(cities);
						P.Menu.setReady();
					}
				}else{
				}
				P.Menu.setReady();
			}
			var error = function(req){
				P.Menu.setReady();
			}
			Meetup.LocPicker.DataGetter.doRemote(this, url, success, error);
		},

		getStates : function (co) {
			var P = Meetup.LocPicker;
			var co = co;
			var url = "/get-loc-data.jsp?co=" + co;
			var success = function(req){
				if (req.responseText){
					var locs = req.responseText;
					if (locs.length < 1){
					}else{
						if( P.TESTING )
							var states = [{code: '1', name: "Albequerque"}, {code: '1', name: "Heavens to Betsy"}, {code: '1', name: "Gilgamesh"}];
						else
							var states = P.LocaleDataGetter.deserialize(locs);
						P.LocaleDataGetter.cache[co] = states;
						P.Menu.rebuildStatesMenu( states );
						P.Menu.setReady();
					}
				}else{
				}
				P.Menu.setReady();
			}
			var error = function(req){
				P.Menu.setReady();
			}
			Meetup.LocPicker.DataGetter.doRemote(this, url, success, error);
		},
		getStateCities : function () {
			var P = Meetup.LocPicker;
			var co = P.Menu.getCountry();
			var provSel = document.getElementById( "locSwitchable" ).getElementsByTagName( "select" )[0];
			var stateName = provSel.options[provSel.selectedIndex].value;
			var url = "/get-loc-data.jsp?co=" + co + "&st=" + stateName;
			var success = function(req){
				if (req.responseText){
					var locs = req.responseText;
					if (locs.length < 1){
					}else{
						var cities = P.LocaleDataGetter.deserialize(locs);
						P.LocaleDataGetter.cache[co] = cities;
						P.Menu.rebuildStateCitiesMenu( cities );
						P.Menu.setReady();
					}
				}else{
				}
				P.Menu.setReady();
			}
			var error = function(req){
				P.Menu.setReady();
			}
			Meetup.LocPicker.DataGetter.doRemote(this, url, success, error);
		}
	};

	Meetup.LocPicker.switchCountry = function(){
		var P = Meetup.LocPicker;
		if ( P.Location.hasPostalCodes() ){
			P.Menu.showZipField();
			P.Menu.removeClass( "doWrap", "locMenu" );
			if( P.initialZip && P.initialZip.length > 0 ) {
				/* this is *terribly* stateful... */
				if( ( P.Location.country == 'us' && !isNaN( P.initialZip ) ) ||
					( P.Location.country == 'ca' && P.initialZip.replace(/[ ]*/g, "").length == 6 && !( /[^0-9a-zA-Z ]/g.test( P.initialZip ) ) ) ||
					( P.Location.country == 'gb' && ( P.initialZip.replace(/[ ]*/g, "").length == 6 || P.initialZip.replace(/[ ]*/g, "").length == 7 ) && !( /[^0-9a-zA-Z ]/g.test( P.initialZip ) ) )
					) {
					/* valid zipCode, set field */
					P.Menu.setZip( P.initialZip );  // set the display
				}
				P.initialZip = "";   // anull the data
			}
			var zipEl = document.getElementById( "locSwitchable" ).getElementsByTagName( "input" )[0];
			zipEl.onkeyup = Meetup.LocPicker.updateZip;
			P.Menu.setReady();
		} else if ( P.Location.hasStates() ) {
			P.Menu.showStateMenu();
			P.Menu.setWaiting();
			P.Menu.addClass( "doWrap", "locMenu" );
			P.LocaleDataGetter.getStates(P.Location.country);
		}else{
			P.Menu.showCityMenu();
			P.Menu.setWaiting();
			P.Menu.removeClass( "doWrap", "locMenu" );
			P.LocaleDataGetter.getCities(P.Location.country);
		}
	}

	Meetup.LocPicker.switchState = function () {
		var P = Meetup.LocPicker;

		P.LocaleDataGetter.getStateCities();
	}

	Meetup.LocPicker.updateZip = function () {
		var P = Meetup.LocPicker;
		P.Location.set( P.Menu.getCountry(), P.Menu.getZip() );
		P.CityObjectDataGetter.userActivityHandler();
	}

	Meetup.LocPicker.__init__ = function(){
		var P = Meetup.LocPicker;

		P.Menu.init();

		/* pass stuff in that's set by the JSP */
		P.Location.set( P.initialCountry, P.initialZip );

		var co = document.getElementById("co");
		if( Meetup.UserAgent && Meetup.UserAgent.isSafari() && co != undefined ) {  /* bug 8680 */
			for( var i in co.options ) {
				if( co.options[i].value == P.Location.country )
					co.options[i].selected = "selected";
				else
					co.options[i].selected = "";
			}
		}
		P.initialCountry = "";

		var countryMenu = document.getElementById(P.Menu.COUNTRY_MENU_ID);

		Meetup.LocPicker.Events.makeConnectible(countryMenu);



		countryMenu.onchange = function(){
			var P = Meetup.LocPicker;
			P.Location.set( P.Menu.getCountry(), P.Menu.getZip() )
			P.switchCountry();
		}

		P.switchCountry();
	}


/* }}} */
Meetup.omnCamp = function(e) {

	var cls = this.className.split(' '),
	len = cls.length;

	for ( var i = 0; i < len; i++ ) {

		var code = cls[i].substr(0, 5);

		switch(code) {
			case 'omngj':
				Meetup.GAT.setTrackCode("gj", cls[i].substr(6));
				break;

			case 'omnrg':
				Meetup.GAT.setTrackCode("rg", cls[i].substr(6));
				break;

			case 'omnrv':
				Meetup.GAT.setTrackCode("rv", cls[i].substr(6));
				break;

			case 'omnic':
				Meetup.GAT.setTrackCode("ic", cls[i].substr(6));
				break;

			case 'omnmb':
				Meetup.GAT.setTrackCode("mb", cls[i].substr(6));
				break;

			case 'omnph':
				Meetup.GAT.setTrackCode("ph",  cls[i].substr(6));
				break;

			case 'omnec':
				Meetup.GAT.setTrackCode("ec",  cls[i].substr(6));
				break;
		}
	}
};




/* Meetup.GAT
 *
 * Omniture-style link tracking.
 *
 */
Meetup.GAT = {};
(function() {

 	var self = Meetup.GAT;
	var domain = ( IS_DEV || IS_QA ) ? '.dev.meetup.com' : '.meetup.com';
	var GA_cookie = ( IS_DEV || IS_QA ) ? 'MEETUP_GA_DEV' : 'MEETUP_GA';
	var successTypes = ['ic','gj','rv','rg','mb','ph','ec','fb'];
	var successCodes = {'ic':'GRPSTART','gj':'GRPJOIN','rg':'REGISTER','rv':'RSVP', 'mb': 'MBPOST', 'ph': 'PHOTO', 'ec' : 'EVCREATE', 'fb': 'FBOOK'};
	var successSubCodes = {'NEW_GRPS':'ic','NEW_HAND':'ic','ORG_HAND':'ic','ORG_GRPS':'ic', 'PH_TAG': 'ph', 'PH_CMNT': 'ph', 'RSVP_NO' : 'rv', 'RSVP_YES' : 'rv', 'FB_INVIT': 'fb'};
	var ga_segment;

	if (IS_DEV) {
		self.successes = [];
		self.trackingCodes = [];
		self.startingVals = [];

		var cookie = getCookie(GA_cookie);

		if (cookie) {
			var cArr = cookie.split("&"), len = cArr.length;
			for(var i=0;i<len;i++) {
				var val = cArr[i].split("=");
				self.startingVals.push({"name":val[0], "value":val[1]});
			}
		}
	}

	self.triggerSuccess = function(code) {
		if (code.indexOf(",") == -1) {
			_successTrack(code);
		} else {
			var successArr = code.split(",");
			var len = successArr.length;
			for (var i=0;i<len;i++) {
				_successTrack(successArr[i]);
			}
		}
	}
	self.setTrackCode = function(code, value) {
		if (code == null) return;

		if (typeof(Chapter) != "undefined" && Chapter.domain && Chapter.domain != "") domain = Chapter.domain;
		var cv = self.getTrackCode(true);

		if (cv != null) {
			cv[code] = value;
			var qs = queryString(cv);
		} else {
			var qs = code + "=" + value;
		}
		if (IS_DEV) self.trackingCodes.push({"code":code,"value":value});
		setCookie(GA_cookie, decodeURI(qs), 730, "/", domain, false );

	}

	self.clearTrackCode = function(code) { self.setTrackCode(code, null) }

	self.getTrackCode = function(parse) {
		var c = getCookie(GA_cookie);
		if (c == null) return;
		return (parse) ?  parseQueryString(c) : c;

	}

	self.returnSuccessCode  = function(code) {
		return (typeof(successCodes[code]) != "undefined") ? successCodes[code] : "NOCODE";
	};

	/*
	 * We use this to check the URL query string for success types (like when you click through from an email).
	 * You can add more types to the successTypes array above.
	 */
	self.checkUrl = function() {
		var qstr = document.location.search;
		if (qstr) {
			var len = successTypes.length;
			var qs = parseQueryString(qstr);
			for (var i=0; len > i; i++) {
				var st = successTypes[i];
				if (qs[st]) Meetup.GAT.setTrackCode(st, qs[st]);
			}
		}
	}

	var _successTrack = function(success) {

		self.checkUrl();
		if (typeof(Member) == "undefined" || Member.id === 0) {
			return;
		}

		var c = self.getTrackCode(true);

		if (!c) return

		if (c[success] == "NOTRACK") {
			self.clearTrackCode(success);
			return;
		}

		var originCode = (c[success]) ? c[success] : "NONE";

		var successCode = (self.successCode && successSubCodes[self.successCode] == success) ? self.successCode : self.returnSuccessCode(success);

		if (IS_DEV) {

			self.successes.push({"code":originCode,"value":successCode});

			$(function() {
				var $html = $('<div style="position:fixed;width:300px;height:50px;background:#fff;right:0;bottom:35px;padding:10px;text-align:center;display:none"><p><strong>Success Tracked!</strong></p><p>'+successCode+': '+originCode+'</p></div>');
				$(document.body).append($html);
				$html.fadeIn();
				$html.click(function() { $html.remove(); });
			});
		}

		jQuery.post(Meetup.Http.rpcURL("saveSuccessTrack"),
			{
				"arg_memberId":Member.id,
				"arg_originCode":originCode,
				"arg_successCode":successCode
			}
		);

		if (successCode == "NEW_GRPS") {

			self.setTrackCode("ic","NOTRACK");

		} else {

			self.clearTrackCode(success);

		}
	}
	self.init = function() {
		self.checkUrl();

    self.clearTrackCode("id");

		/*
		 * Add success codes to bot_inc.jsp include like this to indicate success:
		 * <jsp:param name="successCode" value="ic" />
		 *
		 */
	}
})();


Meetup.GA = (function() {
	var segment, gaGranularPageUrl, gaAggregatePageUrl, groupCode, groupDomain, MPT,
	    mt = Meetup.GAT;

	Meetup.pageTracker = {
		"_trackPageview": function(code) {

				if (typeof(MPT) != "undefined") {

					MPT._trackPageview(code);

				} else {

					var poll = setInterval(function() {
						if (typeof(MPT) != "undefined") {
							MPT._trackPageview(code);
							clearInterval(poll);
						}
					},500);

					setTimeout(function() {
						clearInterval(poll);
					},10000);

				}
		}
	};

	var scriptNode = function(s, p_gaGranularPageUrl, p_gaAggregatePageUrl, p_groupCode, p_groupDomain) {
		segment = s;
		mt.setTrackCode("segment", segment);

		gaGranularPageUrl = p_gaGranularPageUrl;
		gaAggregatePageUrl = p_gaAggregatePageUrl;
		groupCode = p_groupCode;
		groupDomain = p_groupDomain;

		LOG.info("Google Segment: " + segment);
	 	var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
	 	var script = document.createElement("script");
	 	script.type = "text/javascript";
	 	script.src = gaJsHost + "google-analytics.com/ga.js";
	 	var head = document.getElementsByTagName("head")[0];
	 	head.appendChild(script);
	 	_poll();
	}

	var _poll = function() {
		if(window['_gat']){
			LOG.info("Meetup.GA._poll for _gat: " + window['_gat']);
			_track();
		}else{
			setTimeout( arguments.callee, 240 );
		}
	}
	var _track = function() {

		mt.code = mt.getTrackCode();

		mt.pn2 = (gaAggregatePageUrl == "") ? Meetup.pageName.replace( /:/, ' ' ).replace( /\s+/g, '_' ) : gaAggregatePageUrl;
		mt.pn = (gaGranularPageUrl == "") ? null : gaGranularPageUrl

		try {
			LOG.info("Meetup.GA._track: UA-3226337-1 (granular) pn=" + mt.pn);
			var granularPT = _gat._createTracker("UA-3226337-1");
			granularPT._setDomainName("meetup.com");
			granularPT._setVar(mt.code);
			granularPT._trackPageview(mt.pn);
			granularPT._trackPageLoadTime(mt.pn);
		} catch (e) {
			LOG.info("granularPT failed -- " + e);
		}

		/*
		 * You can record JS pop-ups and other instances when you didn't actually leave the page by doing Meetup.pageTracker._trackPageview('name').
		 */
		try {
			LOG.info("Meetup.GA._track: UA-3226337-4 (aggregate) pn2=" + mt.pn2);
			MPT = _gat._createTracker("UA-3226337-4");
			MPT._setDomainName("meetup.com");

			MPT._setVar(mt.code);
			MPT._trackPageview(mt.pn2);
			MPT._trackPageLoadTime(mt.pn2);
		} catch (e) {
			LOG.info("Meetup.pageTracker failed -- " + e);
		}

		if ( groupCode ) {
			try {
				LOG.info("Meetup.GA._track: " + groupCode + " (granular) pn=" + mt.pn);
				var pageTracker = _gat._createTracker(groupCode);

				if ( groupDomain ) {
					pageTracker._setDomainName(groupDomain);
				} else {
					pageTracker._setDomainName("meetup.com");
				}

				pageTracker._setVar(segment);
				pageTracker._trackPageview(mt.pn);
				pageTracker._trackPageLoadTime(mt.pn);
			} catch (e) {
				LOG.info("pageTracker failed -- " + e);
			}
		}
	};

	return {
		load: scriptNode,
		track: _poll
	}
})();
/* Meetup.URI {{{ */
Meetup.URI = function( strURI ){
	this._uri = strURI ? strURI : document.location.href;
	bindMethods(this);
	this._parse();
};

Meetup.URI.prototype = {
	valid : false,
	_parse : function(){

		LOG.info("Meetup.URI.parse() ... this._uri: " + this._uri);
		var parts = this._uri.split("?");
		var q = ( parts.length > 1) ? parts[1] : false;

		var parts = parts[0].split("://");
		if (parts.length < 2) {
			LOG.error("unable to parse URI because scheme is missing ("+this._uri+")");
			return false; //need the scheme prefix
		}

		var p = parts[0];

		parts = parts[1].split("/");
		if (parts.length < 2){
			LOG.error("unable to parse URI because no slashes ("+this._uri+")");
			return false; //need at lease one slash
		}

		this.valid = true;

		this.scheme = p;
		this.domainName = parts[0];
		this.path = parts.slice(1);
		this.querystring = q ? q.split("&") : [];
		LOG.info("repr(this): " + repr(this));
		LOG.info("this.toString(): " + this.toString() );
	},
	addToQuerystring : function( name, value ){
		/* don't add qs params to redirects */
		if ( some(this.path, function(p) { return (p=="/r/"); } ) ) return;
		if (!this.querystring)
			this.querystring = [name+"="+value];
		else
			this.querystring[this.querystring.length] = name+"="+value;
	},
	toString : function(){
		return this.scheme + "://" + this.domainName + "/" + this.path.join("/") + ((this.querystring && this.querystring.length > 0) ? ("?" + this.querystring.join("&")) : "" );
	},
	__repr__ : function(){
		return "{"+
			"_uri: '"+this._uri+"'"+
			", scheme: '"+this.scheme+"'"+
			", domainName: '"+this.domainName+"'"+
			", path: '"+this.path.join("/")+"'"+
			", querystring: '"+(this.querystring ? ("?" + this.querystring.join("&")) : "" )+"'"+
		"}";
	}
}
/* }}} */
jQuery.fn.Dialog = function(opts) {
	opts = opts || {};

	return this.each(function() {
		var $this = $(this),
				$page = $("#C_page");

			if ($this.data("isDecorated")) { return; } //applying dialog multiple times will throw an error.
			$this.data("isDecorated", true);

			var options = $.extend(true, $.extend({}, opts), {
			resizable:false,
			draggable:false,
			modal:true,
			autoOpen:false,
			position:"center",
			closeText:"x",
			zIndex:4503,
			width:opts.width || $this.css("width") || 500,
			open : function() {
				if ($.browser.msie && $.browser.version < 8) {
					$(document).scrollTop($this.offset().top - ($this.height()/2));
				}
				$page.trigger("show_dialog");
			},
			close : function() {
				$page.trigger("hide_dialog");
			}
		}, opts);

		var noClose = false, ui_dialog;
		if ($this.hasClass('noClose')) {
			noClose = true;
			options.closeOnEscape = false;
			ui_dialog = $this.dialog('widget');
			$('a.ui-dialog-titlebar-close', ui_dialog).remove();
		}

		if ($this.hasClass('D_showOnLoad')) {
			options.autoOpen = true;
		}

		$this.dialog(options);
		if (noClose) {
			ui_dialog = $this.dialog('widget');
			$('a.ui-dialog-titlebar-close', ui_dialog).remove();
		}

		$this.bind("appear", function() {
			$this.dialog("open");
		});
		$this.bind("dismiss", function() {
			$this.dialog("close");
		});

		if ($this.hasClass("onloadDialog")) {
			Meetup.Layout.registerResizeFunc(function() {
					if ($this.dialog("isOpen")) {
						$this.dialog({position : "center"});
					}
			});
		}

	});
};
/* Meetup.DomDeco.Signal {{{ */
Meetup.Signal = function(e){
	var $this = $(this);
	if( this.className.indexOf( "_toClass_" ) > -1 ) {
		var lenMatch = this.className.match(/.*?D_signal_(\w+)_toClass_(\w+)/);
		if (lenMatch && lenMatch[1] && lenMatch[2]){
			_signalString = lenMatch[1];
			_elementId = lenMatch[2];
		}
		if( !$this.hasClass("D_signal_allowDefault") ) {
			e.preventDefault();
		}

		$("."+_elementId).each(function() { this.trigger(_signalString ) });
	} else {
		var lenMatch = this.className.match(/.*?D_signal_(\w+)_to_(\w+)/);
		if (lenMatch && lenMatch[1] && lenMatch[2]){
			_signalString = lenMatch[1];
			_elementId = lenMatch[2];
			LOG.info( "decorating for class " + _elementId );
		}
		if(!$this.hasClass('D_signal_allowDefault')) {
			e.preventDefault();
		}

		var $triggerElm = $("#"+_elementId);

		if (_signalString == "appear" && $triggerElm.hasClass("D_dialog")) {
			$triggerElm.dialog("open");
		} else if (_signalString == "dismiss" && $triggerElm.hasClass("D_dialog")) {
			$triggerElm.dialog("close");
		} else {
			$triggerElm.trigger(_signalString);
		}

	}
};
$(function() {
	$(document.body).delegate(".D_signal", "click", Meetup.Signal)
});
/* }}} */
Meetup.loginSignup = function () {
	var rootElm = $("#dialogHello");

	var showHide = function(show, hide, e){
		if (e && e.event) { e.preventDefault(); }
		$(hide).hide();
		$(show).show();
		if(rootElm.css("display") == "block"){
			rootElm.trigger("resize");
		} else{
			rootElm.trigger("appear");
		}

		if (show === "#paneSignup" && Member.id === 0){
			rootElm.trigger('reg_visible');
		}
	};

	$(document.body).delegate(".J_loginLink", "click",  function(e){
		Meetup.FB.loadFB();
		e.preventDefault();
		var target = this;
		var elm = $(this);
		if (elm.hasClass('headerLogin')) {
			Meetup.FB.isJoining = false;
		}
		else {
			Meetup.FB.isJoining = true;
		}
		if (elm.hasClass('inHelloSignup') && !elm.hasClass('inHelloLogin')) {
			rootElm.attr('isJoining', 'false');
			rootElm.attr('returnUri', '');
		}
		showHide('#paneLogin', '#paneSignup', e);
		rootElm.dialog('open');

		document.forms["loginForm"]["email"].focus();
	});

	$(document.body).on("click", ".J_signupLink", function(e){
		Meetup.FB.loadFB();
		e.preventDefault();
		var elm = $(this);
		if (elm.hasClass('topNavJoinus') || elm.hasClass('inAlienNudgeSignup')) {
			rootElm.attr('isJoining', 'true');
			rootElm.attr('returnUri', this.href);
		}
		else if (elm.hasClass('inHelloSignup') && !elm.hasClass('inHelloLogin')) {
			rootElm.attr('isJoining', 'false');
			rootElm.attr('returnUri', '');
		}
		showHide('#paneSignup', '#paneLogin', e);
		rootElm.dialog('open');
		$('.J_loginLink', rootElm).blur();
		$("#baseSignUp_realname").focus();
	});

	$(document.body).delegate(".showJoin", "click",  function(e){
		showHide('#meetupBox', '#facebookBox', e);
		showHide('#tos_meetup', '#tos_fb', e);
	});

	if($('#loginForm').length > 0) {
		$('#loginForm').bind('submit', function (ev) {
			if (rootElm.attr('isJoining') == 'true') {
				var inps = $(this).find('input');
				for (var i = 0, len = inps.length; i < len; ++i) {
					var inp = inps[i];
					if (inp.type == 'hidden' && inp.name == 'returnUri') {
						inp.value = rootElm.attr('returnUri');
						break;
					}
				}
			}
		});
	}
	rootElm.dialog({width: 360});
};
$(function() { Meetup.loginSignup(); });
/* Meetup.DomDeco.CharCounter {{{ */

(function ($) {
$.fn.CharCounter = function() {
	return this.each(function() {
		var _hidden = false,
    _hiding = null,
		_inputEl = null,
		_inputJ = null,
		_msgEl = null,
		_statusEl = null,
		_maxLen = 0;

		var decorate = function(el){
			if (!el || $(el).hasClass("maxLenAdded")){
				return;
			}

			_inputEl = el;
			_inputJ = $(el);

			_inputJ.addClass("maxLenAdded"); //Don't bind more than once

			_customPlacement  = _inputEl.className.match(/.*?maxLenPlacement_(\S+)/) || false;
			if (_customPlacement) _customPlacement = "#" + _customPlacement[1];
			var _siblingNode = _customPlacement || _inputEl;

			var lenMatch = _inputEl.className.match(/.*?maxChars(\d+)/);
			if (lenMatch && lenMatch[1]) _maxLen = lenMatch[1];
			_inputJ.data('max_len', _maxLen);
			_inputJ.on('clear', _hide);

			var hasHint = $(el).hasClass("hint-text");

			if(_inputEl.id.length >0 ) {
				_statusEl = $('<span class="limit" id="charCount_'+_inputEl.id +'" />');
			} else {
				_statusEl = $('<span class="limit" />');
			}

			_msgEl = $('<div style="display:none;" class="limit-container" />').append(_statusEl);
			$(_siblingNode).after(_msgEl);

			_check();

			if (hasHint) {
				_useMaxMsg();
			}

			_inputJ.on("keyup reset", _check).on("blur", _hideNoError).on("focus", _show);
		};

		var _hide = function(){
			_msgEl.hide();
			_hidden = true;
		};

		var _show = function(){
			_msgEl.show();
			_hidden = false;
      clearTimeout(_hiding);
		};

		var _hideNoError = function(e) {

      _hiding = setTimeout(function() {
        if(!_statusEl.hasClass('error')){
          _hide();
        }
      }, 300);

		};

		var _useMaxMsg = function(){
			var newEl = $(_statusEl).clone();
			newEl.html(Meetup.Copy.CharCounter.upToXChars.replace("{CHAR_COUNT}", _maxLen));
			newEl.addClass('limit');
			newEl.css({color:''});
			_statusEl.replaceWith(newEl);
			if (_hidden){
				_show();
			}
			_statusEl = newEl;
		};

		var _check = function (e) {

			var newEl = $(_statusEl).clone(),
			newElel = newEl[0],
			inputStr = $.trim(_inputEl.value),
			currentLen = _getLen(inputStr);


			if (currentLen > _maxLen) {
				remVal =  parseInt(_maxLen - currentLen,10);
				if (_maxLen - currentLen == -1) {
					newElel.innerHTML = Meetup.Copy.characterOver;
				} else {
					newElel.innerHTML = Meetup.Copy.charactersOver.replace( '{NUM_CHARS}', Meetup.i18N.formatNumber(-remVal).toString() );
				}
				newElel.className = "limit error";
				newElel.style.color='red';
			} else if (currentLen == _maxLen){
				newElel.innerHTML = Meetup.Copy.noCharactersLeft;
				newElel.className = "limit warning";
				newElel.style.color='red';
			} else if (currentLen < _maxLen) {
				remVal = parseInt(_maxLen - currentLen,10);
				if (_maxLen - currentLen == 1) {
					newElel.innerHTML = Meetup.Copy.characterLeft;
				} else {
					newElel.innerHTML = Meetup.Copy.charactersLeft.replace( '{NUM_CHARS}', Meetup.i18N.formatNumber(remVal).toString() );
				}
				newElel.className = 'limit';
				newElel.style.color='';
			}
			$(_statusEl).replaceWith(newEl);
			if (_hidden){
				_show();
			}
			_statusEl = newEl;
		};
		var _getLen = function(inputStr) {
			if(!inputStr.match(/(\r\n)/)){
				if(inputStr.match(/(\r)/)){
					inputStr = inputStr.replace(/(\r)/g, "xx");
				}else if(inputStr.match(/(\n)/)){
					inputStr = inputStr.replace(/(\n)/g, "xx");
				}
			}
			return inputStr.length;
		};

		decorate(this);
	});
};
})(jQuery);
/* }}} */

/*
 * Splain -- neat little popup info box
 */
Meetup.splainBoxes = [];
jQuery.fn.Splain = function(opts) {
	return this.each(function() {
		var box  = null,
				over = null,
				out = null,
				el   = null;

		var decorate = function(el){

			if (!el){
				LOG.error("no element passed in to Meetup.DomDeco.Splain.decorate()");
				return;
			}

			el = $(el);

			if (el.data("applied")) { return; }

			/* adding this class to avoid multiple connects on a single splain elements */
			if( el.hasClass("splainRegistered") ) {
				return;
			} else {
				 el.addClass("splainRegistered");
			}

			box = el.find(".splainBox:first");
			over = el.find(".splainOver:first");
			out = el.find(".splainClose:first");

			Meetup.splainBoxes.push(box);
			Meetup.activeSplain = null;

			$(document.body).append(box);
			$("a", box).click(function(e) { e.stopPropagation(); });

			Meetup.Layout.registerResizeFunc(position);

			over.bind("click", _toggleSplain);
			out.bind("click", _toggleSplain);

			if (box.attr("id")) {
				box.bind("dismiss", function() { _toggleSplain(null, true) });
			}

			el.data("applied", true);
		};

		var position = function() {
			if (box.hasClass("splainBoxRight")) {
					Meetup.Layout.position(box, over, {x:"left", y:"bottom"},{"left":-(box.width() - over.width() + 12),"top":-58});
			} else {
					Meetup.Layout.position(box, over, {x:"right", y:"bottom"},{"left":0,"top":-58});
			}
		};

		var _close = function(el) {
			Meetup.activeSplain = null;
			el.swapClass("D_swap_in", "D_swap_out");
			$(document.body).unbind("click", _eatClick);
		};
		var _eatClick = function(e) {
				e.preventDefault();
				_toggleSplain();
		};

		var _open = function(el) {
			if ( Meetup.activeSplain ) {
				_close(Meetup.activeSplain);
			}
			Meetup.activeSplain = el;

			el.swapClass("D_swap_out", "D_swap_in");
			position();

			setTimeout(function() {
				$(document.body).bind("click", _eatClick);
			}, 100);

		};

		var _toggleSplain = function(e, dismiss) {
			if(e) e.preventDefault();

			if (box.hasClass("D_swap_out") && !dismiss) {
				_open(box);
			} else {
				_close(box);
			}
		}

		decorate(this);

	});
}
Meetup.UserNav = {};

Meetup.UserNav = (function() {
		var MYGROUPS_COUNT = 0,
		MENU_LIMIT = 20;

		var generateMenu = function(groupObjs) {

			var menuList = $("#C_groupsMenu"),
			menuItemNodes = [],
			itemClass = "",
			count =  (MYGROUPS_COUNT < MENU_LIMIT) ? MYGROUPS_COUNT : MENU_LIMIT;

			menuList.css({ 'width' : '310px'});

			var $div = $('<div />'), groupname;
			for (var i = 0; i < count; i++) {
				$div.text(groupObjs[i].name);
				groupname = $div[0].innerHTML;
				itemClass = (i == count - 1 ) ? 'C_groupsMenuItem lastGroupItem' : 'C_groupsMenuItem';
				menuItemNodes.push('<li><a href="' + groupObjs[i].url + '" class="' + itemClass + '">' + groupname + '</a></li>');
			}
			menuList.append($('<ul class="myGroupsSection" />').append($(menuItemNodes.join(" "))));

			if (count < MYGROUPS_COUNT && !Meetup.BD) {
				menuList.append($('<div class="groupMenu_seeAll"><a href="' + Member.groupsLink +'">See All</a></div>'));
			}
		}

		var getMyGroupsForMenu = function() {
			MYGROUPS_COUNT = Member.groupCount;

			var method = (Meetup.BD) ? 'getAllBirddogChapterMembers' : 'getAllChapterMembers';

			Meetup.RemoteApi.get({
				method: "GET",
				url:"/api/",
				data : {'method': method, 'arg_memberId': Member.id},
				success: generateMenu,
				error : function(e) {
					LOG.error("Error with groups call : " + method + " : " + e)
				}
			});
		}

		return { init : getMyGroupsForMenu };
})();
(function($) {

/* Meetup.UI.Success  {{{
 *
 * Adds a success message to the page, with the specified text
 *
 * */

if (typeof(Meetup.UI) == 'undefined') {
	Meetup.UI = {};
}

Meetup.UI.Success = {};
(
function() {

    var template = '<div class="doc-box {{type}}">\
            <div class="doc-content">\
                <div class="" id="{{type}}_box">\
                    <h2>{{{txt}}}</h2>\
                </div>\
            </div>\
            {{#foot}}\
            <div class="doc-content footer align-center">\
                {{{foot}}}\
            </div>\
            {{/foot}}\
        </div>';

	Meetup.UI.Success.addSuccess = function (txt, foot, overwrite) {
		LOG.info("success!!!");
		foot = foot || null;
		overwrite = overwrite || false;
		var $doc = $('#C_document');
		if ($doc.length === 0 || !txt) {
			return false;
		}

		var $successBox = $('#success_box');
		var $successBoxContainer;
		if (overwrite === false || (overwrite === true && $successBox.length === 0)) {
			if ($successBox.length > 0) {
				$successBox.parent().parent().remove();
			}
			$successBoxContainer = successElm(txt, foot);
			$doc.prepend($successBoxContainer); // simplified doc.insertBefore
			showElement($successBoxContainer);
		}
		else {
			$successBoxContainer = $successBox.parent().parent();
			setHeader($successBox, txt);
			if (foot) {
				setFooter($successBoxContainer, foot);
			}
		}
		return $successBoxContainer;
	};

	Meetup.UI.Success.addError = function (txt, foot) {
		foot = foot || null;
		var $doc = $('#C_document');
		if ($doc.length === 0 || !txt) {
			return false;
		}

		var $errorBox = $('#error_box');
		if ($errorBox) {
			$errorBox.parent().parent().remove();
		}
		var $errorBoxContainer = errorElm(txt, foot);
		$doc.prepend($errorBoxContainer); // simplified insertBefore
		showElement($errorBoxContainer);
		return $errorBoxContainer;
	};

	var successElm = function (txt, foot) {
        return $($.mustache(template, {'txt': txt, 'foot': foot, 'type': 'success'}));
	};

	var errorElm = function (txt, foot) {
        return $($.mustache(template, {'txt': txt, 'foot': foot, 'type': 'error'}));
	};

	var setHeader = function ($parentElm, str) {
		var h2 = $parentElm.find('h2:first');
		h2.html(str);
	};

	var setFooter = function ($parentElm, str) {
		var $f = $parentElm.find('div.footer');
		if ($f.length === 0) {
			var $b = $parentElm.find('div.doc-content:last');
			$f = $('<div class="doc-content align-center footer"></div>');
			$b.after($f);
		}
		$f.html(str);
	};

	var showElement = function ($elm) {
			$elm.css({opacity: 0, display: 'block'});
			$(window).scrollTo( $elm, {scrollWhen:"below"});
			$elm.animate({opacity: 1.0}, 400);
	};

})();

/* }}} */
})(jQuery);
/*
class: jQuery.Highlighter

jQuery.Highlighter highlights elements!

Created on:
  September 17, 2009
jQuery-ified (re-writte):
	September 20, 2010
Modified (as facade for jquery-ui effect() plugin):
	January 17, 2012


Author:
  Takashi Mizohata <takashi@meetup.com>
	Will Howard <whoward@meetup.com>
		Adam D <adamd@meetup.com>

See Also:
  - http://wiki.github.com/madrobby/scriptaculous/effect-highlight

Note:
  As default, it blinks once and each blink takes 900 milliseconds.  And high-light color is #FF9 (soft yellow).  You can change how many times it blinks, what color it highlights, how long it takes for each blink, some function it hits before or after blink, etc.  See the example below, and read the source, or ask Takashi.

	Re-written as a jQuery plugin.

	(adamd): "times" option deprecated - color and duration still work

Example:
:  // There is a element with id "foobar",
:  // and you wanna make it flash with color of red,
:  // each flash takes 0.8 seconds
:	 $('#foobar').Highlight({
:		 color: "#fff",
:	   duration : 800
:	 });
*/

/*
Method:

	jQuery.Highlighter requires one element which flashes its background color.  Default color is #FF9 (soft yellow).

argument:

  opts - (Object) Options that are passed through:
				 opts.duration - duration of each highlight.
				 opts.color - color of highlight.

return:
  (jQuery)
*/
jQuery.fn.Highlighter = function(opts) {

	opts = opts || {};
	opts.duration = opts.duration || 900;
	opts.color = opts.color || "#FF9";
	opts.mode = opts.mode || "show";

	return this.each(function() {
			var $this = $(this);

			var doHighlight = function() {
				$this.effect("highlight", {
					color: opts.color,
					mode: opts.mode
				}, opts.duration);
			};

			doHighlight();

	});
};
(function($, document) {
 /*
	* @class Makes nice bubbles that will pop in over an element (replaces DiscreteBalloon).
	* @param content {String} Content that goes inside the bubble on initialize (can change later with bubble.updateContent).
	*/
	Meetup.Bubble = function(content) {

		var bubbleContent,
				bubble = null,
				bubbleId = null,
				elm = null,
				showing = false,
				isAnimating = false,
				position = null,
				zIndex = 2000;
				animSize = 40;

		var createBubble = function(content) {

			if (bubbleId === null) { bubbleId = "bubble_" + (new Date()).getTime(); }
			return $('<div id="' + bubbleId + '" class="J_discreteBalloon" style="z-index:' + zIndex + '!important;position:absolute;"><table class="dbTable"><tbody class="dbBody"><tr class="top"><td class="left">&nbsp;</td><td class="center">&nbsp;</td><td class="right">&nbsp;</td></tr><tr class="body"><td class="left">&nbsp;</td><td class="center content"><div class="content">'+content+'</div></td><td class="right">&nbsp;</td></tr><tr class="bot"><td class="left">&nbsp;</td><td class="center"><div style="width: 21px; height: 21px; margin: 0pt auto; background-color: transparent; background-position: 0pt 50%; background-repeat: no-repeat; background-attachment: scroll; background-image: url(http://img1.dev.meetupstatic.com/img/discrete/balloon/tip.png);"></div></td><td class="right">&nbsp;</td></tr></tbody></table></div>');

		};

		var updateContent = function(content) {
				var $content = $("td.content", $get(bubbleId));
				bubbleContent = content;
				$content.empty();
				$content.html(content);
				if (showing) {
					show();
				}
		};

		var show = function(hover) {

			if (isAnimating) { return; }
			bubble = createBubble(bubbleContent);
			$(document.body).append(bubble);
			elm = hover;
			bubble.css({opacity:0});

			var $statsWrap = bubble.find('.topic-stats-wrap');
			if( $statsWrap.length > 0 ) {
				var statWidths = [];

				$statsWrap.each(function() {
					var statWidth = 0;
					$(this).find('div').each(function() {
						statWidth += $(this).innerWidth() + 1;
					});
					statWidths.push(statWidth);
				});

				statWidths.sort(function(a, b) {
					return b - a;
				});

				$statsWrap.css('width', statWidths.shift());
			}

			bubble.show();
			showing = true;

			if (!position && typeof(hover.top) === "undefined") {
				bubble.position({
					of: elm,
					my: "center bottom",
					at: "center top",
					offset: "0 -" +animSize
				});
			} else if (!hover && position) {
				position.left = (position.left - (bubble.width() / 2));
				position.top = position.top - bubble.height();
				bubble.css({left: position.left, top:position.top});
			} else {
				try {
					hover.left = (hover.left - (bubble.width() / 2));
					hover.top = hover.top - bubble.height();
					bubble.css({left: hover.left, top:hover.top});
				} catch (e) {}
			}

			isAnimating = true;
			bubble.animate({top : parseInt(bubble.offset().top) + animSize, opacity: 1}, 500, function() {
					isAnimating = false;
			});

		};

		var hide = function() {
			bubble.animate({top : bubble.offset().top - animSize, opacity: 0}, 500, function() {
				bubble.hide();
				bubble.remove();
				showing = false;
			});
		};

		var setzIndex = function(i) {

			if (!bubble) {
				zIndex = i;
			} else {
				bubble.css({"z-index" : i});
			}

		};

		var isShowing = function() { return showing; };

		var getBubble = function() { return bubble; };

		var setPosition = function(pos) {
			position = pos;
		};

		bubbleContent = content;

		return {
			show : show,
			hide : hide,
			bubble : getBubble,
			zIndex : setzIndex,
			isShowing : isShowing,
			position : setPosition,
			updateContent : updateContent
		};

	};
})(jQuery, document);
(function ($) {

/**
 * wrapper fuctions and variable roots for topics related apis
 * @class
 * @author Takashi Mizohata takashi@meetup.com
 * @description  Created 2011-09-19
 */
Meetup.Topic = {};

/**
 * Array of topic ids that is set to the group you're looking at.
 * @field
 * @property {Array}
 */
Meetup.Topic.chapter = [];

/**
 * Array of topic ids that you are subscribing.
 * @field
 */
Meetup.Topic.subscribed = [];

/**
 * String. this value is used to count api calls. Whenever you call this api, you should change it by page.
 * @field
 */
Meetup.Topic.source = 'topic_picker_api';

/**
 * addAlertTopic
 * @function
 * @param {string | number} topicid
 * @param {function} callback
 */
Meetup.Topic.addAlertTopic = function (topicid, callback) {
	if (Member.id === 0) {
		return false;
	}
	if (!topicid) {
		throw new Error('Meetup.Topic.addAlertTopic() requires topicid');
	}
	Meetup.Topic.subscribed[Meetup.Topic.subscribed.length] = topicid;
	var data = {
		method : 'addAlertTopic',
		arg_topicId : topicid,
		arg_memberId : Member.id,
		arg_source : Meetup.Topic.source
	};
	var ajax = {
		type: 'POST',
		url: Meetup.URL.api,
		data: data
	};
	if (callback && typeof callback === 'function') {
		ajax.success = callback;
	}
	$.ajax(ajax);
};

/**
 * getRecommendedTopics
 * @function
 * @param {function} callback
 * @param {Array} ref_topics Reference topics
 */
Meetup.Topic.getRecommendedTopics = function (callback, ref_topics) {
	if (!callback || typeof callback !== 'function') {
		throw new Error('Meetup.Topic.getRecommendedTopics() requires callback');
	}
	if (parseInt(Member.id, 10) === 0) {
		return false;
	}
	var topics;
	if (!!ref_topics) {
		if(typeof ref_topics !== 'object' && !(ref_topics instanceof Array)) {
			throw new Error('Meetup.Topic.getRecommendedTopics() ref_topics needs to be an Array');
		}
		topics = ref_topics.join(',');
	} else {
		topics = Meetup.Topic.chapter.join(',');
	}

	var data = {
		method: 'getRecommendedTopics',
		arg_memberId: Member.id,
		arg_topics: topics,
		arg_language: Meetup.Language,
		arg_filterMemberAlerts: 'true'
	};
	jQuery.ajax(
		{
			url: Meetup.URL.api,
			data: data,
			success: callback
		}
	);
};

/**
 * getAlsoInTopics
 * @function
 * @param {function} successCallback
 * @param {function} failCallback
 * @param {function} alwaysCallback
 */
Meetup.Topic.getAlsoInTopics = function ( successCallback, failCallback, alwaysCallback) {
	if (!successCallback || typeof successCallback !== 'function') {
		LOG.error('Meetup.Topic.getAlsoInTopics() requires a success callback');
	}
	if (Member.id === 0) {
		return false;
	}
	if (Chapter.id === 0) {
		return false;
	}

	var data = {
		method: 'getAlsoInTopicsForPicker',
		arg_memberId: Member.id,
		arg_chapterId: Chapter.id,
		arg_language: Meetup.Language
	};

	jQuery.ajax(
		{
			url: Meetup.URL.api,
			data: data,
			success: successCallback || $.noop,
			fail: failCallback || $.noop,
			complete: alwaysCallback || $.noop
		}
	);
};

/**
 * this function postulates that each element of Meetup.Topic.subscribed
 * is always unique.
 * @function
 * @param {number} topicid topicid that will be removed from Meetup.Topic.subscribed
 */
var removeIdFromSubscribed = function (topicid) {
	var index = $.inArray(topicid, Meetup.Topic.subscribed);
	if (index > -1) {
		Meetup.Topic.subscribed.splice(index, 1);
	}
};

/**
 * removeAlertTopic
 * @function
 * @param {string | number} topicid
 * @param {function} callback
 */
Meetup.Topic.removeAlertTopic = function (topicid, callback) {
	if (Member.id === 0) {
		return false;
	}
	if (!topicid) {
		throw new Error('Meetup.Topic.removeAlertTopic requires topicid');
	}
	removeIdFromSubscribed(topicid);
	var data = {
		method : 'removeAlertTopic',
		arg_topicId : topicid,
		arg_memberId : Member.id
	};
	var ajax = {
		type: 'POST',
		url: Meetup.URL.api,
		data: data
	};
	if (callback && typeof callback === 'function') {
		ajax.success = callback;
	}
	$.ajax(ajax);
};

/**
 * addChapterIgnore
 * @function
 * @param {string | number} chapterid
 * @param {function} callback
 */
Meetup.Topic.addChapterIgnore = function (chapterid, callback) {
	if (Member.id === 0) {
		return false;
	}
	if (!chapterid) {
		throw new Error('Meetup.Topic.addChapterIgnore requires chapterid.');
	}
	var data = {
		method : 'addChapterIgnore',
		arg_chapterId : chapterid,
		arg_memberId : Member.id
	};
	var ajax = {
		type: 'POST',
		url: Meetup.URL.api,
		data: data
	};
	if (callback && typeof callback === 'function') {
		ajax.success = callback;
	}
	$.ajax(ajax);
};

})(jQuery);
if (typeof Object.create !== 'function') {
	Object.create = function(o) {
		function F() {}
		F.prototype = o;
		return new F();
	};
}

(function($){
$.plugin = function(name, object) {
	$.fn[name] = function(options) {
		var args = Array.prototype.slice.call(arguments, 1);
		return this.each(function() {
			var instance = $.data(this, name);
			if (instance) {
				instance[options].apply(instance, args);
			} else {
				instance = $.data(this, name, Object.create(object).init(options, this));
			}
		});
	};
};
})(jQuery);
/* Meetup.Cache {{{ */
Meetup.Cache = {};
(function(){
	var buckets = {};
	var defaultKey = "_";

	var self = Meetup.Cache;

	self.get = function(bucket, key){
		return self.has(bucket, key) ? _getBucket(bucket)[key] : null;
	};

	self.update = function(bucket, obj){
		update(_getBucket(bucket), obj);
		return obj;
	};

	self.bustCache = function( bucket ) {
		buckets[bucket] = {};
	};

	self.has = function(bucket, key){
		LOG.info("Meetup.Cache ... key: '"+key+"' "+ ( (bucket in buckets && key in buckets[bucket]) ? "hit" : "miss" ) );
		return (bucket in buckets && key in buckets[bucket]) ? true : false;
	};

	self.put = function(bucket, key, obj){
		var _bucket = _getBucket(bucket||defaultKey);
		LOG.info("stored in Meetup.Cache .... bucket: " + (bucket||defaultKey) + "key: " + key );
		_bucket[key] = obj;
		return(obj);
	};

	self.bindToBucket = function(bucket){
		return {
			"get":function(key) { return self.get(bucket, key) },
			"has":function(key) { return self.has(bucket, key) },
			"put":function(key, obj) { return self.put(bucket, key, obj) },
			"update":function(obj) { return self.update(bucket, obj) }
		}
	}

	var _getBucket = function(bucketKey){
		return (buckets[bucketKey]) || _newBucket(bucketKey);
	};
	var _newBucket = function(bucketKey){
		var _bucket = buckets[bucketKey] = {};
		return _bucket;
	};
	self.__repr__ = function(){
		return "Meetup.Cache"
	}
})();
/* }}} */
/* For including trn (translations) in JS files. */
if( typeof( Meetup.Copy ) != "object" )
	Meetup.Copy = { };

Meetup.i18N = (function(){
	/* Establish local formats */
	var locales = [];
	locales["en_US"] = {
		dateStyle: {shortDate: "m/d/y",mediumDate: "M D, Y",longDate: "M D, Y",fullDate: "E, M D, Y",noYearDate:"M D"},
		timeStyle: {shortTime: "h:mm T",mediumTime: "h:mm:ss T"},
		commaStr: ",",
		decimalStr: ".",
		monthNames: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
		monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
		dayNames: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]
	};
	locales["it"] = {
		dateStyle: {shortDate: "d/m/y",mediumDate: "D-M-Y",longDate: "D M Y",fullDate: "E D M Y",noYearDate:"D M"},
		timeStyle: {shortTime: "H.mm",mediumTime: "H.mm.ss"},
		commaStr: ".",
		decimalStr: ",",
		monthNames: ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'],
		monthNamesShort: ['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'],
		dayNames: ['Domenica','Luned&#236','Marted&#236','Mercoled&#236','Gioved&#236','Venerd&#236','Sabato']
	};
	locales["de"] = {
		dateStyle: {shortDate: "d.m.y",mediumDate: "d.m.Y",longDate: "D. M Y",fullDate: "E, D. M Y",noYearDate:"D. M"},
		timeStyle: {shortTime: "HH:mm",mediumTime: "HH:mm:ss"},
		commaStr: ".",
		decimalStr: ",",
		monthNames: ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
		monthNamesShort: ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'],
		dayNames: ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag']
	};
	locales["es"] = {
		dateStyle: {shortDate: "D/m/y",mediumDate: "d-M-Y",longDate: "D #de# M #de# Y",fullDate: "E D #de# M #de# Y",noYearDate:"D #de# M"},
		timeStyle: {shortTime: "H:mm",mediumTime: "H:mm:ss"},
		commaStr: ".",
		decimalStr: ",",
		monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
		monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
		dayNames: ['Domingo','Lunes','Martes','Mi&eacute;rcoles','Jueves','Viernes','S&aacute;bado']
	};
	locales["fr"] = {
		dateStyle: {shortDate: "d/m/y",mediumDate: "D M Y",longDate: "D M Y",fullDate: "E D M Y",noYearDate:"D M"},
		timeStyle: {shortTime: "HH:mm",mediumTime: "HH:mm:ss"},
		commaStr: ".",
		decimalStr: ",",
		monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
		monthNamesShort: ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'],
		dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi']
	};
	locales["pt"] = {
		dateStyle: {shortDate: "d-m-Y",mediumDate: "D/M/Y",longDate: "D #de# M #de# Y",fullDate: "E, D #de# M #de# Y",noYearDate:"D #de# M"},
		timeStyle: {shortTime: "H:mm",mediumTime: "H:mm:ss"},
		commaStr: ".",
		decimalStr: ",",
		monthNames: ['Janeiro','Fevereiro','Mar&ccedil;o','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
		monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
		dayNames: ['Domingo','Segunda-feira','Ter&ccedil;a-feira','Quarta-feira','Quinta-feira','Sexta-feira','S&aacute;bado']
	};

	var jqDateFormat = {
		"en_US" : {shortDate: "m/d/y",mediumDate: "mm dd, yy",longDate: "mm dd, yy",noYearDate:"mm dd"},
		"it" : {shortDate: "dd/mm/y",mediumDate: "dd-mm-yy",longDate: "dd mm yy",noYearDate:"dd mm"},
		"de" : {shortDate: "dd.mm.y",mediumDate: "d.m.yy",longDate: "dd. mm yy",noYearDate:"dd. mm"},
		"es" : {shortDate: "d/mm/y",mediumDate: "d-mm-yy",longDate: "dd mm yy",noYearDate:"dd mm"},
		"fr" : {shortDate: "dd/mm/y",mediumDate: "dd mm yy",longDate: "dd mm yy",noYearDate:"dd mm"},
		"pt" : {shortDate: "dd-mm-yy",mediumDate: "dd/mm/yy",longDate: "dd mm yy",noYearDate:"dd mm"}
	};

	var pad = function (num){ return (num < 10) ? '0' + num : num; };

	return {
		jqDateFormat : jqDateFormat,
		convertCurrency : function(number){
			var amount = parseFloat(number).toFixed(2);
			var isFloat = new RegExp('(-?[0-9]+)(\.)([0-9]{2})');
			var sRegExp = new RegExp('(-?[0-9]+)([0-9]{3})');
			var dollars = amount.replace(isFloat,'$1');
			var decimals = amount.replace(isFloat,'$3');
			while(sRegExp.test(dollars)){
				var commaStr = locales[Meetup.Language].commaStr;
				dollars = dollars.replace(sRegExp, '$1'+commaStr+'$2');
			}
			var decimalStr =locales[Meetup.Language].decimalStr;
			return dollars + decimalStr + decimals;
		},
		formatNumber : function(number){
			var decimalStr =locales[Meetup.Language].decimalStr;
			var commaStr = locales[Meetup.Language].commaStr;
			nStr = number.toString();
			x = nStr.split('.');
			x1 = x[0];
			x2 = x.length > 1 ? decimalStr + x[1] : '';
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + commaStr + '$2');
			}
			return x1 + x2;
		},
		toFloat : function(number){
			var commaStr = locales[Meetup.Language].commaStr;
			return number.replace(commaStr,"");
		},
		parseFloat : function(number) {
			var decimalStr = locales[Meetup.Language].decimalStr;
			number = this.toFloat(number);
			number = number.replace( /^s+|\s+$/g, "" );
			if ( number.match( /^-?\d*\.?\d*$/ ) )
				return parseFloat( number );
			else if ( number.match( /^-?\d*,?\d*$/ ) ) {
				number = number.replace( decimalStr, "." );
				return parseFloat( number );
			}

			return 0;
		},
		formatDate: function(date,style,monthStyle){
			var dateStyle = style + "Date";
			var dateFormat = locales[Meetup.Language].dateStyle[dateStyle];
			var formated = "";
			var monthLength = monthStyle || style;

			for(var j = 0; j < dateFormat.length; j++){
				switch(dateFormat.charAt(j)){
					case '#':
						j++;
						while(dateFormat.charAt(j) != "#"){
							formated += dateFormat.charAt(j);
							j++;
						}
						break;
					case 'd':
						formated += pad(date.getDate());
						break;
					case 'D':
						formated += date.getDate();
						break;
					case 'm':
						formated += pad(date.getMonth()+1);
						break;
					case 'M':
						formated += this.getMonthName(date.getMonth(),monthLength);
						break;
					case 'y':
						formated += pad(date.getYear() % 100);
						break;
					case 'Y':
						formated += date.getFullYear();
						break;
					case 'E':
						formated += this.getDayName(date.getDay());
						break;
					default:
						formated += dateFormat.charAt(j);
				}
			}

			return formated;
		},

		formatTime: function(date,style){
			var timeStyle = style + "Time",
				timeFormat = locales[Meetup.Language].timeStyle[timeStyle],
				formated = "",
				s = null,
				l = timeFormat.length;

			for(var j = 0; j < l; j++){
				s = timeFormat.charAt(j);
				if(s === timeFormat.charAt(j+1)){
					s += timeFormat.charAt(j+1);
					j++;
				}

				switch(s){
					case 'H':
						formated += date.getHours();
						break;
					case 'HH':
						formated += pad(date.getHours());
						break;
					case 'h':
						formated += (date.getHours() % 12  || 12);
						break;
					case 'hh':
						formated += pad((date.getHours() % 12 || 12));
						break;
					case 'm':
						formated += date.getMinutes();
						break;
					case 'mm':
						formated += pad(date.getMinutes());
						break;
					case 's':
						formated += date.getSeconds();
						break;
					case 'ss':
						formated += pad(date.getSeconds());
						break;
					case 'T':
						formated += date.getHours() > 11 ? 'PM' : 'AM';
						break;
					default:
						formated += timeFormat.charAt(j);
				}
			}

			return formated;
		},

		convertDateShort : function(month,day,year){
			var dateString = null;
			if ( Meetup.Language == "en_US" ){
				dateString = month + " " + day + ", " + year;
			}else{
				dateString = day + "-" + month + "-" + year;
			}
			return dateString;
		},
		getMonthNames: function(style){
			return (style == "full" || style == "long" ? locales[Meetup.Language].monthNames : style == "short" || style == "medium" ? locales[Meetup.Language].monthNamesShort : null);
		},
		getMonthName: function(month, style){
			return (style == "full" || style == "long" ? locales[Meetup.Language].monthNames[month] : style == "short" || style == "medium" ? locales[Meetup.Language].monthNamesShort[month] : null);
		},
		getDayName: function(day){
			return locales[Meetup.Language].dayNames[day];
		}
	}
})();
(function ($) {

    /**
     * enables elements
     */
    $.fn.enable = function() {
        $(this).each(function(i, el) {
            $(el).removeClass('disabled').
                prop('disabled', false);
        });
    };

    /**
     * disables elements
     */
    $.fn.disable = function() {
        $(this).each(function(i, el) {
            $(el).addClass('disabled').
                prop('disabled', true);
        });
    };

})(jQuery);
/*
 * jQuery Tooltip plugin 1.3
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-tooltip/
 * http://docs.jquery.com/Plugins/Tooltip
 *
 * Copyright (c) 2006 - 2008 Jörn Zaefferer
 *
 * $Id: jquery.tooltip.js 5741 2008-06-21 15:22:16Z joern.zaefferer $
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function($) {

	var helper = {},
		current,
		title,
		tID,
		IE = $.browser.msie && /MSIE\s(5\.5|6\.)/.test(navigator.userAgent),
		track = false;

	$.tooltip = {
		blocked: false,
		defaults: {
			delay: 200,
			fade: false,
			showURL: true,
			extraClass: "",
			top: 15,
			left: 15,
			id: "jquery-tooltip"
		},
		block: function() {
			$.tooltip.blocked = !$.tooltip.blocked;
		}
	};

	$.fn.extend({
		tooltip: function(settings) {
			settings = $.extend({}, $.tooltip.defaults, settings);
			createHelper(settings);
			return this.each(function() {
					$.data(this, "tooltip", settings);
					this.tOpacity = helper.parent.css("opacity");
					this.tooltipText = this.title;
					$(this).removeAttr("title");
					this.alt = "";
				})
				.mouseover(save)
				.mouseout(hide)
				.click(hide);
		},
		fixPNG: IE ? function() {
			return this.each(function () {
				var image = $(this).css('backgroundImage');
				if (image.match(/^url\(["']?(.*\.png)["']?\)$/i)) {
					image = RegExp.$1;
					$(this).css({
						'backgroundImage': 'none',
						'filter': "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='" + image + "')"
					}).each(function () {
						var position = $(this).css('position');
						if (position != 'absolute' && position != 'relative')
							$(this).css('position', 'relative');
					});
				}
			});
		} : function() { return this; },
		unfixPNG: IE ? function() {
			return this.each(function () {
				$(this).css({'filter': '', backgroundImage: ''});
			});
		} : function() { return this; },
		hideWhenEmpty: function() {
			return this.each(function() {
				$(this)[ $(this).html() ? "show" : "hide" ]();
			});
		},
		url: function() {
			return this.attr('href') || this.attr('src');
		}
	});

	function createHelper(settings) {
		if( helper.parent )
			return;
		helper.parent = $('<div id="' + settings.id + '"><h3></h3><div class="body"></div><div class="url"></div></div>')
			.appendTo(document.body)
			.hide();

		if ( $.fn.bgiframe )
			helper.parent.bgiframe();

		helper.title = $('h3', helper.parent);
		helper.body = $('div.body', helper.parent);
		helper.url = $('div.url', helper.parent);
	}

	function settings(element) {
		return $.data(element, "tooltip");
	}

	function handle(event) {
		if( settings(this).delay )
			tID = setTimeout(show, settings(this).delay);
		else
			show();

		track = !!settings(this).track;
		$(document.body).bind('mousemove', update);

		update(event);
	}

	function save() {
		if ( $.tooltip.blocked || this == current || (!this.tooltipText && !settings(this).bodyHandler) )
			return;

		current = this;
		title = this.tooltipText;

		if ( settings(this).bodyHandler ) {
			helper.title.hide();
			var bodyContent = settings(this).bodyHandler.call(this);
			if (bodyContent.nodeType || bodyContent.jquery) {
				helper.body.empty().append(bodyContent)
			} else {
				helper.body.html( bodyContent );
			}
			helper.body.show();
		} else if ( settings(this).showBody ) {
			var parts = title.split(settings(this).showBody);
			helper.title.html(parts.shift()).show();
			helper.body.empty();
			for(var i = 0, part; (part = parts[i]); i++) {
				if(i > 0)
					helper.body.append("<br/>");
				helper.body.append(part);
			}
			helper.body.hideWhenEmpty();
		} else {
			helper.title.html(title).show();
			helper.body.hide();
		}

		if( settings(this).showURL && $(this).url() )
			helper.url.html( $(this).url().replace('http://', '') ).show();
		else
			helper.url.hide();

		helper.parent.addClass(settings(this).extraClass);

		if (settings(this).fixPNG )
			helper.parent.fixPNG();

		handle.apply(this, arguments);
	}

	function show() {
		tID = null;
		if ((!IE || !$.fn.bgiframe) && settings(current).fade) {
			if (helper.parent.is(":animated"))
				helper.parent.stop().show().fadeTo(settings(current).fade, current.tOpacity);
			else
				helper.parent.is(':visible') ? helper.parent.fadeTo(settings(current).fade, current.tOpacity) : helper.parent.fadeIn(settings(current).fade);
		} else {
			helper.parent.show();
		}
		update();
	}

	/**
	 * callback for mousemove
	 * updates the helper position
	 * removes itself when no current element
	 */
	function update(event)	{
		if($.tooltip.blocked)
			return;

		if (event && event.target.tagName == "OPTION") {
			return;
		}

		if ( !track && helper.parent.is(":visible")) {
			$(document.body).unbind('mousemove', update)
		}

		if( current == null ) {
			$(document.body).unbind('mousemove', update);
			return;
		}

		helper.parent.removeClass("viewport-right").removeClass("viewport-bottom");

		var left = helper.parent[0].offsetLeft;
		var top = helper.parent[0].offsetTop;
		if (event) {
			left = event.pageX + settings(current).left;
			top = event.pageY + settings(current).top;
			var right='auto';
			if (settings(current).positionLeft) {
				right = $(window).width() - left;
				left = 'auto';
			}
			helper.parent.css({
				left: left,
				right: right,
				top: top
			});
		}

		var v = viewport(),
			h = helper.parent[0];
		if (v.x + v.cx < h.offsetLeft + h.offsetWidth) {
			left -= h.offsetWidth + 20 + settings(current).left;
			helper.parent.css({left: left + 'px'}).addClass("viewport-right");
		}
		if (v.y + v.cy < h.offsetTop + h.offsetHeight) {
			top -= h.offsetHeight + 20 + settings(current).top;
			helper.parent.css({top: top + 'px'}).addClass("viewport-bottom");
		}
	}

	function viewport() {
		return {
			x: $(window).scrollLeft(),
			y: $(window).scrollTop(),
			cx: $(window).width(),
			cy: $(window).height()
		};
	}

	function hide(event) {
		if($.tooltip.blocked)
			return;
		if(tID)
			clearTimeout(tID);
		current = null;

		var tsettings = settings(this);
		function complete() {
			helper.parent.removeClass( tsettings.extraClass ).hide().css("opacity", "");
		}
		if ((!IE || !$.fn.bgiframe) && tsettings.fade) {
			if (helper.parent.is(':animated'))
				helper.parent.stop().fadeTo(tsettings.fade, 0, complete);
			else
				helper.parent.stop().fadeOut(tsettings.fade, complete);
		} else
			complete();

		if( settings(this).fixPNG )
			helper.parent.unfixPNG();
	}

})(jQuery);
/**
 * insert &shy; (or equivalent) to the target element smartly, so
 * browser will handle the word wrap more naturally.
 * one note: the applied elements must NOT have child elements.
 * it must only contain text node.
 *
 * example:
 *
 * <div class="mylongword">supercalifragilisticexpialidocious</div>
 * <script>
 * $('.mylongword').shyize({limit: 10});
 * </script>
 *
 * // => <div class="mylongword">supercalif&shy;ragilistic&shy;expialidoci&shy;ous</div>
 */

(function ($) {

var shyize = function (str, limit) {
	var arr = str.split(' ');
	for (var i = 0, len = arr.length; i < len; ++i) {
		if (arr[i].length > limit) {
			arr[i] = insertShy(arr[i], limit);
		}
	}
	return arr.join(' ');
};

var insertShy = function (str, limit) {
	var arr = [];
	do {
		arr[arr.length] = str.slice(0, limit);
		str = str.slice(limit);
	}
	while (str.length > limit)
	arr[arr.length] = str;
	if ($.browser.msie && document.documentMode >= 8) {
		return arr.join('&#8203;');
	}
	else {
		return arr.join('&shy;');
	}
};

/**
 * jquery plugin: shyize
 * @param opt {Object} `limit` attribute is required.
 */
$.fn.shyize = function (opt) {
	if (this.length === 0) {
		LOG.info('wrong selector');
		return;
	}
	if (!opt) {
		LOG.info('need to pass {limit: xx} as option.');
		return;
	}
	var limit = parseInt(opt.limit, 10);
	if (!limit) {
		LOG.info('wrong limit');
		return;
	}
	this.each(
		function (n, elm) {
			var str, $elm = $(elm);
			if ($elm.find('*').length > 0) {
				LOG.info('$.fn.shyize: you cannot run shyize to the elemnts contains other elements.');
				return;
			}
			str = shyize($elm.html(), limit);
			str = str.replace('<', '&lt;', 'g').replace('>', '&gt;', 'g');
			$elm.html(str);
		}
	);
};

})(jQuery);
/**
	@object callout
	@modified ivy
	@description popup element used in most of our info widgets, has methods for basic show hide and positioning
*/

var callout = {
	defaults: {
		my: 'left top',
		at: 'left top',
		offset: "-259 -27",
		collision: "none",
		side: "left"
	},
	dom: '<div class="infowidget-box jsStartHidden"><div class="tail"><div class="tailInner"></div></div><div class="infowidget-container"></div></div>',
	$elm: null,
	currentSide: null,

	init: function(options, element) {
		var $element = $(element);
		$.extend(this.defaults, options || {});
		LOG.info("callout");
		this.$elm = $(this.dom).appendTo($element);
		return this;
	},
	/**
		function getCallout
		@returns {domEl} the callout dom element
	*/
	getCallout: function() {
		return this.$elm;
	},
	position: function(elm, pos) {
		var opts = pos || this.defaults;
		this.$elm.position({
			of: $(elm),
			my: opts.my,
			at: opts.at,
			offset: opts.offset,
			collision: opts.collision
		});
	},
	/**
		function setPointerSide
		@description sets the callout class to position the pointer
	*/
	setPointerSide: function(side) {
		if (this.currentSide) {
			this.$elm.removeClass(this.currentSide);
		}
		this.$elm.addClass(side);
		this.currentSide = side;
	},

	show: function() {
		this.$elm.removeClass("jsStartHidden");
	},

	hide: function() {
		this.$elm.addClass("jsStartHidden");
	}
};
/* ===========================================================
 * bootstrap-tooltip.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var Tooltip = function (element, options) {
    this.init('tooltip', element, options)
  }

  Tooltip.prototype = {

    constructor: Tooltip

  , init: function (type, element, options) {
      var eventIn
        , eventOut

      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.enabled = true

      if (this.options.trigger != 'manual') {
        eventIn  = this.options.trigger == 'hover' ? 'mouseenter' : 'focus'
        eventOut = this.options.trigger == 'hover' ? 'mouseleave' : 'blur'
        this.$element.on(eventIn, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut, this.options.selector, $.proxy(this.leave, this))
      }

      this.options.selector ?
        (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    }

  , getOptions: function (options) {
      options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data())

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay
        , hide: options.delay
        }
      }

      return options
    }

  , enter: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (!self.options.delay || !self.options.delay.show) return self.show()

      clearTimeout(this.timeout)
      self.hoverState = 'in'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'in') self.show()
      }, self.options.delay.show)
    }

  , leave: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (this.timeout) clearTimeout(this.timeout)
      if (!self.options.delay || !self.options.delay.hide) return self.hide()

      self.hoverState = 'out'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'out') self.hide()
      }, self.options.delay.hide)
    }

  , show: function () {
      var $tip
        , inside
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp

      if (this.hasContent() && this.enabled) {
        $tip = this.tip()
        this.setContent()

        if (this.options.animation) {
          $tip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement

        inside = /in/.test(placement)

        $tip
          .remove()
          .css({ top: 0, left: 0, display: 'block' })
          .appendTo(inside ? this.$element : document.body)

        pos = this.getPosition(inside)

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        switch (inside ? placement.split(' ')[1] : placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
        }

        $tip
          .css(tp)
          .addClass(placement)
          .addClass('in')
      }
    }

  , isHTML: function(text) {
      return typeof text != 'string'
        || ( text.charAt(0) === "<"
          && text.charAt( text.length - 1 ) === ">"
          && text.length >= 3
        ) || /^(?:[^<]*<[\w\W]+>[^>]*$)/.exec(text)
    }

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()

      $tip.find('.tooltip-inner')[this.isHTML(title) ? 'html' : 'text'](title)
      $tip.removeClass('fade in top bottom left right')
    }

  , hide: function () {
      var that = this
        , $tip = this.tip()

      $tip.removeClass('in')

      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          $tip.off($.support.transition.end).remove()
        }, 500)

        $tip.one($.support.transition.end, function () {
          clearTimeout(timeout)
          $tip.remove()
        })
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        removeWithAnimation() :
        $tip.remove()
    }

  , fixTitle: function () {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').removeAttr('title')
      }
    }

  , hasContent: function () {
      return this.getTitle()
    }

  , getPosition: function (inside) {
      return $.extend({}, (inside ? {top: 0, left: 0} : this.$element.offset()), {
        width: this.$element[0].offsetWidth
      , height: this.$element[0].offsetHeight
      })
    }

  , getTitle: function () {
      var title
        , $e = this.$element
        , o = this.options

      title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

      return title
    }

  , tip: function () {
      return this.$tip = this.$tip || $(this.options.template)
    }

  , validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide()
        this.$element = null
        this.options = null
      }
    }

  , enable: function () {
      this.enabled = true
    }

  , disable: function () {
      this.enabled = false
    }

  , toggleEnabled: function () {
      this.enabled = !this.enabled
    }

  , toggle: function () {
      this[this.tip().hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

  $.fn.tooltip = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tooltip')
        , options = typeof option == 'object' && option
      if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip

  $.fn.tooltip.defaults = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover'
  , title: ''
  , delay: 0
  }

}(window.jQuery);
/* ===========================================================
 * bootstrap-popover.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* POPOVER PUBLIC CLASS DEFINITION
  * =============================== */

  var Popover = function ( element, options ) {
    this.init('popover', element, options)
  }


  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

    constructor: Popover

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()

      $tip.find('.popover-title')[this.isHTML(title) ? 'html' : 'text'](title)
      $tip.find('.popover-content > *')[this.isHTML(content) ? 'html' : 'text'](content)

      $tip.removeClass('fade top bottom left right in')
    }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
    }

  , getContent: function () {
      var content
        , $e = this.$element
        , o = this.options

      content = $e.attr('data-content')
        || (typeof o.content == 'function' ? o.content.call($e[0]) :  o.content)

      return content
    }

  , tip: function () {
      if (!this.$tip) {
        this.$tip = $(this.options.template)
      }
      return this.$tip
    }

  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('popover')
        , options = typeof option == 'object' && option
      if (!data) $this.data('popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover

  $.fn.popover.defaults = $.extend({} , $.fn.tooltip.defaults, {
    placement: 'right'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
  })

}(window.jQuery);
/* ===========================================================
 * topicButtons
 * @author <adamd@meetup.com>
 *
 * @description
 * appends some topic buttons to any element, attaches events,
 * tracks topic adding, etc.
 *
 * @usage
 * To write some topic buttons to "#examplePicker" element
 *
 * <div id="examplePicker"></div>
 *
  * // using an api call (RECOMMEDED)
 * Meetup.Topic.getAlsoInTopics(function(data) {
 *     $('#examplePicker').topicButtons({
 *          topics: data,
 *          origin_code: 'exapmle'
 *     });
 * });
 *
 * // explicitly setting topics
 * $('#examplePicker').topicButtons({
 *      topics: [
 *          {name: 'Cats', topicId: '1234'},
 *          {name: 'Dogs', topicId: '1234'},
 *          {name: 'Snakes', topicId: '1234'},
 *          {name: 'Chickens', topicId: '1234'}
 *      ],
 *      origin_code: 'example'
 * });
 * =========================================================== */

!function ($) {

  var PLUGIN_NAME = 'topicButtons',
      SUBSCRIBED_CLASSNAME = 'hasSubscribed',
      BUTTON_TEMPLATE = [
        '<a href="#" class="topic-button prepend-button clearfix" data-topicid="{{topicId}}">',
            '<div class="prepend-button-addon">',
                '<div class="icon"></div>',
                '<div class="measure"></div>',
            '</div>',
            '<div class="prepend-button-label">{{name}}</div>',
        '</a>'
      ].join('');

 /**
  * TopicButtons CLASS DEFINITION
  */
  var TopicButtons = function ( element, options ) {
    this._init(element, options)
  }


 /**
  * TopicButtons PROMPT METHODS
  */
  TopicButtons.prototype = {

    /**
     * @function markSubscribedTopics
     * marks topics that you're already subscribed too
     * @param {array} subscribedTopicIds - an array of topic ids the member is subscribed to
     */
    markSubscribedTopics: function( subscribedTopicIds ) {
        var self = this;
        $.each(subscribedTopicIds, function(i, topicId) {
            self.$element.find('a[data-topicid=' +  topicId + ']').addClass(SUBSCRIBED_CLASSNAME);
        });
    },

    /**
     * @function doTopicAdd
     * makes request to add topic for member
     * @param {jquery DOM} $button - button that was clicked
     */
    doTopicAdd: function( $button ) {
        var id = $button.data('topicid');

        Meetup.Topic.addAlertTopic( id, function() {
            $button.addClass(SUBSCRIBED_CLASSNAME);
        });
    },

    /**
     * @function doTopicRemove
     * makes request to remove topic for member
     * @param {jquery DOM} $button - button that was clicked
     */
    doTopicRemove: function( $button ) {
        var id = $button.data('topicid');

        Meetup.Topic.removeAlertTopic( id, function() {
            $button.removeClass(SUBSCRIBED_CLASSNAME);
        });
    },

    /**
     * @function appendButtons
     * for each topic object passed in "topics" array from options,
     * this creates a DOM snipped and appends it to the element
     * the plugin was applied to
     */
    appendButtons: function () {
        var self = this;

        $.each(this.options.topics, function(i, o) {
            var buttonView = {
                topicId: o.topicId,
                name: o.name
            };
            self.$element.append( $.mustache(BUTTON_TEMPLATE, buttonView) );
        });
    },

    /**
     * @function getOptions
     * looks for 'defaults' property in $.fn.plugin as default options
     * extends with options passed in at plugin invokation
     *
     * @reutnrs {object} plugin options
     */
    getOptions: function (options) {
        return $.extend({}, $.fn[PLUGIN_NAME].defaults, options);
    },

    /**
     * @function _init
     * initializes plugin
     * use the plugin interface; don't call this directly.
     *
     * @param {jquery dom} element
     * @param {object} options
     */
    _init: function(element, options) {
        var self = this;

        this.options = this.getOptions(options);    // plugin options
		this.$element = $(element);                 // element plugin was applied to

        if ( !this.options.topics || !$.isArray(this.options.topics) || this.options.topics.length <= 1 ) {
            return;
        };

        if ( this.options.origin_code ) {
            Meetup.Topic.source = this.options.origin_code;
        };

        this.appendButtons();
        this.markSubscribedTopics( Meetup.Topic.subscribed );

        this.$element.on('click', '.topic-button', function(e) {
            e.preventDefault();
            var $this = $(this);

            if ( $this.hasClass(SUBSCRIBED_CLASSNAME) ) {
                self.doTopicRemove( $this );
            } else {
                self.doTopicAdd( $this );
            };
        });
    }

  };


 /**
  * topicButtons PLUGIN DEFINITION
  */
  $.fn[PLUGIN_NAME] = function (options) {
    return this.each(function () {
      var $this = $(this),
          data = $this.data(PLUGIN_NAME);
      if (!data) $this.data(PLUGIN_NAME, (data = new TopicButtons(this, options)))
    });
  }

  $.fn[PLUGIN_NAME].defaults = {
    topics: [],
    origin_code: null
  };

}(window.jQuery);
/* ===========================================================
 * SEQUENCE PROMPT PLUGIN
 * @author <richard@meetup.com>
 * @author <adamd@meetup.com>
 *
 * @description
 * A dialog prompt with a sequence of steps, with a CSS3 3d
 * transform that gives each advance of steps a rotating box
 * effect.
 *
 * You may build steps from markup, or define them as options
 * in the plugin invocation.
 *
 * Once invoked, you can access any of the properties and
 * methods of the SequencePrompt.prototype by reading the data
 * attribute 'sequenceprompt' on the element you applied the
 * plugin:
 * $('#myprompt').data('sequenceprompt').close();
 *
 * @usage
 *
 * BUILDING PANELS FROM MARKUP:
 * <div id="prompt" class="sequence-prompt">
 *      <div class="prompt-panel doc-box doc-content">
 *          <p>hello world, this is panel one!</p>
 *      </div>
 *      <div class="prompt-panel doc-box doc-content">
 *          <p>second panel!</p>
 *      </div>
 * </div>
 *
 * $('#prompt').sequenceprompt({ autoOpen: true });
 *
 *
 * BUILDING PANELS FROM SCRIPT:
 * <div id="prompt"></div>
 *
 * $('#prompt').sequenceprompt({
 *      panels: { // create prompt panels and store them by key in this object
 *          age: $('<div class="prompt-panel">'),
 *          gender: $.mustache(sometemplate, someview),
 *          picker: $('any kind of jquery DOM')
 *      },
 *      order: [ // queue sets the order of the panels we created above
 *          'picker',
 *          'gender',
 *          'age'
 *      ],
 *      autoOpen: true
 * });
 *
 *
 * OPTIONS: see $.fn[PLUGIN_NAME].defaults
 *
 *
 * EVENTS:
 * (context: container element) "prompt-open" - triggered when propmt opens
 * (context: container element) "prompt-close" - triggered when propmt closes
 * (context: panel) "panel-enter" - triggered on a panel when it enters into view
 * (context: panel) "panel-leave" - triggered on a panel when it leaves view
 *
 *
 * EVENT/METHOD EXAMPLES:
 *
 * // create a sequenceprompt with two panels
 * var myPrompt = $('#prompt').sequenceprompt({
 *      panels: {
 *          foo: $.mustache(sometemplate, someview),
 *          age: $.mustache(agetemplate, ageview)
 *      },
 *      order: [
 *          'foo',
 *          'age'
 *      ],
 *      autoOpen: true
 * });
 *
 * // lazily init a fictional widget when the age panel shows
 * myPrompt.data('sequenceprompt').getPanel('age').bind('panel-enter', function() {
 *      Meetup.ageWidgetHotness.init();
 * });
 *
 * // some arbitrary custom close action
 * $('#customClose').click(function(e) {
 *      e.preventDefault();
 *      myPrompt.data('sequenceprompt').close();
 * });
 *
 * // "next" button
 * $('.nextpanel').click(function(e) {
 *      e.preventDefault();
 *      myPrompt.data('sequenceprompt').advance();
 * });
 *
 * // "previous" button
 * $('.prevpanel').click(function(e) {
 *      e.preventDefault();
 *      myPrompt.data('sequenceprompt').rewind();
 * });
 *
 * // go to specific panel (usefull for error handling)
 * myPrompt.data('sequenceprompt').goToPanel( 2 );
 *
 * =========================================================== */

!function ($) {

  var CONTAINER_CLASS = 'sequence-prompt',
      PROMPT_ACTIVE_CLASS = 'prompt-active',
      PANEL_CLASS = 'prompt-panel',
      PLUGIN_NAME = 'sequenceprompt';

 /**
  * SEQUENCE PROMPT CLASS DEFINITION
  */
  var SequencePrompt = function ( element, options ) {
    this._init(element, options)
  }


 /**
  * SEQUENCE PROMPT METHODS
  */
  SequencePrompt.prototype = {

    /**
     * @function open
     * opens dialog
     */
    open: function () {
        var self = this;

				LOG.info("hayyyy");
        if ( !this.$container || !this.$queue ) {
            return;
        }

				LOG.info("wayyyy");

        this.$container.css({display: 'block'});

        if (this.options.isModal) {
          $('html').css({overflow: 'hidden'});
          this.$container.css({opacity: 1});
        }

        if(!this.isPanelsReady){
            this.preparePanels();
            this.isPanelsReady = true;
        }

        setTimeout(function(){
            self.$container.addClass(PROMPT_ACTIVE_CLASS);
            self.$container.trigger('prompt-open');
            self.goToPanel(0);
        }, 20);
    },

    /**
     * @function close
     * closes dialog
     */
    close: function () {
        var self = this;

        this.$container.removeClass(PROMPT_ACTIVE_CLASS);
        this.$currentPanel.addClass('past');

        setTimeout(function(){
            self.$container.css({display: 'none'});
            if (self.options.isModal) {
              $('html').css({overflow: 'scroll'});
            }
            self.$queue.removeClass('past').addClass('future');
            self.$currentPanel = null;
            self.$container.trigger('prompt-close');
        }, 250);
    },

    /**
     * @function goToPanel
     * moves to given index in the $queue
     * @param {number} index of panel
     */
    goToPanel: function ( nIndex ) {
        var $old, self = this;

        if ( !this.$queue[ nIndex ] ) {
            return; // this panel doesn't exist
        }

        $old = this.$currentPanel;
        this.$currentPanel = $( this.$queue[ nIndex ] );
				this.$currentPanel.css({"display":"block"});
				clearTimeout(this.animationTimeout);


        var isAdvancing = ( !$old || this.$queue.index($old) < nIndex);

        if ($old) {
					$old.addClass( (isAdvancing ? 'past' : 'future') );
				}

				self.$currentPanel.removeClass("notrans");
				self.$currentPanel.one("transitionend webkitTransitionEnd", function() {
					self.$currentPanel.addClass("notrans");
				});
				setTimeout(function() {
					self.$currentPanel.addClass("animate");
					self.$currentPanel.removeClass( (isAdvancing ? 'future' : 'past') );
					self.animationTimeout = setTimeout(function() {
						if ($old && $old !== self.$currentPanel) {
							$old.css({"display":"none"});
						}
					}, 600);

				}, 10);

        if ( this.options.traxProcess ) {
            var hash = this.options.panels,
                panelName;

            if ( hash ) {
                var keyName = null;
                for (var key in hash) {
                    if ( hash[key].attr('id') === this.$currentPanel.attr('id') ) {
                        keyName = key;
                    }
                }
            };
            LOG.info('keyname for tracking panel: ' + keyName);

            panelName = keyName || ('panel_'+nIndex);

            this.doTrax(panelName, nIndex);
        };

        if ( $old ) $old.trigger('panel-leave');
        this.$currentPanel.trigger('panel-enter');

        var self = this;
        setTimeout(function() {
          if (!self.options.isModal) {
            var panelHeight = self.$currentPanel.height();
            if (panelHeight > self.$parent.height()) {
              self.$parent.css("min-height", panelHeight + (self.options.nonmodalMargin * 2));
            }
          }
        },200);


    },

    /**
     * @function advance
     * passes index of next panel in $queue to goToPanel
     */
    advance: function () {
        this.goToPanel( this.$queue.index(this.$currentPanel.next()) );
    },

    /**
     * @function rewind
     * passes index of previous panel in $queue to goToPanel
     */
    rewind: function () {
        if (!this.$currentPanel || this.$queue.index(this.$currentPanel) === 0 ) {
            return; //on the first panel, no place to go
        };
        this.goToPanel( this.$queue.index(this.$currentPanel.prev()) );
    },

    /**
     * @function preparePanels
     * takes every panel in the $queue and styles them
     * to appear off to the right, and with the correct
     * top and left margin to appear centered
     * (each panel can vary in height and width)
     *
     * also adds close button
     */
    preparePanels: function () {
        var self = this;

        this.$queue.each(function(){
            var $this = $(this);
            if (!self.options.isModal) {
              $this.css({'margin-left': -1*$this.outerWidth()/2, 'margin-top':self.options.nonmodalMargin});
            } else {
              $this.css({'margin-left': -1*$this.outerWidth()/2, 'margin-top':-1*$this.outerHeight()/2});
            }
            $this.addClass('future').removeClass('loading');

            setTimeout(function(){
								$this.css({"display":"none"});
            }, 10);
        });
    },

    /**
     * @function doTrax
     * if a traxProcess name is passed in as a plugin option,
     * this updates said process with a new page name and score
     *
     * @param {string} panelName - panel name (as trax page name)
     * @param {string} panelIndex - panel index (as trax score)
     * @param {function} fnCallback (optional) - callback on trax update completion
     */
    doTrax: function( panelName, panelIndex, fnCallback ) {
        if ( !this.options.traxProcess || !panelName || panelIndex === undefined || panelIndex < 0 ) return;

        var score = this.options.traxBaseScore + (panelIndex + 1) * 10;

        Meetup.AjaxTrax.update( this.options.traxProcess, panelName, score, null, null, fnCallback);
    },

    /**
     * @function getPanel
     * if the param is a number, get the panel from the $queue by index
     * if the param is a string, try to get the panel by key from the "panels" hash in options
     *
     * @param {string|number} panelIdentifier - name or index of panel
     */
    getPanel: function( panelIdentifier ) {
       if ( $.isNumeric(panelIdentifier) )   {
           return this.$queue[panelIdentifier];

       } else if ( this.options.panels[panelIdentifier] ) {
           return this.options.panels[panelIdentifier] ;

       } else {
            return false;
       };
    },

    /**
     * @function getOptions
     * looks for 'defaults' property in $.fn.plugin as default options
     * extends with options passed in at plugin invokation
     *
     * @reutnrs {object} plugin options
     */
    getOptions: function (options) {
        return $.extend({}, $.fn[PLUGIN_NAME].defaults, options);
    },

    /**
     * @function getQueue
     * provides a jquery collection of panels (in the order they should appear)
     * checks for 'panels' and 'order' options passed in first
     * if not present, tries to grab panels from markup
     *
     * @returns {array} jquery collection on panels
     */
    getQueue: function() {
        var self = this,
            oPanels = this.options.panels,
            aOrder = this.options.order;

        if ( oPanels && aOrder) { // panels declared in options
            var panelsToAppend = [];

            $.each(aOrder, function(i, panelKey) {
                if ( oPanels[panelKey] ) {
                    oPanels[panelKey].
                        addClass(PANEL_CLASS).
                        detach().
                        appendTo(self.$container);
                } else {
                    return;
                };
            })
        };

        return this.$container.find('.'+PANEL_CLASS);
    },

    /**
     * @function _init
     * initializes plugin
     * use the plugin interface; don't call this directly.
     *
     * @param {jquery dom} element
     * @param {object} options
     */
    _init: function(element, options) {
        var self = this;

        this.options = this.getOptions(options);    // plugin options
        this.$container = $(element);               // parent of panels; the element with which you invoke the plugin
        this.$parent = this.$container.parent();    // parent of the panel container
        this.$queue = this.getQueue();              // array of jquerified dom els; the panels (controls order of panels)
        this.$currentPanel = null;                  // keeps track of current panel showing
        this.isPanelsReady = false;                 // flag to let us know if visual setup is complete - see preparePanels()

        if (this.options.isModal) {
          this.$container.remove();
          $(document.body).append(this.$container);
          this.$container.addClass("isModal");
        }

        this.$container.addClass(CONTAINER_CLASS);

        this.$container.on('click', '.prompt_close', function() { self.close(); });
        if ( this.options.closable ) {
            this.$container.keydown(function(e) {
                if ( e.which === Meetup.Keyboard['ESCAPE'] ) self.close();
            });
        };

        if ( this.options.autoOpen ) {
            self.open();
        };
    }

  };


 /**
  * SEQUENCE PROMPT PLUGIN DEFINITION
  */
  $.fn[PLUGIN_NAME] = function (options) {
    return this.each(function () {
      var $this = $(this),
          data = $this.data(PLUGIN_NAME);
      if (!data) $this.data(PLUGIN_NAME, (data = new SequencePrompt(this, options)))
    })
  }

  $.fn[PLUGIN_NAME].defaults = {
      autoOpen: false,    // {boolean} if true, prompt opens on plugin invocation
      closable: true,     // {boolean} if false, no close button appears
      isModal: true,      // {boolean} if true, treat this as a modal dialog.
      nonmodalMargin: 30, // {integer} margin for non-modal director.
      panels: null,       // {object} { panel_name: jQueryDomFragment }
      order: null,        // {array} [ 'key_from_panels_objet', 'key_from_panels_object' ]
      traxProcess: null,   // {string} trax process to update on panel advance
      traxBaseScore: 0    // {integer} trax score to increment from
  };

}(window.jQuery);
(function($) {
  $.fn.formError = function(options) {
      return this.each(function() {
        var $elm = $(this);
        var err = $elm.data("err").split(",");
        var $win = $(window);
        var $parent = $elm.parent();

        for (var i=0,len=err.length;i<len;i++) {
          var code = err[i];
          var e = Meetup.Errors[code];
          $win.bind(code, function() {

            if (typeof e.callback !== "undefined") {
              e.callback($elm, e.msg);
              return;
            }

            $parent.find("p.error").remove();
            $elm.addClass("error");
            var $err = $('<p class="italic error" style="display:none">'+e.msg+'</p>')
            $parent.append($err);
            $err.fadeIn();
          });
        }
        $elm.bind("clear", function() {
          $elm.removeClass("error");
          $parent.find("p.error").remove();
        });
      });

  };

})(jQuery);

/**
 *	trax via Ajax
 *	@author takashi, adrian
 *
 *	@class
 */
Meetup.AjaxTrax = (function ($) {

	var argErrorCheck = function (caller, process, variant, page, score, session) {
		if (!process) {
			throw Error(caller + ': Need process name');
		}
		if (!page) {
			throw Error(caller + ': Need page name');
		}
		if (!score && score !== 0) {
			throw Error(caller + ': Need score');
		}
		if ( caller === 'start' && !variant) {
			throw Error(caller + ': Need variant for start');
		}
	};

	/**
	 * make a call to remoteApi 'storeStart'  method to confirm the start of the trax test.
	 * Update the trax cookie.
	 * This is VERY similar to the js code used in Trax.java
	 *
	 * @function
	 * @param {string} processName (required)
	 * @param {string} variantNAme (required)
	 * @param {string} pageName (required)
	 * @param {function} callback (optional)
	 */
	var confirmAjaxStart = function( processName, variantName, pageName, callbackFn){
		var cookie = getCookie( 'trax_' + processName);
		var val = cookie;
		var exp = new Date();
		exp.setSeconds(exp.getSeconds() + 14400);
		var dom = document.domain.indexOf('.dev.meetup.com') > -1 ? '.dev.meetup.com' : document.domain;
		document.cookie = 'trax_' + processName + '=' + val + ';expires=' + exp.toGMTString() + '; path=/; domain=' + dom;
		return Meetup.RemoteApi.get({
			url: Meetup.Http.rpcURL('storeStart'),
			data: {
				arg_uuid: (cookie) ? parseQueryString(cookie)['uuid'] : '',
				arg_process: processName,
				arg_session: '',
				arg_page: pageName,
				arg_score: '0',
				arg_variant: variantName,
				arg_memberId: Member.id,
				arg_chapterId: Chapter.id
			},
			success: callbackFn || $.noop
		});
	};

	var doTrax = function (method, data) {
		if (typeof(Meetup.Data.path_ajaxtrax) === 'undefined') {
			throw new Error('You have to set a path.');
		}
		var param = {
			'url': Meetup.Data.path_ajaxtrax + method + '/',
			'cache': false,
			'data': data
		};
		return $.ajax(param);
	};

	return {

		/**
		 *	Format the Ajax Trax Key
		 *	Regular Trax Key formatter is getTraxKey() in global context
		 *
		 *	@function
		 *	@param {string} process - trax process name
		 */
		getAjaxTraxKey : function(process){
			return 'ajax_' + getTraxKey(process);
		},

		/**
		 *	Start a trax test. Requires a variant
		 *	(we get that from mfn:traxVariants).
		 *	back end will return JS that we execute in onSuccess
		 *
		 *	@function
		 *	@param {string} process - name of the trax process
		 *	@param {string} variant - the variant for this user
		 *		mfn:traxVariants in the jsp will generate a variant, then we have to
		 *		retrieve it with web.values[mfn:traxKey('process_name')]
		 *		and pass it into this function
		 *	@param {string} page - name of the first high page
		 *	@param {integer} score - score for the first high page, usually 0
		 *	@param session (optional) not sure what this ever was
		 *	@param {function} callback  (optional)
		 */
		start : function (process, variant, page, score, session, callback) {
			argErrorCheck('start', process, variant, page, score, session);
			var data = {
				'process': process,
				'page': page,
				'session': session || ''
			};

			data[ this.getAjaxTraxKey(process) ] = variant;

			if (score || score === 0) {
				data.score = score;
			}
			doTrax('start', data)
				.done( function(){
					confirmAjaxStart(process, variant, page, callback );
				});
		},

		/**
		 *	Update a trax session.
		 *
		 *	@function
		 *	@param {string} process - the trax process name
		 *	@param {string} page - the new high page
		 *	@param {integer} score - score for this page
		 *	@param {?} lifetime (optional) - not sure what this is
		 *	@param {?} session (optional) - not sure what this is
		 *	@param {function} callback
		 */
		update : function (process, page, score, lifetime, session, callback) {
			argErrorCheck('update', process, null, page, score, session);
			var data = {
				'process': process,
				'page': page,
				'session': session || '',
				'urlname': Chapter.urlname || null
			};

			if (score || score === 0) {
				data.score = score;
			}

			if (lifetime || lifetime === 0) {
				data.lifetime = lifetime;
			} else {
				data.lifetime = 4*60*60; // 4 hours
			}

			doTrax('update', data)
				.done( callback );
		},

		/**
		 *	Get the variant of a trax process.
		 *
		 *	@function
		 *	@param {string} process - the trax process name
		 *	@return {string} - the trax variant
		 *
		 */
		variant : function(process) {
			var cookie = getCookie(getTraxKey(process)) || "";
			return parseQueryString(cookie).v;
		}
	};
})(jQuery);
!function(window, document, undefined) {

  /**
   * Copyright (c) 2011 Felix Gnass [fgnass at neteye dot de]
   * Licensed under the MIT license
   */

  var prefixes = ['webkit', 'Moz', 'ms', 'O'] /* Vendor prefixes */
    , animations = {} /* Animation rules keyed by their name */
    , useCssAnimations

  /**
   * Utility function to create elements. If no tag name is given,
   * a DIV is created. Optionally properties can be passed.
   */
  function createEl(tag, prop) {
    var el = document.createElement(tag || 'div')
      , n

    for(n in prop) el[n] = prop[n]
    return el
  }

  /**
   * Appends children and returns the parent.
   */
  function ins(parent /* child1, child2, ...*/) {
    for (var i=1, n=arguments.length; i<n; i++)
      parent.appendChild(arguments[i])

    return parent
  }

  /**
   * Insert a new stylesheet to hold the @keyframe or VML rules.
   */
  var sheet = function() {
    var el = createEl('style', {type : 'text/css'})
    ins(document.getElementsByTagName('head')[0], el)
    return el.sheet || el.styleSheet
  }()

  /**
   * Creates an opacity keyframe animation rule and returns its name.
   * Since most mobile Webkits have timing issues with animation-delay,
   * we create separate rules for each line/segment.
   */
  function addAnimation(alpha, trail, i, lines) {
    var name = ['opacity', trail, ~~(alpha*100), i, lines].join('-')
      , start = 0.01 + i/lines*100
      , z = Math.max(1 - (1-alpha) / trail * (100-start), alpha)
      , prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase()
      , pre = prefix && '-'+prefix+'-' || ''

    if (!animations[name]) {
      sheet.insertRule(
        '@' + pre + 'keyframes ' + name + '{' +
        '0%{opacity:' + z + '}' +
        start + '%{opacity:' + alpha + '}' +
        (start+0.01) + '%{opacity:1}' +
        (start+trail) % 100 + '%{opacity:' + alpha + '}' +
        '100%{opacity:' + z + '}' +
        '}', sheet.cssRules.length)

      animations[name] = 1
    }
    return name
  }

  function vendor(el, prop) {
    var s = el.style
      , pp
      , i

    if(s[prop] !== undefined) return prop
    prop = prop.charAt(0).toUpperCase() + prop.slice(1)
    for(i=0; i<prefixes.length; i++) {
      pp = prefixes[i]+prop
      if(s[pp] !== undefined) return pp
    }
  }

  /**
   * Sets multiple style properties at once.
   */
  function css(el, prop) {
    for (var n in prop)
      el.style[vendor(el, n)||n] = prop[n]

    return el
  }

  /**
   * Fills in default values.
   */
  function merge(obj) {
    for (var i=1; i < arguments.length; i++) {
      var def = arguments[i]
      for (var n in def)
        if (obj[n] === undefined) obj[n] = def[n]
    }
    return obj
  }

  /**
   * Returns the absolute page-offset of the given element.
   */
  function pos(el) {
    var o = { x:el.offsetLeft, y:el.offsetTop }
    while((el = el.offsetParent))
      o.x+=el.offsetLeft, o.y+=el.offsetTop

    return o
  }

  var defaults = {
    lines: 12,            // The number of lines to draw
    length: 7,            // The length of each line
    width: 5,             // The line thickness
    radius: 10,           // The radius of the inner circle
    rotate: 0,            // Rotation offset
    corners: 1,           // Roundness (0..1)
    color: '#000',        // #rgb or #rrggbb
    speed: 1,             // Rounds per second
    trail: 100,           // Afterglow percentage
    opacity: 1/4,         // Opacity of the lines
    fps: 20,              // Frames per second when using setTimeout()
    zIndex: 2e9,          // Use a high z-index by default
    className: 'spinner', // CSS class to assign to the element
    top: 'auto',          // center vertically
    left: 'auto',         // center horizontally
    position: 'relative'  // element position
  }

  /** The constructor */
  function Spinner(o) {
    if (!this.spin) return new Spinner(o)
    this.opts = merge(o || {}, Spinner.defaults, defaults)
  }

  Spinner.defaults = {}

  merge(Spinner.prototype, {
    spin: function(target) {
      this.stop()
      var self = this
        , o = self.opts
        , el = self.el = css(createEl(0, {className: o.className}), {position: o.position, width: 0, zIndex: o.zIndex})
        , mid = o.radius+o.length+o.width
        , ep // element position
        , tp // target position

      if (target) {
        target.insertBefore(el, target.firstChild||null)
        tp = pos(target)
        ep = pos(el)
        css(el, {
          left: (o.left == 'auto' ? tp.x-ep.x + (target.offsetWidth >> 1) : parseInt(o.left, 10) + mid) + 'px',
          top: (o.top == 'auto' ? tp.y-ep.y + (target.offsetHeight >> 1) : parseInt(o.top, 10) + mid)  + 'px'
        })
      }

      el.setAttribute('aria-role', 'progressbar')
      self.lines(el, self.opts)

      if (!useCssAnimations) {
        var i = 0
          , fps = o.fps
          , f = fps/o.speed
          , ostep = (1-o.opacity) / (f*o.trail / 100)
          , astep = f/o.lines

        ;(function anim() {
          i++;
          for (var s=o.lines; s; s--) {
            var alpha = Math.max(1-(i+s*astep)%f * ostep, o.opacity)
            self.opacity(el, o.lines-s, alpha, o)
          }
          self.timeout = self.el && setTimeout(anim, ~~(1000/fps))
        })()
      }
      return self
    },

    stop: function() {
      var el = this.el
      if (el) {
        clearTimeout(this.timeout)
        if (el.parentNode) el.parentNode.removeChild(el)
        this.el = undefined
      }
      return this
    },

    lines: function(el, o) {
      var i = 0
        , seg

      function fill(color, shadow) {
        return css(createEl(), {
          position: 'absolute',
          width: (o.length+o.width) + 'px',
          height: o.width + 'px',
          background: color,
          boxShadow: shadow,
          transformOrigin: 'left',
          transform: 'rotate(' + ~~(360/o.lines*i+o.rotate) + 'deg) translate(' + o.radius+'px' +',0)',
          borderRadius: (o.corners * o.width>>1) + 'px'
        })
      }

      for (; i < o.lines; i++) {
        seg = css(createEl(), {
          position: 'absolute',
          top: 1+~(o.width/2) + 'px',
          transform: o.hwaccel ? 'translate3d(0,0,0)' : '',
          opacity: o.opacity,
          animation: useCssAnimations && addAnimation(o.opacity, o.trail, i, o.lines) + ' ' + 1/o.speed + 's linear infinite'
        })

        if (o.shadow) ins(seg, css(fill('#000', '0 0 4px ' + '#000'), {top: 2+'px'}))

        ins(el, ins(seg, fill(o.color, '0 0 1px rgba(0,0,0,.1)')))
      }
      return el
    },

    opacity: function(el, i, val) {
      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val
    }

  })


  /**
   * Check and init VML support
   */
  ;(function() {

    function vml(tag, attr) {
      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr)
    }

    var s = css(createEl('group'), {behavior: 'url(#default#VML)'})

    if (!vendor(s, 'transform') && s.adj) {

      sheet.addRule('.spin-vml', 'behavior:url(#default#VML)')

      Spinner.prototype.lines = function(el, o) {
        var r = o.length+o.width
          , s = 2*r

        function grp() {
          return css(
            vml('group', {
              coordsize: s + ' ' + s,
              coordorigin: -r + ' ' + -r
            }),
            { width: s, height: s }
          )
        }

        var margin = -(o.width+o.length)*2 + 'px'
          , g = css(grp(), {position: 'absolute', top: margin, left: margin})
          , i

        function seg(i, dx, filter) {
          ins(g,
            ins(css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx}),
              ins(css(vml('roundrect', {arcsize: o.corners}), {
                  width: r,
                  height: o.width,
                  left: o.radius,
                  top: -o.width>>1,
                  filter: filter
                }),
                vml('fill', {color: o.color, opacity: o.opacity}),
                vml('stroke', {opacity: 0}) // transparent stroke to fix color bleeding upon opacity change
              )
            )
          )
        }

        if (o.shadow)
          for (i = 1; i <= o.lines; i++)
            seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)')

        for (i = 1; i <= o.lines; i++) seg(i)
        return ins(el, g)
      }

      Spinner.prototype.opacity = function(el, i, val, o) {
        var c = el.firstChild
        o = o.shadow && o.lines || 0
        if (c && i+o < c.childNodes.length) {
          c = c.childNodes[i+o]; c = c && c.firstChild; c = c && c.firstChild
          if (c) c.opacity = val
        }
      }
    }
    else
      useCssAnimations = vendor(s, 'animation')
  })()

  if (typeof define == 'function' && define.amd)
    define(function() { return Spinner })
  else
    window.Spinner = Spinner

}(window, document);

(function($) {
	var defaults = {
			lines: 13, // The number of lines to draw
			length: 7, // The length of each line
			width: 4, // The line thickness
			radius: 10, // The radius of the inner circle
			corners: 1, // Corner roundness (0..1)
			rotate: 0, // The rotation offset
			color: '#555555', // #rgb or #rrggbb
			speed: 1, // Rounds per second
			trail: 60, // Afterglow percentage
			shadow: false, // Whether to render a shadow
			hwaccel: false, // Whether to use hardware acceleration
			className: 'spinner', // The CSS class to assign to the spinner
			zIndex: 2e9, // The z-index (defaults to 2000000000)
			top: 'auto', // Top position relative to parent in px
			left: 'auto' // Left position relative to parent in px
		},
		predefined = {
			small: {
				lines: 9,
				length: 3,
				width: 2,
				radius: 3,
				corners: 1,
				rotate: 0,
				speed: 1,
				trail: 60,
				shadow: false,
				hwaccel: false,
				className: 'spinner',
				zIndex: 2e9,
				top: 'auto',
				left: 'auto'
			},
			large: {
				lines: 13,
				length: 7,
				width: 4,
				radius: 10,
				corners: 1,
				rotate: 0,
				speed: 1,
				trail: 60,
				shadow: false,
				hwaccel: false,
				className: 'spinner',
				zIndex: 2e9,
				top: 'auto',
				left: 'auto'
			}
		};

	if (!$.fn) {
		/** @class */
		$.fn = {};
	}

	$.fn.spin = function(version, opts) {
		var options = version ? predefined[version] : defaults;

		if(opts) {
			$.extend(options, opts);
		}

		this.each(function() {
			var $this = $(this),
			    data = $this.data();

			if (data.spinner) {
				data.spinner.stop();
				delete data.spinner;
			} else {
				data.spinner = new window.Spinner(options).spin(this);
			}
		});
		return this;
	};

})(jQuery);

/*
  mustache.js — Logic-less templates in JavaScript

  See http://mustache.github.com/ for more info.
*/
(function($){

var Mustache = function () {
  var _toString = Object.prototype.toString;

  Array.isArray = Array.isArray || function (obj) {
    return _toString.call(obj) == "[object Array]";
  }

  var _trim = String.prototype.trim, trim;

  if (_trim) {
    trim = function (text) {
      return text == null ? "" : _trim.call(text);
    }
  } else {
    var trimLeft, trimRight;

    if ((/\S/).test("\xA0")) {
      trimLeft = /^[\s\xA0]+/;
      trimRight = /[\s\xA0]+$/;
    } else {
      trimLeft = /^\s+/;
      trimRight = /\s+$/;
    }

    trim = function (text) {
      return text == null ? "" :
        text.toString().replace(trimLeft, "").replace(trimRight, "");
    }
  }

  var escapeMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;'
  };

  function escapeHTML(string) {
    return String(string).replace(/&(?!#?\w+;)|[<>"']/g, function (s) {
      return escapeMap[s] || s;
    });
  }

  var regexCache = {};
  var Renderer = function () {};

  Renderer.prototype = {
    otag: "{{",
    ctag: "}}",
    pragmas: {},
    buffer: [],
    pragmas_implemented: {
      "IMPLICIT-ITERATOR": true
    },
    context: {},

    render: function (template, context, partials, in_recursion) {
      if (!in_recursion) {
        this.context = context;
        this.buffer = []; // TODO: make this non-lazy
      }

      if (!this.includes("", template)) {
        if (in_recursion) {
          return template;
        } else {
          this.send(template);
          return;
        }
      }

      template = this.render_pragmas(template);

      var html = this.render_section(template, context, partials);

      if (html === false) {
        html = this.render_tags(template, context, partials, in_recursion);
      }

      if (in_recursion) {
        return html;
      } else {
        this.sendLines(html);
      }
    },

    /*
      Sends parsed lines
    */
    send: function (line) {
      if (line !== "") {
        this.buffer.push(line);
      }
    },

    sendLines: function (text) {
      if (text) {
        var lines = text.split("\n");
        for (var i = 0; i < lines.length; i++) {
          this.send(lines[i]);
        }
      }
    },

    /*
      Looks for %PRAGMAS
    */
    render_pragmas: function (template) {
      if (!this.includes("%", template)) {
        return template;
      }

      var that = this;
      var regex = this.getCachedRegex("render_pragmas", function (otag, ctag) {
        return new RegExp(otag + "%([\\w-]+) ?([\\w]+=[\\w]+)?" + ctag, "g");
      });

      return template.replace(regex, function (match, pragma, options) {
        if (!that.pragmas_implemented[pragma]) {
          throw({message:
            "This implementation of mustache doesn't understand the '" +
            pragma + "' pragma"});
        }
        that.pragmas[pragma] = {};
        if (options) {
          var opts = options.split("=");
          that.pragmas[pragma][opts[0]] = opts[1];
        }
        return "";
      });
    },

    /*
      Tries to find a partial in the curent scope and render it
    */
    render_partial: function (name, context, partials) {
      name = trim(name);
      if (!partials || partials[name] === undefined) {
        throw({message: "unknown_partial '" + name + "'"});
      }
      if (!context || typeof context[name] != "object") {
        return this.render(partials[name], context, partials, true);
      }
      return this.render(partials[name], context[name], partials, true);
    },

    /*
      Renders inverted (^) and normal (#) sections
    */
    render_section: function (template, context, partials) {
      if (!this.includes("#", template) && !this.includes("^", template)) {
        return false;
      }

      var that = this;

      var regex = this.getCachedRegex("render_section", function (otag, ctag) {
        return new RegExp(
          "^([\\s\\S]*?)" +         // all the crap at the beginning that is not {{*}} ($1)

          otag +                    // {{
          "(\\^|\\#)\\s*(.+?)\\s*" +//  #foo (# == $2, foo == $3), not greedy
          ctag +                    // }}

          "\n*([\\s\\S]*?)" +       // between the tag ($2). leading newlines are dropped

          otag +                    // {{
          "\\/\\s*\\3\\s*" +        //  /foo (backreference to the opening tag).
          ctag +                    // }}

          "\\s*([\\s\\S]*)$",       // everything else in the string ($4). leading whitespace is dropped.

        "g");
      });


      return template.replace(regex, function (match, before, type, name, content, after) {
        var renderedBefore = before ? that.render_tags(before, context, partials, true) : "",

            renderedAfter = after ? that.render(after, context, partials, true) : "",

            renderedContent,

            value = that.find(name, context);

        if (type === "^") { // inverted section
          if (!value || Array.isArray(value) && value.length === 0) {
            renderedContent = that.render(content, context, partials, true);
          } else {
            renderedContent = "";
          }
        } else if (type === "#") { // normal section
          if (Array.isArray(value)) { // Enumerable, Let's loop!
            renderedContent = that.map(value, function (row) {
              return that.render(content, that.create_context(row), partials, true);
            }).join("");
          } else if (that.is_object(value)) { // Object, Use it as subcontext!
            renderedContent = that.render(content, that.create_context(value),
              partials, true);
          } else if (typeof value == "function") {
            renderedContent = value.call(context, content, function (text) {
              return that.render(text, context, partials, true);
            });
          } else if (value) { // boolean section
            renderedContent = that.render(content, context, partials, true);
          } else {
            renderedContent = "";
          }
        }

        return renderedBefore + renderedContent + renderedAfter;
      });
    },

    /*
      Replace {{foo}} and friends with values from our view
    */
    render_tags: function (template, context, partials, in_recursion) {
      var that = this;

      var new_regex = function () {
        return that.getCachedRegex("render_tags", function (otag, ctag) {
          return new RegExp(otag + "(=|!|>|&|\\{|%)?([^#\\^]+?)\\1?" + ctag + "+", "g");
        });
      };

      var regex = new_regex();
      var tag_replace_callback = function (match, operator, name) {
        switch(operator) {
        case "!": // ignore comments
          return "";
        case "=": // set new delimiters, rebuild the replace regexp
          that.set_delimiters(name);
          regex = new_regex();
          return "";
        case ">": // render partial
          return that.render_partial(name, context, partials);
        case "{": // the triple mustache is unescaped
        case "&": // & operator is an alternative unescape method
          return that.find(name, context);
        default: // escape the value
          return escapeHTML(that.find(name, context));
        }
      };
      var lines = template.split("\n");
      for(var i = 0; i < lines.length; i++) {
        lines[i] = lines[i].replace(regex, tag_replace_callback, this);
        if (!in_recursion) {
          this.send(lines[i]);
        }
      }

      if (in_recursion) {
        return lines.join("\n");
      }
    },

    set_delimiters: function (delimiters) {
      var dels = delimiters.split(" ");
      this.otag = this.escape_regex(dels[0]);
      this.ctag = this.escape_regex(dels[1]);
    },

    escape_regex: function (text) {
      if (!arguments.callee.sRE) {
        var specials = [
          '/', '.', '*', '+', '?', '|',
          '(', ')', '[', ']', '{', '}', '\\'
        ];
        arguments.callee.sRE = new RegExp(
          '(\\' + specials.join('|\\') + ')', 'g'
        );
      }
      return text.replace(arguments.callee.sRE, '\\$1');
    },

    /*
      find `name` in current `context`. That is find me a value
      from the view object
    */
    find: function (name, context) {
      name = trim(name);

      function is_kinda_truthy(bool) {
        return bool === false || bool === 0 || bool;
      }

      var value;

      if (name.match(/([a-z_]+)\./ig)) {
        var childValue = this.walk_context(name, context);
        if (is_kinda_truthy(childValue)) {
          value = childValue;
        }
      } else {
        if (is_kinda_truthy(context[name])) {
          value = context[name];
        } else if (is_kinda_truthy(this.context[name])) {
          value = this.context[name];
        }
      }

      if (typeof value == "function") {
        return value.apply(context);
      }
      if (value !== undefined) {
        return value;
      }
      return "";
    },

    walk_context: function (name, context) {
      var path = name.split('.');
      var value_context = (context[path[0]] != undefined) ? context : this.context;
      var value = value_context[path.shift()];
      while (value != undefined && path.length > 0) {
        value_context = value;
        value = value[path.shift()];
      }
      if (typeof value == "function") {
        return value.apply(value_context);
      }
      return value;
    },


    /* includes tag */
    includes: function (needle, haystack) {
      return haystack.indexOf(this.otag + needle) != -1;
    },

    create_context: function (_context) {
      if (this.is_object(_context)) {
        return _context;
      } else {
        var iterator = ".";
        if (this.pragmas["IMPLICIT-ITERATOR"]) {
          iterator = this.pragmas["IMPLICIT-ITERATOR"].iterator;
        }
        var ctx = {};
        ctx[iterator] = _context;
        return ctx;
      }
    },

    is_object: function (a) {
      return a && typeof a == "object";
    },

    /*
      Why, why, why? Because IE. Cry, cry cry.
    */
    map: function (array, fn) {
      if (typeof array.map == "function") {
        return array.map(fn);
      } else {
        var r = [];
        var l = array.length;
        for(var i = 0; i < l; i++) {
          r.push(fn(array[i]));
        }
        return r;
      }
    },

    getCachedRegex: function (name, generator) {
      var byOtag = regexCache[this.otag];
      if (!byOtag) {
        byOtag = regexCache[this.otag] = {};
      }

      var byCtag = byOtag[this.ctag];
      if (!byCtag) {
        byCtag = byOtag[this.ctag] = {};
      }

      var regex = byCtag[name];
      if (!regex) {
        regex = byCtag[name] = generator(this.otag, this.ctag);
      }

      return regex;
    }
  };

  return({
    name: "mustache.js",
    version: "0.4.2",

    /*
      Turns a template and view into HTML
    */
    to_html: function (template, view, partials, send_fun) {
      var renderer = new Renderer();
      if (send_fun) {
        renderer.send = send_fun;
      }
      renderer.render(template, view || {}, partials);
      if (!send_fun) {
        return renderer.buffer.join("\n");
      }
    }
  });
}();

  $.mustache = function(template, view, partials) {
    return Mustache.to_html(template, view, partials);
  };

})(jQuery);
if (typeof Meetup === 'undefined') {
	Meetup = {};
}

(function () {

var dict = {};

/**
 * @function
 * @param {string} ns namespace for each bucket
 * @param {object} obj [OPTIONAL] Map structure for the trn messages
 * @see /web/shared/infoWidgets.jsp for live example
 * @example
 * // JSP file
 * &lt;web:script&gt;
 * Meetup.TRN(
 * 	'memberInfoWidget',
 * 	{
 * 		'beenToSingularMeetup': "<trn:message key='memberInfo.beenTo' jsonQuote='true' stripEndQuotes='true'>Been to 1 Meetup</trn:message>",
 * 		'beenToPluralMeetups': "<trn:message key='memberInfo.beenTo' jsonQuote='true' stripEndQuotes='true'><trn:param name='COUNT'>{{COUNT}}</trn:param>Been to {COUNT} Meetups</trn:message>"
 * 	}
 * );
 * &lt;web:script&gt;
 *
 * // in JavaScript
 * Meetup.TRN('memberInfoWidget').add('sampleKey', 'I have {{COUNT}} Meetups');
 *
 * Meetup.TRN('memberInfoWidget').copy(
 * 	{
 * 		'beenToPluralMeetups': {COUNT: 10}
 * 	}
 * );
 * // => {
 * //		"beenToSingularMeetup": "Been to 1 Meetup",
 * //		"beenToPluralMeetups": "Been to 10 Meetups",
 * //		"sampleKey": "I have {{COUNT}} Meetups"
 * // };
 *
 * Meetup.TRN('memberInfoWidget').get('beenToPluralMeetups', {COUNT: 7});
 * // => "Been to 7 Meetups";
 */
Meetup.TRN = function (ns, obj) {
	if (!ns) {
		return;
	}
	if (dict[ns] === undefined && obj) {
		dict[ns] = new TrnBucket(obj);
	}
	return dict[ns];
};


var TrnBucket = function (obj) {
	this.bucket = obj;
};

TrnBucket.prototype.add = function (key, val) {
	this.bucket[key] = val;
	return this;
};

TrnBucket.prototype.copy = function (paramObj) {
	paramObj = paramObj || {};
	var param, result = {};
	for (var key in this.bucket) {
		param = paramObj[key];
		result[key] = this.get(key, param);
	}
	return result;
};

TrnBucket.prototype.get = function (key, param) {
	var result, message = this.bucket[key];
	if (param) {
		result = $.mustache(message, param);
	}
	else {
		result = message;
	}
	return result;
};

})();
(function ($) {
/**
 * jquery plugin: SaveActionBox
 * @param options {Object} Options for the plug-in -- event [default 'click']: type of event that triggers the box to pop up, label [default '']: label for the checkbox, data [default {}]: data for ajax call to save pref, positionElm [default $(this).parent()]: element to postion box next to, checkAjaxData [default null]: transform ajax data before we do ajax call.
 */
$.fn.SaveActionBox = function(options) {

	var id="saveAction_" + (new Date()).getTime();
	var template = '<div class="splainBox tinySplainBox" style="display:none"><div class="splainBoxPointer"></div> <div class="splainBoxContent"> <div class="expandAllToggle"> <input type="checkbox" id="'+id+'" class="inline" style="vertical-align:middle; margin-right: 4px; margin-top: -4px;" {{#checked}}checked="checked"{{/checked}} /><label for="'+id+'" class="inline small" id="expandAllToggle">{{label}}</label> </div> <div class="expandAllSaved" style="display:none;"><span class="expandAllText" style="padding-top:.2em;"></span></div><div class="expandAllLoading" style="display:none;"><img src="http://img1.dev.meetupstatic.com/img/spinner_ffffff.gif" /></div></div></div>';

	var default_opts = {
		"event":"click",
		checked: false,
		label: "",
		data: {},
		positionElm: null,
		checkAjaxData: null
	};


	var self = this;
	self.myOpts = $.extend(default_opts, options || {});

	return self.each(function() {


		var view = {
			label: self.myOpts.label,
			checked: self.myOpts.checked
		};

		var elements = {
			$elm: $($.mustache(template, view)),
			$trigger: $(this)
		};

		$(document.body).append(elements.$elm);

		/*
		 * @function Show that setting was saved.
		 * @param e {Object} Event.
		 */
		var showToggleOption = function(e) {
			var $saved = $(".expandAllSaved", elements.$elm);
			$(".expandAllLoading", elements.$elm).hide();
			$saved.show();
			$(".expandAllText", elements.$elm).html(Meetup.Copy.Saved);
			setTimeout(function() {
				$saved.hide();
				$(".expandAllToggle", elements.$elm).show();
			}, 3000);
		};

		/*
		 * @function Kicks of ajax call for saving the preference.
		 * @param e {Object} Event.
		 */
		var savePref = function(e) {
			$(".expandAllToggle", elements.$elm).hide();
			$(".expandAllLoading", elements.$elm).show();
			$(".optionsBox", elements.$elm).show();
			if (self.myOpts.checkAjaxData) {
				self.myOpts.data = self.myOpts.checkAjaxData(self.myOpts.data, elements.$trigger, $("input", elements.$elm));
			}
			$.ajax({
				type: "POST",
				url:"/api/",
				data: self.myOpts.data,
				success: function() {
					setTimeout(function() { showToggleOption(e); }, 500);
				}
			});
		};

		/*
		 * @function Shows the little hover thing.
		 * @param e {Object} Event.
		 */
		var showBox = function(e) {
			e.stopPropagation();
			elements.$elm.show();
			$("input", elements.$elm).attr("checked", null);
			var posElm = (self.myOpts.positionElm) ? self.myOpts.positionElm : elements.$trigger.parent();
			elements.$elm.position({
				my: "left center",
				at : "right center",
				of : posElm,
				offset : "0 -15"
			});
			$(document.body).unbind("click", hideBox);
			setTimeout(function() { $(document.body).click(hideBox); }, 200);
		};

		/*
		 * @function Hides the little hover thing.
		 * @param e {Object} Event.
		 */
		var hideBox = function(e) {
			var elm = (e.target.parentNode.nodeName == "LABEL") ? e.target.parentNode : e.target, $elm = $(elm);
			if ($elm.parents("div.tinySplainBox").length === 0 && elm !== elements.$trigger[0] && (!$elm.attr("for") || $elm.attr("for") !== elements.$trigger[0].id)) {
				elements.$elm.hide(300);
				$(document.body).unbind("click", hideBox);
			}
		};

		$("input", elements.$elm).change(savePref);
		$(this).bind(self.myOpts.event, showBox);

	});

};
})(jQuery);
(function ($, window) {
  var decode = decodeURIComponent;


  $.deparam = jq_deparam = function( params, coerce ) {
    var obj = {},
      coerce_types = { 'true': !0, 'false': !1, 'null': null };

    $.each( params.replace( /\+/g, ' ' ).split( '&' ), function(j,v){
      var param = v.split( '=' ),
        key = decode( param[0] ),
        val,
        cur = obj,
        i = 0,

        keys = key.split( '][' ),
        keys_last = keys.length - 1;

      if ( /\[/.test( keys[0] ) && /\]$/.test( keys[ keys_last ] ) ) {
        keys[ keys_last ] = keys[ keys_last ].replace( /\]$/, '' );

        keys = keys.shift().split('[').concat( keys );

        keys_last = keys.length - 1;
      } else {
        keys_last = 0;
      }

      if ( param.length === 2 ) {
        val = decode( param[1] );

        if ( coerce ) {
          val = val && !isNaN(val)            ? +val              // number
            : val === 'undefined'             ? undefined         // undefined
            : coerce_types[val] !== undefined ? coerce_types[val] // true, false, null
            : val;                                                // string
        }

        if ( keys_last ) {
          for ( ; i <= keys_last; i++ ) {
            key = keys[i] === '' ? cur.length : keys[i];
            cur = cur[key] = i < keys_last
              ? cur[key] || ( keys[i+1] && isNaN( keys[i+1] ) ? {} : [] )
              : val;
          }

        } else {

          if ( $.isArray( obj[key] ) ) {
            obj[key].push( val );

          } else if ( obj[key] !== undefined ) {
            obj[key] = [ obj[key], val ];

          } else {
            obj[key] = val;
          }
        }

      } else if ( key ) {
        obj[key] = coerce
          ? undefined
          : '';
      }
    });

    return obj;
  };

})(jQuery, window);

(function () {

var ROOT = 'http://www.dev.meetup.com/';
var API = '/api/';

/**
 * Meetup.URLObjectBuilder returns an object with root useful URLs
 * and methods that JS uses a lot. DO NOT instatiate this, unless
 * you really need it.  Instead, you can use Meetup.URL.xxx().
 * @function
 * @param {string} grouphome [optional] url for group home
 * @see web/templates/{3|4}/top_inc.jsp
 */
Meetup.URLObjectBuilder = function (grouphome) {
	var result = {
		root: ROOT,
		api: API,
		mungeUrl: mungeUrl,
		extractQueries: extractQueries,
		excludeQueries: excludeQueries
	};

	if (grouphome) {
		result.grouphome = grouphome;
		result.chapter = grouphome;
		result.chapterapi = [result.grouphome, 'api/'].join('');
	}

	var inner = new UrlFunctions();
	for (var i in inner) {
		result[i] = inner[i];
	}
	return result;
};

/**
 * munge url with an object representation query!
 * @function
 * @param {string} base the base url that you want to add a query to.
 * @param {object} obj key-value object that you want to add to the base url.
 */
var mungeUrl = function(base, obj) {
	var baseUrl = excludeQueries(base);
	var arr = extractQueries(base);
	return [baseUrl, '?', $.param($.extend(arr[0], arr[1], obj))].join('');
};

/**
 * depending on $.deparam(). Takes an url as string, returns an array. The
 * first element of the returning array is an object represtation of an
 * equivalent portion of window.location.search. The second is an object
 * represetation of en quivalent portion of window.location.hash.
 * @function
 * @param {string} str the url you want to munipulate
 * @see https://developer.mozilla.org/en/DOM/window.location
 */
var extractQueries = function (str) {
	var q_index = str.indexOf('?');
	var h_index = str.indexOf('#');
	var search = {};
	var hash = {};
	if (q_index < 0) {
		if (h_index < 0) {
		}
		else {
			hash = $.deparam(str.substring(h_index + 1));
		}
	}
	else {
		if (h_index < 0) {
			search = $.deparam(str.substring(q_index + 1));
		}
		else {
			if (q_index < h_index) {
				search = $.deparam(str.substring(q_index + 1, h_index));
				hash = $.deparam( getParamStringFromHash(str.substring(h_index + 1)) );
			}
			else {
				hash = $.deparam( getParamStringFromHash(str.substring(h_index + 1)) );
			}
		}
	}
	return [search, hash];
};

/**
 * It takes an url as string, returns the url without "search" and "hash"
 * Note: this won't convert relative path to full path.  If you need to convert
 * "/foobar?what=1#yeah=2" to "http://www.meetup.com/foobar", you need to
 * do like $('<a href="{{string}}" />').attr('href');.
 * @function
 * @param {string} str the url you want to munipulate
 * @see https://developer.mozilla.org/en/DOM/window.location
 */
var excludeQueries = function (str) {
	var q_index = str.indexOf('?');
	var h_index = str.indexOf('#');
	var result;
	if (q_index < 0) {
		if (h_index < 0) {
			result = str;
		}
		else {
			result = str.substring(0, h_index);
		}
	}
	else {
		if (h_index < 0) {
			result = str.substring(0, q_index);
		}
		else {
			if (q_index < h_index) {
				result = str.substring(0, q_index);
			}
			else {
				result = str.substring(0, h_index);
			}
		}
	}
	return result;
};

/**
 * [private] Utility function that returns string without '?' or '!'
 * @function
 * @param {string} str
 */
var getParamStringFromHash = function (str) {
	var result;
	var c = str.charAt(0);
	if (c === '?' || c === '!') {
		result = str.substring(1);
	}
	else {
		result = str;
	}
	return result;
};

/**
 * instace functions
 * =================
 */

var UrlFunctions = function () {};

/**
 * returns a member profile url by given member id.
 * if it's on the group context, you'll get a group profile as default.
 * @function
 * @param {string|number} member member id
 * @param {boolean} sitewide true if you want to get an URL for sitewide
 * profile
 */
UrlFunctions.prototype.member = function (member, sitewide) {
	var result, mid = parseInt(member, 10);
	if (isNaN(mid)) {
		return null;
	}
	sitewide = sitewide || false;
	if (sitewide || !this.grouphome) {
		result = [this.root, 'members/', mid, '/'].join('');
	}
	else {
		result = [this.grouphome, 'members/', mid, '/'].join('');
	}
	return result;
};

/**
 * returns an event url by given event id.
 * returns null, if the current context is not group.
 * @function
 * @param {string|number} event event id
 */
UrlFunctions.prototype.event = function (event) {
	var eid = parseInt(event, 10);
	if (isNaN(eid) || !this.grouphome) {
		return null;
	}
	return [this.grouphome, 'events/', eid, '/'].join('');
};

})();

/* Not implemented yet */

/**
 * keycode for key* events, inheritated from MochiKit
 * @class
 * @property {number} TAB 9
 * @property {number} ENTER 13
 * @property {number} ESCAPE 27
 * @property {number} PAGE_UP 33
 * @property {number} PAGE_DOWN 34
 * @property {number} UP 38
 * @property {number} DOWN 40
 */
Meetup.Keyboard = {
	"UP" : 38,
	"ESCAPE" : 27,
	"DOWN" : 40,
	"ENTER" : 13,
	"PAGE_UP" : 33,
	"PAGE_DOWN" : 34,
	"TAB" : 9
}

if (!jQuery.fn) {
	/** @class */
	jQuery.fn = {};
}

/**
 * swasp class names
 * @function
 * @param {string} from class name you want to change from
 * @param {string} to class name you want to change to
 */
jQuery.fn.swapClass = function(from, to) {
	return this.each(function() {
		var elm = $(this);
		elm.removeClass(from);
		elm.addClass(to);
	});
}

/**
 * scroll to
 * @function
 * @param {string} to selector of the target element
 * @param {options} Options -- alwaysScroll: always
 */
jQuery.fn.scrollTo = function(to, options) {

	var opts = $.extend({
			alwaysScroll : false
		}, options);

	return this.each(function() {
		var top = $(to).offset().top;
		var $this = $(this);
		if (opts.alwaysScroll === true || top < $this.scrollTop()) {
			$this.scrollTop(top);
		}
	});
}

/**
 *
 * @function
 */
jQuery.fn.dimensions = function(wantOuter) {
    if (wantOuter) return { h:this.outerHeight(), w:this.outerWidth() };
	return { h:this.height(), w:this.width() };
}

if (!jQuery.ui.dialog) {
/**
 * setting default value on jQuery.ui.dialog
 * @class jQuery.ui.dialog
 * @property {boolean} resizeable false
 * @property {boolean} dragggable false
 * @property {boolean} modal true
 * @property {boolean} autoOpen false
 * @property {string} closeText "x"
 * @property {number} zIndex 4503, DO NOT EVER CHANGE THIS
 * @property {number} width 500
 */
	jQuery.ui.dialog = {};
}

/**
 * New defaults for jQuery UI Dialog
 * DO NOT REMOVE! I WILL HUNT YOU DOWN IF YOU DO - Justin
 */
$.extend($.ui.dialog.prototype.options, {
	/**
	 * @lends jQuery.ui.dialog.prototype
	 */
 	resizable: false,
	draggable: false,
	modal: true,
	autoOpen: false,
	closeText: "x",
	zIndex: 4503,
	width: 500,
	/**
	 * default for open()
	 * @function
	 * @param {DOMEvent} event
	 * @param {object} ui
	 */
	open: function(event, ui) {
		hideFlashContent();
		var $this = $(this),
			d = $this.dialog('widget');
		if($this.hasClass("noClose")) {
			$(".ui-dialog-titlebar", d).remove();
			$this.dialog("option" , "closeOnEscape" , false);
		}
	},
	/**
	 * Backwards compatibility for $dialog.trigger("appear"),
	 * $dialog.trigger("dismiss") so we can stop using .Dialog which is dumb.
	 * @function
	 */
	create : function() {
		var $this = $(this);
		$this.bind("appear", function() { $this.dialog("open"); });
		$this.bind("dismiss", function() { $this.dialog("close"); });

		if ( !Meetup.Data.isOverlayDelegated ) {
			$(document).delegate('.ui-widget-overlay', 'click', function(e) {
				$('.ui-dialog-content:visible:not(.noClose)').dialog('close');
			});
			Meetup.Data.isOverlayDelegated = true;
		};
	},
	/**
	 * default before close()
	 * @function
	 * @param {DOMEvent} event
	 * @param {object} ui
	 */
	beforeClose: showFlashContent
});

$.datepicker.setDefaults($.datepicker.regional[(Meetup.Language === 'en_US' ? '' : Meetup.Language)]);



jQuery.ajaxSetup({
  contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
});

/**
 * curry the function
 * @function
 * @see http://en.wikipedia.org/wiki/Curry_(programming_language)
 */
Function.prototype.curry = function() {
	var fn = this,
		args = Array.prototype.slice.call(arguments);
	return function() {
		return fn.apply(this, args.concat(Array.prototype.slice.call(arguments)));
	};
};

if (typeof(Meetup.FB) === "undefined") {
	/**
	 * function wrapper/utility for Facebook connect-js sdk
	 * @class
	 * @author Takashi Mizohata
	 */
	Meetup.FB = {};
}

(function() {


/**
 * just for backward compatibility
 * @property
 * @deprecated please use Meetup.FB.ready or Meetup.FB.afterLogin instead
 */
Meetup.FB.callback = null;

/**
 * this property is used in loginByClick() and loginByInit(). if you
 * set this true, those two functions will try to make you joining the
 * group you're looking at.
 * @property
 */
Meetup.FB.isJoining = true;

/**
 * [Should be read-only] this property holds the permission that user gave
 * to Meetup app.  It should be automatically populated, once the user
 * logged in
 * @property
 */
Meetup.FB.permissions = {};

/**
 * [Should be read-only] true, when the user has tied. This is set in jsp.
 * @property
 */
Meetup.FB.hasTied = false;


var fnReadyQueue = [];
var fnLoginQueue = [];
var hasInitialized = false;


/**
 * init.
 * @function
 * this is invoked by /web/templates/3/bot_inc.jsp.
 */
Meetup.FB.init = function(appid) {
	if (window.location.protocol === 'https:') {
		FB._https = true;
	}


	FB.Event.subscribe('xfbml.render', onInitialXfbmlRender);
	FB.Event.subscribe('auth.login', onLogin);
	FB.Event.subscribe('auth.logout', onLogout);
	FB.init({
		appId: appid,
		status: true,
		cookie: true,
		xfbml: true,
		channelUrl: Meetup.Data.path_xdpath,
		oauth: true
	});
	if (window.location.protocol !== 'https:') {
		FB.Canvas.setAutoGrow();
	}

	FB.getLoginStatus(
		function(resp) {
			handleLogin(resp);
		}
	);
};

/**
 * graph api call wrapper, this is backward compat. Use FB.api() directory, if your call has no side effect.
 * @function
 */
Meetup.FB.api = function(url, type, obj, cb) {
	FB.api(url, type, obj, cb);
};

/**
 * used to be called onLoginButtonClick => loginByClick
 * @function
 * @param {string} url [optional]
 */
Meetup.FB.loginByClick = function(url, iframe) {
	var myurl;
	if (url) {
		myurl = url;
	}
	else {
		myurl = Meetup.FB.afterAuthUri;
	}
	if (myurl) {
		if (Meetup.FB.isJoining && Meetup.FB.returnUri) {
			myurl += [((myurl.indexOf('?') > -1) ? '&' : '?'), 'returnUri=', encodeURIComponent(Meetup.FB.returnUri)].join('');
		}
		if (iframe) {
			Meetup.iframeFBExtendPerms(
				'email',
				function(arg) {
					setCookie(
						['fbsr_', FB._apiKey].join(''),
						arg,
						undefined,
						'/',
						location.host
					);
					window.location.replace(myurl);
				},
				function(){}
			);
		} else {
			Meetup.FB.extendPerms(
				'email',
				function (resp) {
					window.location.replace(myurl);
				}
			);
		}
	}
};

/**
 * Used to be call hookOnInit. same notion as DOMReady for ready of connect-js
 * @function
 * @param {function} func call back function
 */
Meetup.FB.ready = function (func) {
	if (typeof func !== 'function') {
		return false;
	}
	if (hasInitialized) {
		func();
	}
	else {

		Meetup.FB.loadFB();

		if (fnReadyQueue === null) {
			fnReadyQueue = [func];
		}
		else {
			fnReadyQueue[fnReadyQueue.length] = func;
		}
	}
};

/**
 * function that gets fired by user's login action to facebook
 * @function
 * @param {function} func call back function
 * @description
 * note: call back function should get FB's response object as an argument
 */
Meetup.FB.afterLogin = function (func) {
	if (typeof func !== 'function') {
		return false;
	}
	if (fnLoginQueue === null) {
		func();
	}
	else {
		fnLoginQueue[fnLoginQueue.length] = func;
	}
};

/**
 * secure the function that is executed after login
 * @function
 * @param {function} func call back function
 * @description
 * FIXME: needs better name
 * and you should be careful the timing
 */
Meetup.FB.secureLogin = function (func) {
	FB.getLoginStatus(
		function(response) {
			if (response && response.status === 'connected') {
				func(response);
			}
			else {
				Meetup.FB.afterLogin(func);
				FB.login();
			}
		}
	);
};

/**
 * checks facebook oauth permission.
 * @function
 * @param {string or array} p comma separated permissions, or array
 * @param {function} cb [optional] callback function
 * @param {function} eb [optional] [option] errorback function
 * @see http://developers.facebook.com/docs/authentication/permissions
 * @description
 * it does check if you have the permissions already or not.
 */
Meetup.FB.extendPerms = function (p, cb, eb) {
	var arr_p = [p],
	str_p = p;
	if (p instanceof Array) {
		str_p = p.join(',');
		arr_p = p;
	}
	else if (typeof p !== 'string') {
		throw new Error('extendPerms: You need to pass a string or an array.');
	}
	else if (str_p.search(/,/) > -1) {
		arr_p = str_p.split(',');
	}
	var loginFunc = function (response) {
		if (response && response.authResponse) {
			cb(response);
		}
		else {
			if (typeof eb === 'function') {
				eb(response);
			}
		}
	};
	if (!FB.getAuthResponse()) {
		FB.login(
			loginFunc,
			{scope: str_p}
		);
	}
	else {
		fetchPermissions(
			function (resp) {
				var isPermissionGranted = true;
				loop:for (var i = 0, len = arr_p.length; i < len; ++i) {
					if (!Meetup.FB.permissions[arr_p[i]]) {
						isPermissionGranted = false;
						break loop;
					}
				}
				if (isPermissionGranted === false) {
					FB.login(
						loginFunc,
						{scope: str_p}
					);
				}
				else {
					cb(resp);
				}
			},
			eb
		);
	}
};

/**
 * Set Facebook user name by FBML:name for given element
 * @function
 * @param {DOMElement} elm parent DOM element
 * @param {boolean} newWindow [optional] true if you want add target="_blank"
 */
Meetup.FB.swapFbName = function (elm, newWindow) {
	if (!elm) {
		throw new Error('You need to pass elm here.');
	}
	newWindow = newWindow || false;
	if (Meetup.FB.uid) {
		replaceFbName(elm, Meetup.FB.uid, newWindow);
	}
	else {
		FB.getLoginStatus(
			function (resp) {
				if (resp.authResponse) {
					replaceFbName(elm, resp.authResponse.userID, newWindow);
				}
			}
		);
	}
};

/**
 * if you load button.jsp with doFBlogin query string, this method will be called
 * and bring a user to login flow.
 * @function
 * @see web/shared/fbconnect/button.jsp
 */
Meetup.FB.loginByInit = function () {
	if (!Meetup.FB.afterAuthUri) {
		throw new Error('You need to at least set afterAuthUri');
	}
	var url = Meetup.FB.afterAuthUri;
	if (Meetup.FB.isJoining && Meetup.FB.returnUri) {
		url += [((url.indexOf('?') > -1) ? '&' : '?'), 'returnUri=', Meetup.FB.returnUri].join('');
	}

	FB.login(
		function(resp) {
			if (!resp || !resp.authResponse) {
				LOG.info('Login canceled');
				return false;
			}
			window.location.replace(url);
		},
		{scope: 'email'}
	);
};

/**
 * Originall, it was FB.QS.encode() and Facebook decided to
 * turn it down, so we basically copies this.
 * @function
 * @param {object} obj key-value pair of things you want to encode
 * @see https://github.com/facebook/facebook-js-sdk/blob/deprecated/src/core/qs.js
 */
Meetup.FB.QSencode = function (obj) {
	var pairs = [];
	var i;
	var val;
	for (i in obj) {
		val = obj[i];
		if (null !== val && 'undefined' !== typeof val) {
			pairs.push(i + '=' + encodeURIComponent(val));
		}
	}
	pairs.sort();
	return pairs.join('&');
};

/**
 * Handles the loading of the FB javascript.
 * @function
 */
Meetup.FB.loadFB = function() {

	if (hasInitialized) { return; }

	var e = document.createElement('script');
	e.async = true;
	e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
	document.getElementById('fb-root').appendChild(e);
	window.fbAsyncInit = function () {
		Meetup.FB.init(Meetup.Data.fbAppKey);
	};

};


var onLogin = function (response) {
	if (response && response.status === 'connected') {
		handleLogin(response);
	}
	else {
	}
};

var onLogout = function (response) {
};

var onInitialXfbmlRender = function () {
	hasInitialized = true;
	FB.Event.unsubscribe('xfbml.render', onInitialXfbmlRender);
	if (fnReadyQueue) {
		for (var i = 0, len = fnReadyQueue.length; i < len; ++i) {
			fnReadyQueue[i]();
		};
		fnReadyQueue = null;
	}
};

/**
 * This call should be only called after login.
 * The "response" arguement needs to contain the everything that
 * we need to make graph api call.
 * @function
 * @param {FacebookResponse} response
 */
var handleLogin = function (response) {
	if (Meetup.FB.isLoggingOut) {
		FB.logout();
		Meetup.FB.isLoggingOut = false;
		return false;
	}

	if (response.authResponse) {
		var uid = response.authResponse.userID;
		Member.accessToken = response.authResponse.accessToken;
		fetchPermissions();

		if (fnLoginQueue !== null) {
			for (var i = 0, len = fnLoginQueue.length; i < len; ++i) {
				fnLoginQueue[i](response);
			}
		}
		fnLoginQueue = null;

	}
};

/**
 * fetch the permission from facebook
 * @function
 */
var fetchPermissions = function(cb, eb) {
	FB.api(
		'/me/permissions',
		function (resp) {
			if (resp.error) {
				if (typeof eb === 'function') {
					eb(resp);
				}
				throw new Error('failed to fetch permissions from Facebook');
				return;
			}
			if (resp.data && resp.data[0]) {
				Meetup.FB.permissions = resp.data[0];
			}
			if (cb && typeof cb === 'function') {
				cb(resp);
			}
		}
	);
};

var replaceFbName = function (elm, uid, newWindow) {
	if (newWindow) {
		elm.innerHTML = ['<a href="http://www.facebook.com/profile.php?id=', uid ,'" target="_blank"><fb:name uid="', uid, '" useyou="false" linked="false"></fb:name></a>'].join('');
	}
	else {
		elm.innerHTML = ['<fb:name uid="', uid, '" useyou="false" linked="true"></fb:name>'].join('');
	}
	FB.XFBML.parse(elm);
};


var testAllEvents = function () {
	var makeFunc = function (str) {
		return function () {
			console.log(str);
			console.log(arguments);
		};
	};
	var events = [
		'auth.login',
		'auth.logout',
		'auth.authResponseChange',
		'auth.statusChange',
		'xfbml.render'
	];
	for (var i = 0, len = events.length; i < len; ++i) {
		FB.Event.subscribe(
			events[i],
			makeFunc(events[i])
		);
	}
};

})();
if (Meetup.Twitter === undefined) {
	/**
	 * Twitter function utilities
	 * @class
	 * @requires Meetup.Data.path_twitter_tie
	 * @requires Meetup.Copy.notYou
	 */
	Meetup.Twitter = {};
}

(function () {

/**
 * alternative template, used in photo page
 * @field
 */
Meetup.Twitter.altTemplate = {};

/**
 * boolean value of "has the user tied or not"
 * @field
 */
Meetup.Twitter.hasTied = false;

/**
 * string value of "the user's twitter name"
 * @field
 */
Meetup.Twitter.handleName = '';

var window_handler = null,
interval_hanlder = null,
ptWindow = null,
ptIntervalWindowCheck = null,
callbackTwPopup = null;

/**
 * good old stream publishing
 * do *NOT* believe the callback is stablly invoked.
 * @function
 * @param {object} template publishing template
 * @param {function} callback
 * @see http://developers.facebook.com/docs/reference/javascript/FB.ui/
 */
Meetup.Twitter.publish = function (template, callback) {
	var arr_url,
	xp = window.screenX ? window.screenX : window.screenLeft,
	yp = window.screenY ? window.screenY : window.screenTop,
	wp = window.outerWidth ? window.outerWidth : document.clientWidth,
	hp = window.outerHeight ? window.outerHeight : document.clientHeight,
	width = 550,
	height = 450,
	left = xp + Math.round((wp - width) / 2),
	top = yp + Math.round((hp - height) / 2),
	url_base = 'http://twitter.com/share',
	name_win = 'meetup_twitter',
	str_feature = [
		'left=', left,
		',top=', top,
		',width=', width,
		',height=', height,
		',personalbar=0',
		',toolbar=0',
		',scrollbars=1',
		',resizeable=1'
	].join('');
	arr_url = [
		url_base,
		'?url=', template.link
	];
	if (template.caption) {
		arr_url[arr_url.length] = '&text=';
		arr_url[arr_url.length] = encodeURIComponent(template.caption).replace(/%20/g, '+');
	}
	if (interval_hanlder !== null) {
		clearInterval(interval_hanlder);
	}
	window_handler = window.open(arr_url.join(''), name_win, str_feature);
	if (callback && typeof callback === 'function') {
		interval_hanlder = setInterval(
			function () {
				if (window_handler === null) {
					clearInterval(interval_hanlder);
					window_handler = null;
					interval_hanlder = null;
					return false;
				}
				if (window_handler.closed) {
					clearInterval(interval_hanlder);
					window_handler = null;
					interval_hanlder = null;
					callback();
					return false;
				}
			},
			200
		);
	}
	return window_handler;
};

/**
 * Asyncronously check if you have tied or not.
 * this code should be used by Socialize.js
 * @function
 * @param {function} cb [option] callback function
 * @param {function} eb [option] error back function
 */
Meetup.Twitter.checkTie = function (cb, eb) {
	$.ajax(
		{
			url: Meetup.Data.path_api,
			data: {
				method: 'getTwitterHandleForMember',
				arg_member: Member.id
			},
			success: function (data, successCode, xhr) {
				if (data.length) {
					Meetup.Twitter.hasTied = true;
					Meetup.Twitter.handleName = data;
				}
				else {
					Meetup.Twitter.hasTied = false;
					Meetup.Twitter.handleName = '';
				}
				cb(Meetup.Twitter.handleName);
			},
			error: function (data, successCode, xhr) {
				Meetup.Twitter.hasTied = false;
				Meetup.Twitter.handleName = '';
				if (typeof eb === 'function') {
					eb(data);
				}
			}
		}
	);
};

/**
 * go to Twitter's OAuth flow
 * NOTE: since, this may popup another window, you may wanna call from
 * DOMEvent, such as a click action.  Otherwise, this may be blocked by
 * popup blocker
 * This callback always gets twitter handle name. if empty, the user
 * did not get tied.
 * this code should be used by Socialize.js
 * @function
 * @param {function} cb callback function
 */
Meetup.Twitter.authorize = function (cb) {
	if (typeof cb !== 'function') {
		cb = function() {};
	}
	Meetup.Twitter.checkTie(
		function (data) {
			if (Meetup.Twitter.hasTied) {
				cb(Meetup.Twitter.handleName);
			}
			else {
				openTwitterPopup(
					function() {
						setTimeout(
							function () {
								Meetup.Twitter.checkTie(cb);
							},
							333
						);
					}
				);
			}
		},
		function () {
			alert('Please try again alter');
		}
	);
};

/**
 * private function for open up the popup
 * @function
 * @param {function} cb [option] callback function
 */
var openTwitterPopup = function (cb) {
	if (typeof cb === 'function') {
		callbackTwPopup = cb;
	}
	var screenX     = (typeof window.screenX != 'undefined') ?
		window.screenX :
		window.screenLeft;
	var screenY     = (typeof window.screenY != 'undefined') ?
		window.screenY :
		window.screenTop;
	var outerWidth  = (typeof window.outerWidth != 'undefined') ?
		window.outerWidth :
		document.documentElement.clientWidth;
	var outerHeight = (typeof window.outerHeight != 'undefined') ?
		window.outerHeight :
		(document.documentElement.clientHeight - 22); // 22= IE toolbar height
	var width    = 800;
	var height   = 470;
	var left     = parseInt(screenX + ((outerWidth - width) / 2), 10);
	var top      = parseInt(screenY + ((outerHeight - height) / 2.5), 10);
	var features = [
		'width=', width,
		',height=', height,
		',left=', left,
		',top=', top
	].join('');

	ptWindow = window.open(
		Meetup.Data.path_twitter_tie,
		'twitter',
		features
	);
	var result = ptWindow;
	if (!ptWindow || ptWindow.closed === undefined) {
		alert('Please allow us to popup window on: ' + window.location.host);
		result = null;
	}
	else {
		checkPopupWindow();
	}
	return result;
};

/**
 * private function for polling the status of poped up window
 * @function
 */
var checkPopupWindow = function () {
	if (ptIntervalWindowCheck === null) {
		ptIntervalWindowCheck = setInterval(checkPopupWindow, 100);
	}
	else {
		if (ptWindow.closed) {
			clearInterval(ptIntervalWindowCheck);
			ptIntervalWindowCheck = null;
			if (callbackTwPopup) {
				var cb = callbackTwPopup;
				callbackTwPopup = null;
				setTimeout(cb, 300);
			}
		}
	}
};

})();

$(function(){
/*
 * This is stuff we want to load on DOM Ready in globally (shared across .lazy and regular .js)
 */

	Meetup.GAT.init();
	$(document.body).delegate(".omnCamp", "click", Meetup.omnCamp)
		.delegate(".blurb-more", "click", function(e){
				if (!$(this).hasClass('J_noop')) {
					e.preventDefault();
					var elm = this,
							blurb = elm.parentNode,
							rest = $(blurb.parentNode).find("span.blurb-rest");
					$(blurb).addClass("hide-blurb");
					rest.removeClass("blurb-rest");
				}
		})
		.delegate("a.mufb-login-button", "click", function(e) {
			var $this = $(this);
			Meetup.FB.ready(function() {
				FB.login(
					function(resp) {
						if (!resp || !resp.authResponse) {
							LOG.info('Login canceled');
							return false;
						}
						try {
							var onlogin = $this.data("onlogin");
							if (typeof Meetup.FB[onlogin] === 'function') {
								Meetup.FB[onlogin]();
							}
							else if (typeof window[onlogin] === 'function') {
								window[onlogin]();
							}
							else {
								throw new Error('No login hook found.');
							}
						} catch (e) {
							LOG.error(e + ": This callback needs to be in the Meetup.FB object.");
						}
					},
					{scope: $this.data("scope")}
				);
			});
		}
	);

	var MarkAsSpam = function(ev){
		if (ev) {
			ev.preventDefault();
			ev.stopPropagation();
			ev.returnValue = false;
		}
		var el = ev.target,
				href = el.href,
				successCopy = Meetup.Copy.reportedAsSpam || "Reported as spam";
		var $successEl = $('<span class="sprite sprite_action accept_icon">' + successCopy + ' </span>');
		$successEl.click(
			function (_ev) {
				_ev.preventDefault();
				_ev.returnValue = false;
				$(_ev.target).replaceWith(el);
			}
		);
		var $undo =  $('<a href="#">' + (Meetup.Copy.undo || 'undo') +  '</a>');
		$undo.click(
			function (_ev) {
				_ev.preventDefault();
				_ev.returnValue = false;
				$successEl.replaceWith(el);
			}
		);
		$successEl.append($undo);
		var success = function (r) {
			$(el).replaceWith($successEl);
		};
		var fail = function (r) {
			LOG.error("ERROR: " + r);
		};

		var urlSplit = href.split( "?" ),
			postData = {};

		if (urlSplit.length > 1) {
			postData = parseQueryString(urlSplit[1]);
		}
		Meetup.RemoteApi.post(
			{
				data: postData,
				success: success,
				fail: fail
			}
		);
	};

	$("#C_page").delegate(".D_markAsSpam", "click", MarkAsSpam);

	if ($("#C_langForm")) {
		$("#C_langs").bind("change", function(e){ this.form.submit();});
	}

	if (typeof(Member) != "undefined" && Member.id > 0 && Member.groupCount > 0) {
		Meetup.UserNav.init();
	}
});
