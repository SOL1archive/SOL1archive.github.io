import type { Metadata } from 'next';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';
import './globals.css';
import 'katex/dist/katex.min.css';

const GA_ID = 'G-BVCTG6PEZP';

export const metadata: Metadata = {
    title: 'SOL1 Archive',
    description: 'Subin Park research notes, paper reviews, and essays.',
    icons: {
        icon: '/favicon.svg',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
                />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/gh/wan2land/d2coding/d2coding-subset.css"
                />
            </head>
            <body>
                <Analytics gaId={GA_ID} />
                <div className="site-shell">
                    <TopBar />
                    <div className="topbar-spacer" />
                    <main className="site-main">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
