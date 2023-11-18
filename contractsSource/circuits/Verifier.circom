pragma circom 2.1.6;

include "MerkleTreeChecker.circom";

template Verifier(levels) {
  signal input vote;
  signal input commitment;
  signal input pathElements[levels];
  signal input pathIndices[levels];
  signal output voteDecision;
  signal output root;
 
  component merkleTreeChecker = MerkleTreeChecker(levels);


    merkleTreeChecker.leaf <== commitment;
    for (var i = 0; i < levels; i++) {
        merkleTreeChecker.pathElements[i] <== pathElements[i];
        merkleTreeChecker.pathIndices[i] <== pathIndices[i];
    }

    voteDecision <== vote;
    root <== merkleTreeChecker.root;
}

component main = Verifier(70);