import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import type { Express } from 'express';

export function setupSessionManagement(app: Express) {
  const pgSession = connectPgSimple(session);
  
  const sessionMiddleware = session({
    store: new pgSession({
      connectionString: process.env.DATABASE_URL,
      createTableIfMissing: false,
      tableName: 'sessions',
    }),
    secret: process.env.SESSION_SECRET || 'fallback-secret-for-dev',
    resave: false,
    saveUninitialized: false,
    rolling: true, // Reset expiration on activity
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    },
    name: 'bagz_session', // Custom session name for security
  });

  app.use(sessionMiddleware);
  
  // Session cleanup endpoint for logout
  app.post('/api/session/cleanup', (req, res) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error('Session destroy error:', err);
          return res.status(500).json({ error: 'Failed to cleanup session' });
        }
        res.clearCookie('bagz_session');
        res.json({ success: true });
      });
    } else {
      res.json({ success: true });
    }
  });
}