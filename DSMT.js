const secp256k1 = require('noble-secp256k1');

(async () => {
const hash_zero = await secp256k1.utils.sha256("0");
// console.log(hash_zero);

const hash_null = null;

const PID_ = Buffer.from(secp256k1.getPublicKey(secp256k1.utils.randomPrivateKey())).toString('hex'); // PID length 65 bytes

// initialize SMT 2^h nodes
let h = 5;
console.log("----------------------------\n2^" + h.toString() + " nodes SMT\n----------------------------");
console.time("initialize");
let SMT = [];
for (let i = h; i >= 0; i--) {
    let nodes = new Array(2**i).fill(hash_null);
    SMT.push(nodes);
}
console.timeEnd("initialize");

// add
console.log("add >>>");
add_time = []
add_space = []
for (let i = 0; i < SMT[0].length; i++) {
    t1 = process.uptime()*1000;
    SMT[0][i] = await secp256k1.utils.sha256(PID_);
    let index = i;
    for (let j = 1; j <= h; j++) {
        let is_even = index % 2 == 0 ? 0 : 1;
        let concat_str = [];

        if (is_even) {
            if (SMT[j-1][index-1] != null) {
                concat_str.push(SMT[j-1][index-1]);
            }
            concat_str.push(SMT[j-1][index]);
        }else {
            concat_str.push(SMT[j-1][index]);
            if (SMT[j-1][index+1] != null) {
                concat_str.push(SMT[j-1][index+1]);
            }
        }

        index = parseInt(index/2);
        SMT[j][index] = await secp256k1.utils.sha256(Buffer.concat(concat_str).toString('hex'));
    }
    t2 = process.uptime()*1000
    // precise time stat
    if (add_time.length == 0) {
        add_time.push(t2-t1);
    } else {
        add_time.push(t2-t1 + add_time[add_time.length-1]);
    }

    let smt_space = 0;
    for (let x = 0; x < SMT.length; x++) {
        for (let y = 0; y < SMT[x].length; y++) {
            if (SMT[x][y] != null) {
                smt_space += SMT[x][y].length;
            }
        }
    }
    add_space.push(smt_space);
}
console.log("time (ms):", add_time);
console.log("space (bytes):", add_space);

// revoke
console.log("revoke >>>")
revoke_time = []
revoke_space = []
for (let i = 0; i < SMT[0].length; i++) {
    t1 = process.uptime()*1000;
    SMT[0][i] = hash_zero;
    let index = i;
    for (let j = 1; j <= h; j++) {
        let is_even = index % 2 == 0 ? 0 : 1;
        let concat_str = [];

        if (is_even) {
            if (SMT[j-1][index-1] != null) {
                concat_str.push(SMT[j-1][index-1]);
            }
            concat_str.push(SMT[j-1][index]);
        }else {
            concat_str.push(SMT[j-1][index]);
            if (SMT[j-1][index+1] != null) {
                concat_str.push(SMT[j-1][index+1]);
            }
        }

        index = parseInt(index/2);
        SMT[j][index] = await secp256k1.utils.sha256(Buffer.concat(concat_str).toString('hex'));
    }
    t2 = process.uptime()*1000
    // precise time stat
    if (revoke_time.length == 0) {
        revoke_time.push(t2-t1);
    } else {
        revoke_time.push(t2-t1 + revoke_time[revoke_time.length-1]);
    }

    let smt_space = 0;
    for (let x = 0; x < SMT.length; x++) {
        for (let y = 0; y < SMT[x].length; y++) {
            if (SMT[x][y] != null) {
                smt_space += SMT[x][y].length;
            }
        }
    }
    revoke_space.push(smt_space);
}
console.log("time (ms):", revoke_time);
console.log("space (bytes):", revoke_space);

})();