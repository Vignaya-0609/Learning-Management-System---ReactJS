import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteAnnouncementFromJson } from '../slices/AnnouncementSlice';
function DeleteAnnounceModal({show,handleClose,selectedAnnouncement}) {
    const dispatch=useDispatch();
    const handleDelete=()=>{
        dispatch(deleteAnnouncementFromJson(selectedAnnouncement));
        handleClose();
    }
  return (
    <>
    {/* delete modal */}
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Are you Sure?</h5>
        <p>Do you really want to delete this Announcement?</p>   
      </Modal.Body>
      <Modal.Footer>
      <Button variant="secondary"  onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="" className="btn-color" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
    
    </>
  )
}

export default DeleteAnnounceModal