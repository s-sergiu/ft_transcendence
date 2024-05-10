import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import slide from './img/background.jpg';
import slide2 from './img/background2.jpg';
import slide3 from './img/background3.jpg';
import slide4 from './img/background4.jpg';
import slide33 from './img/background33.jpg';
import { Container, Row, Col, Image } from 'react-bootstrap';
import {MDBFooter,MDBContainer,MDBCol,MDBRow,MDBBtn,MDBInput} from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/content.css'
 
function Content() {
    return (
        <div>
            <Carousel data-bs-theme="dark">
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={slide}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>Ping Pong Game finally online</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={slide2}
                  alt="Second slide"
                />
                <Carousel.Caption>
                  <h3>You will enjoy playing with friends</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={slide3}
                  alt="Third slide"
                />
                <Carousel.Caption>
                  <h3>Make the best score and be the best</h3>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>

             <Container>
                <Row>
                <Col xs={12} md={6}>
                    <Image src={slide4} fluid className="custom-image"/>
                 </Col>
                <Col xs={12} md={6}>
                <div className='right'>
                    <h2>Be the first</h2>
                    <p>
                    In the virtual realm of online ping pong, players from across the globe face off in lightning-fast matches, their digital paddles dancing across the screen with precision and finesse. Amidst the flurry of rapid exchanges, strategic maneuvers, and pixel-perfect returns, a vibrant community thrives, united by their shared love for the timeless sport.
                    <br></br>
                    <Button variant="success">Play Now</Button>{' '}

                    </p>
                 </div>
                </Col>
                </Row>
             </Container>
            <br></br>

            <Container>
                <Row>
                <Col xs={12} md={6}>
                <div className='left'>
                    <h2>Be the best</h2>
                    <p>
                    In the dynamic world of online ping pong, players engage in fast-paced matches where every click and keystroke determines victory or defeat. With sleek graphics and fluid animations, the digital paddles wielded by competitors become extensions of their skill and strategy. As rallies unfold in real-time, the virtual arena pulsates with excitement, showcasing the global community's passion for the sport in a thrilling digital landscape.
                    <br></br>
                    <Button variant="success">Play Now</Button>{' '}

                    </p>
                 </div>
                </Col>

                <Col xs={12} md={6}>
                  <br></br><br></br><br></br><br></br>
                    <Image src={slide33} fluid className="custom-image"/>
                 </Col>
                
                </Row>
             </Container>
            <br></br>

      <MDBFooter bgColor='dark' className='text-center text-white text-lg-left'>
      <MDBContainer className='p-4 pb-0'>
        <h4>made by</h4>
        <p>Sergiu Ster && Abdelilah Noury</p>
        &copy; {new Date().getFullYear()} Copyright{' '}
      </MDBContainer>
    </MDBFooter>
        </div>
          );
        }
export default Content;
