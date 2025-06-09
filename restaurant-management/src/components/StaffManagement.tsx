import React, { useState } from 'react';
import { Table, Button, Modal, Form, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface Staff {
  id: number;
  name: string;
  role: 'manager' | 'waiter' | 'chef' | 'host';
  email: string;
  phone: string;
  status: 'active' | 'on_leave' | 'inactive';
  joinDate: string;
}

const StaffManagement: React.FC = () => {
  const [staff, setStaff] = useState<Staff[]>([
    {
      id: 1,
      name: 'Michael Johnson',
      role: 'manager',
      email: 'michael@restaurant.com',
      phone: '555-0123',
      status: 'active',
      joinDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Sarah Williams',
      role: 'chef',
      email: 'sarah@restaurant.com',
      phone: '555-0124',
      status: 'active',
      joinDate: '2023-03-20'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentStaff, setCurrentStaff] = useState<Staff>({
    id: 0,
    name: '',
    role: 'waiter',
    email: '',
    phone: '',
    status: 'active',
    joinDate: new Date().toISOString().split('T')[0]
  });

  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    setCurrentStaff({
      id: 0,
      name: '',
      role: 'waiter',
      email: '',
      phone: '',
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0]
    });
    setShowModal(true);
  };

  const handleEdit = (staffMember: Staff) => {
    setCurrentStaff(staffMember);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    setStaff(staff.filter(member => member.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStaff.id === 0) {
      // Add new staff member
      const newStaff = {
        ...currentStaff,
        id: Math.max(...staff.map(member => member.id)) + 1
      };
      setStaff([...staff, newStaff]);
    } else {
      // Update existing staff member
      setStaff(staff.map(member =>
        member.id === currentStaff.id ? currentStaff : member
      ));
    }
    handleClose();
  };

  const getStatusBadge = (status: Staff['status']) => {
    const statusConfig = {
      active: { variant: 'success', text: 'Active' },
      on_leave: { variant: 'warning', text: 'On Leave' },
      inactive: { variant: 'danger', text: 'Inactive' }
    };

    const config = statusConfig[status];
    return <Badge bg={config.variant}>{config.text}</Badge>;
  };

  const getRoleBadge = (role: Staff['role']) => {
    const roleConfig = {
      manager: { variant: 'primary', text: 'Manager' },
      waiter: { variant: 'info', text: 'Waiter' },
      chef: { variant: 'warning', text: 'Chef' },
      host: { variant: 'secondary', text: 'Host' }
    };

    const config = roleConfig[role];
    return <Badge bg={config.variant}>{config.text}</Badge>;
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Staff Management</h2>
        <Button variant="primary" onClick={handleShow}>
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Add Staff Member
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Join Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map(staffMember => (
            <tr key={staffMember.id}>
              <td>{staffMember.name}</td>
              <td>{getRoleBadge(staffMember.role)}</td>
              <td>{staffMember.email}</td>
              <td>{staffMember.phone}</td>
              <td>{getStatusBadge(staffMember.status)}</td>
              <td>{staffMember.joinDate}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(staffMember)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(staffMember.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentStaff.id === 0 ? 'Add Staff Member' : 'Edit Staff Member'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentStaff.name}
                onChange={(e) => setCurrentStaff({...currentStaff, name: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={currentStaff.role}
                onChange={(e) => setCurrentStaff({...currentStaff, role: e.target.value as Staff['role']})}
                required
              >
                <option value="manager">Manager</option>
                <option value="waiter">Waiter</option>
                <option value="chef">Chef</option>
                <option value="host">Host</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={currentStaff.email}
                onChange={(e) => setCurrentStaff({...currentStaff, email: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                value={currentStaff.phone}
                onChange={(e) => setCurrentStaff({...currentStaff, phone: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={currentStaff.status}
                onChange={(e) => setCurrentStaff({...currentStaff, status: e.target.value as Staff['status']})}
                required
              >
                <option value="active">Active</option>
                <option value="on_leave">On Leave</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Join Date</Form.Label>
              <Form.Control
                type="date"
                value={currentStaff.joinDate}
                onChange={(e) => setCurrentStaff({...currentStaff, joinDate: e.target.value})}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleClose} className="me-2">
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {currentStaff.id === 0 ? 'Add Staff Member' : 'Save Changes'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StaffManagement; 