import React from 'react'
import {Container, Row, Col} from 'react-bootstrap';
// import { FaPhone } from 'react-icons/fa';

const Footer = () => {
    const currentYear =new Date().getFullYear()
  return (

    <footer>
        {/* <Container>
          <Row>
            <Col style={{color:'black'}} className='text-center py-3'>
            <p> <FaPhone /> &nbsp; 9912124664</p>
            </Col>
          </Row>
        </Container> */}
        <Container>
        <Row>
            <Col className='text-center py-3'>
                <p>SV Shop &copy; {currentYear}</p>
            </Col>
        </Row>
        </Container>
    </footer>
  )
}

export default Footer