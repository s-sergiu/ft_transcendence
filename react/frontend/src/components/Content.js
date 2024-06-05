import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import slide from './img/background.jpg';
import slide2 from './img/background2.jpg';
import slide3 from './img/background3.jpg';
import slide4 from './img/background4.jpg';
import slide33 from './img/background33.jpg';
import a from './abdel.jpg';
import s from './shettima.jpeg';
import ssergiu_pic from './sergiu.png';
import djmekki_pic from './djmekki.jpg';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { MDBContainer, MDBFooter } from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/content.css'

const people = [
  { name: 'Abdelilah Noury', imageUrl: a },
  { name: 'Sergiu Ster', imageUrl: ssergiu_pic },
  { name: 'Reda Doukali', imageUrl: slide33 },
  { name: 'Shettima Ali', imageUrl: s },
  { name: 'Djallal Mekki', imageUrl: djmekki_pic },
];
 
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

            <Container className="made-by-section">
              <h2>Made by:</h2>
              <Row className="d-flex justify-content-center">
                {people.map((person, index) => (
                  <Col key={index} md={2} className="person-box">
                    <Image src={person.imageUrl} roundedCircle className="person-image" />
                    <h5>{person.name}</h5>
                  </Col>
                ))}
              </Row>
            </Container>
                <br></br><br></br><br></br>
            <footer className="footer">
      <Row>
        <Col className="text-center py-3">
          <p>© 2024 Your Company. All rights reserved.</p>
        </Col>
      </Row>

  </footer>

      {/* <MDBFooter bgColor='dark' className='text-center text-white text-lg-left'>
      <MDBContainer className='p-4 pb-0'>
        <h4>made by</h4>
        <p>Transcendence 42team</p>
        &copy; {new Date().getFullYear()} Copyright{' '}
      </MDBContainer>
    </MDBFooter> */}
        </div>
          );
        }
export default Content;
