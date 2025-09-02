import NodeCache from 'node-cache';
import type { Request, Response, NextFunction } from 'express';

// Cache configurations
const tweetCache = new NodeCache({ stdTTL: 300 }); // 5 minutes
const leaderboardCache = new NodeCache({ stdTTL: 30 }); // 30 seconds
const userStatsCache = new NodeCache({ stdTTL: 60 }); // 1 minute

export const cacheMiddleware = (cacheName: 'tweets' | 'leaderboard' | 'userStats', ttl?: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const cache = getCacheByName(cacheName);
    const key = `${req.path}${req.url}`;
    
    const cachedData = cache.get(key);
    if (cachedData) {
      return res.json(cachedData);
    }
    
    // Override res.json to cache the response
    const originalJson = res.json;
    res.json = function(data: any) {
      if (res.statusCode === 200) {
        if (ttl !== undefined) {
          cache.set(key, data, ttl);
        } else {
          cache.set(key, data);
        }
      }
      return originalJson.call(this, data);
    };
    
    next();
  };
};

function getCacheByName(name: string): NodeCache {
  switch (name) {
    case 'tweets': return tweetCache;
    case 'leaderboard': return leaderboardCache;
    case 'userStats': return userStatsCache;
    default: return new NodeCache({ stdTTL: 300 });
  }
}

// Clear cache functions
export const clearTweetCache = () => tweetCache.flushAll();
export const clearLeaderboardCache = () => leaderboardCache.flushAll();
export const clearUserStatsCache = () => userStatsCache.flushAll();
export const clearAllCaches = () => {
  tweetCache.flushAll();
  leaderboardCache.flushAll();
  userStatsCache.flushAll();
};