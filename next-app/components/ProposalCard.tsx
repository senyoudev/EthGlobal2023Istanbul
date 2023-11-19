
import { Proposal } from "@/types";
import { Card, CardHeader, CardBody, Chip, Button, Slider, Divider } from "@nextui-org/react";

const ProposalCard = ({ proposal }: { proposal: Proposal }) => {
  const { status, title, votesFor, totaleVotes, description, startTime, goal, amountRaised} = proposal;
  const votesOpened = status === "Pending";
  const canDonate = status === "Running";
  const isFinished = status === "Finished";

  return (
    <Card className="max-w-[400px] h-72">
      <CardHeader className="flex gap-5">
        <div className="flex flex-col gap-2 mt-3">
          <Chip color={status === 'Running' ? "success" : status === 'Pending' ? "warning" : "danger"} variant="bordered" size="sm">
            {proposal.status }
            </Chip>
          <p className="text-lg font-bold">{ proposal.title}</p>
          <p className="text-small text-default-500">{proposal.description}</p>
          <div className="flex flex-col justify-start gap-2">
            
            {
              canDonate && (
                <div className="flex flex-col gap-1">
                  <Button color="primary" variant="bordered" fullWidth>
                    Donate
                  </Button>
                  <Slider
                    color="primary"
                    hideThumb={true}
                    isDisabled={true}
                    defaultValue={ ((amountRaised||0)/goal)*100 }
                    size="md"
                   
                  />
                </div>
              )
            }
            {
              isFinished && (
                <div className="flex flex-col gap-1">
                  <div>
                    <span className="text-default-700 font-bold text-xs">Raised: </span>
                    <span className="text-sm font-bold text-default-700">{proposal.amountRaised}</span>
                  </div>
                  <Slider
                    color="foreground"
                    hideThumb={true}
                    isDisabled={true}
                    defaultValue={ ((amountRaised||0)/goal)*100 }
                    size="md"
                  />
                </div>
              )
            }
            </div>
        </div>
      </CardHeader>
      <CardBody className="flex justify-end">
        <Divider className="my-3"/>
        {(!votesOpened && totaleVotes && votesFor) ? (
          <div className="flex flex-row flex-wrap justify-around">
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
                size="sm"
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
                size="sm"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-row gap-3 text-white justify-end">
            <Button color={"success"}  >
              vote for
            </Button>
            <Button color={"danger"} >
              vote against
            </Button>
          </div>
        )}
      </CardBody>
    </Card>
  );
}

export default ProposalCard;