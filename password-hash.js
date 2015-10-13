/*!
 * password-hash
 * Copyright(c) 2015 Tom Blackmore
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var crypto = require('crypto');

/*
	Defaults for hashing algorithm
*/
var defaults = {
	algorithm: 'sha256',
	saltByteSize: 64,
	hashByteSize: 64,
	iterations: 4096,
	returnType: 'string',
	delimiter: '$'
};

var app = exports = module.exports = {};

// Compares two strings a and b in length-constant time. 
function slowEquals(a, b) {
	var diff = a.length ^ b.length;
	for (var i = 0; i < a.length && i < b.length; i++) {
		diff |= a[i] ^ b[i];
	}
	return diff === 0;
}

function passwordStringToObject(password) {
	var passComponents = password.split(defaults.delimiter);
	return {
		hash: passComponents[3],
		salt: passComponents[2],
		pbkdf2: {
			algorithm: passComponents[0],
			iterations: parseInt(passComponents[1], 10)
		}
	};
}

app.hash = function createHashObj(password, options, func) {
	// clone the defaults to settings
	var settings = JSON.parse(JSON.stringify(defaults));

	switch (typeof options) {
	case 'function':
		func = options;
		break;
	case 'object':
		settings.algorithm = options.algorithm || settings.algorithm;
		settings.saltByteSize = options.saltByteSize || settings.saltByteSize;
		settings.hashByteSize = options.hashByteSize || settings.hashByteSize;
		settings.iterations = options.iterations || settings.iterations;
		settings.returnType = options.returnType || settings.returnType;
		break;
	}

	crypto.randomBytes(settings.saltByteSize, function (ex, salt) {
		if (ex) {
			func(ex);
		} else {
			crypto.pbkdf2(password, salt, settings.iterations, settings.hashByteSize, settings.algorithm, function (err, key) {
				var result;
				if (ex) {
					func(ex);
				} else {
					if (settings.returnType === 'string') {
						result = settings.algorithm + defaults.delimiter + settings.iterations + defaults.delimiter + salt.toString('hex') + defaults.delimiter + key.toString('hex');
					} else {
						result = {
							pbkdf2: {
								iterations: settings.iterations,
								algorithm: settings.algorithm
							},
							salt: salt.toString('hex'),
							hash: key.toString('hex')
						};
					}
					func(err, result);
				}
			});
		}
	});
};

app.validate = function validate(password, correctPasswordObj, func) {
	if (typeof correctPasswordObj === 'string') {
		correctPasswordObj = passwordStringToObject(correctPasswordObj);
	}
	var hashByteSize = correctPasswordObj.hash.length / 2;

	crypto.pbkdf2(password, new Buffer(correctPasswordObj.salt, 'hex'), correctPasswordObj.pbkdf2.iterations, hashByteSize, correctPasswordObj.pbkdf2.algorithm, function (err, key) {
		if (err) {
			func(err);
		} else {
			var hash = key.toString('hex');
			func(err, slowEquals(correctPasswordObj.hash, hash));
		}
	});
};