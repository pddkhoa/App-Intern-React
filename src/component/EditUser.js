import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { addNewUser } from "../Service/userService";
import { ToastContainer, toast } from "react-toastify";
import { updateUser } from "../Service/userService";
function EditUser(props) {
  const { show, handleClose, handldeEditUser, dataUserEdit } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleEdit = async () => {
    let res = await updateUser(name, job);
    console.log(res);
    if (res && res.updatedAt) {
      handldeEditUser({
        first_name: name,
        id: dataUserEdit.id,
      });
      handleClose();
      toast.success("Update Successfully");
    }
  };
  useEffect(() => {
    if (show) {
      setName(dataUserEdit.first_name);
    }
  }, [dataUserEdit]);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label htmlFor="inputName">Name</Form.Label>
        <Form.Control
          id="inputName"
          value={name}
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
        <Button variant="primary" onClick={handleEdit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default EditUser;
