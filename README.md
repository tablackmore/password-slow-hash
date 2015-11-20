# password-slow-hash

### Note [scrypt](https://github.com/barrysteyn/node-scrypt) is more secure than this module as it increases memory and processor usage. 

[![Linux Build][travis-image]][travis-url]

Node password hashing, salting and validating methods. 
An async tool using nodes inbuilt crypto library, pbkdf2.

## Installation

```bash
$ npm install password-slow-hash
```

## Example

```js
var password = require('password-slow-hash');

password.hash('myCrazyPassword!', function(err, generatedHash){
	if(err) {
		throw err;
	} else {
		// save generatedHash to users password field in db
	}	
});

password.validate('myCrazyPassword!', usersSavedHash, function(err, isValid){
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

* Utilises nodes inbuilt pbkdf2 functionality for slowing down hash generation
* Cryptographically random salting
* Slow equals password validation

### Defaults

* algorithm: 'sha256'
* saltByteSize: 32
* hashByteSize: 32
* pbkdf2 iterations: 25000
* returnType: 'string'

### Iterations

One of the most important settings is iterations. This determines how long the hash algorithm will take to create the hash. The longer time needed to create the hash the longer it will take to crack the passwords. This number should be optimised on your system so the hash generation takes the longest time you and your users can tolerate. It should be increased as cpu speeds increase to keep your passwords safe.

### Options

One or more of the above defaults can be overridden in an options object sent to the hash function if specific control of the hashing algorithm is required.

```js
var options = {
	algorithm: 'sha512',
	saltByteSize: 64,
	hashByteSize: 64,
	iterations: 35000,
	returnType: 'object'
};

password.hash('my|Cr4zy$PÅssword!', options, function(err, generatedHash){
	if(err) {
		throw err;
	} else {
		// save generatedHash to users password field in db
	}	
});
```

## Tests

  To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm install
$ npm test
```

## License

  [MIT](LICENSE)
  
[travis-image]: https://img.shields.io/travis/tablackmore/password-hash/master.svg?label=linux
[travis-url]: https://travis-ci.org/tablackmore/password-slow-hash
