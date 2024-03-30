import React from 'react'
import { useState,useEffect } from 'react';
import { Modal,Button,Form } from 'react-bootstrap';
import {  useDispatch, useSelector } from 'react-redux';
import { deleteTopicFromJson, updateTopicToJson } from '../slices/TopicSlice';
function EditTopicModal({ show, onHide }) {
    const [topic, setTopic] = useState('');
    const [id,setId]=useState('');
    const [topicError,setTopicError]=useState('');
    const {selectedTopic}=useSelector((state)=>state.topic);
    // console.log(selectedTopic);
    let dispatch=useDispatch();
    useEffect(()=>{
      if(selectedTopic && Object.keys(selectedTopic).length!==0){
        setTopic(selectedTopic.name)
        setId(selectedTopic.id);

      }
    },[selectedTopic])
    const handleSaveChanges = () => {
      if(topic.trim()!==""){
        dispatch(updateTopicToJson({id,name:topic}));
        onHide();
      }
      else{
        setTopicError("required field");
        // console.log("error in edit topic")
      }
      
    };
    const handleDeleteTopic = () => {
      dispatch(deleteTopicFromJson(selectedTopic));
      onHide();
    };
  return (
    <>
     <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Topic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Topic</Form.Label>
        <Form.Control type="text" placeholder="Enter text" value={topic} onChange={(e) => setTopic(e.target.value)} />
        <span className='text-danger'>{topicError}</span>
      </Form.Group>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-between'>
          <Button variant="secondary" onClick={handleDeleteTopic} >
            Delete Topic
          </Button>
          <Button variant="" className="btn-color" onClick={handleSaveChanges}>
            Update Topic
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditTopicModal