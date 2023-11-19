import ProposalCard from "@/components/ProposalCard"
import ProposalModalForm from "@/components/ProposalModalForm";
import { Proposal } from "@/types"

const  getProposals = async() => {
  return [
    {
      id: "abc123",
      title: "New Project Kickoff",
      description: "Initiate the development of our groundbreaking project.",
      startTime: "2023-02-01T09:00:00",
      status: "Pending",
      totaleVotes: 10,
      votesFor: 5
    },
    {
      id: "def456",
      title: "Agile Development Sprint 1",
      description: "Commence the first sprint of our agile development process.",
      startTime: "2023-03-15T10:30:00",
      status: "Running",
      totaleVotes: 15,
      votesFor: 8,
      goal: 1000,
      amountRaised: 590
    },
    {
      id: "ghi789",
      title: "Product Launch Strategy",
      description: "Formulate a comprehensive strategy for the upcoming product launch.",
      startTime: "2023-04-20T14:00:00",
      status: "Pending",
      totaleVotes: 12,
      votesFor: 6
    },
    {
      id: "jkl012",
      title: "Quarterly Review Meeting",
      description: "Conduct a review meeting to assess the progress and plan for the next quarter.",
      startTime: "2023-05-30T11:45:00",
      status: "Finished",
      totaleVotes: 18,
      votesFor: 10,
      goal: 2000,
      amountRaised: 1800
    }
  ] as Proposal[];
}

const Proposal = async () => {
  const proposals = await getProposals()

  return (
    <div className="container">
      <div className="flex flex-row justify-between">
        <h1 className="text-4xl font-bold">Proposals</h1>
        <ProposalModalForm />
      </div>
      <div className="flex flex-col flex-wrap items-center justify-center gap-4 py-8 md:py-10 md:flex-row ">
        {proposals.map(proposal => (
          <ProposalCard key={proposal.id} proposal={proposal} />
          ))}
      </div>
    </div>
  )
}

export default Proposal