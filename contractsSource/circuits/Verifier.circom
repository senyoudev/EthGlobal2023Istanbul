pragma circom 2.1.6;

include "../node_modules/circomlib/circuits/mimcsponge.circom";

template Verifier() {
  signal input vote;
  signal input proposalId;
  signal input address;
  signal output hash;

  component hasher = MiMCSponge(3, 220, 1);
  hasher.ins[0] <== vote;
  hasher.ins[1] <== proposalId;
  hasher.ins[2] <== address;
  hasher.k <== 0;

  hash <==  hasher.outs[0];
}

component main = Verifier();
