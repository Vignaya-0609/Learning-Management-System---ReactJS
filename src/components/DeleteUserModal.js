import React, {useState,useEffect} from 'react'
import { Modal, Button } from 'react-bootstrap';
import {useDispatch,useSelector } from 'react-redux';
import { deleteUserFromJson } from '../slices/UserSlice';

function DeleteUserModal({show,handleClose}) {
    const [id,setId]=useState("");
    const {selectedUser}=useSelector((state)=>state.user);
  const dispatch=useDispatch();
  useEffect(()=>{
    if(Object.keys(selectedUser).length!==0){
      setId(selectedUser.id);
    }
  },[selectedUser]);

  const deleteUser=()=>{
    dispatch(deleteUserFromJson({id}));
    handleClose();
  }
  return (
    <>
     {/* delete modal */}
    <Modal show={show} onHide={handleClose} key={id}>
      <Modal.Header closeButton>
        <Modal.Title>Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Are you Sure?</h5>
        <p>Do you really want to delete this User?</p>   
      </Modal.Body>
      <Modal.Footer>
      <Button variant="secondary"  onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="" className="btn-color" onClick={deleteUser}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}

export default DeleteUserModal