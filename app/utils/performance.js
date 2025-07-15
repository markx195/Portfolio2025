export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return;

  // Only log in development
  const isDevelopment = import.meta.env.MODE === 'development';

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
    let lastLoggedValue = 0;
    let logTimeout = null;
    
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          
          // Only log if there's a significant change or if it's the first few values
          const significantChange = Math.abs(clsValue - lastLoggedValue) > 0.01;
          const isEarlyValue = clsValue < 0.01;
          
          if (isDevelopment && (significantChange || isEarlyValue)) {
            // Clear existing timeout
            if (logTimeout) {
              clearTimeout(logTimeout);
            }
            
            // Throttle logging to prevent spam
            logTimeout = setTimeout(() => {
              console.log('CLS:', clsValue.toFixed(6));
              lastLoggedValue = clsValue;
            }, 100);
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

  if (import.meta.env.MODE === 'development') {
    console.log('User interaction:', event);
  }
  
  // You can send this to your analytics service
  // analytics.track('user_interaction', event);
} 