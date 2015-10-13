# password-hash

[![Linux Build][travis-image]][travis-url]

Node password hashing, salting and validating methods. 
An async tool using nodes inbuilt crypto library.

```js
var password = require('password-hash')

password.hash('myCrazyPassword!', function(err, result){
	if(err) {
		throw err;
	} else {
		// save result to users password field in db;
	}	
});

password.valdiate('myCrazyPassword!', oldHash, function(err, isValid){
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

* Utilises nodes inbuilt pbkdf2 functionality
* Random salting
* Robust password protection
* Slow equals password validation

### Defaults

* algorithm: 'sha256'
* saltByteSize: 64
* hashByteSize: 64
* pbkdf2 iterations: 4096
* returnType: 'string'

### Options

One or more of the above defaults can be overided in an options object sent to the hash function if specific control of the hashing algorithm is required.

```js
var options = {
	algorithm: 'sha512',
	saltByteSize: 128,
	hashByteSize: 128,
	iterations: 5000,
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
