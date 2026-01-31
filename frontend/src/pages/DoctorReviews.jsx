// import { useEffect, useState } from "react";
// import axios from "axios";
// import "../css/DoctorReviews.css";

// export default function DoctorReviews({ doctorId }) {
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/api/reviews/doctor/${doctorId}`)
//       .then(res => setReviews(res.data))
//       .catch(() => setReviews([]));
//   }, [doctorId]);

//   if (reviews.length === 0)
//     return <p className="no-reviews">No reviews yet.</p>;

//   return (
//     <div className="doctor-reviews">
//       {reviews.map((r) => (
//         <div key={r.id} className="review-card">
          
//           <div className="review-stars">
//             {[...Array(5)].map((_, i) => (
//               <span
//                 key={i}
//                 className={i < r.rating ? "star filled" : "star"}
//               >
//                 ★
//               </span>
//             ))}
//           </div>

//           <p className="review-comment">{r.comment}</p>

//           <div className="review-author">
//             — {r.Patient?.first_name} {r.Patient?.last_name}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../css/DoctorReviews.css";

export default function DoctorReviews() {
  const { doctorId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/api/services/specialities/${slug}`)
    
      .then(res => setReviews(res.data))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, [doctorId]);

  if (loading) return <p>Loading reviews...</p>;

  if (reviews.length === 0)
    return <p style={{ marginTop: "20px" }}>No reviews yet.</p>;

  return (
    <div className="reviews-page">
      <h3>Patient Reviews</h3>

      {reviews.map(r => (
        <div key={r.id} className="review-card">
          <div className="stars">
            {[1,2,3,4,5].map(i => (
              <span
                key={i}
                className={i <= r.rating ? "star filled" : "star"}
              >
                ★
              </span>
            ))}
          </div>

          <p className="comment">{r.comment}</p>

          <small className="author">
            — {r.Patient?.first_name} {r.Patient?.last_name}
          </small>
        </div>
      ))}
    </div>
  );
}