import React, { useEffect } from 'react'
import CreateAssessmentForm from '../../components/CreateAssessmentForm'
import AssessmentItem from '../../components/AssessmentItem'
import { useDispatch, useSelector } from 'react-redux';
import { getAssessmentsFromJson } from '../../slices/AssessmentSlice';

function InstructorAssessment() {
  const currentUserId=localStorage.getItem('currentUser');  
  const currentUser=JSON.parse(currentUserId)
  const assessmentList=useSelector((state)=>state.assessment.assessmentList);

  const filteredAssessmentData = assessmentList.filter(
    assessment => assessment.userId === currentUser.id
  );
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getAssessmentsFromJson());
  },[dispatch])
  return (
    <>
    <h4 className='mb-3'>Create Assessment</h4>
    {/* assessment form */}
    <CreateAssessmentForm/>
    <br/>
    {/* assessment List */}
    {filteredAssessmentData.slice().reverse().map(assessment => (
        <AssessmentItem id={assessment.id} assessment={assessment}/>
      ))}
    </>
  )
}

export default InstructorAssessment