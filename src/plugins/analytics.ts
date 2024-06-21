declare global {
  interface Window {
    dataLayer: any[];
  }
}

export function initAnalytics() {
  window.dataLayer = window.dataLayer || [];

  if (import.meta.env.PROD) {
    gtag('js', new Date());
    gtag('config', 'G-ZWELKBY42R');
  }
}

function gtag(...args: any[]){
  window.dataLayer.push(args as never);
}
