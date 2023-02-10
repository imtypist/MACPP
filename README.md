# MACPP

## Experiment Settings

- Intel i7-10700K 16GB RAM
- Ubuntu 20.04

## crypto_ops

- Nodejs v18.13.0

```
----------------------------
hash operation (SHA256)
----------------------------
input size:  32
sha256: 0.798ms
input size:  32
sha256: 0.035ms
input size:  64
sha256: 0.034ms
input size:  128
sha256: 0.035ms
input size:  256
sha256: 0.035ms
input size:  512
sha256: 0.055ms
input size:  1024
sha256: 0.032ms
input size:  2048
sha256: 0.048ms

----------------------------
bilinear pairing operation (bls12-381)
----------------------------
BP: 24.185ms
BP: 21.693ms
BP: 21.826ms
BP: 21.64ms
BP: 20.814ms
BP: 21.082ms

----------------------------
bilinear pairing point multiplication (bls12-381)
----------------------------
BPPM: 0.066ms
BPPM: 0.069ms
BPPM: 0.071ms
BPPM: 0.062ms
BPPM: 0.063ms

----------------------------
bilinear pairing point addition (bls12-381)
----------------------------
BPPA: 0.05ms
BPPA: 0.004ms
BPPA: 0.004ms
BPPA: 0.004ms
BPPA: 0.005ms

----------------------------
bilinear pairing hash to point (bls12-381)
----------------------------
HTP (G1): 3.563ms
HTP (G2): 14.838ms
HTP (G1): 4.059ms
HTP (G2): 10.55ms
HTP (G1): 4.416ms
HTP (G2): 10.138ms
HTP (G1): 4.529ms
HTP (G2): 11.357ms
HTP (G1): 4.354ms
HTP (G2): 10.777ms

----------------------------
ECC point multiplication (bls12-381)
----------------------------
ECCPM: 9.248ms
ECCPM: 7.143ms
ECCPM: 8.499ms
ECCPM: 7.044ms
ECCPM: 8.747ms

----------------------------
ECC point addition (bls12-381)
----------------------------
ECCPA: 0.014ms
ECCPA: 0.015ms
ECCPA: 0.013ms
ECCPA: 0.02ms
ECCPA: 0.021ms

----------------------------
ECC point multiplication (ed25519)
----------------------------
ECCPM: 2.608ms
ECCPM: 3.559ms
ECCPM: 3.192ms
ECCPM: 2.812ms
ECCPM: 2.091ms

----------------------------
ECC point addition (ed25519)
----------------------------
ECCPA: 0.113ms
ECCPA: 0.071ms
ECCPA: 0.069ms
ECCPA: 0.077ms
ECCPA: 0.069ms

----------------------------
ECC point multiplication (secp256k1)
----------------------------
ECCPM: 2.786ms
ECCPM: 2.698ms
ECCPM: 2.979ms
ECCPM: 4.913ms
ECCPM: 3.267ms

----------------------------
ECC point addition (secp256k1)
----------------------------
ECCPA: 0.17ms
ECCPA: 0.12ms
ECCPA: 0.121ms
ECCPA: 0.119ms
ECCPA: 0.119ms

----------------------------
exponetiation operation (RSA 2048)
----------------------------
EP: 1.484ms
EP: 2.307ms
EP: 1.786ms
EP: 2.333ms
EP: 1.474ms
EP: 1.451ms
```