import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import { useDispatch} from 'react-redux';
import { deletecourseFromJson } from '../slices/CourseSlice';

function DeleteCourseModal({show,handleClose,selectedcourse}) {
    const dispatch=useDispatch();
    const handleDelete=()=>{
        dispatch(deletecourseFromJson(selectedcourse));
        handleClose();
    }
  return ( 
    <>
     {/* delete modal */}
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Course</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Are you Sure?</h5>
        <p>Do you really want to delete this Course?</p>   
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

export default DeleteCourseModal