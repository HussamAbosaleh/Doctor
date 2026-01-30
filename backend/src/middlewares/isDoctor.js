const isDoctor = (req, res, next) => {
  if (req.user.role !== 'Doctor') {
    return res.status(403).json({ error: 'Access denied: Doctors only' });
  }
  next();
};

export default isDoctor;
