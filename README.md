# password-slow-hash

[![Linux Build][travis-image]][travis-url]

Node password hashing, salting and validating methods. 
An async tool using nodes inbuilt crypto library.

```js
var password = require('password-slow-hash')

password.hash('myCrazyPassword!', function(err, generatedHash){
	if(err) {
		throw err;
	} else {
		// save generatedHash to users password field in db;
	}	
});

password.valdiate('myCrazyPassword!', usersSavedHash, function(err, isValid){
	if(err) {
		throw err;
	} else if(isValid){
		// you are authenticated
	} else {
		//you are not authenticated
	}
});
```

### Features

* Utilises nodes inbuilt pbkdf2 functionality for slowing down generation
* Cryptographically random salting
* Slow equals password validation

### Defaults

* algorithm: 'sha256'
* saltByteSize: 64
* hashByteSize: 64
* pbkdf2 iterations: 25000
* returnType: 'string'

### Iterations

One of the most important settings is iterations. This determines how long the hash algorithm will take to create the hash. The longer time needed to create the hash the longer it will take to crack the passwords. This number should be optimised on your system so the hash generaion takes the longest time you and your users can tolerate. It should be increased as cpu speeds increase to keep your passwords safe.

### Options

One or more of the above defaults can be overided in an options object sent to the hash function if specific control of the hashing algorithm is required.

```js
var options = {
	algorithm: 'sha512',
	saltByteSize: 128,
	hashByteSize: 128,
	iterations: 35000,
	returnType: 'object'
};

password.hash('myCrazyPassword!', options, function(err, result){
	if(err) {
		throw err;
	} else {
		// save result to users password field in db;
	}	
});
```

[travis-image]: https://img.shields.io/travis/tablackmore/password-hash/master.svg?label=linux
[travis-url]: https://travis-ci.org/tablackmore/password-hash
