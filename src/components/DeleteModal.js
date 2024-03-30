import React from 'react'
import { Modal,Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteQuestionFromJson } from '../slices/QuestionSlice';
function DeleteModal({show,handleClose}) {
    const selectedQuestion=useSelector((state)=>state.question.selectedQuestion);
    const dispatch=useDispatch();
    const handleDelete=()=>{
      dispatch(deleteQuestionFromJson(selectedQuestion));
      handleClose()
    }
  return (
    <> 
     {/* delete modal */}
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h5>Are you Sure?</h5>
        <p>Do you really want to delete?</p> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="" className='btn-color' onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    
    </>
  )
}

export default DeleteModal