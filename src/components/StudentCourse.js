import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StudentCourseCard from './StudentCourseCard';
import { getEnrolledCoursesDetails } from '../slices/CourseSlice';

const MainComponent = () => {
  const currentUserId=localStorage.getItem('currentUser');  
  const currentUser=JSON.parse(currentUserId)
  const enrolledCourses = useSelector((state) => state.course.enrolledCourses);
  const dispatch = useDispatch();
  useEffect(() => {
    // Fetch enrolled courses details only if the currentUser and enrolledCourses are available
    if (currentUser && currentUser.coursename.length > 0 && enrolledCourses.length === 0) {
      const enrolledCourseIds = currentUser.coursename.map(course => course.id);
      dispatch(getEnrolledCoursesDetails(enrolledCourseIds));
    }
  }, [currentUser, enrolledCourses, dispatch]);
  if (!enrolledCourses.length) {
    return <div>Loading...</div>;
  }
  // enrolled courses
  return (
    <div className="row">
      {enrolledCourses.map((course) => (
        <div className="col-lg-6 col-md-12 col-sd-8 mb-3 mb-sm-0" key={course.id}>
          <StudentCourseCard courseid={course.id}
            imageUrl={course.coverphoto}
            title={course.coursename}
            description={course.description}
            duration={course.duration}
            completion={70}
          />
        </div>
      ))}
    </div>
  );
};

export default MainComponent;
