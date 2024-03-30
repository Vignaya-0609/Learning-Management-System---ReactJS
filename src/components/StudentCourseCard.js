// CourseCard.js
import { Link } from 'react-router-dom';
import React from 'react';
import { Card, Col, Row, ProgressBar } from 'react-bootstrap';
const CourseCard = ({ imageUrl, title, description, duration, completion,courseid }) => {
  return (
    // course card
    <Card className="mb-3" style={{ maxWidth: '550px' }}>
      <Row className="g-0">
        <Col md={5}>
          <Link to={`/student/enrolled-courses/materials/${courseid}`}>
            <Card.Img src={imageUrl} className="img-fluid rounded-start h-100" alt="Course-Img" />
          </Link>
        </Col>
        <Col md={7}>
          <Card.Body>
            <Card.Title>
              <Link to={`/student/enrolled-courses/materials/${courseid}`} className="text-decoration-underline">
                {title}
              </Link>
            </Card.Title>
            <Card.Text>{description}</Card.Text>
            <Row className="mb-3">
              <Col md={12}>
                <h6>Duration</h6>
                <p className="card-text">{duration} hrs</p>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <h6>Completion</h6>
              </Col>
              <Col md={6}>
                <h6 className="float-end">{completion}</h6>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <ProgressBar
                  role="progressbar"
                  aria-label="Example 8px high"
                  now={completion}
                  min={0}
                  max={100}
                  style={{ height: '8px' }}
                />
              </Col>
            </Row>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default CourseCard;
