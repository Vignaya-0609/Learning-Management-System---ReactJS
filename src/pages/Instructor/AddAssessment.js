import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AssessmentForm from '../../components/AssessmentForm';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionsFromJson, setSelectedQuestion } from '../../slices/QuestionSlice';
import DeleteModal from '../../components/DeleteModal';
import { getPublishFromJson } from '../../slices/PublishSlice';
import { getAssessmentsFromJson } from '../../slices/AssessmentSlice';

function AddAssessment() {
  const {id}=useParams();
  const assessmentList=useSelector((state)=>state.assessment.assessmentList);
  const assessment = assessmentList.find((course) => course.id === id);
  // console.log(assessment)
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const questionList = useSelector((state) => state.question.questionList.filter(question => question.assessId === id));
  const publishList=useSelector((state)=>state.publish.publishList);
  const isPublishedAssessment = publishList.some((publishedAssessment) => publishedAssessment.assessId === id);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestionsFromJson());
    dispatch(getPublishFromJson());
    dispatch(getAssessmentsFromJson());
  }, [dispatch]);

  const deleteQu=(question)=>{
    dispatch(setSelectedQuestion(question));
    handleShow();
  }

  // Filter question list by type
  const singleChoiceQuestions = questionList.filter(question => question.type === 'singleChoice');
  const multipleChoiceQuestions = questionList.filter(question => question.type === 'multipleChoice');
  const descriptiveQuestions = questionList.filter(question => question.type === 'descriptive');

  return (
    <>
      <div aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item fs-4">
            <Link to="/instructor/assessment">Assessment</Link>
          </li>
          <li className="breadcrumb-item fs-4 active" aria-current="page">{assessment ? assessment.name : 'Loading...'}</li>
        </ol>
      </div>
      {isPublishedAssessment ?(
        <div className='d-none'>
         <AssessmentForm />
        </div>
      ):(
        <div>
         <AssessmentForm />
        </div>
      )}
      {/* <AssessmentForm /> */}
      <div className="container mt-4">
        <div className="row">
          {/* Render Single Choice Questions */}
          {singleChoiceQuestions.map((question) => (
            <div key={question.id} className="col-md-12 mb-3">
              <div className="card">
                <div className="card-body row">
                  <div className="col-md-6">
                    <p className="card-title"><span className="fw-medium ">Question:</span><br/>{question.question}</p>
                    <p className="card-text"><span className="fw-medium">Marks:</span> {question.marks}</p>
                    <p className="card-text"><span className="fw-medium">Type:</span> {question.type}</p>
                  </div>
                  <div className="col-md-6">
                  <h6>Choices</h6>
                    <ul className="list-unstyled">
                      {question.choices
                        .filter(choice => choice.text.trim() !== "")
                        .map((choice, index) => (
                          <li key={index} className={choice.isCorrect ? 'text-success' : 'text-dark'}>
                            {choice.text}
                            {/* {question.type === 'multipleChoice' && choice.weightage && <span className="ml-2">&nbsp;&nbsp;{choice.weightage}%</span>} */}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
                {
                  isPublishedAssessment ?(
                    <div className="card-footer d-none">
                  <button className="btn btn-color" onClick={()=>deleteQu(question)}>Delete</button>
                </div>
                  ):(
                    <div className="card-footer">
                  <button className="btn btn-color" onClick={()=>deleteQu(question)}>Delete</button>
                </div>
                  )
                }
                {/* <div className="card-footer">
                  <button className="btn btn-color" onClick={()=>deleteQu(question)}>Delete</button>
                </div> */}
              </div>
            </div>
          ))}
          
          {/* Render Multiple Choice Questions */}
          {multipleChoiceQuestions.map((question) => (
          <div key={question.id} className="col-md-12 mb-3">
          <div className="card">
          <div className="card-body row">
          <div className="col-md-6">
          <p className="card-title"><span className="fw-medium mb-3">Question:</span><br/>{question.question}</p>
          <p className="card-text"><span className="fw-medium">Marks:</span> {question.marks}</p>
          <p className="card-text"><span className="fw-medium">Type:</span> {question.type}</p>
        </div>
        <div className="col-md-6">
          <h6>Choices</h6>
          <ul className="list-unstyled">
            {question.choices
              .filter(choice => choice.text.trim() !== "")
              .map((choice, index) => (
                <li key={index} className={choice.isCorrect ? 'text-success' : 'text-dark'}>
                  {choice.text}
                  {choice.weightage > 0 && (
                    <span className="ml-2">&nbsp;&nbsp;{choice.weightage}%</span>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
      {
                  isPublishedAssessment ?(
                    <div className="card-footer d-none">
                  <button className="btn btn-color" onClick={()=>deleteQu(question)}>Delete</button>
                </div>
                  ):(
                    <div className="card-footer">
                  <button className="btn btn-color" onClick={()=>deleteQu(question)}>Delete</button>
                </div>
                  )
                }
    </div>
  </div>
))}



          {/* Render Descriptive Questions */}
          {descriptiveQuestions.map((question) => (
          <div key={question.id} className="col-md-12 mb-3">
          <div className="card">
            <div className="card-body row">
                <div className="col-md-6">
                  <p className="card-title"><span className="fw-medium mb-3">Question:</span><br/>{question.question}</p>
                  <p className="card-text"><span className="fw-medium">Marks:</span> {question.marks}</p>
                  <p className="card-text"><span className="fw-medium">Type:</span> {question.type}</p>
                </div>
            <div className="col-md-6">
              <h6>Hint</h6>
              <p>{question.hint}</p>
            </div>
          </div>
          {
                  isPublishedAssessment ?(
                    <div className="card-footer d-none">
                  <button className="btn btn-color" onClick={()=>deleteQu(question)}>Delete</button>
                </div>
                  ):(
                    <div className="card-footer">
                  <button className="btn btn-color" onClick={()=>deleteQu(question)}>Delete</button>
                </div>
                  )
                }
    </div>
  </div>
))}

        </div>
      </div>
      <DeleteModal show={showModal} handleClose={handleClose}/>
    </>
  );
}

export default AddAssessment;
