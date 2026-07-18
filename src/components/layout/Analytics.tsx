'use client';

import * as React from 'react';
import { env } from '@/config/env';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function Analytics() {
  const ga4Id = env.NEXT_PUBLIC_GA4_ID;
  const clarityId = env.NEXT_PUBLIC_CLARITY_ID;
  const metaPixelId = env.NEXT_PUBLIC_META_PIXEL_ID;
  const tiktokPixelId = env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;

  React.useEffect(() => {
    // Google Analytics 4 (gtag)
    if (ga4Id) {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
      }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', ga4Id);
    }

    // Microsoft Clarity
    if (clarityId) {
      (window as { clarity?: (id: string) => void }).clarity = function (id: string) {
        // Clarity is loaded via script tag
      };
    }

    // Meta Pixel (Facebook Pixel)
    if (metaPixelId) {
      (window as { fbq?: (...args: unknown[]) => void }).fbq = function (
        ...args: unknown[]
      ) {
        // fbq is loaded via script tag
      };
    }

    // TikTok Pixel
    if (tiktokPixelId) {
      (window as { ttq?: (...args: unknown[]) => void }).ttq = function (
        ...args: unknown[]
      ) {
        // ttq is loaded via script tag
      };
    }
  }, [ga4Id, clarityId, metaPixelId, tiktokPixelId]);

  return (
    <>
      {/* Google Analytics 4 */}
      {ga4Id && (
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
        />
      )}

      {/* Microsoft Clarity */}
      {clarityId && (
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `,
          }}
        />
      )}

      {/* Meta Pixel (Facebook Pixel) */}
      {metaPixelId && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaPixelId}');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}

      {/* TikTok Pixel */}
      {tiktokPixelId && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[t]=function(){t.push(arguments)}};ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._i[e]._t=Date.now(),ttq._i[e]._e=e,ttq._i[e]._n=n,ttq._i[e]._o=ttq._i[e]._o||{},ttq._i[e]._f=ttq._i[e]._f||function(){ttq._i[e]._o[t]=ttq._i[e]._o[t]||[],ttq._i[e]._o[t].push(arguments)}}
                var s=d.createElement("script");s.async=1;s.src="https://analytics.tiktok.com/i18n/pixel/events.js";
                var n=d.getElementsByTagName("script")[0];n.parentNode.insertBefore(s,n);
              }(window, document, 'ttq');
              ttq.load('${tiktokPixelId}');
              ttq.page();
            `,
          }}
        />
      )}
    </>
  );
}