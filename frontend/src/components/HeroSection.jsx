import React, { useState, useEffect } from "react";
import "../css/HeroSection.css";
import axios from "axios";
import { Modal, Form, Button } from "react-bootstrap";

const HeroSection = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // جلب الخدمات عند تحميل الهيرو
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/services", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };
    fetchServices();
  }, []);

  // جلب الأوقات المتاحة بعد اختيار الخدمة
  const handleLoadSlots = async () => {
    if (!selectedService) return alert("Please select a service first");

    setSelectedDoctor(selectedService.doctor);

    try {
      const res = await axios.get(
        `http://localhost:5000/api/appointments/available?doctor_id=${selectedService.doctor.id}&service_id=${selectedService.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAvailableSlots(res.data);
    } catch (err) {
      const msg = err.response?.data?.error || "Error fetching available slots";
      alert(msg);
    }
  };

  // تأكيد الحجز
  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime)
      return alert("Please select a date and time");

    try {
      await axios.post(
        "http://localhost:5000/api/appointments",
        {
          doctor_id: selectedDoctor.id,
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
      setShowBookingModal(false);
      setSelectedDate("");
      setSelectedTime("");
      setSelectedService(null);
      setSelectedDoctor(null);
      setAvailableSlots([]);
    } catch (err) {
      const msg = err.response?.data?.error || "Error booking appointment";
      alert(msg);
    }
  };

  // الأزرار الجانبية
  const handleWhatsApp = () => window.open("https://wa.me/49123456789", "_blank");
  const handlePhoneCall = () => window.open("tel:03012345678", "_self");

  return (
    <div className="hero-section">
      <div className="hero-background">
        <div className="image-overlay"></div>
      </div>

      <div className="hero-content">
        <Button
          className="cta-button"
          onClick={() => setShowBookingModal(true)}
        >
          <span className="button-text">Online Booking</span>
        </Button>
      </div>

      <div className="contact-sidebar">
        <div className="sidebar-item" onClick={handleWhatsApp}>
          <div className="item-icon">💬</div>
          <div className="item-text">WhatsApp</div>
        </div>
        <div className="sidebar-item" onClick={() => setShowBookingModal(true)}>
          <div className="item-icon">📅</div>
          <div className="item-text">Booking</div>
        </div>
        <div className="sidebar-item" onClick={handlePhoneCall}>
          <div className="item-icon">📞</div>
          <div className="item-text">Call</div>
        </div>
      </div>

      {/* Modal الحجز */}
      <Modal show={showBookingModal} onHide={() => setShowBookingModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Book Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* اختيار الخدمة */}
          <Form.Group className="mb-3">
            <Form.Label>Service</Form.Label>
            <Form.Select
              value={selectedService?.id || ""}
              onChange={(e) => {
                const service = services.find(
                  (s) => s.id === parseInt(e.target.value)
                );
                setSelectedService(service);
                setSelectedDoctor(service?.doctor || null);
                setSelectedDate("");
                setSelectedTime("");
                setAvailableSlots([]);
              }}
            >
              <option key="default" value="">
                Select a service
              </option>
              {services.map((s) => (
                <option key={`service-${s.id}`} value={s.id}>
                  {s.service_title} - Dr. {s.doctor?.first_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* زر جلب الأوقات */}
          {selectedService && (
            <Button
              variant="primary"
              className="mb-3"
              onClick={handleLoadSlots}
            >
              Load Available Slots
            </Button>
          )}

          {/* عرض التواريخ */}
          {availableSlots.length > 0 && selectedService && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                >
                  <option value="">Select a date</option>
                  {availableSlots.map((slot) => (
                    <option key={`date-${slot.date}`} value={slot.date}>
                      {slot.date}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* عرض الأوقات */}
              {selectedDate && (
                <Form.Group className="mb-3">
                  <Form.Label>Time</Form.Label>
                  <Form.Select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  >
                    <option value="">Select a time</option>
                    {availableSlots
                      .find((s) => s.date === selectedDate)
                      ?.times.map((time) => (
                        <option
                          key={`time-${selectedDate}-${time}`}
                          value={time}
                        >
                          {time}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBookingModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmBooking}>
            Confirm Booking
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HeroSection;
