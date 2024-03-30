import React, { useEffect, useRef, useState } from 'react';
import { Container, Row,Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import {useDispatch, useSelector } from 'react-redux';
import { addMaterialToJson, getMaterialsFromJson, setSelectedmaterial } from '../slices/MaterialSlice';
import { MdOutlineDeleteSweep } from "react-icons/md";
import DeleteMaterial from './DeleteMaterial';
import { FaFilePdf } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
const CourseMaterialUpload = ({topicId}) => {
  const [materialFile, setMaterialFile] = useState(null);
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [materialError, setMaterialError] = useState('');
  const [assignmentError, setAssignmentError] = useState('');
  const fileInputRef = useRef(null); 
  const fileInputRef2 = useRef(null);  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const materials = useSelector((state) => state.material.materialList.filter(material => material.topicId === topicId));
  const selectedMaterial=useSelector((state)=>state.material.selectedMaterial);

  useEffect(()=>{
      dispatch(getMaterialsFromJson());
  },[dispatch])

  // add material
  const addMaterial = () => {
    if (!materialFile || !materialFile.name.endsWith('.pdf')) {
      setMaterialError('Please select a valid PDF file');
      return;
    }
    setAssignmentError('');
    const pdfFileName = materialFile.name;
    dispatch(addMaterialToJson({topicId:topicId,type:"material",url:"https://drive.google.com/file/d/1BMwZGIzY0OMYM_SFQ4Gkpbq-Cu4FZnS_/view?usp=drive_link",fileName:pdfFileName}))
    setMaterialFile(null);
    fileInputRef.current.value = null;
  };

  // add assignment
  const addAssignment = () => {
    if (!assignmentFile || !assignmentFile.name.endsWith('.pdf')) {
      setAssignmentError('Please select a valid PDF file');
      return;
    }
    setAssignmentError('');
    const assFileName = assignmentFile.name;
    dispatch(addMaterialToJson({topicId:topicId,type:"assignment",url:"https://drive.google.com/file/d/1e54MYigzmJyzK5L1uWlEHn-83xcGHtEw/view?usp=drive_link",fileName:assFileName}))
    setMaterialFile(null);
    fileInputRef2.current.value = null;
  };

  // delete
  const handleDelete=(material)=>{
    dispatch(setSelectedmaterial(material));
    console.log(material)
    handleShow();
  }
  return (
    // container for subtopics
    <Container className="materials w-100">
      <Row className="mb-3">
        <Col md={6} className='mb-2'>
        <InputGroup>
          <FormControl
            type="file"
            className="myMaterial form-control"
            accept=".pdf"
            ref={fileInputRef}
            aria-label="Upload"
            onChange={(e) => setMaterialFile(e.target.files[0])}
          />
          <Button variant="color" type="button" onClick={addMaterial}>
            Upload Material
          </Button>
        </InputGroup>
        {materialError && <p className="text-danger">{materialError}</p>}
        </Col>
        <Col md={6} className='mb-2'>
        <InputGroup>
          <FormControl
            type="file"
            ref={fileInputRef2}
            className="myAssignment form-control"
            accept=".pdf"
            aria-label="Upload"
            onChange={(e) => setAssignmentFile(e.target.files[0])}
          />
          <Button variant="color" type="button" onClick={addAssignment}>
            Upload Assignment
          </Button>
        </InputGroup>
        {assignmentError && <p className="text-danger">{assignmentError}</p>}
        </Col>
      </Row>
      <Row>
      <ul className='list-unstyled'>
            {materials.map((material) => (
              <li key={material.id} style={{lineHeight:"2"}}>
                <div>
                  {material.type === "material" ? (
                    <>
                      <span className="material-icon"><FaFilePdf className='mb-1'/> </span>
                      <a href={material.url} target="_blank" rel="noopener noreferrer" className='text-dark'>{material.fileName}</a>
                    </>
                  ) : (
                    <>
                      <span className="assignment-icon"><MdAssignment className='mb-1'/> </span>
                      <a href={material.url} target="_blank" rel="noopener noreferrer" className='text-dark'>{material.fileName}</a>
                    </>
                  )}
                  &nbsp;&nbsp;
                  <Button variant="" className='p-1 mb-2' onClick={() => handleDelete(material)}>
                    <MdOutlineDeleteSweep />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
      </Row>
      <DeleteMaterial show={show} handleClose={handleClose} selectedmaterial={selectedMaterial}/>
    </Container>
  );
};

export default CourseMaterialUpload;
