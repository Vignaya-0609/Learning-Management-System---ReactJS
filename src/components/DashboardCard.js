import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../assets/sass/style.scss"
function DashboardCard(props) {
  return (
    // dashboard cards 
    <Card className='card-hover'>
      <Card.Body>
        <Row className="p-3">
            <Col className="col-md-7 d-flex align-items-center justify-content-center"><span className="fw-bold fs-3">{props.count}</span>&nbsp;<span className="fs-4">{props.name}</span></Col>
            <Col className="col-md-5 d-flex align-items-center justify-content-center">
            <img src={props.img} alt="alt-img" className="img-fluid" width="80px" height="80px"></img>
            </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default DashboardCard;