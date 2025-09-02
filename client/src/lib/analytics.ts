// Simple privacy-focused analytics system
interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp: number;
  sessionId: string;
  userId?: string;
}

class Analytics {
  private sessionId: string;
  private userId?: string;
  private events: AnalyticsEvent[] = [];
  private batchSize = 10;
  private flushInterval = 30000; // 30 seconds

  constructor() {
    this.sessionId = this.generateSessionId();
    this.startBatchProcessor();
    this.trackPageView();
    this.setupEventListeners();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  }

  setUser(userId: string) {
    this.userId = userId;
  }

  track(event: string, properties?: Record<string, any>) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties: {
        ...properties,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: Date.now(),
      },
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
    };

    this.events.push(analyticsEvent);

    // Batch send events
    if (this.events.length >= this.batchSize) {
      this.flush();
    }

    // Console log in development
    if (import.meta.env.DEV) {
      console.log('Analytics:', event, properties);
    }
  }

  private trackPageView() {
    this.track('page_view', {
      page: window.location.pathname,
      title: document.title,
      referrer: document.referrer,
    });
  }

  private setupEventListeners() {
    // Track page visibility
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.track('page_hidden');
        this.flush(); // Send remaining events before page might close
      } else {
        this.track('page_visible');
      }
    });

    // Track beforeunload
    window.addEventListener('beforeunload', () => {
      this.flush();
    });

    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
        maxScroll = scrollPercent;
        this.track('scroll_depth', { depth: scrollPercent });
      }
    });
  }

  private startBatchProcessor() {
    setInterval(() => {
      if (this.events.length > 0) {
        this.flush();
      }
    }, this.flushInterval);
  }

  private async flush() {
    if (this.events.length === 0) return;

    const eventsToSend = [...this.events];
    this.events = [];

    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ events: eventsToSend }),
      });
    } catch (error) {
      // Silently handle analytics errors
      console.warn('Analytics flush failed:', error);
    }
  }

  // Public methods for specific tracking
  trackToolUsage(tool: string, action: string, properties?: Record<string, any>) {
    this.track('tool_usage', {
      tool,
      action,
      ...properties,
    });
  }

  trackUserAction(action: string, properties?: Record<string, any>) {
    this.track('user_action', {
      action,
      ...properties,
    });
  }

  trackError(error: Error, context?: string) {
    this.track('error', {
      message: error.message,
      stack: error.stack,
      context,
    });
  }

  trackPerformance(metric: string, value: number, unit = 'ms') {
    this.track('performance', {
      metric,
      value,
      unit,
    });
  }
}

// Create global analytics instance
const analytics = new Analytics();

export default analytics;