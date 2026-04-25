'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';

declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}

export default function Analytics({ gaId }: { gaId: string }) {
    const pathname = usePathname();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!isReady || !gaId || !pathname || typeof window.gtag !== 'function') return;

        const pagePath = `${pathname}${window.location.search}${window.location.hash}`;

        window.gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: pagePath,
        });
    }, [gaId, isReady, pathname]);

    if (!gaId) return null;

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                strategy="afterInteractive"
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                onReady={() => setIsReady(true)}
            >
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gaId}', { send_page_view: false });
        `}
            </Script>
        </>
    );
}
