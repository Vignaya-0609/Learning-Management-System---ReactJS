import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Timer from "../components/Timer";
import { Link, useParams } from 'react-router-dom';
import { getQuestionsFromJson } from '../slices/QuestionSlice';
import { addAssessmentCompletedToJson } from '../slices/AssessmentCompletedSlice';

function Quiz() {
  const { id } = useParams();
  const publishId = id;
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [attendedQuestions, setAttendedQuestions] = useState([]);
  const [selectedChoices, setSelectedChoices] = useState({});
  const [descriptiveAnswers, setDescriptiveAnswers] = useState({});
  const [timeUpModal, setTimeUpModal] = useState(false);
  const handleCloseTimeUpModal = () => setTimeUpModal(false);
  const publishItem = useSelector(state => state.publish.publishList.find(item => item.id === publishId));
  const assessmentId = publishItem ? publishItem.assessId : null;
  const assessment = useSelector(state => state.assessment.assessmentList.find(item => item.id === assessmentId));
  const questions = useSelector(state => state.question.questionList.filter(question => question.assessId === assessmentId));
  const currentUserId=localStorage.getItem('currentUser');  
  const currentUser=JSON.parse(currentUserId)
  const singleChoiceQuestions = questions ? questions.filter(question => question.type === 'singleChoice') : [];
  const multiChoiceQuestions = questions ? questions.filter(question => question.type === 'multipleChoice') : [];
  const descriptiveQuestions = questions ? questions.filter(question => question.type === 'descriptive') : [];

  useEffect(() => {
    dispatch(getQuestionsFromJson());
  }, [dispatch]);
  const handleCloseModal = () => setShowModal(false);
  const handleCloseModal2 = () => setAlertModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleShowModal2 = () => setAlertModal(true);
 

  // single choice
  
  const handleSingleChoiceAnswer = (questionId, choiceIndex) => {
    const updatedSelectedChoices = { ...selectedChoices, [questionId]: choiceIndex };
    setSelectedChoices(updatedSelectedChoices);

    if (!attendedQuestions.includes(questionId)) {
      setAttendedQuestions(prev => [...prev, questionId]);
    }
  };

  // multichoice
  const handleMultiChoiceAnswer = (questionId, choiceIndices) => {
    const updatedSelectedChoices = { ...selectedChoices, [questionId]: choiceIndices };
    setSelectedChoices(updatedSelectedChoices);
  
    if (!attendedQuestions.includes(questionId)) {
      setAttendedQuestions(prev => [...prev, questionId]);
    }
  };
// descriptive
  const handleDescriptiveAnswer = (questionId, answerText) => {
    const updatedDescriptiveAnswers = { ...descriptiveAnswers, [questionId]: answerText };
    setDescriptiveAnswers(updatedDescriptiveAnswers);

    if (!attendedQuestions.includes(questionId)) {
      setAttendedQuestions(prev => [...prev, questionId]);
    }
  };
  function handleSubmit() {
    // Check if all questions are answered
    const allQuestionsAnswered = singleChoiceQuestions.every(question =>
      selectedChoices[question.id] !== undefined
    ) && multiChoiceQuestions.every(question =>
      selectedChoices[question.id] !== undefined
    ) && descriptiveQuestions.every(question =>
      descriptiveAnswers[question.id] !== undefined && descriptiveAnswers[question.id].trim() !== ''
    );
  
    if (allQuestionsAnswered) {
      // Proceed with submission
      handleShowModal();
      const assessmentData = {
        userId: currentUser.id,
        assessmentId,
        questions: questions.map(question => {
          if (question.type === 'singleChoice') {
            const selectedChoiceIndex = selectedChoices[question.id];
            let selectedChoice = question.choices[selectedChoiceIndex];
            return {
              id: question.id,
              type: question.type,
              question: question.question,
              selectedAnswer: selectedChoice ? selectedChoice.text : ""
            };
          } else if (question.type === 'multipleChoice') {
            const selectedChoiceIndices = selectedChoices[question.id];
            let selectedChoicess = selectedChoiceIndices.map(index => question.choices[index].text);
            return {
              id: question.id,
              type: question.type,
              question: question.question,
              selectedAnswer: selectedChoicess? selectedChoicess : ""
            };
          } else if (question.type === 'descriptive') {
            return {
              id: question.id,
              type: question.type,
              question: question.question,
              selectedAnswer: descriptiveAnswers[question.id]
            };
          }
          return null;
        })
      };
      dispatch(addAssessmentCompletedToJson(assessmentData));
    } else {
      // Display a message indicating that all questions must be answered
      // alert("Please answer all questions before submitting.");
      handleShowModal2();
    }
  }

  function handleSubmitTimeUp() {
    // Prepare the submission data
    const submissionData = {
      userId: currentUser.id,
      assessmentId,
      questions: []
    };
  
    // Iterate through selected choices
    Object.keys(selectedChoices).forEach(questionId => {
      const selectedChoiceIndices = selectedChoices[questionId];
      const question = questions.find(q => q.id === questionId);
      if (question) {
        if (question.type === 'singleChoice') {
          // Single choice question
          const selectedChoiceIndex = selectedChoiceIndices;
          const selectedChoice = question.choices[selectedChoiceIndex];
          submissionData.questions.push({
            id: questionId,
            type: "singleChoice",
            question: question.question,
            selectedAnswer: selectedChoice ? selectedChoice.text : ""
          });
        } else if (question.type === 'multipleChoice') {
          // Multiple choice question
          const selectedChoicesText = selectedChoiceIndices.map(index => {
            const choice = question.choices[index];
            return choice ? choice.text : "";
          });
          submissionData.questions.push({
            id: questionId,
            type: 'multipleChoice',
            question: question.question,
            selectedAnswer: selectedChoicesText
          });
        }
      }
    });
  
    // Add descriptive answers
    Object.keys(descriptiveAnswers).forEach(questionId => {
      const answerText = descriptiveAnswers[questionId];
      const question = questions.find(q => q.id === questionId);
      if (question) {
        submissionData.questions.push({
          id: questionId,
          type: 'descriptive',
          question: question.question,
          selectedAnswer: answerText || ""
        });
      }
    });
  
    // Dispatch the submission action
    dispatch(addAssessmentCompletedToJson(submissionData));
  
    // Show modal or perform any other actions as needed
    handleShowModal();
}

  
  // function handleSubmitTimeUp() {
  //   // Prepare the submission data
  //   const submissionData = {
  //     userId: currentUser.id,
  //     assessmentId,
  //     questions: []
  //   };
  
  //   // Add single choice answers
  //   Object.keys(selectedChoices).forEach(questionId => {
  //     const selectedChoiceIndex = selectedChoices[questionId];
  //     const question = questions.find(q => q.id === questionId);
  //     if (question) {
  //       const selectedChoice = question.choices[selectedChoiceIndex];
  //       submissionData.questions.push({
  //         id: questionId,
  //         type: "singleChoice",
  //         question: question.question,
  //         selectedAnswer: selectedChoice ? selectedChoice.text : ""
  //       });
  //     }
  //   });
  
  //   // Add multiple choice answers
  //   Object.keys(selectedChoices).forEach(questionId => {

  //     const selectedChoiceIndices = selectedChoices[questionId];
  //     const question = questions.find(q => q.id === questionId);
  //     if (question && Array.isArray(selectedChoiceIndices)) {
  //       const questionType = question.type === 'singleChoice' ? 'singleChoice' : 'multipleChoice';
  //       const selectedChoicesText = selectedChoiceIndices.map(index => {
  //         const choice = question.choices[index];
  //         return choice ? choice.text : "";
  //       });
  //       submissionData.questions.push({
  //         id: questionId,
  //         type: questionType,
  //         question: question.question,
  //         selectedAnswer: selectedChoicesText
  //       });
  //     }
  //   });
  
  //   // Add descriptive answers
  //   Object.keys(descriptiveAnswers).forEach(questionId => {
  //     const answerText = descriptiveAnswers[questionId];
  //     const question = questions.find(q => q.id === questionId);
  //     if (question) {
  //       submissionData.questions.push({
  //         id: questionId,
  //         type: 'descriptive',
  //         question: question.question,
  //         selectedAnswer: answerText || ""
  //       });
  //     }
  //   });
  
  //   // Dispatch the submission action
  //   dispatch(addAssessmentCompletedToJson(submissionData));
  
  //   // Show modal or perform any other actions as needed
  //   handleShowModal();
  // }
  
  // function handleSubmitTimeUp() {
  //   // Check if questions are available
  //   if (questions) {
  //     // Proceed with submission even if not all questions are answered
  //     handleShowModal();
  //     const assessmentData = {
  //       userId: currentUser.id,
  //       assessmentId,
  //       questions: questions.map(question => {
  //         if (question.type === 'singleChoice') {
  //           const selectedChoiceIndex = selectedChoices[question.id];
  //           let selectedChoice = question.choices[selectedChoiceIndex];
  //           return {
  //             id: question.id,
  //             type: question.type,
  //             question: question.question,
  //             selectedAnswer: selectedChoice ? selectedChoice.text : ""
  //           };
  //         } else if (question.type === 'multipleChoice') {
  //           const selectedChoiceIndices = selectedChoices[question.id];
  //           let selectedChoicess = selectedChoiceIndices.map(index => question.choices[index].text);
  //           return {
  //             id: question.id,
  //             type: question.type,
  //             question: question.question,
  //             selectedAnswer: selectedChoicess ? selectedChoicess : []
  //           };
  //         } else if (question.type === 'descriptive') {
  //           return {
  //             id: question.id,
  //             type: question.type,
  //             question: question.question,
  //             selectedAnswer: descriptiveAnswers[question.id]
  //           };
  //         }
  //         return null;
  //       })
  //     };
  //     dispatch(addAssessmentCompletedToJson(assessmentData));
  //   } else {
  //     console.error('Questions are not available.');
  //     // Handle the case when questions are not available, e.g., show an error message
  //   }
  // }
  
  
  // function handleSubmit() {
  //   handleShowModal();
  //   const assessmentData = {
  //     userId: currentUser.id,
  //     assessmentId,
  //     questions: questions.map(question => {
  //       if (question.type === 'singleChoice') {
  //         const selectedChoiceIndex = selectedChoices[question.id];
  //         let selectedChoice = question.choices[selectedChoiceIndex];
  //         return {
  //           id: question.id,
  //           type: question.type,
  //           question: question.question,
  //           selectedAnswer: selectedChoice ? selectedChoice.text : ""
  //         };
  //       } else if (question.type === 'multipleChoice') {
  //         const selectedChoiceIndices = selectedChoices[question.id];
  //         let selectedChoicess = selectedChoiceIndices.map(index => question.choices[index].text);
  //         return {
  //           id: question.id,
  //           type: question.type,
  //           question: question.question,
  //           selectedAnswer: selectedChoicess? selectedChoicess : ""
  //         };
  //       } else if (question.type === 'descriptive') {
  //         return {
  //           id: question.id,
  //           type: question.type,
  //           question: question.question,
  //           selectedAnswer: descriptiveAnswers[question.id]
  //         };
  //       }
  //       return null;
  //     })
  //   };
  //   dispatch(addAssessmentCompletedToJson(assessmentData));
  // };
  
  
  const totalQuestions = singleChoiceQuestions.length + multiChoiceQuestions.length + descriptiveQuestions.length;

  return (
    <Container fluid className="w-100">
      <Row className='w-100 d-flex align-content-between p-3 justify-content-between fixed-top bg-white'>
        <Col className="mb-2 t1 fw-medium text-start">
          Code - {assessment.code}
        </Col>
        <Col className="mb-2 t2 timer fw-medium text-end">
          <div><span className='bg-secondary text-light p-2 rounded'>Time Left - <Timer initialTime={assessment.time*60} onTimeUp={() => setTimeUpModal(true)} /></span></div>
        </Col>
      </Row>
      <Row className='p-3 mt-5'>
        {singleChoiceQuestions.map(({ id, question, choices }) => (
          <Col md={12} className="mt-3" key={id}>
            <h6>{question}</h6>
            <Form>
              {choices.map((choice, index) => (
                <div key={index} className="form-check">
                  <Form.Check
                    type="radio"
                    id={`${id}-${index}`}
                    label={choice.text.trim()}
                    name={id}
                    onChange={() => handleSingleChoiceAnswer(id,index)}
                  />
                </div>
              ))}
            </Form>
          </Col>
        ))}
        {multiChoiceQuestions.map(({ id, question, choices }) => (
          <Col md={12} className="mt-3" key={id}>
            <h6>{question}</h6>
            <Form>
            {choices.map((choice, index) => (
  <div key={index} className="form-check">
    <Form.Check
      type="checkbox"
      id={`${id}-${index}`}
      label={choice.text}
      name={id}
      onChange={(e) => {
        const isChecked = e.target.checked;
        const selectedIndex = index;
        const updatedIndices = isChecked 
          ? [...(selectedChoices[id] || []), selectedIndex] 
          : (selectedChoices[id] || []).filter(idx => idx !== selectedIndex);
        handleMultiChoiceAnswer(id, updatedIndices);
      }}
    />
  </div>
))}
        </Form>
          </Col>
        ))}
        {descriptiveQuestions.map(({ id, question }) => (
          <Col md={6} className="mt-3" key={id}>
            <h6>{question}</h6>
            <Form>
              <Form.Control as="textarea" rows={2} onChange={(e) => handleDescriptiveAnswer(id,e.target.value)}/>
            </Form>
          </Col>
        ))}
      </Row>
      <Button onClick={handleSubmit} variant="" className='mt-4 mb-4 btn-color' style={{marginLeft:"10px"}}>Submit</Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Assessment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Are You Sure?</h6>
          <p>Do you really want to submit this test?</p>
          <h6>Total Questions</h6>
          <p>{totalQuestions}</p>
          <div className='row d-flex'>
            <div className='col-md-6'>
              <h6>Attended Questions</h6>
              <p>{attendedQuestions.length}</p>
            </div>
            <div className='col-md-6'>
              <h6>Unattempted Questions</h6>
              <p>{totalQuestions - attendedQuestions.length}</p>
            </div>
          </div>    
        </Modal.Body>
        <Modal.Footer>
          <Button as={Link} to="/student/assessment" variant="" className='btn-color'>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={timeUpModal} onHide={handleCloseTimeUpModal}>
        <Modal.Header>
          <Modal.Title>Time's Up!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>The time for the assessment has ended.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button as={Link} to="/student/assessment" variant="secondary" onClick={handleSubmitTimeUp}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={alertModal} onHide={handleCloseModal2}>
        <Modal.Header>
          <Modal.Title>Assessment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Attend all the questions</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Quiz;
