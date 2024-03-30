import React from 'react'
import { Modal,Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { deleteMaterialFromJson } from '../slices/MaterialSlice';
function DeleteMaterial({show,handleClose,selectedmaterial}) {
    const dispatch=useDispatch();
    // console.log(selectedmaterial)
    const deleteMaterial = () => {
      if (!selectedmaterial || !selectedmaterial.id) {
        console.error("Invalid selected material:", selectedmaterial);
        return;
      }
        dispatch(deleteMaterialFromJson(selectedmaterial));
        handleClose();
    };
  return (
    <>
     {/* delete modal */}
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h5>Are you Sure?</h5>
        <p>Do you really want to delete this Post?</p> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="" className='btn-color' onClick={deleteMaterial}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteMaterial