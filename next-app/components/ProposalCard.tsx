
import { Proposal } from "@/types";
import { Card, CardHeader, CardBody, Chip, Button, Slider } from "@nextui-org/react";

const ProposalCard = ({ proposal }: { proposal: Proposal }) => {
  const { status, title, votesFor, totaleVotes, description, startTime} = proposal;
  const votesOpened = status === "Pending";
  const canDonate = status === "Running";

  return (
    <Card className="max-w-[400px] h-64">
      <CardHeader className="flex gap-5">
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold">{ proposal.title}</p>
          <p className="text-small text-default-500">{proposal.description}</p>
          <div className="flex flex-row justify-start gap-2">
          <Chip color={status === 'Running' ? "success" : status === 'Pending' ? "warning" : "danger"} variant="bordered">
            {proposal.status }
            </Chip>
            
            {
              canDonate && (
                <Chip color="primary" >
                  Donate
                </Chip>
              )
            }
            </div>
        </div>
      </CardHeader>
      <CardBody className="flex justify-end">
        {(!votesOpened && totaleVotes && votesFor) ? (
          <div className="flex flex-row flex-wrap gap-4">
          <div>
            <span className="text-default-500 text-md">Votes: </span>
            <span className="text-md font-bold">{proposal.totaleVotes}</span>
            </div>
            
          <div>
            <span className="text-default-500 font-medium text-small">Votes for: </span>
              <span className="text-md font-bold text-green-500">{proposal.votesFor}</span>
              <Slider
                color="success"
                hideThumb={true}
                isDisabled={true}
                defaultValue={ (votesFor/totaleVotes)*100 }
                className="max-w-sm"
              />
          </div>
          <div>
            <span className="text-default-500 font-medium text-small">Votes against: </span>
              <span className="text-md font-bold text-red-500">{totaleVotes - votesFor}</span>
              <Slider
                color="danger"
                hideThumb={true}
                isDisabled={true}
                defaultValue={ ((totaleVotes - votesFor)/totaleVotes)*100 }
                className="max-w-sm"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-row gap-3">
            <Button color={"success"}  >
              vote for
            </Button>
            <Button color={"warning"} >
              vote against
            </Button>
          </div>
        )}
      </CardBody>
    </Card>
  );
}

export default ProposalCard;