import React, { useEffect } from 'react'
import TopicForm from '../../components/TopicForm'
import CourseMaterialUpload from '../../components/CourseMaterialUpload'
import { Link,useParams } from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux';
import TopicAccordion from '../../components/TopicAccordian';
import { getCoursesFromJson } from '../../slices/CourseSlice';
import { getTopicsFromJson } from '../../slices/TopicSlice';
function CourseUpload() {
  const {id}=useParams();
  const dispatch=useDispatch();
  const {courseList}=useSelector((state)=>state.course);
  const course = courseList.find((course) => course.id === id);
  const {topicList}=useSelector((state)=>state.topic);
  console.log(topicList)
  const topicsWithCourseId = topicList.filter((topic) => topic.courseId === id);
  useEffect(()=>{
    dispatch(getCoursesFromJson());
    dispatch(getTopicsFromJson());
  },[dispatch])
  console.log(topicsWithCourseId)
  if (!course) {
    return <div>Loading...</div>; 
  }

  return (
    <>
    <div aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item fs-4"><Link to="/instructor/course-deliverables">Course Deliverables</Link></li>
          <li className="breadcrumb-item fs-4 active" aria-current="page">{course ? course.coursename : 'Loading...'}</li>
        </ol>
    </div>
    {/* Topics and materials */}
    <TopicForm courseId={course.id}/>
    {topicsWithCourseId.map((topic) => (
        <TopicAccordion topic={topicsWithCourseId} topicId={topic.id} name={topic.name}>
          <CourseMaterialUpload topicId={topic.id} />
        </TopicAccordion>
      ))}
    </>
  )
}

export default CourseUpload