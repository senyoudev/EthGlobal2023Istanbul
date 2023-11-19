"use client";

import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea} from "@nextui-org/react";

export default function ProposalModalForm() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [goal, setGoal] = React.useState(0);
  const [url, setUrl] = React.useState("");

  return (
    <>
      <Button onPress={onOpen}>Submit A Proposal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">New proposal</ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  label="Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                  label="Description"
                  onChange={(e) => setDescription(e.target.value)}
                />

                <Input
                  type="number"
                  label="Goal"
                  onChange={(e) => setGoal(Number(e.target.value))}
                />

                <Input
                  type="text"
                  label="Url"
                  onChange={(e) => setUrl(e.target.value)}
                  />

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
