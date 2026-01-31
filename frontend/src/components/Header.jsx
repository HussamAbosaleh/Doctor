import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useState, useEffect } from "react";
import '../css/Header.css'
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import API from "../api/api";

export default function Header() {
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [specialties, setSpecialties] = useState([]);

  const token = localStorage.getItem("token");
  const isDoctor = localStorage.getItem("isDoctor") === "true";

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const res = await API.get(`/api/services/by-specialty/${slug}`);

        setSpecialties(res.data);
      } catch (err) {
        console.error("Error fetching specialties:", err);
      }
    };
    fetchSpecialties();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isDoctor");
    window.location.href = "/";
  };

  return (
    <Navbar expand="lg" fixed="top" className="custom-navbar">
      <Container fluid className="navbar-padding">

        <Navbar.Brand as={Link} to={"/"} className="logo px-2">
            <img src={logo} 
                style={{width:'200px',height:'100px',margin:'10px'}} 
                alt='logo' 
            />
        </Navbar.Brand>

        {/* TOGGLE (mobile) */}
        <Navbar.Toggle aria-controls="main-navbar" className="custom-toggle" />

        <Navbar.Collapse id="main-navbar" className="justify-content-end">
          <Nav className="align-items-lg-center">

            <NavDropdown
              title="Services"
              id="dropdown-1"
              className="nav-item-custom no-arrow px-1 mx-2"
              show={showFirst}
              onMouseEnter={() => setShowFirst(true)}
              onMouseLeave={() => setShowFirst(false)}
            >
              {specialties.map((s) => (
                <LinkContainer to={`/specialty/${s.slug}`} key={s.slug}>
                  <NavDropdown.Item>{s.label}</NavDropdown.Item>
                </LinkContainer>
              ))}
            </NavDropdown>

            <NavDropdown
              title="About us"
              id="dropdown-2"
              className="nav-item-custom no-arrow px-1 mx-2"
              show={showSecond}
              onMouseEnter={() => setShowSecond(true)}
              onMouseLeave={() => setShowSecond(false)}
            >
              <LinkContainer to={"/doctors"}>
                <NavDropdown.Item>Our Doctors</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to={"/someWhere"}>
                <NavDropdown.Item>2</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>

            <Nav.Link href="#" className="nav-item-custom px-1 mx-2">Contact us</Nav.Link>

              {/* زر خدماتي للطبيب */}
            {token && isDoctor && (
              <Nav.Link as={Link} to="/my-services" className="nav-item-custom px-1 mx-2">
                My Services
              </Nav.Link>
            )}

            {token ? (
              <Nav.Link onClick={handleLogout} className="nav-item-custom px-1 mx-2">Log out</Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login" className="nav-item-custom px-1 mx-2">Log in</Nav.Link>
            )}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}