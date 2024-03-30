import React, { useEffect } from 'react' 
import ReportAccordion from '../../components/ReportAccordion';
import ExportableTable from '../../components/ExportTable';
import { useDispatch, useSelector } from 'react-redux';
import { getEnrolledCoursesDetails } from '../../slices/CourseSlice';
function InstructorReport() {
  const currentUserId=localStorage.getItem('currentUser');  
  const currentUser=JSON.parse(currentUserId)
  const enrolledCourses = useSelector((state) => state.course.enrolledCourses);
  const dispatch = useDispatch();
  useEffect(() => {

    if (currentUser && currentUser.coursename.length > 0 && enrolledCourses.length === 0) {
      const enrolledCourseIds = currentUser.coursename.map(course => course.id);
      dispatch(getEnrolledCoursesDetails(enrolledCourseIds));
    }
  }, [currentUser, enrolledCourses, dispatch]);
  return (
    <>
    <h4 className="mb-3">Report</h4> 
    {enrolledCourses.map((course)=>(
      <ReportAccordion key ={course.id} name={course.coursename}>
        <ExportableTable courseId={course.id}/>
      </ReportAccordion>
    ))}  
    </>
  )
}
export default InstructorReport;