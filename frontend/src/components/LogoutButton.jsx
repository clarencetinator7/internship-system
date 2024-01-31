import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Logout({ callback }) {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOnLogout = () => {
    if (callback) {
      callback();
    }
    fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Logout
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleOnLogout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Logout;
