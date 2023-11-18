// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.18;

contract ProposalHandler {
    error Proposal__Failed_Transfer();
    uint256 currentId = 0;

    // user create proof of vote => update merkle root ( tree )
    // voting duration ends => counting period starts => user can submit their proofs => increment the counting
    mapping(uint256 proposalId => Proposal proposal) proposalIdToProposal;
    mapping(uint256 proposalId => mapping(address owner => uint256 amount)) proposalIdToOwnerOfDonations;
    mapping(uint256 proposalId => uint256 total) proposalIdToTotal;

    constructor() {}

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

    modifier ProposalNotFinished(uint256 proposalId) {
        Proposal memory p = proposalIdToProposal[proposalId];
        require(p.status != ProposalStatus.Finished, "Proposal finished");
        _;
    }

    modifier ProposalIsRunning(uint256 proposalId) {
        Proposal memory p = proposalIdToProposal[proposalId];
        require(p.status == ProposalStatus.Running, "Proposal Not running");
        _;
    }

    modifier ProposalIsOwner(uint256 proposalId) {
        Proposal memory p = proposalIdToProposal[proposalId];
        require(p.owner == msg.sender, "Proposal Not running");
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
        (bool success, ) = payable(p.owner).call{value: amount_to_send}("");
        if (!success) {
            revert Proposal__Failed_Transfer();
        }
    }

    function getProposal(
        uint256 proposalId
    ) public view returns (Proposal memory) {
        return proposalIdToProposal[proposalId];
    }

    function submitVote() public {
        // chi le3ba hna dyal linking vote m3a lproposal
    }
}
