export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return;

  // Only log in development
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Track Core Web Vitals
  if ('PerformanceObserver' in window) {
    // Largest Contentful Paint
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (isDevelopment) {
        console.log('LCP:', lastEntry.startTime);
      }
      
      if (lastEntry.startTime > 2500) {
        if (isDevelopment) {
          console.warn('LCP is above recommended threshold');
        }
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const fid = entry.processingStart - entry.startTime;
        if (isDevelopment) {
          console.log('FID:', fid);
        }
        
        if (fid > 100) {
          if (isDevelopment) {
            console.warn('FID is above recommended threshold');
          }
        }
      });
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    let clsValue = 0;
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          if (isDevelopment) {
            console.log('CLS:', clsValue);
          }
          
          if (clsValue > 0.1) {
            if (isDevelopment) {
              console.warn('CLS is above recommended threshold');
            }
          }
        }
      });
    }).observe({ entryTypes: ['layout-shift'] });
  }

  // Track page load time
  window.addEventListener('load', () => {
    const loadTime = performance.now();
    if (isDevelopment) {
      console.log('Page load time:', loadTime);
    }
  });
}

export function trackUserInteraction(action, data = {}) {
  if (typeof window === 'undefined') return;

  const event = {
    action,
    timestamp: Date.now(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    ...data,
  };

  if (process.env.NODE_ENV === 'development') {
    console.log('User interaction:', event);
  }
  
  // You can send this to your analytics service
  // analytics.track('user_interaction', event);
} 