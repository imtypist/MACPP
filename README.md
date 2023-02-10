# BMAC

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
sha256: 0.851ms
input size:  32
sha256: 0.026ms
input size:  64
sha256: 0.023ms
input size:  128
sha256: 0.022ms
input size:  256
sha256: 0.037ms
input size:  512
sha256: 0.026ms
input size:  1024
sha256: 0.033ms
input size:  2048
sha256: 0.031ms

----------------------------
bilinear pairing operation (bls12-381)
----------------------------
BP: 25.332ms
BP: 21.812ms
BP: 21.247ms
BP: 21.414ms
BP: 20.86ms
BP: 21.313ms

----------------------------
bilinear pairing point multiplication (bls12-381)
----------------------------
BPPM: 0.067ms
BPPM: 0.069ms
BPPM: 0.07ms
BPPM: 0.092ms
BPPM: 0.065ms

----------------------------
bilinear pairing point addition (bls12-381)
----------------------------
BPPA: 0.048ms
BPPA: 0.005ms
BPPA: 0.004ms
BPPA: 0.005ms
BPPA: 0.006ms

----------------------------
bilinear pairing hash to point (bls12-381)
----------------------------
HTP (G1): 3.914ms
HTP (G2): 12.983ms
HTP (G1): 3.635ms
HTP (G2): 12.602ms
HTP (G1): 2.984ms
HTP (G2): 12.718ms
HTP (G1): 2.967ms
HTP (G2): 10.623ms
HTP (G1): 5.151ms
HTP (G2): 11.104ms

----------------------------
ECC point multiplication (bls12-381)
----------------------------
ECCPM: 8.387ms
ECCPM: 8.669ms
ECCPM: 7.543ms
ECCPM: 9.665ms
ECCPM: 6.751ms

----------------------------
ECC point addition (bls12-381)
----------------------------
ECCPA: 0.024ms
ECCPA: 0.014ms
ECCPA: 0.022ms
ECCPA: 0.013ms
ECCPA: 0.013ms

----------------------------
ECC point multiplication (secp256k1)
----------------------------
ECCPM: 2.883ms
ECCPM: 2.669ms
ECCPM: 3.045ms
ECCPM: 4.678ms
ECCPM: 4.333ms

----------------------------
ECC point addition (secp256k1)
----------------------------
ECCPA: 0.196ms
ECCPA: 0.138ms
ECCPA: 0.126ms
ECCPA: 0.125ms
ECCPA: 0.134ms

----------------------------
exponetiation operation (RSA 2048)
----------------------------
EP: 1.497ms
EP: 1.418ms
EP: 1.416ms
EP: 1.412ms
EP: 1.414ms
EP: 1.407ms
```