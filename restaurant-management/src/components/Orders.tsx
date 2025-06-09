import React, { useState } from 'react';
import { Table, Badge, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

interface Order {
  id: number;
  tableNumber: number;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  total: number;
  timestamp: string;
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      tableNumber: 5,
      items: [
        { name: 'Margherita Pizza', quantity: 2, price: 12.99 },
        { name: 'Caesar Salad', quantity: 1, price: 8.99 }
      ],
      status: 'pending',
      total: 34.97,
      timestamp: '2024-03-20 14:30'
    },
    {
      id: 2,
      tableNumber: 3,
      items: [
        { name: 'Spaghetti Bolognese', quantity: 1, price: 14.99 },
        { name: 'Garlic Bread', quantity: 2, price: 4.99 }
      ],
      status: 'preparing',
      total: 24.97,
      timestamp: '2024-03-20 14:25'
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleStatusChange = (orderId: number, newStatus: Order['status']) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusBadge = (status: Order['status']) => {
    const statusConfig = {
      pending: { variant: 'warning', text: 'Pending' },
      preparing: { variant: 'info', text: 'Preparing' },
      ready: { variant: 'success', text: 'Ready' },
      completed: { variant: 'secondary', text: 'Completed' },
      cancelled: { variant: 'danger', text: 'Cancelled' }
    };

    const config = statusConfig[status];
    return <Badge bg={config.variant}>{config.text}</Badge>;
  };

  return (
    <div>
      <h2 className="mb-4">Orders</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Table</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>Table {order.tableNumber}</td>
              <td>{order.items.length} items</td>
              <td>${order.total.toFixed(2)}</td>
              <td>{getStatusBadge(order.status)}</td>
              <td>{order.timestamp}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleViewOrder(order)}
                >
                  <FontAwesomeIcon icon={faEye} />
                </Button>
                {order.status === 'pending' && (
                  <>
                    <Button
                      variant="outline-success"
                      size="sm"
                      className="me-2"
                      onClick={() => handleStatusChange(order.id, 'preparing')}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleStatusChange(order.id, 'cancelled')}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </Button>
                  </>
                )}
                {order.status === 'preparing' && (
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => handleStatusChange(order.id, 'ready')}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Order Details #{selectedOrder?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <div className="mb-3">
                <strong>Table Number:</strong> {selectedOrder.tableNumber}
              </div>
              <div className="mb-3">
                <strong>Status:</strong> {getStatusBadge(selectedOrder.status)}
              </div>
              <div className="mb-3">
                <strong>Time:</strong> {selectedOrder.timestamp}
              </div>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>${(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="text-end"><strong>Total:</strong></td>
                    <td><strong>${selectedOrder.total.toFixed(2)}</strong></td>
                  </tr>
                </tfoot>
              </Table>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Orders; 