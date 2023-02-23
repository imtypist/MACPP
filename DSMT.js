const secp256k1 = require('noble-secp256k1');
const fs = require('fs');
var crypto = require('crypto');

(async () => {
const hash_zero = await secp256k1.utils.sha256("0");
// console.log(hash_zero);

const hash_null = null;

var logStream = fs.createWriteStream('DSMT_eval_interval10.log', {flags: 'a'});

const n_max = 301;

// initialize SMT 2^h nodes
// 16,20,24 for SMT
h_arr = [12, 16, 20, 24];

for (const h of h_arr) {    
    console.log("h =", h);

    // initialize
    logStream.write("----------------------------\n2^" + h.toString() + " nodes SMT\n----------------------------\n");
    let SMT = [];
    
    // t1 = process.uptime()*1000;
    for (let i = h; i >= 0; i--) {
        let nodes = new Array(2**i).fill(hash_null);
        SMT.push(nodes);
    }
    // t2 = process.uptime()*1000
    // logStream.write("initialize (ms): " + (t2-t1).toString() + "\n");

    let pid_arr = []
    // update ops (including add and revoke)
    smt_time = []
    smt_space = []
    for (let n = 1; n <= n_max; n++) {
        // generate pseudo PIDs
        for (let i = 0; i < n; i++) {
            pid_arr.push(crypto.randomBytes(65).toString('hex')); // PID length 65 bytes
        }
        
        t1 = process.uptime()*1000;

        for (let i = 0; i < h; i++) {

            for (let j = 0; j < Math.ceil(n/2**i); j++) {
                // leaf node update
                if (i == 0) {
                    SMT[i][j] = await secp256k1.utils.sha256(pid_arr[j]);
                    continue;   
                }

                // skip even nodes
                if (j % 2 == 1) {
                    continue;
                }

                // normal case
                let concat_str = [];
                concat_str.push(SMT[i-1][j]);
                if (SMT[i-1][j+1] != null) { // in case that the last node is odd
                    concat_str.push(SMT[i-1][j+1]);
                }
                SMT[i][parseInt(j/2)] = await secp256k1.utils.sha256(Buffer.concat(concat_str).toString('hex'));
            }
        }

        t2 = process.uptime()*1000;
        // precise time stat
        if (n % 10 == 1) {
            smt_time.push(t2-t1);   
        }
        
        let smt_size = 0;
        for (let x = 0; x < SMT.length; x++) {
            for (let y = 0; y < SMT[x].length; y++) {
                if (SMT[x][y] != null) {
                    smt_size += SMT[x][y].length;
                }
            }
        }
        if (n % 10 == 1) {
            smt_space.push(smt_size);
        }
    }

    logStream.write("time (ms): " + smt_time.toString() + "\n");
    logStream.write("storage (bytes): " + smt_space.toString() + "\n");
}

// 0-9 for DSMT
h_arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

let pid_arr = []
// update ops (including add and revoke)
dsmt_time = []
dsmt_space = []
logStream.write("----------------------------\nDSMT\n----------------------------\n");
for (let n = 1; n <= n_max; n++) {
    // generate pseudo PIDs
    for (let i = 0; i < n; i++) {
        pid_arr.push(crypto.randomBytes(65).toString('hex')); // PID length 65 bytes
    }

    let DSMT = [];
    let h;
    for (const hc of h_arr) {
        if (2**hc >= n) {
            for (let i = hc; i >= 0; i--) {
                let nodes = new Array(2**i).fill(hash_null);
                DSMT.push(nodes);
            }
            h = hc + 1;
            break;
        }
    }
    
    t1 = process.uptime()*1000;

    for (let i = 0; i < h; i++) {

        for (let j = 0; j < Math.ceil(n/2**i); j++) {
            // leaf node update
            if (i == 0) {
                DSMT[i][j] = await secp256k1.utils.sha256(pid_arr[j]);
                continue;   
            }

            // skip even nodes
            if (j % 2 == 1) {
                continue;
            }

            // normal case
            let concat_str = [];
            concat_str.push(DSMT[i-1][j]);
            if (DSMT[i-1][j+1] != null) { // in case that the last node is odd
                concat_str.push(DSMT[i-1][j+1]);
            }
            DSMT[i][parseInt(j/2)] = await secp256k1.utils.sha256(Buffer.concat(concat_str).toString('hex'));
        }
    }

    t2 = process.uptime()*1000;
    // precise time stat
    if (n % 10 == 1) {
        dsmt_time.push(t2-t1);
    }

    let dsmt_size = 0;
    for (let x = 0; x < DSMT.length; x++) {
        for (let y = 0; y < DSMT[x].length; y++) {
            if (DSMT[x][y] != null) {
                dsmt_size += DSMT[x][y].length;
            }
        }
    }
    if (n % 10 == 1) {
        dsmt_space.push(dsmt_size);
    }

}

logStream.write("time (ms): " + dsmt_time.toString() + "\n");
logStream.write("storage (bytes): " + dsmt_space.toString() + "\n");

logStream.end();

})();