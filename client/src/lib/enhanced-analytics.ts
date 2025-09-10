// Enhanced Analytics with Google Analytics 4 integration
// Track user behavior, crypto interactions, and chaos tool usage

interface EnhancedEvent {
  event: string;
  category?: string;
  action?: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

interface CryptoEvent {
  token: 'moonshot' | 'pumpfun';
  action: 'view_chart' | 'copy_address' | 'share' | 'price_alert';
  price?: number;
  market_cap?: number;
}

interface ChaosToolEvent {
  tool: 'tweet_generator' | 'meme_creator' | 'pfp_generator' | 'voice_meme';
  action: 'generate' | 'download' | 'share' | 'customize';
  template_used?: string;
  generation_time?: number;
}

interface UserEngagementEvent {
  action: 'scroll_depth' | 'time_on_page' | 'chaos_zone_join' | 'language_change';
  value?: number;
  location?: string;
  language?: string;
}

class EnhancedAnalytics {
  private isInitialized = false;
  private userId?: string;
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeGA4();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async initializeGA4() {
    if (typeof window === 'undefined') return;

    try {
      // Enhanced GA4 configuration
      const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
      if (!measurementId) {
        console.warn('GA4 Measurement ID not found');
        return;
      }

      // Load GA4 script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);

      // Initialize gtag with enhanced config
      const configScript = document.createElement('script');
      configScript.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${measurementId}', {
          cookie_domain: 'auto',
          cookie_expires: 63072000, // 2 years
          send_page_view: false, // We'll handle page views manually
          custom_map: {
            custom_parameter_1: 'chaos_level',
            custom_parameter_2: 'user_type',
            custom_parameter_3: 'session_duration'
          }
        });
      `;
      document.head.appendChild(configScript);

      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize enhanced analytics:', error);
    }
  }

  // Set user properties for enhanced tracking
  setUserProperties(properties: {
    user_id?: string;
    user_type?: 'new' | 'returning' | 'whale' | 'degen';
    chaos_level?: 'beginner' | 'intermediate' | 'expert' | 'legendary';
    preferred_language?: string;
    wallet_connected?: boolean;
  }) {
    if (!this.isInitialized || typeof window === 'undefined') return;

    this.userId = properties.user_id;

    (window as any).gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
      user_id: properties.user_id,
      custom_map: {
        user_type: properties.user_type,
        chaos_level: properties.chaos_level,
        preferred_language: properties.preferred_language,
        wallet_connected: properties.wallet_connected
      }
    });
  }

  // Track enhanced page views with crypto context
  trackPageView(page: string, additional_data?: {
    page_title?: string;
    content_group1?: string; // e.g., 'crypto_tools', 'community', 'trading'
    content_group2?: string; // e.g., 'moonshot', 'pumpfun'
    user_engagement?: boolean;
  }) {
    if (!this.isInitialized || typeof window === 'undefined') return;

    (window as any).gtag('event', 'page_view', {
      page_title: additional_data?.page_title || document.title,
      page_location: window.location.href,
      page_path: page,
      content_group1: additional_data?.content_group1,
      content_group2: additional_data?.content_group2,
      session_id: this.sessionId,
      user_id: this.userId,
      engagement_time_msec: Date.now()
    });
  }

  // Track crypto-specific events
  trackCryptoEvent(event: CryptoEvent) {
    if (!this.isInitialized) return;

    this.trackEvent({
      event: 'crypto_interaction',
      category: 'cryptocurrency',
      action: event.action,
      label: event.token,
      value: event.price || event.market_cap,
      custom_parameters: {
        token_type: event.token,
        current_price: event.price,
        market_cap: event.market_cap,
        session_id: this.sessionId
      }
    });
  }

  // Track chaos tool usage
  trackChaosToolEvent(event: ChaosToolEvent) {
    if (!this.isInitialized) return;

    this.trackEvent({
      event: 'chaos_tool_usage',
      category: 'chaos_tools',
      action: event.action,
      label: event.tool,
      value: event.generation_time,
      custom_parameters: {
        tool_type: event.tool,
        template_used: event.template_used,
        generation_time_ms: event.generation_time,
        session_id: this.sessionId
      }
    });
  }

  // Track user engagement patterns
  trackUserEngagement(event: UserEngagementEvent) {
    if (!this.isInitialized) return;

    this.trackEvent({
      event: 'user_engagement',
      category: 'engagement',
      action: event.action,
      label: event.location || event.language,
      value: event.value,
      custom_parameters: {
        engagement_type: event.action,
        location: event.location,
        language: event.language,
        session_id: this.sessionId
      }
    });
  }

  // Track conversion events (important for crypto projects)
  trackConversion(type: 'wallet_connect' | 'token_purchase' | 'community_join' | 'staking_start', value?: number) {
    if (!this.isInitialized) return;

    this.trackEvent({
      event: 'conversion',
      category: 'conversions',
      action: type,
      value: value,
      custom_parameters: {
        conversion_type: type,
        conversion_value: value,
        session_id: this.sessionId,
        timestamp: Date.now()
      }
    });
  }

  // Track social media interactions
  trackSocialEvent(platform: 'twitter' | 'telegram' | 'discord' | 'youtube', action: 'share' | 'follow' | 'join') {
    if (!this.isInitialized) return;

    this.trackEvent({
      event: 'social_interaction',
      category: 'social_media',
      action: action,
      label: platform,
      custom_parameters: {
        social_platform: platform,
        social_action: action,
        session_id: this.sessionId
      }
    });
  }

  // Track scroll depth for engagement
  trackScrollDepth(percentage: number) {
    if (!this.isInitialized || percentage < 25) return;

    // Only track milestones (25%, 50%, 75%, 100%)
    const milestones = [25, 50, 75, 100];
    const milestone = milestones.find(m => percentage >= m && percentage < m + 5);
    
    if (milestone) {
      this.trackEvent({
        event: 'scroll',
        category: 'engagement',
        action: 'scroll_depth',
        label: `${milestone}%`,
        value: milestone,
        custom_parameters: {
          scroll_depth: milestone,
          session_id: this.sessionId
        }
      });
    }
  }

  // Enhanced error tracking
  trackError(error: string, location: string, severity: 'low' | 'medium' | 'high' | 'critical' = 'medium') {
    if (!this.isInitialized) return;

    this.trackEvent({
      event: 'exception',
      category: 'errors',
      action: 'javascript_error',
      label: location,
      custom_parameters: {
        error_message: error,
        error_location: location,
        error_severity: severity,
        session_id: this.sessionId,
        user_agent: navigator.userAgent
      }
    });
  }

  // Track performance metrics
  trackPerformance(metric: 'page_load_time' | 'api_response_time' | 'chaos_tool_generation', value: number) {
    if (!this.isInitialized) return;

    this.trackEvent({
      event: 'timing_complete',
      category: 'performance',
      action: metric,
      value: Math.round(value),
      custom_parameters: {
        timing_category: 'performance',
        timing_var: metric,
        timing_value: Math.round(value),
        session_id: this.sessionId
      }
    });
  }

  // Generic event tracking with enhanced parameters
  private trackEvent(event: EnhancedEvent) {
    if (!this.isInitialized || typeof window === 'undefined') return;

    (window as any).gtag('event', event.event, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.custom_parameters
    });
  }

  // Get analytics data (for dashboard/admin)
  async getAnalyticsData(dateRange: string = '30d') {
    // This would typically connect to Google Analytics Reporting API
    // For now, return mock data structure
    return {
      page_views: 0,
      unique_users: 0,
      chaos_tool_usage: 0,
      crypto_interactions: 0,
      conversions: 0,
      top_pages: [],
      user_demographics: {},
      engagement_metrics: {}
    };
  }
}

// Export singleton instance
export const enhancedAnalytics = new EnhancedAnalytics();

// Auto-track scroll depth
if (typeof window !== 'undefined') {
  let scrollTimer: NodeJS.Timeout;
  
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      enhancedAnalytics.trackScrollDepth(scrollPercent);
    }, 100);
  });

  // Track errors automatically
  window.addEventListener('error', (event) => {
    enhancedAnalytics.trackError(
      event.error?.message || 'Unknown error',
      event.filename || 'Unknown location',
      'high'
    );
  });

  // Track unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    enhancedAnalytics.trackError(
      event.reason?.message || 'Unhandled promise rejection',
      'Promise rejection',
      'medium'
    );
  });
}