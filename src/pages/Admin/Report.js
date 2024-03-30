import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReportAccordion from '../../components/ReportAccordion';
import ExportableTable from '../../components/ExportTable';
import { getCoursesFromJson } from '../../slices/CourseSlice';

function Report() {
  const courseList = useSelector((state) => state.course.courseList);
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getCoursesFromJson());
  },[dispatch]);
  return (
    <>
    {/* report */}
    <h4 className="mb-3">Report</h4> 
    {courseList.map((course) => (
        <ReportAccordion key={course.id} name={course.coursename}>
          <ExportableTable courseId={course.id}/>
        </ReportAccordion>
      ))}
    </>
  )
}

export default Report