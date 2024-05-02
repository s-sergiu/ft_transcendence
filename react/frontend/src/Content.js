import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import slide from './img/background.jpg';
import slide2 from './img/background2.jpg';
import slide3 from './img/background3.jpg';
import slide4 from './img/background4.jpg';
import { Container, Row, Col, Image } from 'react-bootstrap';
import {MDBFooter,MDBContainer,MDBCol,MDBRow,MDBBtn,MDBInput} from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';
import './content.css'
 
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
                  <h5>First slide label</h5>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={slide2}
                  alt="Second slide"
                />
                <Carousel.Caption>
                  <h5>Second slide label</h5>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={slide3}
                  alt="Third slide"
                />
                <Carousel.Caption>
                  <h5>Third slide label</h5>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                  </p>
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
                    <h2>Description Title</h2>
                    <p>
                    In the virtual realm of online ping pong, players from across the globe face off in lightning-fast matches, their digital paddles dancing across the screen with precision and finesse. Amidst the flurry of rapid exchanges, strategic maneuvers, and pixel-perfect returns, a vibrant community thrives, united by their shared love for the timeless sport.
                    <br></br>
                    <Button variant="success">Success</Button>{' '}

                    </p>
                 </div>
                </Col>
                </Row>
            </Container>
            <br></br>

            <MDBFooter bgColor='dark' className='text-center text-white text-lg-left'>
      <MDBContainer className='p-4 pb-0'>
        <form action=''>
          <MDBRow className='d-flex justify-content-center'>
            <MDBCol size='auto' className='mb-4 mb-md-0'>
              <p className='pt-2'>
                <strong>Sign up for our newsletter</strong>
              </p>
            </MDBCol>

            <MDBCol md='5' size='12' className='mb-4 mb-md-0'>
              <MDBInput type='text' id='form5Example2' label='Email address' contrast />
            </MDBCol>

            <MDBCol size='auto' className='mb-4 mb-md-0'>
              <MDBBtn outline color='light'>
                Subscribe
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-white' href='https://mdbootstrap.com/'>
          MDBootstrap.com
        </a>
      </div>
    </MDBFooter>
        </div>
          );
        }
export default Content;
