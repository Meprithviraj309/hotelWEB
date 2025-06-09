import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUtensils, faClipboardList, faCalendarAlt, faUsers } from '@fortawesome/free-solid-svg-icons';

const Navbar: React.FC = () => {
  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">Restaurant Manager</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              <FontAwesomeIcon icon={faHome} className="me-2" />
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/menu">
              <FontAwesomeIcon icon={faUtensils} className="me-2" />
              Menu
            </Nav.Link>
            <Nav.Link as={Link} to="/orders">
              <FontAwesomeIcon icon={faClipboardList} className="me-2" />
              Orders
            </Nav.Link>
            <Nav.Link as={Link} to="/reservations">
              <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
              Reservations
            </Nav.Link>
            <Nav.Link as={Link} to="/staff">
              <FontAwesomeIcon icon={faUsers} className="me-2" />
              Staff
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar; 