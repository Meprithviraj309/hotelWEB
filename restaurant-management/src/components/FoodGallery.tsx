import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const FoodGallery: React.FC = () => {
  const foodItems = [
    {
      id: 1,
      name: 'Signature Pasta',
      image: '/src/assets/pasta.jpg',
      description: 'Our chef\'s special pasta with homemade sauce'
    },
    {
      id: 2,
      name: 'Grilled Salmon',
      image: '/src/assets/salmon.jpg',
      description: 'Fresh Atlantic salmon with seasonal vegetables'
    },
    {
      id: 3,
      name: 'Classic Burger',
      image: '/src/assets/burger.jpg',
      description: 'Premium beef patty with special sauce'
    },
    {
      id: 4,
      name: 'Caesar Salad',
      image: '/src/assets/salad.jpg',
      description: 'Fresh romaine lettuce with parmesan and croutons'
    }
  ];

  return (
    <div className="mt-4">
      <h3 className="text-white mb-4">Featured Dishes</h3>
      <Row>
        {foodItems.map((item) => (
          <Col key={item.id} md={3} className="mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={item.image}
                alt={item.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FoodGallery; 