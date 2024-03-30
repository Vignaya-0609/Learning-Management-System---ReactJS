import React, { useState } from 'react'
import {Accordion} from 'react-bootstrap';
import { FaEdit } from "react-icons/fa";
import EditTopicModal from './EditTopicModal';
import { useDispatch } from 'react-redux';
import { setSelectedTopic } from '../slices/TopicSlice';
function TopicAccordion({topic,topicId,name,children}) {
  // console.log(topicId)
  const dispatch=useDispatch();
  const [show, setShow] = useState(false);
  const editTopic=()=>{
    dispatch(setSelectedTopic({ id: topicId, name: name }));
    setShow(true);
  }
  return (
    <>
    {/* Topics */}
    <Accordion>
      <Accordion.Item eventKey="0" className=' w-100 rounded-2 shadow mb-3 border-0'>
        <Accordion.Header className="shadow rounded-2"><span onClick={editTopic}><FaEdit/>&nbsp;</span><span className='fw-medium'>{name}</span></Accordion.Header>
        <Accordion.Body>
          {children} 
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
   <EditTopicModal show={show} onHide={()=>setShow(false)} />
    </>
  )
}

export default TopicAccordion