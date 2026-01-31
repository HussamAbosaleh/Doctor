import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api";

API.get(`/api/services/by-specialty/${slug}`)

import { Card, Button, Container, Modal, Form } from "react-bootstrap";
import "../css/Service.css";

export default function SpecialtyPage() {
  const { slug } = useParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await API.get(
  `/api/services/by-speciality?speciality=${slug}`
);

        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [slug]);

  const handleBookNow = async (service) => {
    try {
      setSelectedService(service);
      const res = await API.get(`/api/services/by-specialty/${slug}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,

        },
      }); 

      setAvailableSlots(res.data);
      setShowModal(true);
    } catch (err) {
      console.error("Error fetching available slots:", err);
    }
  };

  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime) return alert("Please select a date and time");

    try {
      await API.post(`/api/appointments`, {
          doctor_id: selectedService.doctor.id,
          service_id: selectedService.id,
          appointment_date: selectedDate,
          appointment_time: selectedTime,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Appointment booked successfully!");
      setShowModal(false);
      setSelectedDate("");
      setSelectedTime("");
    } catch (err) {
      const msg = err.response?.data?.error || "Error booking appointment";
      alert(msg); 
    }
  };

  if (loading) return <p>Loading services...</p>;
  if (services.length === 0) return <p>No services available for this specialty.</p>;

  return (
    <Container style={{ marginTop: "120px", marginBottom: "50px" }}>
      <h2 className="my-3 pb-2">Our Services</h2>
      <div className="services-grid">
        {services.map((service) => (
          <Card key={service.id} className="service-card">
            <Card.Img
              variant="top"
              src={`../src/assets/${service.image}`}  
              alt={service.service_title}
            />
            <Card.Body>
              <Card.Title>{service.service_title}</Card.Title>
              <Card.Text>{service.service_description}</Card.Text>
              <Card.Text>
                <strong>Doctor : </strong> {service.doctor?.first_name} {service.doctor?.last_name}
              </Card.Text>
              <Button variant="primary" onClick={() => handleBookNow(service)}>
                Book Now
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Modal لاختيار التاريخ والوقت */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Book Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                as="select"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                <option value="">Select a date</option>
                {availableSlots.map((slot) => (
                  <option key={slot.date} value={slot.date}>{slot.date}</option>
                ))}
              </Form.Control>
            </Form.Group>

            {selectedDate && (
              <Form.Group className="mt-3">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  <option value="">Select a time</option>
                  {availableSlots
                    .find((s) => s.date === selectedDate)
                    ?.times.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                </Form.Control>
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmBooking}>
            Confirm Booking
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
