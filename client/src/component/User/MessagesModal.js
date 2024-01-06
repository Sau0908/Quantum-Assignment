import React from "react";
import { Modal, Button } from "react-bootstrap";

const MessagesModal = ({ show, handleClose, messages }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Messages</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MessagesModal;
