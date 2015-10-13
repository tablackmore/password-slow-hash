'use strict';
var password = require('../password-hash');
var test2 = 'some long random text #€%&/UHGNJTYU/&JUYI(K(/K(K(HSEGRFW DFGHDHB RGEGREGNABERHBS €E RGRW GTY THTRY TRH TRHTR HTR YTR YTRH%#%';
var options = {
	iterations: 3000,
	algorithm: 'sha512',
	saltByteSize: 256,
	hashByteSize: 256
};
password.hash(test2, options, function (err, output) {
	if (!err) {
		console.log(output);

		password.validate(test2, output, function (err, result) {
			console.log(result);
		});
	} else {
		console.error(err);
	}
});

password.hash(test2, function (err, output) {
	if (!err) {
		console.log(output);

		password.validate(test2, output, function (err, result) {
			console.log(result);
		});
	} else {
		console.error(err);
	}
});