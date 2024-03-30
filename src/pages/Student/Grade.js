import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEnrolledCoursesDetails } from '../../slices/CourseSlice';
import { getPublishFromJson } from '../../slices/PublishSlice';
import { getAssessmentsFromJson } from '../../slices/AssessmentSlice';
import { getQuestionsFromJson } from '../../slices/QuestionSlice';
import { getAssessmentCompletedFromJson } from '../../slices/AssessmentCompletedSlice';
import { Button, Modal } from 'react-bootstrap';

function Grade() {
    const currentUserId = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserId);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Redux selectors
    const enrolledCourses = useSelector((state) => state.course.enrolledCourses);
    const publishList = useSelector((state) => state.publish.publishList);
    const assessmentList = useSelector((state) => state.assessment.assessmentList);
    const questionList = useSelector((state) => state.question.questionList);
    const assessmentCompletedList = useSelector((state) => state.assessmentCompleted.assessmentCompletedList);
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${day}-${month}-${year}`;
      };
      
    // State to store filtered assessment details
    const [filteredAssessmentDetails, setFilteredAssessmentDetails] = useState([]);
    const [selectedAssessment, setSelectedAssessment] = useState(null);
    const [percentage,setPercentageScore]=useState(0);
    // console.log(selectedAssessment,percentage)
    useEffect(() => {
        // Fetch enrolled courses details if not already fetched
        if (currentUser && currentUser.coursename.length > 0 && enrolledCourses.length === 0) {
            const enrolledCourseIds = currentUser.coursename.map(course => course.id);
            dispatch(getEnrolledCoursesDetails(enrolledCourseIds));
        }
    }, [currentUser, enrolledCourses.length, dispatch]);

    useEffect(() => {
        // Fetch assessment-related data
        dispatch(getPublishFromJson());
        dispatch(getAssessmentsFromJson());
        dispatch(getQuestionsFromJson());
        dispatch(getAssessmentCompletedFromJson());
    }, [dispatch]);


    useEffect(() => {
        // Filter assessment details when enrolled courses and assessment list are available
        if (enrolledCourses.length > 0 && assessmentList.length > 0 && questionList.length > 0 && assessmentCompletedList.length > 0) {
            const enrolledCourseIds = enrolledCourses.map(course => course.id);
            const filteredAssessments = publishList.filter(assessment => enrolledCourseIds.includes(assessment.courseId));
            // Inside the useEffect where filteredAssessmentDetails is calculated
        const updatedFilteredAssessmentDetails = filteredAssessments.map(assessment => {
        const assessmentDetails = assessmentList.find(item => item.id === assessment.assessId);
        if (!assessmentDetails) {
        console.error(`Assessment details not found for assessment ID ${assessment.assessId}`);
        return null;
    }
    const associatedQuestions = questionList.filter(question => question.assessId === assessment.assessId);
    const totalQuestions = associatedQuestions.length;
    const totalMark = associatedQuestions.reduce((total, question) => total +  parseInt(question.marks), 0);
    let totalMarks = 0;

    associatedQuestions.forEach(question => {
        const completedAssessment = assessmentCompletedList.find(completed => completed.userId === currentUser.id && completed.assessmentId === assessment.assessId);
        if (completedAssessment) {
            const selectedAnswer = completedAssessment.questions.find(q => q.id === question.id)?.selectedAnswer;
            if (selectedAnswer !== undefined && selectedAnswer !== null) {
                const questionFromList = questionList.find(q => q.id === question.id);
                if (questionFromList) {
                    if (questionFromList.type === 'singleChoice') {
                        const correctAnswer = questionFromList.choices.find(choice => choice.isCorrect)?.text;
                        if (correctAnswer && correctAnswer === selectedAnswer) {
                            totalMarks += parseInt(questionFromList.marks);
                        }
                    } else if (questionFromList.type === 'multipleChoice') {
                        const correctAnswers = questionFromList.choices.filter(choice => choice.isCorrect).map(choice => choice.text);
                        const selectedAnswers = completedAssessment.questions.find(q => q.id === question.id)?.selectedAnswer || [];
                        const allCorrect = correctAnswers.length === selectedAnswers.length &&
                       correctAnswers.every(answer => selectedAnswers.includes(answer)) &&
                       selectedAnswers.every(answer => correctAnswers.includes(answer));
                        if (allCorrect) {
                            totalMarks += parseInt(questionFromList.marks);
                        }
                    }else if (questionFromList.type === 'descriptive') {
                        const hint = questionFromList.hint.toLowerCase(); // Convert hint to lowercase for case-insensitive comparison
                        const answer = (completedAssessment.questions.find(q => q.id === question.id)?.selectedAnswer || '').toLowerCase(); // Convert answer to lowercase
                    
                        // Check if the answer exactly matches the hint
                        const isAnswerCorrect = answer === hint;
                    
                        if (isAnswerCorrect) {
                            totalMarks += parseInt(questionFromList.marks);
                        }
                    }
                    
                    
                }
            }
        }
    });

    const isCompleted = assessmentCompletedList.some(completed => completed.userId === currentUser.id && completed.assessmentId === assessment.assessId);
    const status = isCompleted ? 'Completed' : 'Not Completed';

    return { ...assessment, details: assessmentDetails, totalQuestions,totalMark, totalMarks, status };
}).filter(Boolean); // Filter out any null values
            setFilteredAssessmentDetails(updatedFilteredAssessmentDetails);
            
        }
    }, [enrolledCourses, publishList, assessmentList, questionList, assessmentCompletedList, currentUser.id]);
    
  // console.log(filteredAssessmentDetails)
  const handleViewScores = (assessment) => {
    setSelectedAssessment(assessment);
    handleShow();
    const totalMarksScore = assessment.totalMarks;

        // Calculate percentage
        const percentage = (totalMarksScore / assessment.totalMark) * 100;

        // Rounding off the percentage score to 2 decimal places
        const roundedPercentage = percentage.toFixed(0);

        // Update state with rounded percentage score
        setPercentageScore(roundedPercentage);
};

    return (
        <>
        <h4 className="mt-1 mb-3">Grades</h4>
        {filteredAssessmentDetails.length === 0 ? (
            <p>No grades found</p>
        ) : (
            <div className='table-responsive'>
            <table className="table striped bordered ">
                <thead>
                    <tr>
                        <th>Assessment Name</th>
                        <th>Assessment Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAssessmentDetails.slice().reverse().map(assessment => (
                        <tr key={assessment.id}>
                            <td>{assessment.details ? assessment.details.name : 'N/A'}</td>
                            <td>{assessment.details ? formatDate( assessment.details.date ): 'N/A'}</td>
                            <td>{assessment.status}</td>
                            <td>
                                <Button variant="" className='btn-color' onClick={() => handleViewScores(assessment)}>View Scores</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        )}
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Assessment Scores</Modal.Title>
            </Modal.Header>
            <Modal.Body>
  <div className="row">
    <div className="col-md-6">
      <div className="box">
        <p className='fw-medium'>Assessment Name</p>
        <p>{selectedAssessment ? selectedAssessment.details.name : ''}</p>
      </div>
    </div>
    <div className="col-md-6">
      <div className="box">
        <p className='fw-medium'>Assessment Code</p>
        <p>{selectedAssessment ? selectedAssessment.details.code : ''}</p>
      </div>
    </div>
  </div>
  <div className="row">
    <div className="col-md-6">
      <div className="box">
        <p className='fw-medium'>Total Questions</p>
        <p>{selectedAssessment ? selectedAssessment.totalQuestions : ''}</p>
      </div>
    </div>
    <div className="col-md-6">
      <div className="box">
        <p className='fw-medium'>Total Marks</p>
        <p>{selectedAssessment ? selectedAssessment.totalMark : ''}</p>
      </div>
    </div>
  </div>
  <div className="row">
    <div className="col-md-6">
      <div className="box">
        <p className='fw-medium'>Obtained Marks</p>
        <p className='fs-5'>{selectedAssessment ? selectedAssessment.totalMarks : ''}</p>
      </div>
    </div>
    <div className="col-md-6">
      <div className="box">
        <p className='fw-medium'>Percentage</p>
        <p className='fs-5 fw-bold'>{percentage}%</p>
      </div>
    </div>
  </div>
</Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    );
}

export default Grade;
