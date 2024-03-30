import React, { useState } from 'react';
import { Container, Row, InputGroup, FormControl, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addTopicToJson } from '../slices/TopicSlice';

const TopicForm = (props) => {
  const dispatch=useDispatch();
  const [topic, setTopic] = useState('');
  const [topicError, setTopicError] = useState('');

  const handleInputChange = (event) => {
    setTopic(event.target.value);
  };
  // Function to add a topic
  const addTopic = () => {
    if (!topic.trim()) {
      setTopicError('Please enter a topic');
      return;
    }
    const courseId=props.courseId;
    dispatch(addTopicToJson({courseId:courseId,name:topic}));

    setTopic('');
    setTopicError('');
  };

  return (
    // Topic form
    <Container fluid className="shadow mb-3 p-3 rounded-2">
      <Row>
        <InputGroup>
          <FormControl
            type="text"
            placeholder="Add Topic Here"
            value={topic}
            onChange={handleInputChange}
          />
          <Button variant="" className='btn-color' onClick={addTopic}>
            Add
          </Button>
        </InputGroup>
        <span id="topicError" className="text-danger">{topicError}</span>
      </Row>
    </Container>
  );
};

export default TopicForm;
