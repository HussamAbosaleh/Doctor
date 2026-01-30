import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { specialties } from "../data/specialties";

function SpecialtiesDoc() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">DentalClinic</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {specialties.map((s) => (
              <Nav.Link 
                as={Link} 
                key={s.slug} 
                to={`/specialty/${(s.slug)}`}
              >
                {s.label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default SpecialtiesDoc;
