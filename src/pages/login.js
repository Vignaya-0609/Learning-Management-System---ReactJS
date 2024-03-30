import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import Banner from '../components/Banner';
import LoginForm from '../components/LoginForm';
import { BsPersonCircle } from "react-icons/bs";
import Footer from '../layouts/Footer';
import "../assets/sass/style.scss";
function login() {
  return (
    <>
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Row className="rounded-5 p-3 bg-white shadow box-area">
                {/* left box */}
                <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" id="img1">
                    <Banner/>
                </div>
                <div className="col-md-6 right-box">
                <Row className="align-items-center rightside">
                    <div className="header-text text-center">
                        <h3 className="fs-4 mt-3 text-wrap size">Skillo - Learning Management System</h3>
                        <p className="fs-1 logo-user"><BsPersonCircle /></p>
                        <h3 className="fs-5 text-wrap size">Login Here!</h3>
                    </div>
                    <LoginForm/>    
                </Row>
            </div>
            </Row>
            <Footer/>
        </Container>
    </>
  )
}

export default login;