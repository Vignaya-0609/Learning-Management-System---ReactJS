
import {Row, Col} from 'react-bootstrap';

// Announcement Component
const Announcement = ({ date, courseName, instructor, announcement }) => (
  <div>
    <h6 className="text-secondary">{date}</h6>
    <Row>
      <Col md={6}>
        <h6>Course Name</h6>
        <p>{courseName}</p>
      </Col>
      <Col md={6}>
        <h6>Course Instructor</h6>
        <p>{instructor}</p>
      </Col>
      <Col md={12}>
        <h6>Announcement</h6>
        <p>{announcement}</p>
      </Col>
    </Row>
    <hr />
  </div>
);
export default Announcement;