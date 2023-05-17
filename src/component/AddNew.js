import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { addNewUser } from "../Service/userService";
import { ToastContainer, toast } from "react-toastify";
function AddNew(props) {
  const { show, handleClose, handleUpdateTable } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const handleSaveUser = async () => {
    let res = await addNewUser(name, job);
    if (res && res.id) {
      handleClose();
      setJob("");
      setName("");
      handleUpdateTable({ first_name: name, id: res.id });
      toast.success("Successfully");
    } else {
      toast.error("Fail");
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label htmlFor="inputName">Name</Form.Label>
        <Form.Control
          id="inputName"
          onChange={(event) => setName(event.target.value)}
        />
        <Form.Label htmlFor="inputJob">Job</Form.Label>
        <Form.Control
          id="inpuJob"
          onChange={(event) => setJob(event.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveUser}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default AddNew;
