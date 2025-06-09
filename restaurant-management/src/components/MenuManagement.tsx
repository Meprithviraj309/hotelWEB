import React, { useState } from 'react';
import { Table, Button, Modal, Form, Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string; // Base64 string for the image
}

const MenuManagement: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { 
      id: 1, 
      name: 'Margherita Pizza', 
      category: 'Pizza', 
      price: 12.99, 
      description: 'Classic tomato and mozzarella pizza',
      image: '/src/assets/pizza.jpg'
    },
    { 
      id: 2, 
      name: 'Caesar Salad', 
      category: 'Salads', 
      price: 8.99, 
      description: 'Fresh romaine lettuce with Caesar dressing',
      image: '/src/assets/salad.jpg'
    },
    { 
      id: 3, 
      name: 'Spaghetti Bolognese', 
      category: 'Pasta', 
      price: 14.99, 
      description: 'Spaghetti with meat sauce',
      image: '/src/assets/pasta.jpg'
    },
  ]);
  const [currentItem, setCurrentItem] = useState<MenuItem>({
    id: 0,
    name: '',
    category: '',
    price: 0,
    description: '',
    image: ''
  });

  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    setCurrentItem({
      id: 0,
      name: '',
      category: '',
      price: 0,
      description: '',
      image: ''
    });
    setShowModal(true);
  };

  const handleEdit = (item: MenuItem) => {
    setCurrentItem(item);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentItem({
          ...currentItem,
          image: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentItem.id === 0) {
      // Add new item
      const newItem = {
        ...currentItem,
        id: Math.max(...menuItems.map(item => item.id)) + 1
      };
      setMenuItems([...menuItems, newItem]);
    } else {
      // Update existing item
      setMenuItems(menuItems.map(item =>
        item.id === currentItem.id ? currentItem : item
      ));
    }
    handleClose();
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Menu Management</h2>
        <Button variant="primary" onClick={handleShow}>
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Add Menu Item
        </Button>
      </div>

      {/* Menu Items Grid View */}
      <Row className="mb-4">
        {menuItems.map(item => (
          <Col key={item.id} md={4} className="mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={item.image}
                alt={item.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{item.category}</Card.Subtitle>
                <Card.Text>{item.description}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">${item.price.toFixed(2)}</h5>
                  <div>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(item)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{currentItem.id === 0 ? 'Add Menu Item' : 'Edit Menu Item'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentItem.name}
                onChange={(e) => setCurrentItem({...currentItem, name: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={currentItem.category}
                onChange={(e) => setCurrentItem({...currentItem, category: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                value={currentItem.price}
                onChange={(e) => setCurrentItem({...currentItem, price: parseFloat(e.target.value)})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={currentItem.description}
                onChange={(e) => setCurrentItem({...currentItem, description: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required={currentItem.id === 0}
              />
              {currentItem.image && (
                <div className="mt-2">
                  <img
                    src={currentItem.image}
                    alt="Preview"
                    style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
                  />
                </div>
              )}
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleClose} className="me-2">
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {currentItem.id === 0 ? 'Add Item' : 'Save Changes'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MenuManagement; 