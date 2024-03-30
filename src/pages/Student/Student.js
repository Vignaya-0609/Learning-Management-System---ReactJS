import React from 'react'
import { Routes, Route } from 'react-router-dom';
import StudentDashboard from './StudentDashboard';
import EnrolledCourses from './EnrolledCourses';
import Assessment from './Assessment';
import Communication from './Communication';
import Materials from './Materials';
import Grade from './Grade';
import Quiz from '../../components/Test';
function Student() {
  return (
    // student routes
    <Routes>
      <Route path="/" element={<StudentDashboard/>}/>
      <Route path="dashboard" element={<StudentDashboard/>}/>
      <Route path="enrolled-courses/*" element={<EnrolledCourses/>}/>
      <Route path="enrolled-courses/materials/:id" element={<Materials/>}/>
      <Route path="assessment" element={<Assessment/>}/>
      <Route path="grades" element={<Grade/>}/>
      <Route path="test/id" element={<Quiz/>}/>
      <Route path="communication" element={<Communication/>}/>
    </Routes>
  )
}

export default Student