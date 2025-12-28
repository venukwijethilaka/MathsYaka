const allowedOrigins = [
  'http://localhost:3000',
  /https:\/\/.*\.vercel\.app$/,
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.some(allowedOrigin => 
        typeof allowedOrigin === 'string' 
            ? allowedOrigin === origin 
            : allowedOrigin.test(origin)
    )) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

export default corsOptions;