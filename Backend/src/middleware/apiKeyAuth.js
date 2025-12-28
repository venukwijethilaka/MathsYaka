const apiKeyAuth = (req, res, next) => {
  const apiKey = req.get('x-api-key');
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ message: 'Unauthorized: Missing or invalid API key' });
  }
  next();
};

export default apiKeyAuth;