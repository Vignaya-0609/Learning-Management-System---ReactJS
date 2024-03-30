import React, { useEffect, useState } from 'react'
import ReportAccordion from '../../components/ReportAccordion'
import { FaFilePdf } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, FormControl, InputGroup, Row } from 'react-bootstrap';
import { getTopicsFromJson } from '../../slices/TopicSlice';
import { getMaterialsFromJson } from '../../slices/MaterialSlice';
import { getCoursesFromJson } from '../../slices/CourseSlice';
function Materials() {
  const {id}=useParams();
  const {courseList}=useSelector((state)=>state.course);
  const course=Array.isArray(courseList)?courseList.find((course)=>course.id===id):null;
  const {topicList}=useSelector((state)=>state.topic);
  const topicsWithCourseId=topicList.filter((topic)=>topic.courseId===id);
  const materials = useSelector((state) => state.material.materialList);
  const [upload,setUpload]=useState('');
  const [uploaderror,setUploadError]=useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const handleFileChange = (e) => {
    setUpload(e.target.files[0]);
  };
  const dispatch=useDispatch();
  useEffect(()=>{
    // fetch from json
    dispatch(getCoursesFromJson());
    dispatch(getTopicsFromJson());
    dispatch(getMaterialsFromJson());
  },[dispatch])
  const handleUpload = () => {
    if (!upload) {
      setUploadError('Please select a file to upload.');
      return;
    }

    // Validate file type
    const allowedFileTypes = ['application/pdf'];
    if (allowedFileTypes.indexOf(upload.type) === -1) {
      setUploadError('Please upload a valid PDF file.');
      return;
    }

    setUploadedFileName(upload.name);
    setUploadError('');
    setUpload(null); 
  };
  return (
    <>
    <div aria-label="breadcrumb" className='mb-4'>
            <ol className="breadcrumb">
              <li className="breadcrumb-item fs-4"><Link to="/student/enrolled-courses">Enrolled Courses</Link></li>
              <li className="breadcrumb-item fs-4 active" aria-current="page">{course ? course.coursename : 'Loading...'}</li>
            </ol>
    </div>
      {topicsWithCourseId.map((topic) => (
        <ReportAccordion topic={topicsWithCourseId} topicId={topic.id} name={topic.name}>
          <>
          {materials
  .filter((material) => material.topicId === topic.id)
  .map((material) => (
    <div key={material.id}>
      {material.type === 'material' ? (
        <>
        <span className='icon'><FaFilePdf className='mb-1'/></span>
          <a href={material.url} target='_blank' rel="noreferrer" className='text-dark'> {material.fileName}</a>
        </>
        
      ) : (
        <>
        <span className='icon'><MdAssignment className='mb-1'/></span>
          <a href={material.url} target='_blank' rel="noreferrer" className='text-dark'> {material.fileName}</a>
          <br/>
          <Row className='mt-1 mb-2'>
            <Col md={12}>
            <InputGroup>
          <FormControl
            type="file"
            className="myMaterial form-control"
            accept=".pdf"
            // ref={fileInputRef}
            aria-label="Upload"
            disabled={!!uploadedFileName}
            onChange={handleFileChange}
          />
          <Button variant="color" type="button" onClick={handleUpload} disabled={!!uploadedFileName}>
            Upload Assignment
          </Button>
          
        </InputGroup>
        <span className='text-danger'>{uploaderror}</span>
        {uploadedFileName ? (
                            <p className="mt-2">Uploaded: {uploadedFileName}</p>
                          ) : null}
            </Col>
          </Row>
        </>
      )}
    </div>
  ))}

          
          </>
        </ReportAccordion>
      ))}
    </>
  )
}

export default Materials