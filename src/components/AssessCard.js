import React, { useEffect, useState} from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getPublishFromJson } from '../slices/PublishSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getAssessmentsFromJson } from '../slices/AssessmentSlice';
import { getAssessmentCompletedFromJson } from '../slices/AssessmentCompletedSlice';
const AssessCard = ({ courseId }) => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const currentUserIdtoFetch=localStorage.getItem('currentUser');  
  const currentUser=JSON.parse(currentUserIdtoFetch)
  const currentUserId=currentUser.id;
  const publishedAssessments = useSelector((state) => state.publish.publishList);
  const assessmentList=useSelector((state)=>state.assessment.assessmentList);
  const assessmentCompletedList=useSelector((state)=>state.assessmentCompleted.assessmentCompletedList);
  const [completedAssessmentIds, setCompletedAssessmentIds] = useState([]);
  useEffect(() => {
    // Fetch published assessments from JSON
    dispatch(getPublishFromJson());
    dispatch(getAssessmentsFromJson());
    dispatch(getAssessmentCompletedFromJson());
  }, [dispatch]);
  useEffect(() => {
    // Extract completed assessment IDs for the current user
    const completedIds = assessmentCompletedList.filter(item => item.userId === currentUserId).map(item => item.assessmentId);
    setCompletedAssessmentIds(completedIds);
  }, [assessmentCompletedList, currentUserId]);
  
  // const filteredAssessments = publishedAssessments.filter((assessment) => assessment.courseId === courseId);
  const filteredAssessments = publishedAssessments
  .filter((assessment) => assessment.courseId === courseId)
  .filter((assessment) => assessmentList.some((item) => item.id === assessment.assessId));


  const checkTestAvailability = (assessmentDetails) => {
    if (!assessmentDetails || !assessmentDetails.date) return false;

    const currentDate = new Date();
    const scheduledDate = new Date(assessmentDetails.date);


    return currentDate.toDateString() === scheduledDate.toDateString();
};

  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };
  
  const handleTest = (assessment) => {
    navigate(`/student/assessment/test/${assessment}`);
  }
  return (
    // Assessment
    <div className='row w-100'>
      {filteredAssessments.map((assessment) => {
      // Find the corresponding assessment details from the assessment list
      const assessmentDetails = assessmentList.find((item) => item.id === assessment.assessId);
      const testAvailable = checkTestAvailability(assessmentDetails);
      const isCompleted = completedAssessmentIds.includes(assessment.assessId);
        return (
          <div className='col-md-4 mb-3' key={assessment.id}>
          <Card className="w-100">
            <Card.Body>
              <Card.Title>Assessment</Card.Title>
              <Card.Text>{assessmentDetails ? assessmentDetails.name : ''}</Card.Text>
              <Card.Title>Date</Card.Title>
              <Card.Text>
                <span>
                  <date>{assessmentDetails ? formatDate(assessmentDetails.date) : ''}</date>{' '}
                </span>
              </Card.Text>
              <div className="mybtn">
                <Button
                  variant=""
                  className="btn-color w-100"
                  disabled={!testAvailable || isCompleted}
                  onClick={() => handleTest(assessment.id)} 
                >
                  {testAvailable ? (isCompleted ? 'Completed' : 'Attend Test') : 'Test not available'}
                </Button>
              </div>
            </Card.Body>
          </Card>
          </div>
        );
      })}
    </div>
  );
};

export default AssessCard;
