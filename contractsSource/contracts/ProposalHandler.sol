// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.18;

import './Dao.sol';
import {Groth16Verifier} from './verifier.sol';

contract ProposalHandler {
  error Proposal__Failed_Transfer();
  uint256 currentId = 0;
  Dao _dao;

  address constant KEEPER = 0x90F79bf6EB2c4f870365E785982E1f101E93b906;

  // user create proof of vote => update merkle root ( tree )
  // voting duration ends => counting period starts => user can submit their proofs => increment the counting
  mapping(uint256 proposalId => Proposal proposal) proposalIdToProposal;
  mapping(uint256 proposalId => mapping(address owner => uint256 amount)) proposalIdToOwnerOfDonations;
  mapping(uint256 proposalId => uint256 total) proposalIdToTotal;
  mapping(uint256 proposalId => address[] winners) proposalIdToWinners;
  mapping(string key => Proof[] proofs) Proofs;
  Groth16Verifier _verifier;

  constructor(address _daoAddress) {
    _dao = Dao(_daoAddress);
    _verifier = new Groth16Verifier();
  }

  enum ProposalStatus {
    Pending,
    Running,
    Finished
  }
  struct Proposal {
    string name;
    address owner;
    string description;
    string uri;
    uint256 goal;
    uint256 blocktime;
    ProposalStatus status;
  }

  struct Proof {
    uint[2] a;
    uint[2][2] b;
    uint[2] c;
    uint[2] input;
    address owner;
  }
  modifier ProposalNotFinished(uint256 proposalId) {
    Proposal memory p = proposalIdToProposal[proposalId];
    require(p.status != ProposalStatus.Finished, 'Proposal finished');
    _;
  }

  modifier ProposalIsRunning(uint256 proposalId) {
    Proposal memory p = proposalIdToProposal[proposalId];
    require(p.status == ProposalStatus.Running, 'Proposal Not running');
    _;
  }

  modifier ProposalIsOwner(uint256 proposalId) {
    Proposal memory p = proposalIdToProposal[proposalId];
    require(p.owner == msg.sender, 'Proposal Not running');
    _;
  }

  modifier onlyDao() {
    require(msg.sender == address(_dao), 'Not from dao');
    _;
  }

  modifier onlyKeeper() {
    require(msg.sender == address(KEEPER), 'Not from KEEPER');
    _;
  }

  function createProposal(
    string memory name,
    string memory description,
    string memory uri,
    uint256 goal
  ) public {
    Proposal memory prop = Proposal(
      name,
      msg.sender,
      description,
      uri,
      goal,
      block.timestamp,
      ProposalStatus.Pending
    );
    proposalIdToProposal[currentId++] = prop;
  }

  function donate(
    uint256 proposalId
  ) public payable ProposalIsRunning(proposalId) {
    require(msg.value > 0, "Can't donate zero");
    proposalIdToOwnerOfDonations[proposalId][msg.sender] += msg.value;
    proposalIdToTotal[proposalId] += msg.value;
  }

  function withdrawFunds(
    uint256 proposalId
  ) public ProposalIsRunning(proposalId) ProposalIsOwner(proposalId) {
    Proposal memory p = proposalIdToProposal[proposalId];
    uint256 amount_to_send = proposalIdToTotal[proposalId];
    proposalIdToTotal[proposalId] = 0;
    proposalIdToProposal[proposalId].status = ProposalStatus.Finished;
    (bool success, ) = payable(p.owner).call{value: amount_to_send}('');
    if (!success) {
      revert Proposal__Failed_Transfer();
    }
  }

  function getProposal(
    uint256 proposalId
  ) public view returns (Proposal memory) {
    return proposalIdToProposal[proposalId];
  }

  function getDonationAmount(uint proposalId) public view returns (uint256) {
    return proposalIdToTotal[proposalId];
  }

  function getWinners(
    uint256 proposalId
  ) public view returns (address[] memory) {
    return proposalIdToWinners[proposalId];
  }

  function _submitVote(
    string memory key,
    uint[2] memory a,
    uint[2][2] memory b,
    uint[2] memory c,
    uint[2] memory input,
    address owner
  ) public onlyDao {
    Proofs[key].push(Proof(a, b, c, input, owner));
  }

  function updateVotes(
    uint256 proposalId,
    string memory key
  ) public onlyKeeper {
    Proof[] memory proofs = Proofs[key];
    for (uint256 i = 0; i < proofs.length; i++) {
      Proof memory p = proofs[i];
      bool res = _verifier.verifyProof(p.a, p.b, p.c, [p.input[0]]);
      if (res) {
        proposalIdToWinners[proposalId].push(p.owner);
      } else {
        // do something to these people
      }
    }
  }
}
