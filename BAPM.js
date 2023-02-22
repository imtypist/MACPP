const secp256k1 = require('noble-secp256k1');
const fs = require('fs');
const crypto = require('crypto');
const { assert } = require('console');

function loadKey(file) {
    // key实际上就是PEM编码的字符串:
    return fs.readFileSync(file, 'utf8');
}

(async () => {

const hash_zero = await secp256k1.utils.sha256("0");
const VID = crypto.randomBytes(32).toString('hex');
const AD = crypto.randomBytes(32).toString('hex');
const TAG = secp256k1.getPublicKey(secp256k1.utils.randomPrivateKey());

/*
asymmetric key
openssl genrsa -aes256 -out rsa-key.pem 2048
openssl rsa -in rsa-key.pem -outform PEM -out rsa-prv.pem
openssl rsa -in rsa-key.pem -outform PEM -pubout -out rsa-pub.pem
*/
let TA_sk = loadKey('./rsa-prv.pem');
let TA_pk = loadKey('./rsa-pub.pem');

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
let enc_VID = crypto.publicEncrypt(TA_pk, VID);
let ts = Date.now().toString();

let M = [PID, enc_VID, Buffer.from(ts)];
const hash_M = await secp256k1.utils.sha256(Buffer.concat(M).toString('hex'));
let signed_M = await secp256k1.sign(hash_M, sk);

const _hash_M = await secp256k1.utils.sha256(Buffer.concat(M).toString('hex'));
let verify_M = secp256k1.verify(signed_M, _hash_M, secp256k1.getPublicKey(sk));
assert(verify_M == true);
let dec_VID = crypto.privateDecrypt(TA_sk, enc_VID);
assert(VID == dec_VID);
console.timeEnd("PID verification and upload");

// PID enrollment and revocation refer to DSMT_eval

})();