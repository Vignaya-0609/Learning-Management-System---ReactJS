import React from 'react'
import { Routes, Route } from 'react-router-dom';
import InstructorDashboard from './InstructorDashboard';
import CourseDeliverables from './CourseDeliverables';
import InstructorAssessment from './Assessment';
import InstructorReport from './InstructorReport';
import InstructorCommunication from './InstructorCommunication';
import CourseUpload from './CourseUpload';
import AddAssessment from './AddAssessment';

function Instructor() {
  return (
    // instructor routes
    <Routes>
        <Route path="/" element={<InstructorDashboard/>}/>
        <Route path="dashboard" element={<InstructorDashboard/>}/>
        <Route path="course-deliverables/*" element={<CourseDeliverables/>}/>
        <Route path="/course-deliverables/upload/:id" element={<CourseUpload/>} />
        <Route path="assessment/*" element={<InstructorAssessment/>}/>
        <Route path="/assessment/add/:id" element={<AddAssessment/>}/>
        <Route path="report" element={<InstructorReport/>}/>
        <Route path="communication" element={<InstructorCommunication/>}/>
    </Routes>
  )
}

export default Instructor