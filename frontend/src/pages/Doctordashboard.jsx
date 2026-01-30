import { useEffect, useState } from "react";
import axios from "axios"; 
import { Card, Button, Container, Modal, Form, Badge, Table } from "react-bootstrap"; 
import "../css/Service.css"

export default function Doctordashboard() {
  const token = localStorage.getItem("token");

  // Services State
  const [services, setServices] = useState([]); 
  const [loadingServices, setLoadingServices] = useState(true); 
  const [showModal, setShowModal] = useState(false); 
  const [editService, setEditService] = useState(null); 
  const [formData, setFormData] = useState({ 
        service_title: "", 
        service_description: "",  
        image: "" }); 

  // Appointments State
  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // Fetch Services
  const fetchServices = async () => {
    setLoadingServices(true);
    try {
      const res = await axios.get("http://localhost:5000/api/services/my", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices(res.data);
    } catch (err) {
      console.error(err);
    }finally {
      setLoadingServices(false);
    }
  }; 
  
  // Fetch Appointments
  const fetchAppointments = async () => {
    setLoadingAppointments(true);
    try {
      const res = await axios.get("http://localhost:5000/api/appointments/my", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAppointments(false);
    }
  };

  useEffect(() => { 
    if (token) {
      fetchServices();
      fetchAppointments();
    }
  }, [token]);

  // Service Modal
  const handleShowModal = (service = null) => { 
    setEditService(service); 
    setFormData(service ? {
      service_title: service.service_title,
      service_description: service.service_description,
      image: service.image
    } : {
      service_title: "", 
      service_description: "", 
      image: "" }); 
    setShowModal(true); 
  }; 
    
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    try { 
      if (editService) {
        await axios.put(`http://localhost:5000/api/services/${editService.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` } 
        }); 
      } else { 
        await axios.post("http://localhost:5000/api/services", formData, {
          headers: { Authorization: `Bearer ${token}` } 
        }); 
      } 
      fetchServices(); 
      setShowModal(false); 
    } catch (err) { 
      console.error(err); 
    } 
  }; 
  
  const handleDelete = async (id) => { 
    if (!window.confirm("Are you sure about deleting this service?")) return; 
    try { 
      await axios.delete(`http://localhost:5000/api/services/${id}`, { 
        headers: { Authorization: `Bearer ${token}` } 
      }); 
      fetchServices(); 
    } catch (err) { 
      console.error(err); 
    } 
  }; 
  
  // Update Appointment Status
  const updateAppointmentStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/appointments/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered Appointments
  const filteredAppointments = appointments.filter(a => {
    return (!statusFilter || a.status === statusFilter) &&
           (!dateFilter || a.appointment_date === dateFilter);
  });

  return ( 
    <Container style={{ marginTop: "120px", marginBottom: "50px" }}> 

      <h2 className="mb-4">My Services</h2> 
      <Button variant="primary" className="mb-3" onClick={() => handleShowModal()}>
        Add a New Service
      </Button> 

      {loadingServices ? <p>Loading services...</p> : (
        <div className="services-grid mb-5">
          {services.map(service => (
            <Card key={service.id} className="service-card">
              <Card.Img src={`../src/assets/${service.image}`} />
              <Card.Body>
                <Card.Title>{service.service_title}</Card.Title>
                <Card.Text>{service.service_description}</Card.Text>
                <div className="d-flex gap-2">
                  <Button variant="info" onClick={() => handleShowModal(service)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(service.id)}>Delete</Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}

      {/* Service Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}> 
        <Modal.Header closeButton> 
          <Modal.Title>{editService ? "Edit Service" : "Add Service"}</Modal.Title> 
        </Modal.Header> 
        <Modal.Body> 
          <Form onSubmit={handleSubmit}> 
            <Form.Group className="mb-3"> 
              <Form.Label>Service Title</Form.Label> 
              <Form.Control type="text" value={formData.service_title} 
                onChange={e => setFormData({...formData, service_title: e.target.value})} required /> 
            </Form.Group> 
            <Form.Group className="mb-3"> 
              <Form.Label>Service Description</Form.Label> 
              <Form.Control type="text" value={formData.service_description || ""} 
                onChange={e => setFormData({...formData, service_description: e.target.value})} /> 
            </Form.Group>  
            <Form.Group className="mb-3"> 
              <Form.Label>Image(path)</Form.Label> 
              <Form.Control type="text" value={formData.image || ""} 
                onChange={e => setFormData({...formData, image: e.target.value})} /> 
            </Form.Group> 
            
            <Button variant="primary" type="submit">{editService ? "Save Changes" : "Add Service"}</Button> 
          </Form> 
        </Modal.Body> 
      </Modal> 

      {/* Appointments */}
      <h2 className="mt-5 mb-3">My Appointments</h2>

      <div className="d-flex gap-3 mb-3">
        <Form.Select 
          className="filter-select"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="">Filter by Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </Form.Select>

        <div className="input-with-icon">
          <Form.Control
            type="date"
            className="filter-date"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
          />
          <span className="calendar-icon">📅</span>
        </div>
      </div>

      {loadingAppointments ? (
        <p>Loading appointments...</p>
      ) : filteredAppointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map(app => (
              <tr key={app.id}>
                <td>{app.patient.first_name} {app.patient.last_name}</td>
                <td>{app.Service.service_title}</td>
                <td>{app.appointment_date}</td>
                <td>{app.appointment_time}</td>
                <td><Badge bg={
                  app.status === "pending" ? "secondary" :
                  app.status === "confirmed" ? "primary" :
                  app.status === "cancelled" ? "danger" :
                  "success"
                }>{app.status}</Badge></td>
                <td>
                  {app.status === "pending" && (
                    <>
                      <Button size="sm" variant="success" onClick={() => updateAppointmentStatus(app.id, "confirmed")}>Confirm</Button>{" "}
                      <Button size="sm" variant="warning" onClick={() => updateAppointmentStatus(app.id, "cancelled")}>Cancel</Button>
                    </>
                  )}
                  {app.status === "confirmed" && (
                    <Button size="sm" variant="secondary" onClick={() => updateAppointmentStatus(app.id, "completed")}>Complete</Button>
                  )}
                  {/* cancelled or completed: no action */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}