import { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/PatientReview.css';

const API = 'http://localhost:5000/api';

export default function PatientReviews() {
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({ booking_id: '', rating: 5, comment: '' });
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => 
    API.get(`/api/services/by-specialty/${slug}`),
 { headers })
      .then(res => setBookings(res.data))
      .catch(() => setError('Failed to load bookings'));
  }[token];


 
  const submitReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/reviews`, form, { headers });
      alert('Review submitted');
      setForm({ booking_id: '', rating: 5, comment: '' });
    } catch (err) {
      setError('Submit failed');
    }
  };

  return (
    <div className="reviews-container">
      <h2>My Reviews</h2>

      {error && <div className="error-box">{error}</div>}

      <form className="review-form" onSubmit={submitReview}>
        <select
          value={form.booking_id}
          onChange={e => setForm({ ...form, booking_id: e.target.value })}
          required
        >
          <option value="">Select completed appointment</option>
          {bookings.map(b => (
            <option key={b.id} value={b.id}>
              Dr. {b.Doctor?.first_name} – {b.Service?.service_title}
            </option>
          ))}
        </select>

        <div className="stars-input">
          {[1,2,3,4,5].map(n => (
            <button
              key={n}
              type="button"
              className={form.rating >= n ? 'active' : ''}
              onClick={() => setForm({ ...form, rating: n })}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          placeholder="Write your review..."
          value={form.comment}
          onChange={e => setForm({ ...form, comment: e.target.value })}
          required
        />

        <button>Submit Review</button>
      </form>
    </div>
  );
