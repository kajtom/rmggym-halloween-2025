import ReactGA from 'react-ga';

// Initialize Facebook Pixel
declare const fbq: any;

// Initialize TikTok Pixel
declare global {
  interface Window {
    TiktokAnalytics: any;
    fbq: any;
    _fbq: any;
  }
}

export const initializeAnalytics = (gaTrackingId: string) => {
  // Initialize Google Analytics
  ReactGA.initialize(gaTrackingId);

  // Initialize Facebook Pixel
  if (typeof window !== 'undefined') {
    (function(f: Window, b: Document, e: string, v: string, n: string, t: HTMLScriptElement, s: HTMLScriptElement | null) {
      if((f as any).fbq) return; (f as any).fbq = function() { ((f as any).fbq as any).callMethod ? 
        ((f as any).fbq as any).callMethod.apply((f as any).fbq, arguments) : ((f as any).fbq as any).queue.push(arguments)
      };
      if(!(f as any)._fbq) (f as any)._fbq = (f as any).fbq;
      (f as any).fbq.push = (f as any).fbq;
      (f as any).fbq.loaded = true;
      (f as any).fbq.version = '2.0';
      (f as any).fbq.queue = [];
      t = b.createElement(e) as HTMLScriptElement;
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0] as HTMLScriptElement;
      s?.parentNode?.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js', 'fbq', document.createElement('script'), document.getElementsByTagName('script')[0]);
    fbq('init', '422027899522163');
  }

  // Initialize TikTok Pixel
  if (typeof window !== 'undefined') {
    (function(w: Window, d: Document, t: string) {
      (w as any).TiktokAnalytics = (w as any).TiktokAnalytics || {};
      (w as any).TiktokAnalytics.track = (w as any).TiktokAnalytics.track || function() {
        ((w as any).TiktokAnalytics.q = (w as any).TiktokAnalytics.q || []).push(arguments);
      };
      const s = d.createElement(t) as HTMLScriptElement;
      s.async = true;
      s.src = 'https://analytics.tiktok.com/i18n/pixel/sdk.js?sdkid=CTBFIGJC77U74JDR4EL0';
      const x = d.getElementsByTagName(t)[0] as HTMLScriptElement;
      x?.parentNode?.insertBefore(s, x);
    })(window, document, 'script');
  }
};

export const trackPageView = (path: string) => {
  ReactGA.pageview(path);
  if (typeof fbq !== 'undefined') {
    fbq('track', 'PageView');
  }
  if (typeof window.TiktokAnalytics !== 'undefined') {
    window.TiktokAnalytics.track('PageView');
  }
};

export const trackEvent = (category: string, action: string) => {
  ReactGA.event({
    category,
    action,
  });
  if (typeof fbq !== 'undefined') {
    fbq('track', action);
  }
  if (typeof window.TiktokAnalytics !== 'undefined') {
    window.TiktokAnalytics.track(action);
  }
};