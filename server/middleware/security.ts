import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { body, validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';

// Rate limiting configurations
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

export const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

export const registrationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 registration attempts per hour
  message: 'Too many registration attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Security middleware
export const securityMiddleware = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://replit.com"],
      connectSrc: ["'self'", "ws:", "wss:"],
    },
  },
});

// Input validation middleware
export const validateRegistration = [
  body('username')
    .isLength({ min: 3, max: 20 })
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username must be 3-20 characters, letters/numbers/underscore only'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('xUsername')
    .optional()
    .matches(/^@?[a-zA-Z0-9_]{1,15}$/)
    .withMessage('X username must be 1-15 characters, letters/numbers/underscore only'),
  body('telegramUsername')
    .optional()
    .matches(/^@?[a-zA-Z0-9_]{5,32}$/)
    .withMessage('Telegram username must be 5-32 characters, letters/numbers/underscore only'),
  body('solanaWallet')
    .optional()
    .matches(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/)
    .withMessage('Invalid Solana wallet address'),
  handleValidationErrors,
];

export const validateActionTracking = [
  body('userId')
    .isUUID()
    .withMessage('Invalid user ID'),
  body('actionType')
    .isIn(['tweet', 'pfp_download', 'meme_creation', 'meme_share'])
    .withMessage('Invalid action type'),
  handleValidationErrors,
];

function handleValidationErrors(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
}

// Error logging middleware
export const errorLogger = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`[${new Date().toISOString()}] ${req.method} ${req.path}:`, {
    error: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    body: req.body,
    user: (req as any).user?.claims?.sub,
  });
  next(error);
};

// Error handler
export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  res.status(500).json({
    error: 'Internal server error',
    message: isDevelopment ? error.message : 'Something went wrong',
    ...(isDevelopment && { stack: error.stack }),
  });
};