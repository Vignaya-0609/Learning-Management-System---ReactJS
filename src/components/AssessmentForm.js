import React, { useState } from 'react';
import { Tabs, Tab, Container, Table, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addQuestionToJson } from '../slices/QuestionSlice';

const AssessmentForm = () => {
  const {id}=useParams();
  const dispatch=useDispatch();
  const [key, setKey] = useState('singleChoice');
  const [question, setQuestion] = useState('');
  const [marks, setMarks] = useState();
  const [choices, setChoices] = useState([
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
  ]);
  
  const handleChoiceChange = (index, value) => {
    const newChoices = [...choices];
    newChoices[index].text = value;
    setChoices(newChoices);
  };

  const handleCorrectAnswerChange = (index) => {
    const newChoices = [...choices];
    newChoices.forEach((choice, i) => {
      newChoices[i].isCorrect = i === index;
    });
    setChoices(newChoices);
  };

  const handleResetForm = () => {
    setQuestion('');
    setMarks(0);
    setChoices([{ text: '', isCorrect: false },{ text: '', isCorrect: false },{ text: '', isCorrect: false },{ text: '', isCorrect: false }]);
  };

  const handleAddQuestion = () => {
    const nonEmptyChoices = choices.filter(choice => choice.text.trim() !== ''); 
    const newQuestion = {
      type: 'singleChoice',
      assessId:id,
      question: question,
      marks: marks,
      choices: nonEmptyChoices.map(choice => ({ text: choice.text, isCorrect: choice.isCorrect }))
    };
    dispatch(addQuestionToJson(newQuestion));
    handleResetForm();

  };

  const renderSingleChoiceForm = () => (
    <div className="container-fluid">
      <Table responsive borderless>
        <thead>
          <tr>
            <th scope="col" className="col-md-10">Question</th>
            <th scope="col" className="col-md-2 text-end">Marks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Form.Control
                as="textarea"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Question"
                rows={1}
              />
            </td>
            <td>
              <Form.Control
                type="number"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                placeholder="Enter Marks"
                min={0}
              />
            </td>
          </tr>
          {/* Choices */}
          <tr>
            <td><h6>Choices</h6></td>
            <td><h6 className="float-end">Select Answer</h6></td>
          </tr>
          {choices.map((choice, index) => (
            <tr key={index}>
              <td>
                <Form.Control
                  type="text"
                  value={choice.text}
                  onChange={(e) => handleChoiceChange(index, e.target.value)}
                  placeholder="Choice"
                />
              </td>
              <td>
                <div className="form-check float-end">
                  <input
                    type="radio"
                    className="form-check-input fs-4"
                    checked={choice.isCorrect}
                    onChange={() => handleCorrectAnswerChange(index)}
                  />
                </div>
              </td>
            </tr>
          ))}
          {/* Add and Reset Buttons */}
          <tr>
            <td>
              <br /><br />
              <Button variant="color" onClick={handleResetForm}>Reset</Button>
            </td>
            <td className='float-end'>
            <br /><br />
              <Button variant="color" onClick={handleAddQuestion} disabled={!isSingleChoiceFormValid()}>Add</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );

  // Multiple Choice Form
  const [multipleChoiceQuestion, setMultipleChoiceQuestion] = useState('');
  const [marks2, setMarks2] = useState();
  const [choices2, setChoices2] = useState([
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
  ]);
  const handleChoiceChange2 = (index, value) => {
    const newChoices = [...choices2];
    newChoices[index].text = value;
    setChoices2(newChoices);
  };

  const handleSelectionChange2 = (index) => {
    const newChoices = [...choices2];
    newChoices[index].isCorrect = !newChoices[index].isCorrect;
    setChoices2(newChoices);
  };

  const handleResetForm2 = () => {
    setMultipleChoiceQuestion('');
    setMarks2(0);
    setChoices2([{ text: '',  isCorrect: false },{ text: '',  isCorrect: false },{ text: '', isCorrect: false },{ text: '',  isCorrect: false }]);
  };

  const handleAddQuestion2 = () => {
    // console.log('Multiple Choice Question Added:', { multipleChoiceQuestion, marks2, choices2 });
    const newQuestion = {
      type: 'multipleChoice',
      assessId: id,
      question: multipleChoiceQuestion,
      marks: marks2,
      choices: choices2.map(choice => ({ text: choice.text, isCorrect: choice.isCorrect }))
    };
    dispatch(addQuestionToJson(newQuestion));
    handleResetForm2();
  };

  const renderMultipleChoiceForm = () => (
    <div className="container-fluid">
      <Table responsive borderless id={id}>
        <thead>
          <tr>
            <th scope="col" className="col-md-10">Question</th>
            <th></th>
            <th scope="col" className="col-md-2 text-end">Marks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Form.Control
                as="textarea"
                value={multipleChoiceQuestion}
                onChange={(e) => setMultipleChoiceQuestion(e.target.value)}
                placeholder="Question"
                rows={1}
              />
            </td>
            <td></td>
            <td>
              <Form.Control
                type="number"
                value={marks2}
                onChange={(e) => setMarks2(parseInt(e.target.value))}
                placeholder="Enter Marks"
                min={0}
              />
            </td>
          </tr>
          {/* Choices */}
          <tr>
            <td><h6>Choice</h6></td>
            <td></td>
            <td><h6 className="float-end">Select Answer</h6></td>
          </tr>
          {choices2.map((choice, index) => (
            <tr key={index}>
              <td>
                <Form.Control
                  type="text"
                  value={choice.text}
                  onChange={(e) => handleChoiceChange2(index, e.target.value)}
                  placeholder="Choice"
                />
              </td>
              <td></td>
              <td>
                <div className="form-check float-end">
                  <input
                    type="checkbox"
                    className="form-check-input fs-4"
                    checked={choice.isCorrect}
                    onChange={() => handleSelectionChange2(index)}
                  />
                </div>
              </td>
            </tr>
          ))}
          {/* Add and Reset Buttons */}
          <tr>
            <td>
              <br />
              <Button variant="color" onClick={handleResetForm2}>Reset</Button>
            </td>
            <td><br /></td>
            <td className='float-end'>
              <br/>
              <Button variant="color"  onClick={handleAddQuestion2} disabled={!isMultipleChoiceFormValid()}>Add</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );

  // Descriptive Form
  const [descriptiveQuestion, setDescriptiveQuestion] = useState('');
  const [marks3, setMarks3] = useState();
  const [hint, setHint] = useState('');

  const handleResetForm3 = () => {
    setDescriptiveQuestion('');
    setMarks3(0);
    setHint('');
  };

  const handleAddQuestion3 = () => {
    // console.log('Descriptive Question Added:', { descriptiveQuestion, marks3, hint });
    const newQuestion = {
      type: 'descriptive',
      assessId: id,
      question: descriptiveQuestion,
      marks: marks3,
      hint: hint
    };
    dispatch(addQuestionToJson(newQuestion));
    handleResetForm3();

  };
  const isSingleChoiceFormValid = () => {
    const hasCorrectChoice = choices.some(choice => choice.text.trim() !== '' && choice.isCorrect);
    return question.trim() !== '' && choices.filter(choice => choice.text.trim() !== '').length >= 2 && hasCorrectChoice && marks > 0;
  };
  
  const isMultipleChoiceFormValid = () => {
    const isQuestionValid = multipleChoiceQuestion.trim() !== '';
    const hasCorrectChoice = choices2.some(choice => choice.text.trim() !== '' && choice.isCorrect);
    const areChoicesValid = choices2.every(choice => choice.text.trim() !== '');
    const areMarksValid = marks2 > 0;
    return isQuestionValid && hasCorrectChoice && areChoicesValid && areMarksValid;
  };
  
  
  // For Descriptive Form
  const isDescriptiveFormValid = () => {
    return descriptiveQuestion.trim() !== '' && hint.trim()!=='' && marks3 > 0;
  };
  const renderDescriptiveForm = () => (
    <div className="container-fluid">
      <Table responsive borderless>
        <thead>
          <tr>
            <th scope="col" className="col-md-8">Question</th>
            <th scope="col">Marks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Form.Control
                as="textarea"
                value={descriptiveQuestion}
                onChange={(e) => setDescriptiveQuestion(e.target.value)}
                placeholder="Question"
                rows={1}
              />
            </td>
            <td>
              <Form.Control
                type="number"
                value={marks3}
                onChange={(e) => setMarks3(e.target.value)}
                placeholder="Enter Marks"
                min={0}
              />
            </td>
          </tr>
          <tr>
            <td>
              <div className="mb-3">
                <label htmlFor="hint" className="form-label fw-medium">Hints</label>
                <Form.Control
                  id="hint"
                  as="textarea"
                  value={hint}
                  onChange={(e) => setHint(e.target.value)}
                  rows={3}
                />
              </div>
            </td>
            <td></td>
          </tr>
          {/* Add and Reset Buttons */}
          <tr>
            <td>
              <Button variant="color" onClick={handleResetForm3}>Reset</Button>
            </td>
            <td className='float-end'>
            <Button variant="color" onClick={handleAddQuestion3} disabled={!isDescriptiveFormValid()}> Add</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );

  return (
    <Container fluid className="shadow p-3 rounded-2 mb-3 ass-heading">
      <Tabs
        id="questionTabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="singleChoice" title="Single Choice">
          {renderSingleChoiceForm()}
        </Tab>
        <Tab eventKey="multipleChoice" title="Multiple Choice">
          {renderMultipleChoiceForm()}
        </Tab>
        <Tab eventKey="descriptive" title="Descriptive">
          {renderDescriptiveForm()}
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AssessmentForm;
