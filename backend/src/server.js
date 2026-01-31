import app from './app.js';

// ⬅️ هون بالضبط
app.get('/', (req, res) => {
  res.send('Backend is alive');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});