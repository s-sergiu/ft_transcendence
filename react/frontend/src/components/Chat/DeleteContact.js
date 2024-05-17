import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DeleteContact = ({ contact, onDeleteConfirm }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleDelete = () => {
    console.log('onDeleteConfirm type:', typeof onDeleteConfirm);
    console.log('onDelete in Contacts:', typeof onDelete);
    onDeleteConfirm(contact.id);
    handleClose();
  };

  return (
    <>
      <button onClick={handleShow}>Delete</button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {contact.name}? This action cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteContact;
