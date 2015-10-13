var assert = require("assert");
var password = require('../password-hash');


var previousOutput = [{
	hash: 'sha256:4096:e833bfe42d38ef65447dc6c04314acf4264e78b677509f3a57612ab0a7c2ac4d8f1a5e95c3ef534500691603966d0d914ceb8a86d9d263e6eb412ca520521dcf:50f867f8574487bee799f2c962fa8532e87755d9001ad715f4023ca0b4ea83aadda1e1d8291d60d973388be8a04f5a0efc1af2cb13f32a4bbfa89908139f71f9',
	password: 'Rg3248-!arTz#4~&'
}, {
	hash: 'sha256:4096:8c6c5b4653889516bf4b12a8fc497839359a58db10463aeabd3d2303ec6f58445c7d8d5f93334bf41fdbb5a59498d51587f5fcd7004c8d8b6a694296a8587ca8:45bf9689f38784166f380be7031d2ad14bce62cf78576a4368564f5e966ba3cb7d64053f221f55b01da2423ad5acea367789e33280e397c5a8b00e3035249e0e',
	password: 'RedRidingHood###Jumping%%Backwards'
}, {
	hash: 'sha512:1000:7f693c276914036c7757496e4bd354ae4f9a4a8c4fc743992a347d52a4d5051147a9ef3c9daa6b18247e6b1ece98105881b9576b01f4f67bd14b2268b568d406:c6f7bc4f7cc7f6e776d064b7bd92ae45bdc3eecd2ae6f9b76f4cbc50089d36557673214f872270fac6de3c0bd69cb321bf4082cbd03c93a29720f5b97d1c5969',
	password: 'password€%&KR4CK3R'
}, {
	hash: 'sha256:1000:fba89aa8f1134aaa5c5517991f1f016ba17c36e721560cb8:abbb318cfabf005b4d473415be53cca81f560653333f6719bea5ec8c5119f4a68bf3008e3c015558cf9fc63898a8cfddfaea46c0c232e818d746d07bacadd6ee',
	password: 'running-R3d'
}, {
	hash: {
		pbkdf2: {
			iterations: 1000,
			algorithm: 'sha256'
		},
		salt: 'a04475b94e93cf57ff5c85edcd43e5f2d61342fa5d71506b',
		hash: '1816c8f4575c1552a129da71529fa0354d2b96fa23153a7724463831b5fe15a94da058b83202a3dc9c9eacea1ef06ad0b22a9dc193be6ddd18bd8d12367d459c'
	},
	password: 'dancing-with-wolves-52%'
}];

describe('password-hash', function () {
	describe('hash()', function () {
		it('should hash without error', function (done) {
			password.hash('test', done);
		});
		it('should not return the same hash for the same password', function (done) {
			password.hash('test', function (err, result) {
				if (err) throw err;
				password.hash('test', function (err, result2) {
					if (err) throw err;
					assert.notEqual(result, result2);
					done();
				});
			});
		});
	});

	describe('validate()', function () {
		it('should return true if the password is the same as the one saved when hashing', function (done) {
			password.hash('testPasword%', function (err, result) {
				if (err) throw err;
				password.validate('testPasword%', result, function (ex, theSame) {
					assert.ok(theSame);
					done(ex);
				});
			});
		});
		it('should return false if the password is not same as the one saved when hashing', function (done) {
			password.hash('testPasword%', function (err, result) {
				if (err) throw err;
				password.validate('testPasword2%', result, function (ex, theSame) {
					var different = !theSame;
					assert.ok(different);
					done(ex);
				});
			});
		});
		it('should be compatible with previously saved hashes', function (done) {
			var completed = 0;
			for (var i = 0; i < previousOutput.length; i++) {
				password.validate(previousOutput[i].password, previousOutput[i].hash, function (ex, theSame) {
					if (ex) throw ex;
					assert.ok(theSame);
					completed += 1;
					if (completed === previousOutput.length) {
						done(ex);
					}
				});
			}

		});

	});
});