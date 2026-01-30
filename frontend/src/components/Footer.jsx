import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "../css/Footer.css";

function Footer() {
  return (
    <footer className="my-footer mt-auto pb-2 pt-4">
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <h5>Perfect Smile Dental</h5>
            <p style={{ fontSize: "0.9rem" }}>
              A fictional project created for educational and aesthetic purposes only.
              <br />No real medical services are provided.
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Berlin+Dental+Clinic"
              target="_blank"
              rel="noopener noreferrer"
              className="d-block mt-2"
              style={{ fontSize: "0.9rem", color: "#fff", textDecoration: "underline" }}
            >
              📍 Berlin Dental Clinic, Germany
            </a>
          </Col>

          <Col md={4} className="mb-3">
            <h5>Contact</h5>
            <p style={{ fontSize: "0.9rem" }}>Email: info@perfectsmiledental.com</p>
            <p style={{ fontSize: "0.9rem" }}>Phone: +49 123 456789</p>
            <p style={{ fontSize: "0.9rem" }}>Mon – Fri: 09:00 – 18:00</p>
            
          </Col>

          <Col md={4} className="mb-3">
            <h5>Legal</h5>
            <Link to="/impressum" className="d-block mb-1">Impressum</Link>
            <Link to="/privacy" className="d-block mb-1">Privacy Policy</Link>
            <Link to="/cookies" className="d-block mb-1">Cookies</Link>
            <Link to="/patient-reviews" className="d-block mt-2 fw-bold">
              Leave a Review
            </Link>
          </Col>
        </Row>

        <hr className="bg-light my-1" />

        <p className="text-center mb-0" style={{ fontSize: "0.85rem" }}>
          © 2026 – Perfect Smile Dental
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
