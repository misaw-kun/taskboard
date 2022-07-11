import { useState } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";

import { Plus, ListCheck } from "react-bootstrap-icons";

import "./list-modal.scoped.css";

export default function ListModal({ onAdd }) {
  const [show, setShow] = useState(false);
  const [empty, setEmpty] = useState("");
  const [list, setList] = useState({
    title: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setEmpty("");
    setShow(true);
  };

  function handleChange(e) {
    const { name, value } = e.target;

    setList((prevList) => {
      return {
        ...prevList,
        [name]: value,
      };
    });
  }

  function makeList(e) {
    if (list.title === "") {
      setEmpty("atleast give your list a name 😾!");
    } else {
      setEmpty("");
      onAdd(list);
      setList({
        title: "",
      });
      e.preventDefault();
      handleClose();
    }
  }

  return (
    <>
      <Button variant="secondary" onClick={handleShow} className="fab">
        <Plus size={96} className="fab" />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title style={{ fontWeight: "bold" }}>
            <ListCheck size={32} /> {"create_a_list"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>name_your_list_below 👇</Form.Label>
            {empty && <Alert variant="warning">{empty}</Alert>}
            <Form.Control
              name="title"
              type="text"
              size="sm"
              placeholder="eg: my bucketlist 🦄"
              onChange={handleChange}
              value={list.title}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            discard
          </Button>
          <Button variant="success" onClick={makeList}>
            make it!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
