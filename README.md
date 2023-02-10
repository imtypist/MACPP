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
sha256: 0.722ms
input size:  32
sha256: 0.03ms
input size:  64
sha256: 0.028ms
input size:  128
sha256: 0.021ms
input size:  256
sha256: 0.027ms
input size:  512
sha256: 0.031ms
input size:  1024
sha256: 0.034ms
input size:  2048
sha256: 0.036ms

----------------------------
bilinear pairing operation (bls12-381)
----------------------------
BP: 24.946ms
BP: 21.991ms
BP: 21.931ms
BP: 25.748ms
BP: 20.774ms
BP: 21.831ms

----------------------------
bilinear pairing point multiplication (bls12-381)
----------------------------
BPPM: 0.067ms
BPPM: 0.07ms
BPPM: 0.068ms
BPPM: 0.065ms
BPPM: 0.063ms

----------------------------
bilinear pairing point addition (bls12-381)
----------------------------
BPPA: 0.051ms
BPPA: 0.005ms
BPPA: 0.005ms
BPPA: 0.005ms
BPPA: 0.006ms

----------------------------
bilinear pairing hash to point (bls12-381)
----------------------------
HTP (G1): 3.658ms
HTP (G2): 14.448ms
HTP (G1): 4.516ms
HTP (G2): 10.46ms
HTP (G1): 5.014ms
HTP (G2): 10.216ms
HTP (G1): 4.806ms
HTP (G2): 10.995ms
HTP (G1): 4.369ms
HTP (G2): 11.877ms

----------------------------
ECC point multiplication (bls12-381)
----------------------------
ECCPM: 9.505ms
ECCPM: 7.534ms
ECCPM: 8.608ms
ECCPM: 8.264ms
ECCPM: 7.465ms

----------------------------
ECC point addition (bls12-381)
----------------------------
ECCPA: 0.014ms
ECCPA: 0.013ms
ECCPA: 0.024ms
ECCPA: 0.021ms
ECCPA: 0.013ms

----------------------------
ECC point multiplication (ed25519)
----------------------------
ECCPM: 3.559ms
ECCPM: 3.344ms
ECCPM: 2.177ms
ECCPM: 2.855ms
ECCPM: 2.169ms

----------------------------
ECC point addition (ed25519)
----------------------------
ECCPA: 0.158ms
ECCPA: 0.116ms
ECCPA: 0.112ms
ECCPA: 0.112ms
ECCPA: 0.111ms

----------------------------
ECC point multiplication (secp256k1)
----------------------------
ECCPM: 2.754ms
ECCPM: 2.776ms
ECCPM: 3.872ms
ECCPM: 5.126ms
ECCPM: 4.311ms

----------------------------
ECC point addition (secp256k1)
----------------------------
ECCPA: 0.116ms
ECCPA: 0.068ms
ECCPA: 0.067ms
ECCPA: 0.067ms
ECCPA: 0.068ms

----------------------------
exponetiation operation (RSA 2048)
----------------------------
EP: 1.466ms
EP: 1.375ms
EP: 1.478ms
EP: 1.415ms
EP: 1.796ms
EP: 2.336ms
```
