const secp256k1 = require('noble-secp256k1');
var assert = require('assert');
const crypto = require('crypto');
const bls = require('@noble/bls12-381');
const ed25519 = require('@noble/ed25519');

(async () => {

console.log("----------------------------\nhash operation (SHA256)\n----------------------------")
let _str = Buffer.from(secp256k1.utils.randomPrivateKey()); // 32 bytes
let sha256_hash;
for (let i = 0; i < 8; i++) {
	console.log("input size: ", _str.length);
	console.time("sha256")
	sha256_hash = await secp256k1.utils.sha256(_str.toString('hex'));
	console.timeEnd("sha256")
	// console.log("hash: ", sha256_hash)
	if (i == 0) {
		continue; // discard the first round execution, hot start
	}
	_str = [_str, _str];
	_str = Buffer.concat(_str);
}

console.log("\n----------------------------\nbilinear pairing operation (bls12-381)\n----------------------------")
let pairings = [];

for (let index = 0; index < 6; index++) {
	bls_g1 = bls.PointG1.fromPrivateKey(bls.utils.randomPrivateKey());
	bls_g2 = bls.PointG2.fromPrivateKey(bls.utils.randomPrivateKey());	
	console.time("BP")
	_output = bls.pairing(bls_g1, bls_g2);
	console.timeEnd("BP")
	pairings.push(_output);
}

console.log("\n----------------------------\nbilinear pairing point multiplication (bls12-381)\n----------------------------")


for (let index = 0; index < 5; index++) {
	console.time("BPPM")
	_output = pairings[index].multiply(pairings[index+1]);
	console.timeEnd("BPPM")
}

console.log("\n----------------------------\nbilinear pairing point addition (bls12-381)\n----------------------------")

for (let index = 0; index < 5; index++) {
	console.time("BPPA")
	_output = pairings[index].add(pairings[index+1])
	console.timeEnd("BPPA")
}

console.log("\n----------------------------\nbilinear pairing hash to point (bls12-381)\n----------------------------")

for (let index = 0; index < 5; index++) {
	console.time("HTP (G1)")
	_output = await bls.PointG1.hashToCurve(sha256_hash);
	console.timeEnd("HTP (G1)")
	console.time("HTP (G2)")
	_output= await bls.PointG2.hashToCurve(sha256_hash);
	console.timeEnd("HTP (G2)")
}

console.log("\n----------------------------\nECC point multiplication (bls12-381)\n----------------------------")
for (let index = 0; index < 5; index++) {
	bls_p1 = bls.PointG1.fromPrivateKey(bls.utils.randomPrivateKey());	
	console.time("ECCPM")
	bls_p1.multiply(2n);
	console.timeEnd("ECCPM")
}

console.log("\n----------------------------\nECC point addition (bls12-381)\n----------------------------")
for (let index = 0; index < 5; index++) {
	bls_p1 = bls.PointG1.fromPrivateKey(bls.utils.randomPrivateKey());
	bls_p2 = bls.PointG1.fromPrivateKey(bls.utils.randomPrivateKey());
	console.time("ECCPA")
	bls_p1.add(bls_p2);
	console.timeEnd("ECCPA")
}


let x_sk = ed25519.utils.randomPrivateKey();
let x = await ed25519.Point.fromPrivateKey(x_sk);

let y_sk = ed25519.utils.randomPrivateKey();
let y = await ed25519.Point.fromPrivateKey(y_sk);

console.log("\n----------------------------\nECC point multiplication (ed25519)\n----------------------------")
for (let index = 0; index < 5; index++) {
	console.time("ECCPM")
	x.multiply(2n);
	console.timeEnd("ECCPM")
}

console.log("\n----------------------------\nECC point addition (ed25519)\n----------------------------")
for (let index = 0; index < 5; index++) {
	console.time("ECCPA")
	x.add(y);
	console.timeEnd("ECCPA")
}


x_sk = secp256k1.utils.randomPrivateKey();
x = secp256k1.Point.fromPrivateKey(x_sk);

y_sk = secp256k1.utils.randomPrivateKey();
y = secp256k1.Point.fromPrivateKey(y_sk);

console.log("\n----------------------------\nECC point multiplication (secp256k1)\n----------------------------")
for (let index = 0; index < 5; index++) {
	console.time("ECCPM")
	x.multiply(2n);
	console.timeEnd("ECCPM")
}

console.log("\n----------------------------\nECC point addition (secp256k1)\n----------------------------")
for (let index = 0; index < 5; index++) {
	console.time("ECCPA")
	x.add(y);
	console.timeEnd("ECCPA")
}


console.log("\n----------------------------\nexponetiation operation (RSA 2048)\n----------------------------")

// Generate Alice's keys...
const alice = crypto.createDiffieHellman(2048);
const aliceKey = alice.generateKeys();

// Generate Bob's keys...
const bob = crypto.createDiffieHellman(alice.getPrime(), alice.getGenerator());
const bobKey = bob.generateKeys();

let aliceSecret;
let bobSecret;
// Exchange and generate the secret...
for (let index = 0; index < 3; index++) {
	console.time("EP")
	aliceSecret = alice.computeSecret(bobKey);
	console.timeEnd("EP")
	console.time("EP")
	bobSecret = bob.computeSecret(aliceKey);
	console.timeEnd("EP")
}

// OK
assert.strictEqual(aliceSecret.toString('hex'), bobSecret.toString('hex'));

})();
