import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

enum Status {
  Pending = "Pending",
  Running = "Running",
  Finished = "Finished"
}

export interface Proposal{
  id: string;
  title: string;
  description: string;
  startTime: string;
  status: Status;
  totaleVotes?: number;
  votesFor?: number;
}