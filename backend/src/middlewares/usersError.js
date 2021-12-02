module.exports = (err, _req, res, _next) => {
  console.log(err);
  if (err.isJoi) {
    return res.status(400).json({ message: err.details[0].message });
  }

  if (err.code === 'conflict') {
    return res.status(409).json({ message: 'Email already registered' });
  }

  if (err.code === 'invalid') {
    return res.status(401).json({ message: 'Invalid email or name' });
  }

  if (err.code === 'userNotFound') {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(500).json({ message: 'Critical error :(' });
};