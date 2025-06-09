import React, { useState } from 'react';
import { Table, Button, Modal, Form, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

interface Reservation {
  id: number;
  customerName: string;
  date: string;
  time: string;
  partySize: number;
  tableNumber: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  specialRequests: string;
}

const Reservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: 1,
      customerName: 'John Doe',
      date: '2024-03-20',
      time: '19:00',
      partySize: 4,
      tableNumber: 5,
      status: 'confirmed',
      specialRequests: 'Window seat preferred'
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      date: '2024-03-20',
      time: '20:30',
      partySize: 2,
      tableNumber: 3,
      status: 'pending',
      specialRequests: 'Allergic to nuts'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentReservation, setCurrentReservation] = useState<Reservation>({
    id: 0,
    customerName: '',
    date: '',
    time: '',
    partySize: 2,
    tableNumber: 1,
    status: 'pending',
    specialRequests: ''
  });

  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    setCurrentReservation({
      id: 0,
      customerName: '',
      date: '',
      time: '',
      partySize: 2,
      tableNumber: 1,
      status: 'pending',
      specialRequests: ''
    });
    setShowModal(true);
  };

  const handleEdit = (reservation: Reservation) => {
    setCurrentReservation(reservation);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    setReservations(reservations.filter(res => res.id !== id));
  };

  const handleStatusChange = (id: number, newStatus: Reservation['status']) => {
    setReservations(reservations.map(res =>
      res.id === id ? { ...res, status: newStatus } : res
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentReservation.id === 0) {
      // Add new reservation
      const newReservation = {
        ...currentReservation,
        id: Math.max(...reservations.map(res => res.id)) + 1
      };
      setReservations([...reservations, newReservation]);
    } else {
      // Update existing reservation
      setReservations(reservations.map(res =>
        res.id === currentReservation.id ? currentReservation : res
      ));
    }
    handleClose();
  };

  const getStatusBadge = (status: Reservation['status']) => {
    const statusConfig = {
      confirmed: { variant: 'success', text: 'Confirmed' },
      pending: { variant: 'warning', text: 'Pending' },
      cancelled: { variant: 'danger', text: 'Cancelled' }
    };

    const config = statusConfig[status];
    return <Badge bg={config.variant}>{config.text}</Badge>;
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Reservations</h2>
        <Button variant="primary" onClick={handleShow}>
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          New Reservation
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Party Size</th>
            <th>Table</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(reservation => (
            <tr key={reservation.id}>
              <td>{reservation.customerName}</td>
              <td>{reservation.date}</td>
              <td>{reservation.time}</td>
              <td>{reservation.partySize}</td>
              <td>Table {reservation.tableNumber}</td>
              <td>{getStatusBadge(reservation.status)}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(reservation)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                {reservation.status === 'pending' && (
                  <>
                    <Button
                      variant="outline-success"
                      size="sm"
                      className="me-2"
                      onClick={() => handleStatusChange(reservation.id, 'confirmed')}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleStatusChange(reservation.id, 'cancelled')}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentReservation.id === 0 ? 'New Reservation' : 'Edit Reservation'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type="text"
                value={currentReservation.customerName}
                onChange={(e) => setCurrentReservation({...currentReservation, customerName: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={currentReservation.date}
                onChange={(e) => setCurrentReservation({...currentReservation, date: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                value={currentReservation.time}
                onChange={(e) => setCurrentReservation({...currentReservation, time: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Party Size</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={currentReservation.partySize}
                onChange={(e) => setCurrentReservation({...currentReservation, partySize: parseInt(e.target.value)})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Table Number</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={currentReservation.tableNumber}
                onChange={(e) => setCurrentReservation({...currentReservation, tableNumber: parseInt(e.target.value)})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Special Requests</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={currentReservation.specialRequests}
                onChange={(e) => setCurrentReservation({...currentReservation, specialRequests: e.target.value})}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleClose} className="me-2">
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {currentReservation.id === 0 ? 'Create Reservation' : 'Save Changes'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Reservations; 