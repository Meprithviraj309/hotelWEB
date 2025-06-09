import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faShoppingCart, faCalendarAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import FoodGallery from './FoodGallery';

const Dashboard: React.FC = () => {
  return (
    <div className="container py-4">
      <h2 className="text-white mb-4">Dashboard</h2>
      <Row>
        <Col md={3} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Total Menu Items</h6>
                  <h3>24</h3>
                </div>
                <FontAwesomeIcon icon={faUtensils} size="2x" className="text-primary" />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Active Orders</h6>
                  <h3>8</h3>
                </div>
                <FontAwesomeIcon icon={faShoppingCart} size="2x" className="text-success" />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Today's Reservations</h6>
                  <h3>12</h3>
                </div>
                <FontAwesomeIcon icon={faCalendarAlt} size="2x" className="text-warning" />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Staff Members</h6>
                  <h3>15</h3>
                </div>
                <FontAwesomeIcon icon={faUsers} size="2x" className="text-info" />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <FoodGallery />
    </div>
  );
};

export default Dashboard; 