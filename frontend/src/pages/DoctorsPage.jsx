// import { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { Container, Image } from 'react-bootstrap';
// import DoctorReviews from './DoctorReviews';
// import {Link} from "react-router-dom"
// import '../css/DoctorsPage.css'

// export default function DoctorsPage() {
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openDoctor, setOpenDoctor] = useState(null);
//   const servicesRef = useRef({});
//   const [doctorServices, setDoctorServices] = useState({});


//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const res = await API.get(`/api/services/by-specialty/${slug}`);
//         setDoctors(res.data);
//       } catch (err) {
//         console.error('Error fetching doctors:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDoctors();
//   }, []);

//   const toggleServices = async (doctorId) => {
//     if (openDoctor === doctorId) {
//       setOpenDoctor(null);
//       return;
//     }

//     setOpenDoctor(doctorId);

//     if (!doctorServices[doctorId]) {
//       try {
//         const res = await API.get(`/api/services/doctor/${doctorId}`);

//         setDoctorServices((prev) => ({
//           ...prev,
//           [doctorId]: res.data
//         }));
//       } catch (err) {
//         console.error(err);
//       }
//     }

//     setTimeout(() => {
//       servicesRef.current[doctorId]?.scrollIntoView({
//         behavior: 'smooth',
//         block: 'start'
//       });
//     }, 100);
//   };

//   if (loading) return <p>Loading doctors...</p>;
//   if (doctors.length === 0) return <p>No doctors found</p>;

//   return (
//     <Container style={{ marginTop: '120px', marginBottom: '50px' }}>
//       <h2 className="my-4 text-center">Our Doctors</h2>

//       {doctors.map((doctor, index) => (
//         <div
//           key={doctor.id}
//           className="doctor-row"
//           style={{ animationDelay: `${index * 0.15}s` }}
//         >
//           <div className="doctor-left">
//             <Image
//               src={`../src/assets/${doctor.image}`}
//               alt={`${doctor.first_name} ${doctor.last_name}`} />
//           </div>
//           <div className="doctor-right">
//             <h4>
//               {doctor.first_name} {doctor.last_name}
//             </h4>
//             <span className="specialty">{doctor.specialty_slug}</span>
//             <p>{doctor.bio}</p>
//             <button className="btn btn-outline-primary btn-sm mt-2"
//               onClick={() => toggleServices(doctor.id)}>
//               View Services
//             </button>

//             {openDoctor === doctor.id && (
//               <div
//                 ref={(el) => (servicesRef.current[doctor.id] = el)}
//                 className="doctor-services"
//               >
//                 <h6>Services</h6>

//                 {doctorServices[doctor.id] ? (
//                   <ul>
//                     {doctorServices[doctor.id].map((service) => (
//                       <li key={service.id}>
//                         <strong>{service.service_title}</strong>: {service.service_description}
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>Loading services...</p>
//                 )}
//                 <h6 style={{ marginTop: '15px' }}>Reviews</h6>
//                 <DoctorReviews doctorId={doctor.id} />
//               </div>
//             )}
//           </div>
//         </div>
//       ))}
//     </Container>
//   );
// }
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";
import { Container, Image } from "react-bootstrap";
import "../css/DoctorsPage.css";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDoctor, setOpenDoctor] = useState(null);
  const servicesRef = useRef({});
  const [doctorServices, setDoctorServices] = useState({});

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await API.get("/api/doctors");
        setDoctors(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const toggleServices = async (doctorId) => {
    if (openDoctor === doctorId) {
      setOpenDoctor(null);
      return;
    }

    setOpenDoctor(doctorId);

    if (!doctorServices[doctorId]) {
      try {
        const res = await API.get(`/api/services/doctor/${doctorId}`);
        setDoctorServices((prev) => ({
          ...prev,
          [doctorId]: res.data,
        }));
      } catch (err) {
        console.error(err);
      }
    }

    setTimeout(() => {
      servicesRef.current[doctorId]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  if (loading) return <p>Loading doctors...</p>;
  if (doctors.length === 0) return <p>No doctors found</p>;

  return (
    <Container style={{ marginTop: "120px", marginBottom: "50px" }}>
      <h2 className="my-4 text-center">Our Doctors</h2>

      {doctors.map((doctor, index) => (
        <div
          key={doctor.id}
          className="doctor-row"
          style={{ animationDelay: `${index * 0.15}s` }}
        >
          {/* LEFT */}
          <div className="doctor-left">
            <Image
              src={`../src/assets/${doctor.image}`}
              alt={`${doctor.first_name} ${doctor.last_name}`}
              className="doctor-img"
            />

            {/* ⭐ REVIEW BUTTON */}
            <Link
              to={`/doctor/${doctor.id}/reviews`}
              className="review-btn"
            >
              ⭐ Patient Reviews
            </Link>
          </div>

          {/* RIGHT */}
          <div className="doctor-right">
            <h4>
              {doctor.first_name} {doctor.last_name}
            </h4>
            <span className="specialty">{doctor.specialty_slug}</span>
            <p>{doctor.bio}</p>

            <button
              className="btn btn-outline-primary btn-sm mt-2"
              onClick={() => toggleServices(doctor.id)}
            >
              View Services
            </button>

            {openDoctor === doctor.id && (
              <div
                ref={(el) => (servicesRef.current[doctor.id] = el)}
                className="doctor-services"
              >
                <h6>Services</h6>

                {doctorServices[doctor.id] ? (
                  <ul>
                    {doctorServices[doctor.id].map((service) => (
                      <li key={service.id}>
                        <strong>{service.service_title}</strong>:{" "}
                        {service.service_description}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Loading services...</p>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </Container>
  );
}