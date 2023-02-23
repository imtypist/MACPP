const secp256k1 = require('noble-secp256k1');
const fs = require('fs');
const crypto = require('crypto');
var assert = require('assert');
const ecies = require('eciesjs');

(async () => {

const hash_zero = await secp256k1.utils.sha256("0");
const VID = crypto.randomBytes(32).toString('hex');
const AD = crypto.randomBytes(32).toString('hex');
const TAG = secp256k1.getPublicKey(secp256k1.utils.randomPrivateKey());


let TA_sk = new ecies.PrivateKey();
let TA_pk = TA_sk.publicKey;


// PID generation
console.time("PID generation or update");
let sk = secp256k1.utils.randomPrivateKey();
let PID_1 = Buffer.from(secp256k1.getPublicKey(sk));

const h1 = await secp256k1.utils.sha256(Buffer.from(secp256k1.getSharedSecret(sk, TAG)).toString('hex'));
let PID_2 = Buffer.from((parseInt(VID, 16) ^ parseInt(h1, 16) ^ parseInt(AD, 16)).toString());


let PID = Buffer.concat([PID_1, PID_2]);
console.timeEnd("PID generation or update");

// PID verification
console.time("PID verification and upload");
let enc_VID = ecies.encrypt(TA_pk.toHex(), VID);
let ts = Date.now().toString();

let M = [PID, enc_VID, Buffer.from(ts)];
const hash_M = await secp256k1.utils.sha256(Buffer.concat(M).toString('hex'));
let signed_M = await secp256k1.sign(hash_M, sk);

const _hash_M = await secp256k1.utils.sha256(Buffer.concat(M).toString('hex'));
let verify_M = secp256k1.verify(signed_M, _hash_M, secp256k1.getPublicKey(sk));
assert(verify_M == true);
let dec_VID = ecies.decrypt(TA_sk.toHex(), enc_VID);
assert(VID == dec_VID);
console.timeEnd("PID verification and upload");

// PID enrollment and revocation refer to DSMT_eval

})();